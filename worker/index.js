// Queen E's checkout Worker.
// Stripe is the source of truth for products, prices and availability.
//   GET  /products  -> catalog read from Stripe (cached ~60s)
//   POST /checkout  -> { items:[{id,size,qty}] } -> Stripe Checkout Session URL
//   POST /class-request -> { name,email,class,date,attendees,notes } -> DRAFT Stripe quote for review/sending
// Stripe setup per product: product id = site slug (e.g. "peach"), metadata.category ("Jams"|"Pickled goods"),
// one active price per size with the size as the price "nickname" (e.g. "8 oz").
// Sold out: set metadata sold_out=true on the product (all sizes) or on one price (that size).

import { CATALOG } from "./catalog.js";
import { SEED } from "./seed-data.js";

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

const CLASSES = {
  "Standalone Jam Making & STEM Lab": { id: "class-jam-stem-lab", cents: 5500 },
  "Jam Making & Etiquette Combined Class": { id: "class-jam-etiquette", cents: 8500 },
};

async function stripePost(env, path, params) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Stripe ${res.status} ${data.error && data.error.message}`);
  return data;
}

async function ensureClassProduct(env, cls, name) {
  try { return await stripeGet(env, `/products/${cls.id}`); } catch { /* not created yet */ }
  const p = new URLSearchParams({ id: cls.id, name, "metadata[kind]": "class" });
  return stripePost(env, "/products", p);
}

async function handleClassRequest(request, env, c) {
  let b;
  try { b = await request.json(); } catch { return json({ error: "Invalid request" }, 400, c.headers); }
  const name = String((b && b.name) || "").trim().slice(0, 100);
  const email = String((b && b.email) || "").trim().slice(0, 200);
  const cls = CLASSES[b && b.class];
  const attendees = parseInt(b && b.attendees, 10);
  const date = String((b && b.date) || "").slice(0, 10);
  const notes = String((b && b.notes) || "").slice(0, 1000);
  if ((b && b.website) || !name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !cls || !(attendees >= 1 && attendees <= 30) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "Invalid request" }, 400, c.headers);
  }
  try {
    await ensureClassProduct(env, cls, b.class);
    const found = await stripeGet(env, `/customers?email=${encodeURIComponent(email)}&limit=1`);
    const customer = found.data[0] || (await stripePost(env, "/customers", new URLSearchParams({ name, email })));
    const q = new URLSearchParams({
      customer: customer.id,
      description: `${b.class} - requested date ${date}, ${attendees} attendee(s).`,
      "metadata[requested_date]": date,
      "metadata[attendees]": String(attendees),
      "metadata[notes]": notes.slice(0, 480),
      "metadata[source]": "queenesheirr.com class request",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][product]": cls.id,
      "line_items[0][price_data][unit_amount]": String(cls.cents),
      "line_items[0][quantity]": String(attendees),
    });
    const quote = await stripePost(env, "/quotes", q);
    return json({ ok: true, quote: quote.id }, 200, c.headers);
  } catch (e) {
    console.log("quote error", String(e));
    return json({ error: "Could not create quote" }, 502, c.headers);
  }
}

// One-time catalog seed. Disabled unless the ADMIN_TOKEN secret is set. Idempotent: skips what exists.
async function handleSeed(request, env, c) {
  const auth = request.headers.get("Authorization") || "";
  if (!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return json({ error: "Not found" }, 404, c.headers);
  const out = { created: [], skipped: [], errors: [] };
  for (const p of SEED) {
    try {
      let exists = true;
      try { await stripeGet(env, `/products/${p.id}`); } catch { exists = false; }
      if (!exists) {
        await stripePost(env, "/products", new URLSearchParams({
          id: p.id, name: p.name, description: p.description || "",
          "metadata[category]": p.category, "metadata[sort]": String(p.sort),
        }));
      }
      const have = await stripeGet(env, `/prices?product=${encodeURIComponent(p.id)}&active=true&limit=20`);
      const labels = new Set(have.data.map((x) => x.nickname));
      for (const s of p.sizes) {
        if (labels.has(s.label)) { out.skipped.push(`${p.id} ${s.label}`); continue; }
        const q = new URLSearchParams({ product: p.id, currency: "usd", unit_amount: String(s.cents), nickname: s.label });
        if (s.soldOut) q.set("metadata[sold_out]", "true");
        await stripePost(env, "/prices", q);
        out.created.push(`${p.id} ${s.label}`);
      }
    } catch (e) { out.errors.push(`${p.id}: ${String(e)}`); }
  }
  return json(out, out.errors.length ? 502 : 200, c.headers);
}

export default {
  async fetch(request, env0, ctx) {
    const env = { ALLOWED_ORIGINS: "https://queenesheirr.com,https://www.queenesheirr.com", SITE_URL: "https://queenesheirr.com", SHIPPING_CENTS: "1000", ...env0 };
    const url = new URL(request.url);
    const c = cors(env, request.headers.get("Origin") || "");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: c.headers });
    if (!env.STRIPE_SECRET_KEY) return json({ error: "Not configured" }, 500, c.headers);
    if (url.pathname === "/products" && request.method === "GET") return handleProducts(request, env, c, ctx);
    if (url.pathname === "/checkout" && request.method === "POST") {
      if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
      return handleCheckout(request, env, c);
    }
    if (url.pathname === "/class-request" && request.method === "POST") {
      if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
      return handleClassRequest(request, env, c);
    }
    if (url.pathname === "/admin/seed" && request.method === "POST") return handleSeed(request, env, c);
    return json({ error: "Not found" }, 404, c.headers);
  },
};
