import { CATALOG } from "./catalog.js";

const MAX_LINES = 40;
const MAX_QTY = 20;

function cors(env, origin) {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = allowed.includes(origin);
  return {
    ok,
    headers: {
      "Access-Control-Allow-Origin": ok ? origin : allowed[0] || "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const c = cors(env, origin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: c.headers });
    if (url.pathname !== "/checkout" || request.method !== "POST") return json({ error: "Not found" }, 404, c.headers);
    if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
    if (!env.STRIPE_SECRET_KEY) return json({ error: "Checkout is not configured" }, 500, c.headers);

    let payload;
    try { payload = await request.json(); } catch { return json({ error: "Invalid request" }, 400, c.headers); }
    const items = payload && payload.items;
    if (!Array.isArray(items) || items.length === 0 || items.length > MAX_LINES) {
      return json({ error: "Your bag is empty or too large" }, 400, c.headers);
    }

    // Prices come ONLY from the server-side catalog; client-sent prices are ignored.
    const params = new URLSearchParams();
    let i = 0;
    for (const it of items) {
      const product = CATALOG[it && it.id];
      const cents = product && Object.prototype.hasOwnProperty.call(product.sizes, it.size) ? product.sizes[it.size] : undefined;
      const qty = it && it.qty;
      if (cents === undefined || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
        return json({ error: "An item in your bag is no longer available" }, 400, c.headers);
      }
      if (product.soldOut.includes(it.size)) {
        return json({ error: `${product.name} (${it.size}) is sold out` }, 400, c.headers);
      }
      const p = `line_items[${i}]`;
      params.set(`${p}[quantity]`, String(qty));
      params.set(`${p}[price_data][currency]`, "usd");
      params.set(`${p}[price_data][unit_amount]`, String(cents));
      params.set(`${p}[price_data][product_data][name]`, `${product.name} (${it.size})`);
      i++;
    }

    const site = env.SITE_URL || "https://queenesheirr.com";
    const shipping = parseInt(env.SHIPPING_CENTS || "1000", 10);
    params.set("mode", "payment");
    params.set("success_url", `${site}/order-confirmed/?session_id={CHECKOUT_SESSION_ID}`);
    params.set("cancel_url", `${site}/shop/`);
    params.set("shipping_address_collection[allowed_countries][0]", "US");
    params.set("phone_number_collection[enabled]", "true");
    params.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    params.set("shipping_options[0][shipping_rate_data][display_name]", "Flat-rate shipping");
    params.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(shipping));
    params.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "usd");
    // Uncomment once Stripe Tax is set up in the dashboard:
    // params.set("automatic_tax[enabled]", "true");

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const data = await res.json();
    if (!res.ok || !data.url) {
      console.log("Stripe error", res.status, JSON.stringify(data.error || {}));
      return json({ error: "Could not start checkout" }, 502, c.headers);
    }
    return json({ url: data.url }, 200, c.headers);
  },
};
