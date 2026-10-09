// Queen E's checkout Worker.
// Stripe is the source of truth for products, prices and availability.
//   GET  /products  -> catalog read from Stripe (cached ~60s)
//   POST /checkout  -> { items:[{id,size,qty}] } -> Stripe Checkout Session URL
// Stripe setup per product: product id = site slug (e.g. "peach"), metadata.category ("Jams"|"Pickled goods"),
// one active price per size with the size as the price "nickname" (e.g. "8 oz").
// Sold out: set metadata sold_out=true on the product (all sizes) or on one price (that size).

import { CATALOG } from "./catalog.js";

const API = "https://api.stripe.com/v1";
const MAX_LINES = 40;
const MAX_QTY = 20;

function cors(env, origin) {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = allowed.includes(origin);
  return {
    ok,
    headers: {
      "Access-Control-Allow-Origin": ok ? origin : allowed[0] || "",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

async function stripeGet(env, path) {
  const res = await fetch(API + path, { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } });
  if (!res.ok) throw new Error(`Stripe ${res.status}`);
  return res.json();
}

async function loadCatalog(env) {
  const [prods, prices] = await Promise.all([
    stripeGet(env, "/products?active=true&limit=100"),
    stripeGet(env, "/prices?active=true&limit=100&type=one_time"),
  ]);
  const byProduct = new Map();
  for (const pr of prices.data) {
    if (pr.currency !== "usd" || typeof pr.unit_amount !== "number") continue;
    const pid = typeof pr.product === "string" ? pr.product : pr.product && pr.product.id;
    if (!byProduct.has(pid)) byProduct.set(pid, []);
    byProduct.get(pid).push(pr);
  }
  const out = [];
  for (const p of prods.data) {
    const list = byProduct.get(p.id);
    if (!list || !list.length) continue;
    const productSold = (p.metadata && p.metadata.sold_out) === "true";
    const sizes = list
      .map((pr) => ({
        label: pr.nickname || "Regular",
        priceId: pr.id,
        cents: pr.unit_amount,
        soldOut: productSold || (pr.metadata && pr.metadata.sold_out) === "true",
      }))
      .sort((a, b) => a.cents - b.cents || a.label.localeCompare(b.label));
    out.push({
      id: p.id,
      name: p.name,
      category: (p.metadata && p.metadata.category) || "Jams",
      description: p.description || "",
      image: (p.images && p.images[0]) || "",
      sort: Number((p.metadata && p.metadata.sort) || 1000),
      sizes,
    });
  }
  out.sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
  return out;
}

async function handleProducts(request, env, c, ctx) {
  const cache = caches.default;
  const key = new Request(new URL("/products", request.url).toString());
  const hit = await cache.match(key);
  let body;
  if (hit) {
    body = await hit.text();
  } else {
    try {
      body = JSON.stringify(await loadCatalog(env));
    } catch (e) {
      console.log("catalog error", String(e));
      return json({ error: "Catalog unavailable" }, 502, c.headers);
    }
    const toCache = new Response(body, { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" } });
    ctx.waitUntil(cache.put(key, toCache));
  }
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json", ...c.headers } });
}

async function handleCheckout(request, env, c) {
  let payload;
  try { payload = await request.json(); } catch { return json({ error: "Invalid request" }, 400, c.headers); }
  const items = payload && payload.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_LINES) {
    return json({ error: "Your bag is empty or too large" }, 400, c.headers);
  }
  let catalog;
  try { catalog = await loadCatalog(env); } catch (e) {
    console.log("catalog error", String(e));
    return json({ error: "Could not start checkout" }, 502, c.headers);
  }
  // Until products exist in Stripe, fall back to the built-in price list (catalog.js).
  if (!catalog.length) {
    catalog = Object.keys(CATALOG).map((id) => ({
      id,
      name: CATALOG[id].name,
      sizes: Object.keys(CATALOG[id].sizes).map((label) => ({
        label,
        cents: CATALOG[id].sizes[label],
        soldOut: CATALOG[id].soldOut.includes(label),
      })),
    }));
  }
  // Prices come ONLY from Stripe (or the built-in list); client-sent prices are ignored.
  const params = new URLSearchParams();
  let i = 0;
  for (const it of items) {
    const product = catalog.find((p) => p.id === (it && it.id));
    const size = product && product.sizes.find((s) => s.label === it.size);
    const qty = it && it.qty;
    if (!size || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
      return json({ error: "An item in your bag is no longer available" }, 400, c.headers);
    }
    if (size.soldOut) return json({ error: `${product.name} (${size.label}) is sold out` }, 400, c.headers);
    if (size.priceId) {
      params.set(`line_items[${i}][price]`, size.priceId);
    } else {
      params.set(`line_items[${i}][price_data][currency]`, "usd");
      params.set(`line_items[${i}][price_data][unit_amount]`, String(size.cents));
      params.set(`line_items[${i}][price_data][product_data][name]`, `${product.name} (${size.label})`);
    }
    params.set(`line_items[${i}][quantity]`, String(qty));
    i++;
  }
  const site = env.SITE_URL || "https://queenesheirr.com";
  params.set("mode", "payment");
  params.set("success_url", `${site}/order-confirmed/?session_id={CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", `${site}/shop/`);
  params.set("shipping_address_collection[allowed_countries][0]", "US");
  params.set("phone_number_collection[enabled]", "true");
  params.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  params.set("shipping_options[0][shipping_rate_data][display_name]", "Flat-rate shipping");
  params.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(parseInt(env.SHIPPING_CENTS || "1000", 10)));
  params.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "usd");
  // Uncomment once Stripe Tax is set up in the dashboard:
  // params.set("automatic_tax[enabled]", "true");

  const res = await fetch(`${API}/checkout/sessions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const data = await res.json();
  if (!res.ok || !data.url) {
    console.log("Stripe error", res.status, JSON.stringify(data.error || {}));
    return json({ error: "Could not start checkout" }, 502, c.headers);
  }
  return json({ url: data.url }, 200, c.headers);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const c = cors(env, request.headers.get("Origin") || "");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: c.headers });
    if (!env.STRIPE_SECRET_KEY) return json({ error: "Not configured" }, 500, c.headers);
    if (url.pathname === "/products" && request.method === "GET") return handleProducts(request, env, c, ctx);
    if (url.pathname === "/checkout" && request.method === "POST") {
      if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
      return handleCheckout(request, env, c);
    }
    return json({ error: "Not found" }, 404, c.headers);
  },
};
