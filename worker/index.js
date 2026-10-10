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
import { handleAdmin, readEvents, upcoming, serveImage } from "./admin.js";
import { publicClasses, classCheckout, recordBooking } from "./classes.js";

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
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

// Optional stock count kept in price metadata "stock" (a whole number). Missing = unlimited.
function stockOf(pr) {
  const v = pr && pr.metadata && pr.metadata.stock;
  if (v === undefined || v === null || String(v).trim() === "") return null;
  const n = parseInt(v, 10);
  return Number.isInteger(n) ? Math.max(0, n) : null;
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
        stock: stockOf(pr),
        soldOut: productSold || (pr.metadata && pr.metadata.sold_out) === "true" || (stockOf(pr) !== null && stockOf(pr) <= 0),
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
  const wanted = new Map();
  let i = 0;
  for (const it of items) {
    const product = catalog.find((p) => p.id === (it && it.id));
    const size = product && product.sizes.find((s) => s.label === it.size);
    const qty = it && it.qty;
    if (!size || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
      return json({ error: "An item in your bag is no longer available" }, 400, c.headers);
    }
    if (size.soldOut) return json({ error: `${product.name} (${size.label}) is sold out` }, 400, c.headers);
    const key = `${product.id}|${size.label}`;
    const total = (wanted.get(key) || 0) + qty;
    wanted.set(key, total);
    if (typeof size.stock === "number" && total > size.stock) {
      return json({ error: `Only ${size.stock} left of ${product.name} (${size.label})` }, 400, c.headers);
    }
    if (size.priceId) {
      params.set(`line_items[${i}][price]`, size.priceId);
    } else {
      params.set(`line_items[${i}][price_data][currency]`, "usd");
      params.set(`line_items[${i}][price_data][unit_amount]`, String(size.cents));
      if (env.TAX_ENABLED === "true") params.set(`line_items[${i}][price_data][tax_behavior]`, "exclusive");
      params.set(`line_items[${i}][price_data][product_data][name]`, `${product.name} (${size.label})`);
    }
    params.set(`line_items[${i}][quantity]`, String(qty));
    i++;
  }
  const pickup = payload.fulfillment === "pickup" || payload.fulfillment === "event";
  let ev = null;
  if (payload.fulfillment === "event") {
    ev = upcoming(await readEvents(env)).find((e) => e.id === payload.eventId);
    if (!ev) return json({ error: "That event is no longer taking orders" }, 400, c.headers);
  }
  const site = env.SITE_URL || "https://queenesheirr.com";
  params.set("mode", "payment");
  params.set("success_url", `${site}/order-confirmed/?session_id={CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", `${site}/shop/`);
  params.set("phone_number_collection[enabled]", "true");
  params.set("metadata[fulfillment]", ev ? "event" : pickup ? "pickup" : "ship");
  if (ev) params.set("metadata[event]", `${ev.name} (${ev.date})`.slice(0, 200));
  if (pickup) {
    // No shipping address or fee. Customers are contacted by email to arrange pickup.
    params.set("billing_address_collection", "required");
    params.set("custom_text[submit][message]", ev ? `Pickup at ${ev.name} on ${ev.date}${ev.location ? " (" + ev.location + ")" : ""}. We will email you the details.` : "Local pickup: we will email you to arrange a pickup time and place.");
  } else {
    params.set("shipping_address_collection[allowed_countries][0]", "US");
    params.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    params.set("shipping_options[0][shipping_rate_data][display_name]", "Flat-rate shipping");
    params.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(parseInt(env.SHIPPING_CENTS || "1000", 10)));
    params.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "usd");
    if (env.TAX_ENABLED === "true") params.set("shipping_options[0][shipping_rate_data][tax_behavior]", "exclusive");
  }
  // Sales tax: set the Worker variable TAX_ENABLED=true once Stripe Tax is configured in the dashboard.
  if (env.TAX_ENABLED === "true") params.set("automatic_tax[enabled]", "true");

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

// Short link for the QR code on the event sale screen: /pay/<session id> sends the customer's phone to that Stripe payment page.
async function payRedirect(env, id) {
  const page = (msg) => new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Queen E's Heirr</title><body style="font:18px Georgia,serif;text-align:center;padding:48px 24px;background:#fcfaf7;color:#1b3b22"><h1>Queen E's Heirr</h1><p>${msg}</p>`, { status: 410, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  try {
    const s = await stripeGet(env, `/checkout/sessions/${id}`);
    if (!s.metadata || s.metadata.fulfillment !== "inperson") return page("This payment link is not valid.");
    if (s.status !== "open" || !s.url) return page(s.payment_status === "paid" ? "This order is already paid. Thank you!" : "This payment link has expired. Please ask for a new one.");
    return new Response(null, { status: 302, headers: { Location: s.url, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  } catch { return page("This payment link is not valid."); }
}

// In-person event sale: same Stripe-only pricing and stock rules as the website, no shipping, returns to /admin/thanks.
async function posCheckout(env, origin, items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_LINES) throw new Error("The bag is empty");
  const catalog = await loadCatalog(env);
  const params = new URLSearchParams();
  const wanted = new Map();
  let n = 0;
  for (const it of items) {
    const product = catalog.find((p) => p.id === (it && it.id));
    const size = product && product.sizes.find((s) => s.label === it.size);
    const qty = it && it.qty;
    if (!size || !size.priceId || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw new Error("An item in the bag is no longer available");
    if (size.soldOut) throw new Error(`${product.name} (${size.label}) is sold out`);
    const key = `${product.id}|${size.label}`;
    const total = (wanted.get(key) || 0) + qty;
    wanted.set(key, total);
    if (typeof size.stock === "number" && total > size.stock) throw new Error(`Only ${size.stock} left of ${product.name} (${size.label})`);
    params.set(`line_items[${n}][price]`, size.priceId);
    params.set(`line_items[${n}][quantity]`, String(qty));
    n++;
  }
  params.set("mode", "payment");
  params.set("success_url", `${origin}/admin/thanks`);
  params.set("cancel_url", `${origin}/admin/thanks?cancelled=1`);
  params.set("expires_at", String(Math.floor(Date.now() / 1000) + 31 * 60));
  // Card only (Apple Pay and Google Pay still appear): no "save my info" Link prompt, nothing is stored for the customer.
  params.set("payment_method_types[0]", "card");
  params.set("metadata[fulfillment]", "inperson");
  params.set("metadata[event]", "In-person sale");
  if (env.TAX_ENABLED === "true") {
    params.set("automatic_tax[enabled]", "true");
    params.set("billing_address_collection", "required");
  }
  const s = await stripePost(env, "/checkout/sessions", params);
  return { url: s.url, id: s.id, pay: `${origin}/pay/${s.id}` };
}

const CLASSES = {
  "Standalone Jam Making & STEM Lab": { id: "class-jam-stem-lab", cents: 5500 },
  "Jam Making & Etiquette Combined Class": { id: "class-jam-etiquette", cents: 8500 },
  // Starting estimate only: the owner edits the draft quote in Stripe before approving it.
  "Private group or event (custom quote)": { id: "class-private-event", cents: 8500 },
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
      "metadata[class]": String(b.class).slice(0, 100),
      "metadata[phone]": String((b && b.phone) || "").slice(0, 40),
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

// Stripe webhook: subtract purchased quantities from price metadata "stock".
async function verifyStripeSignature(secret, header, body) {
  if (!secret || !header) return false;
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=").map((x) => x.trim())).filter((a) => a.length === 2));
  const t = parts.t;
  const sigs = header.split(",").map((kv) => kv.trim()).filter((kv) => kv.startsWith("v1=")).map((kv) => kv.slice(3));
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${body}`)));
  const hex = Array.from(mac).map((b) => b.toString(16).padStart(2, "0")).join("");
  return sigs.some((s) => s.length === hex.length && s.split("").reduce((d, ch, k) => d | (ch.charCodeAt(0) ^ hex.charCodeAt(k)), 0) === 0);
}

async function handleStripeWebhook(request, env) {
  const body = await request.text();
  if (!(await verifyStripeSignature(env.STRIPE_WEBHOOK_SECRET, request.headers.get("Stripe-Signature"), body))) {
    return new Response("bad signature", { status: 400 });
  }
  let evt;
  try { evt = JSON.parse(body); } catch { return new Response("bad json", { status: 400 }); }
  if (evt.type !== "checkout.session.completed" && evt.type !== "checkout.session.async_payment_succeeded") {
    return new Response("ignored", { status: 200 });
  }
  const session = evt.data && evt.data.object;
  if (!session || session.payment_status !== "paid") return new Response("not paid", { status: 200 });
  if (session.metadata && session.metadata.kind === "class") {
    try { await recordBooking(env, session); } catch (e) { console.log("booking error", String(e)); return new Response("error", { status: 500 }); }
    return new Response("ok", { status: 200 });
  }
  try {
    const li = await stripeGet(env, `/checkout/sessions/${session.id}/line_items?limit=100`);
    for (const line of li.data) {
      const priceId = line.price && line.price.id;
      if (!priceId) continue;
      const pr = await stripeGet(env, `/prices/${priceId}`);
      const stock = stockOf(pr);
      if (stock === null) continue;
      const done = String((pr.metadata && pr.metadata.applied) || "").split(",").filter(Boolean);
      if (done.includes(session.id)) continue; // retry of an event already counted
      done.push(session.id);
      const q = new URLSearchParams({
        "metadata[stock]": String(Math.max(0, stock - (line.quantity || 0))),
        "metadata[applied]": done.slice(-5).join(","),
      });
      await stripePost(env, `/prices/${priceId}`, q);
    }
  } catch (e) {
    console.log("webhook error", String(e));
    return new Response("error", { status: 500 }); // Stripe will retry
  }
  return new Response("ok", { status: 200 });
}

// One-time bulk stock: sets metadata stock=N on every active price that has no stock yet. ADMIN_TOKEN required.
async function handleSetStock(request, env, c, url) {
  const auth = request.headers.get("Authorization") || "";
  if (!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return json({ error: "Not found" }, 404, c.headers);
  const n = parseInt(url.searchParams.get("n"), 10);
  if (!Number.isInteger(n) || n < 0 || n > 100000) return json({ error: "Bad n" }, 400, c.headers);
  const out = { set: [], kept: [], soldOutLeftAlone: [], errors: [] };
  const prices = await stripeGet(env, "/prices?active=true&limit=100&type=one_time");
  for (const pr of prices.data) {
    const label = `${typeof pr.product === "string" ? pr.product : pr.product.id} ${pr.nickname || "Regular"}`;
    if (pr.metadata && pr.metadata.sold_out === "true") { out.soldOutLeftAlone.push(label); continue; }
    if (stockOf(pr) !== null) { out.kept.push(`${label} (${stockOf(pr)})`); continue; }
    try { await stripePost(env, `/prices/${pr.id}`, new URLSearchParams({ "metadata[stock]": String(n) })); out.set.push(label); }
    catch (e) { out.errors.push(`${label}: ${String(e)}`); }
  }
  return json(out, out.errors.length ? 502 : 200, c.headers);
}

export default {
  async fetch(request, env0, ctx) {
    const env = { ALLOWED_ORIGINS: "https://queenesheirr.com,https://www.queenesheirr.com", SITE_URL: "https://queenesheirr.com", SHIPPING_CENTS: "1000", ...env0 };
    const url = new URL(request.url);
    const c = cors(env, request.headers.get("Origin") || "");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: c.headers });
    if (env.ADMIN_HOST && url.hostname === env.ADMIN_HOST && url.pathname === "/") return Response.redirect(`https://${env.ADMIN_HOST}/admin`, 302);
    if (!env.STRIPE_SECRET_KEY) return json({ error: "Not configured" }, 500, c.headers);
    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
      const r = await handleAdmin(request, env, url, { stripeGet, stripePost, stockOf, loadCatalog, posCheckout });
      if (r) return r;
    }
    const im = url.pathname.match(/^\/img\/([a-f0-9]+)\.jpg$/);
    if (im && request.method === "GET") return serveImage(env, im[1]);
    const pm = url.pathname.match(/^\/pay\/(cs_[A-Za-z0-9_]+)$/);
    if (pm && request.method === "GET") return payRedirect(env, pm[1]);
    if (url.pathname === "/events" && request.method === "GET") {
      return json(upcoming(await readEvents(env)), 200, { ...c.headers, "Cache-Control": "public, max-age=60" });
    }
    if (url.pathname === "/classes" && request.method === "GET") {
      return json(await publicClasses(env), 200, { ...c.headers, "Cache-Control": "public, max-age=30" });
    }
    if (url.pathname === "/class-checkout" && request.method === "POST") {
      if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
      return classCheckout(request, env, c, { json, stripePost });
    }
    if (url.pathname === "/products" && request.method === "GET") return handleProducts(request, env, c, ctx);
    if (url.pathname === "/checkout" && request.method === "POST") {
      if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
      return handleCheckout(request, env, c);
    }
    if (url.pathname === "/class-request" && request.method === "POST") {
      if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
      return handleClassRequest(request, env, c);
    }
    if (url.pathname === "/stripe-webhook" && request.method === "POST") return handleStripeWebhook(request, env);
    if (url.pathname === "/admin/set-stock" && request.method === "POST") return handleSetStock(request, env, c, url);
    if (url.pathname === "/admin/seed" && request.method === "POST") return handleSeed(request, env, c);
    return json({ error: "Not found" }, 404, c.headers);
  },
};
