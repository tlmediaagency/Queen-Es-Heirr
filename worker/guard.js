// Abuse protection for the public Worker routes. Three layers, cheapest first:
//   1. In-memory counters (free, no storage writes) blunt floods from one address right at the edge.
//   2. Per-address hourly caps in KV on the routes that cost money or send email.
//   3. A shared hourly cap per route, so a flood from thousands of addresses still cannot run up Stripe, Shippo or email use.
// If Cloudflare's Rate Limiting binding named RATE_LIMITER is ever added, it is used as an extra layer automatically.
const mem = new Map();
export const clientIp = (request) => request.headers.get("CF-Connecting-IP") || "unknown";

// Per-isolate sliding counter. Returns true when the caller is over the limit.
export function memOver(key, max, windowMs) {
  const now = Date.now();
  if (mem.size > 4000) for (const [k, v] of mem) if (v.t < now) mem.delete(k);
  let e = mem.get(key);
  if (!e || e.t < now) { e = { n: 0, t: now + windowMs }; mem.set(key, e); }
  e.n += 1;
  return e.n > max;
}

// KV fixed-window counter. Fails open if storage hiccups, so shoppers are never blocked by our own outage.
async function kvOver(env, key, max, windowSec) {
  if (!env.ADMIN_KV) return false;
  try {
    const k = `rl:g:${key}:${Math.floor(Date.now() / (windowSec * 1000))}`;
    const n = parseInt((await env.ADMIN_KV.get(k)) || "0", 10);
    if (n >= max) return true;
    await env.ADMIN_KV.put(k, String(n + 1), { expirationTtl: Math.max(60, windowSec + 60) });
  } catch { /* fail open */ }
  return false;
}

// Constant-time string compare for secrets and tokens.
export function safeEqual(a, b) {
  a = String(a || ""); b = String(b || "");
  let d = a.length ^ b.length;
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0;
}

// Routes that spend money, call paid APIs or send email: [per-address cap, shared cap], both per hour.
const COSTLY = {
  "POST /checkout": [30, 400],
  "POST /class-checkout": [20, 200],
  "POST /class-request": [6, 80],
  "POST /wholesale-request": [6, 80],
  "POST /ship-quote": [40, 600],
  "POST /discount-preview": [60, 800],
  "POST /admin/api/login": [10, 200],
  "POST /admin/api/verify": [30, 600],
};
// Public JSON routes should never need a large body.
const SMALL_BODY = new Set(["/checkout", "/class-checkout", "/class-request", "/wholesale-request", "/ship-quote", "/discount-preview", "/admin/api/login", "/admin/api/verify"]);
const NO_LIMIT = new Set(["/stripe-webhook", "/shippo-webhook"]);   // signed machine-to-machine calls

export async function guard(request, env, url, corsHeaders) {
  const path = url.pathname, method = request.method;
  const reply = (status, msg, extra = {}) => new Response(JSON.stringify({ error: msg }), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...corsHeaders, ...extra } });
  if (!["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"].includes(method)) return reply(405, "Method not allowed");
  if (NO_LIMIT.has(path) || method === "OPTIONS") return null;
  const ip = clientIp(request);
  // Layer 1: everything, per address. Generous for browsing, tighter for anything that writes.
  if (memOver(`all:${ip}`, 300, 60000)) return reply(429, "Too many requests. Please slow down and try again in a minute.", { "Retry-After": "60" });
  if (method !== "GET" && method !== "HEAD" && memOver(`w:${ip}`, 40, 60000)) return reply(429, "Too many requests. Please slow down and try again in a minute.", { "Retry-After": "60" });
  if (env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === "function") {
    try { const r = await env.RATE_LIMITER.limit({ key: ip }); if (r && r.success === false) return reply(429, "Too many requests. Please try again in a minute.", { "Retry-After": "60" }); } catch { /* optional layer */ }
  }
  // Body size: reject oversized bodies on small public routes before reading them.
  if (method === "POST" && SMALL_BODY.has(path)) {
    const len = parseInt(request.headers.get("Content-Length") || "0", 10);
    if (len > 100000) return reply(413, "That request is too large.");
  }
  // Layers 2 and 3: costly routes.
  const rule = COSTLY[`${method} ${path}`];
  if (rule) {
    const bucket = path.replace(/[^a-z]+/g, "-");
    if (await kvOver(env, `${bucket}:ip:${ip}`, rule[0], 3600)) return reply(429, "Too many attempts from your connection. Please wait a little while and try again.", { "Retry-After": "900" });
    if (await kvOver(env, `${bucket}:all`, rule[1], 3600)) return reply(503, "We are very busy right now. Please try again in a little while.", { "Retry-After": "900" });
  }
  return null;
}
