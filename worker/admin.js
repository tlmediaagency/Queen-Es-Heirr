// Client admin API + app. Same-origin only (served by this Worker). Login: emailed 6-digit code.
// Needs: KV binding ADMIN_KV; secrets SESSION_SECRET, MAIL_SECRET; var ADMIN_EMAILS; var MAIL_URL (Apps Script web app URL).
import UI from "./admin-ui.js";
import { adminClasses, cleanClasses, adminBookings, readClasses, readBookings } from "./classes.js";
import { ICON_192, ICON_512 } from "./admin-icons.js";

const enc = new TextEncoder();
const STATUSES = ["new", "in_production", "ready", "fulfilled"];
const SESSION_MS = 12 * 3600 * 1000;

const j = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra } });

function b64u(bytes) { return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function b64uStr(s) { return b64u(enc.encode(s)); }
function unb64uStr(s) { return atob(s.replace(/-/g, "+").replace(/_/g, "/")); }

async function hmac(secret, msg) {
  const k = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64u(await crypto.subtle.sign("HMAC", k, enc.encode(msg)));
}
function same(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
const emails = (env) => (env.ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

export function todayCentral() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date()); // YYYY-MM-DD
}

export async function readEvents(env) {
  if (!env.ADMIN_KV) return [];
  try { return JSON.parse((await env.ADMIN_KV.get("events")) || "[]"); } catch { return []; }
}
export function upcoming(events) {
  const t = todayCentral();
  return events
    .filter((e) => e.show !== false && e.date >= t && (!e.orderBy || e.orderBy >= t))
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({ id: e.id, name: e.name, date: e.date, location: e.location || "" }));
}

async function session(request, env) {
  const h = request.headers.get("Authorization") || "";
  if (!h.startsWith("Bearer ") || !env.SESSION_SECRET) return null;
  const [p, sig] = h.slice(7).split(".");
  if (!p || !sig || !same(sig, await hmac(env.SESSION_SECRET, p))) return null;
  try {
    const o = JSON.parse(unb64uStr(p));
    if (o.exp < Date.now() || !emails(env).includes(o.e)) return null;
    return o;
  } catch { return null; }
}

async function sendCode(env, to, code) {
  const res = await fetch(env.MAIL_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "send_code", secret: env.MAIL_SECRET, to, code }),
  });
  if (!res.ok) throw new Error("mail " + res.status);
}

async function login(request, env) {
  if (!env.ADMIN_KV || !env.SESSION_SECRET || !env.MAIL_URL || !env.MAIL_SECRET) return j({ error: "Admin is not set up yet" }, 503);
  let b; try { b = await request.json(); } catch { return j({ error: "Bad request" }, 400); }
  const email = String(b.email || "").trim().toLowerCase().slice(0, 200);
  if (emails(env).includes(email)) {
    const rl = parseInt((await env.ADMIN_KV.get("rl:" + email)) || "0", 10);
    if (rl < 5) {
      await env.ADMIN_KV.put("rl:" + email, String(rl + 1), { expirationTtl: 3600 });
      const n = new Uint32Array(1); crypto.getRandomValues(n);
      const code = String(n[0] % 1000000).padStart(6, "0");
      await env.ADMIN_KV.put("otp:" + email, JSON.stringify({ h: await hmac(env.SESSION_SECRET, code + email), tries: 0 }), { expirationTtl: 600 });
      try { await sendCode(env, email, code); } catch (e) { console.log("send code failed", String(e)); }
    }
  }
  return j({ ok: true }); // same answer for everyone: never reveals who is allowed
}

async function verify(request, env) {
  let b; try { b = await request.json(); } catch { return j({ error: "Bad request" }, 400); }
  const email = String(b.email || "").trim().toLowerCase();
  const code = String(b.code || "").replace(/\D/g, "").slice(0, 6);
  const raw = env.ADMIN_KV && (await env.ADMIN_KV.get("otp:" + email));
  const bad = () => j({ error: "That code did not work. Request a new one." }, 401);
  if (!raw || !emails(env).includes(email) || code.length !== 6) return bad();
  const o = JSON.parse(raw);
  if (o.tries >= 5) { await env.ADMIN_KV.delete("otp:" + email); return bad(); }
  if (!same(o.h, await hmac(env.SESSION_SECRET, code + email))) {
    o.tries += 1;
    await env.ADMIN_KV.put("otp:" + email, JSON.stringify(o), { expirationTtl: 600 });
    return bad();
  }
  await env.ADMIN_KV.delete("otp:" + email);
  const p = b64uStr(JSON.stringify({ e: email, exp: Date.now() + SESSION_MS }));
  return j({ token: `${p}.${await hmac(env.SESSION_SECRET, p)}`, email });
}

const okImage = (u, origin) => typeof u === "string" && (
  /^https:\/\/(files\.stripe\.com|queenesheirr\.com)\/[^\s]+$/.test(u) ||
  (typeof origin === "string" && u.startsWith(origin + "/img/") && /^\/img\/[a-f0-9]{16,32}\.jpg$/.test(u.slice(origin.length)))
);
const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
const cents = (d) => { const n = Math.round(parseFloat(d) * 100); return Number.isFinite(n) && n >= 50 && n <= 1000000 ? n : null; };
const stockVal = (v) => (v === null || v === "" || v === undefined ? null : Number.isInteger(+v) && +v >= 0 && +v <= 100000 ? +v : NaN);

function isOurQuote(q) { return !!(q && q.metadata && String(q.metadata.source || "").startsWith("queenesheirr.com class request")); }

export async function handleAdmin(request, env, url, d) {
  const { stripeGet, stripePost, stockOf, loadCatalog, posCheckout, posCash } = d;
  const path = url.pathname;
  if (path === "/admin" || path === "/admin/") {
    return new Response(UI, { headers: {
      "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY", "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; manifest-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    } });
  }
  if (path === "/admin/thanks") {
    const cancelled = url.searchParams.get("cancelled") === "1";
    const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${cancelled ? "Payment cancelled" : "Thank you"}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fcfaf7;color:#0e2012;font:400 18px/1.5 Georgia,serif;text-align:center;padding:24px}main{max-width:460px}img{width:96px;height:96px;border-radius:50%}h1{color:#1b3b22;font-size:2.2rem;margin:.6em 0 .2em}p{color:#5c6b5a}a{display:inline-block;margin-top:18px;padding:14px 26px;border-radius:99px;background:#1b3b22;color:#f7f1d8;text-decoration:none;font:600 14px/1 sans-serif;letter-spacing:.1em;text-transform:uppercase}</style></head>
<body><main><img src="/admin/icon-192.png" alt=""><h1>${cancelled ? "No payment was taken" : "Thank you!"}</h1><p>${cancelled ? "Nothing was charged. You can close this window and try again." : "Your payment went through and a receipt is on its way to your email. Enjoy your jars!"}</p><p>If this is a window on top of the sales screen, tap <b>Done</b> to go back.</p><a href="/admin">Back to the sale</a></main></body></html>`;
    return new Response(page, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY", "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'" } });
  }
  if (path === "/admin/manifest.webmanifest") {
    return new Response(JSON.stringify({
      name: "Queen E's Heirr Shop Admin Portal", short_name: "QE Admin", start_url: "/admin", scope: "/admin", display: "standalone",
      background_color: "#fcfaf7", theme_color: "#1b3b22",
      icons: [{ src: "/admin/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/admin/icon-512.png", sizes: "512x512", type: "image/png" }],
    }), { headers: { "Content-Type": "application/manifest+json", "Cache-Control": "public, max-age=3600" } });
  }
  if (path === "/admin/icon-192.png" || path === "/admin/icon-512.png") {
    const bytes = Uint8Array.from(atob(path.includes("192") ? ICON_192 : ICON_512), (ch) => ch.charCodeAt(0));
    return new Response(bytes, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
  }
  if (!path.startsWith("/admin/api/")) return null;
  const route = path.slice(11);
  if (request.method === "POST" && route === "login") return login(request, env);
  if (request.method === "POST" && route === "verify") return verify(request, env);
  const me = await session(request, env);
  if (!me) return j({ error: "Please sign in" }, 401);

  const imgBad = (b) => b && b.image && !okImage(b.image, url.origin);
  const body = request.method === "POST" || request.method === "PUT" ? await request.json().catch(() => ({})) : {};

  try {
    if (route === "products" && request.method === "GET") {
      const [pa, ph, pr] = await Promise.all([
        stripeGet(env, "/products?active=true&limit=100"),
        stripeGet(env, "/products?active=false&limit=100"),
        stripeGet(env, "/prices?active=true&limit=100&type=one_time"),
      ]);
      const by = {};
      for (const x of pr.data) (by[typeof x.product === "string" ? x.product : x.product.id] ||= []).push(x);
      const shape = (p, active) => ({
        id: p.id, name: p.name, image: (p.images && p.images[0]) || "", active, category: (p.metadata && p.metadata.category) || "Jams", description: p.description || "",
        sizes: (by[p.id] || []).map((x) => ({
          priceId: x.id, label: x.nickname || "Regular", cents: x.unit_amount, stock: stockOf(x),
          soldOut: (x.metadata && x.metadata.sold_out) === "true",
        })).sort((a, b) => a.cents - b.cents),
      });
      const keep = (p) => !(p.metadata && p.metadata.kind === "class");
      return j({
        products: pa.data.filter(keep).map((p) => shape(p, true)).sort((a, b) => a.name.localeCompare(b.name)),
        hidden: ph.data.filter(keep).map((p) => shape(p, false)),
      });
    }
    let m;
    if (imgBad(body)) return j({ error: "Photo addresses must come from Stripe (files.stripe.com) or queenesheirr.com" }, 400);
    if ((m = route.match(/^price\/(price_[A-Za-z0-9]+)$/)) && request.method === "POST") {
      const q = new URLSearchParams();
      if ("stock" in body) { const s = stockVal(body.stock); if (Number.isNaN(s)) return j({ error: "Stock must be a whole number" }, 400); q.set("metadata[stock]", s === null ? "" : String(s)); }
      if ("soldOut" in body) q.set("metadata[sold_out]", body.soldOut ? "true" : "false");
      if (![...q.keys()].length) return j({ error: "Nothing to change" }, 400);
      await stripePost(env, `/prices/${m[1]}`, q);
      return j({ ok: true });
    }
    if ((m = route.match(/^price-change\/(price_[A-Za-z0-9]+)$/)) && request.method === "POST") {
      const c = cents(body.price);
      if (c === null) return j({ error: "Enter a price like 7.00" }, 400);
      const old = await stripeGet(env, `/prices/${m[1]}`);
      const q = new URLSearchParams({ product: typeof old.product === "string" ? old.product : old.product.id, currency: "usd", unit_amount: String(c) });
      if (old.nickname) q.set("nickname", old.nickname);
      for (const [k, v] of Object.entries(old.metadata || {})) if (k === "stock" || k === "sold_out") q.set(`metadata[${k}]`, v);
      await stripePost(env, "/prices", q);
      await stripePost(env, `/prices/${old.id}`, new URLSearchParams({ active: "false" }));
      return j({ ok: true });
    }
    if ((m = route.match(/^size\/([a-z0-9-]+)$/)) && request.method === "POST") {
      const c = cents(body.price), s = stockVal(body.stock), label = String(body.label || "").trim().slice(0, 40);
      if (c === null || !label || Number.isNaN(s)) return j({ error: "Give the size a name and a price like 7.00" }, 400);
      const q = new URLSearchParams({ product: m[1], currency: "usd", unit_amount: String(c), nickname: label });
      if (s !== null) q.set("metadata[stock]", String(s));
      await stripePost(env, "/prices", q);
      return j({ ok: true });
    }
    if ((m = route.match(/^product\/([a-z0-9-]+)$/)) && request.method === "POST") {
      const q = new URLSearchParams();
      if (typeof body.name === "string" && body.name.trim()) q.set("name", body.name.trim().slice(0, 100));
      if (typeof body.description === "string") q.set("description", body.description.slice(0, 1000));
      if (body.category === "Jams" || body.category === "Pickled goods") q.set("metadata[category]", body.category);
      if (typeof body.active === "boolean") q.set("active", String(body.active));
      if (okImage(body.image, url.origin)) q.set("images[0]", body.image);
      if (![...q.keys()].length) return j({ error: "Nothing to change" }, 400);
      await stripePost(env, `/products/${m[1]}`, q);
      return j({ ok: true });
    }
    if (route === "product" && request.method === "POST") {
      const name = String(body.name || "").trim().slice(0, 100), id = slug(name);
      const sizes = Array.isArray(body.sizes) ? body.sizes.slice(0, 6) : [];
      if (!id || !sizes.length) return j({ error: "A name and at least one size are needed" }, 400);
      const parsed = sizes.map((s) => ({ label: String(s.label || "").trim().slice(0, 40), c: cents(s.price), s: stockVal(s.stock) }));
      if (parsed.some((s) => !s.label || s.c === null || Number.isNaN(s.s))) return j({ error: "Each size needs a name and a price like 7.00" }, 400);
      let exists = true;
      try { await stripeGet(env, `/products/${id}`); } catch { exists = false; }
      if (exists) return j({ error: "A product with that name already exists" }, 409);
      const q = new URLSearchParams({ id, name, description: String(body.description || "").slice(0, 1000), "metadata[category]": body.category === "Pickled goods" ? "Pickled goods" : "Jams", "metadata[sort]": "900" });
      if (okImage(body.image, url.origin)) q.set("images[0]", body.image);
      await stripePost(env, "/products", q);
      for (const s of parsed) {
        const pq = new URLSearchParams({ product: id, currency: "usd", unit_amount: String(s.c), nickname: s.label });
        if (s.s !== null) pq.set("metadata[stock]", String(s.s));
        await stripePost(env, "/prices", pq);
      }
      return j({ ok: true, id });
    }
    if (route === "image" && request.method === "POST") {
      const b64 = String(body.data || "");
      if (!/^[A-Za-z0-9+/=]+$/.test(b64) || b64.length > 900000) return j({ error: "That photo is too large. Try a smaller one." }, 400);
      const bytes = Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0));
      if (bytes.length < 1000 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) return j({ error: "Please choose a JPG or PNG photo" }, 400);
      const idb = new Uint8Array(12); crypto.getRandomValues(idb);
      const id = Array.from(idb).map((x) => x.toString(16).padStart(2, "0")).join("");
      await env.ADMIN_KV.put("img:" + id, bytes);
      return j({ ok: true, url: `${url.origin}/img/${id}.jpg` });
    }
    if (route === "events" && request.method === "GET") return j({ events: await readEvents(env) });
    if (route === "events" && request.method === "PUT") {
      const list = (Array.isArray(body.events) ? body.events : []).slice(0, 100);
      const clean = [];
      for (const e of list) {
        const name = String(e.name || "").trim().slice(0, 100), date = String(e.date || ""), orderBy = String(e.orderBy || "");
        if (!name || !/^\d{4}-\d{2}-\d{2}$/.test(date) || (orderBy && !/^\d{4}-\d{2}-\d{2}$/.test(orderBy))) return j({ error: "Each event needs a name and a date" }, 400);
        clean.push({ id: /^[a-z0-9-]{3,40}$/.test(e.id || "") ? e.id : slug(name).slice(0, 30) + "-" + date, name, date, location: String(e.location || "").trim().slice(0, 200), orderBy, show: e.show !== false });
      }
      await env.ADMIN_KV.put("events", JSON.stringify(clean));
      return j({ ok: true, events: clean });
    }
    if (route === "classes" && request.method === "GET") return j({ classes: await adminClasses(env) });
    if (route === "classes" && request.method === "PUT") {
      let clean;
      try { clean = cleanClasses(body.classes); } catch (e) { return j({ error: e.message }, 400); }
      await env.ADMIN_KV.put("classes", JSON.stringify(clean));
      return j({ ok: true, classes: await adminClasses(env) });
    }
    if (route === "bookings" && request.method === "GET") return j({ bookings: await adminBookings(env) });
    if (route === "requests" && request.method === "GET") {
      const res = await stripeGet(env, "/quotes?limit=40&expand[]=data.customer");
      const test = /^(sk|rk)_test_/.test(env.STRIPE_SECRET_KEY || "");
      const requests = res.data.filter(isOurQuote).map((q) => ({
        id: q.id, status: q.status, created: q.created * 1000, total: q.amount_total || 0,
        name: (q.customer && q.customer.name) || "", email: (q.customer && q.customer.email) || "",
        cls: (q.metadata && q.metadata.class) || q.description || "", date: (q.metadata && q.metadata.requested_date) || "",
        attendees: (q.metadata && q.metadata.attendees) || "", notes: (q.metadata && q.metadata.notes) || "", phone: (q.metadata && q.metadata.phone) || "",
        url: `https://dashboard.stripe.com/${test ? "test/" : ""}quotes/${q.id}`,
      }));
      return j({ requests });
    }
    if (route === "request-action" && request.method === "POST") {
      if (!/^qt_[A-Za-z0-9]+$/.test(body.id || "") || !["approve", "decline"].includes(body.action)) return j({ error: "Bad request" }, 400);
      const q = await stripeGet(env, `/quotes/${body.id}`);
      if (!isOurQuote(q)) return j({ error: "Not found" }, 404);
      if (q.status !== "draft") return j({ error: "That request was already handled" }, 409);
      const done = await stripePost(env, `/quotes/${body.id}/${body.action === "approve" ? "finalize" : "cancel"}`, new URLSearchParams());
      return j({ ok: true, status: done.status });
    }
    if (route === "pos-products" && request.method === "GET") return j({ products: await loadCatalog(env) });
    if (route === "pos-checkout" && request.method === "POST") {
      try { return j(await posCheckout(env, url.origin, body.items, body.location)); } catch (e) { return j({ error: String(e.message || "Could not start the payment").slice(0, 160) }, 400); }
    }
    if (route === "pos-cancel" && request.method === "POST") {
      if (!/^cs_[A-Za-z0-9_]+$/.test(body.id || "")) return j({ error: "Bad request" }, 400);
      const s = await stripeGet(env, `/checkout/sessions/${body.id}`);
      if (!s.metadata || s.metadata.fulfillment !== "inperson") return j({ error: "Not found" }, 404);
      if (s.status === "open") await stripePost(env, `/checkout/sessions/${body.id}/expire`, new URLSearchParams());
      return j({ ok: true });
    }
    if (route === "pos-cash" && request.method === "POST") {
      try { return j(await posCash(env, body.items, body.email, body.taxPct, body.key, body.name, body.location)); } catch (e) { return j({ error: String(e.message || "Could not record the sale").slice(0, 160) }, 400); }
    }
    if (route === "pos-session" && request.method === "GET") {
      const sid = url.searchParams.get("id") || "";
      if (!/^cs_[A-Za-z0-9_]+$/.test(sid)) return j({ error: "Bad request" }, 400);
      const s = await stripeGet(env, `/checkout/sessions/${sid}`);
      if (!s.metadata || s.metadata.fulfillment !== "inperson") return j({ error: "Not found" }, 404);
      return j({ paid: s.payment_status === "paid", status: s.status });
    }
    if (route === "cash-ledger" && request.method === "GET") {
      let cash = [];
      try { cash = JSON.parse((await env.ADMIN_KV.get("cashsales")) || "[]"); } catch { cash = []; }
      return j({ sales: cash.slice().reverse().map((c) => ({ id: c.id, ts: c.ts, name: c.name || "", location: c.location || "", email: c.email || "", subtotal: c.subtotal, tax: c.tax, total: c.total, rate: c.rate || 0, voided: !!c.voided,
        items: c.items.map((x) => ({ name: x.name, size: x.size, qty: x.qty, cents: x.cents })) })) });
    }
    if (route === "cash-void" && request.method === "POST") {
      if (!/^cash_[a-f0-9]+$/.test(body.id || "")) return j({ error: "Bad request" }, 400);
      let cash = [];
      try { cash = JSON.parse((await env.ADMIN_KV.get("cashsales")) || "[]"); } catch { cash = []; }
      const c = cash.find((x) => x.id === body.id);
      if (!c) return j({ error: "Not found" }, 404);
      if (c.voided) return j({ error: "That sale is already voided" }, 409);
      for (const it of c.items) {
        if (!it.priceId) continue;
        const pr = await stripeGet(env, `/prices/${it.priceId}`);
        const stock = stockOf(pr);
        if (stock === null) continue;
        await stripePost(env, `/prices/${it.priceId}`, new URLSearchParams({ "metadata[stock]": String(stock + it.qty) }));
      }
      c.voided = true; c.voidedAt = Date.now();
      await env.ADMIN_KV.put("cashsales", JSON.stringify(cash));
      return j({ ok: true });
    }
    if (route === "report" && request.method === "GET") {
      const from = url.searchParams.get("from") || "", to = url.searchParams.get("to") || "";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) return j({ error: "Choose a start and end date" }, 400);
      const fromTs = Math.floor(Date.parse(from + "T00:00:00Z") / 1000) - 86400, toTs = Math.floor(Date.parse(to + "T00:00:00Z") / 1000) + 2 * 86400;
      const chi = (ms) => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date(ms));
      const rows = [];
      const stRaw = await env.ADMIN_KV.get("orderstatus"); const st = stRaw ? JSON.parse(stRaw) : {};
      let after = "", truncated = false;
      for (let page = 0; page < 5; page++) {
        const res = await stripeGet(env, `/checkout/sessions?limit=100&created[gte]=${fromTs}&created[lte]=${toTs}&expand[]=data.line_items${after ? "&starting_after=" + after : ""}`);
        for (const s of res.data) {
          if (s.payment_status !== "paid" || (s.metadata && s.metadata.kind === "class")) continue;
          const ful = (s.metadata && s.metadata.fulfillment) || "ship";
          const ms = s.created * 1000, cd = s.customer_details || {};
          rows.push({ ts: ms, id: s.id, channel: ful === "inperson" ? "In person - Card" : ful === "event" ? "Online - Event pickup" : ful === "pickup" ? "Online - Pickup" : "Online - Ship",
            customer: cd.name || "", email: cd.email || "", location: (s.metadata && s.metadata.event) || "", status: st[s.id] || (ful === "inperson" ? "fulfilled" : "new"),
            items: ((s.line_items && s.line_items.data) || []).map((l) => `${l.quantity} x ${l.description}`).join("; "),
            subtotal: s.amount_subtotal || 0, shipping: (s.total_details && s.total_details.amount_shipping) || 0, tax: (s.total_details && s.total_details.amount_tax) || 0, total: s.amount_total || 0 });
        }
        if (!res.has_more) break;
        after = res.data[res.data.length - 1].id;
        if (page === 4) truncated = true;
      }
      let cash = [];
      try { cash = JSON.parse((await env.ADMIN_KV.get("cashsales")) || "[]"); } catch { cash = []; }
      for (const c of cash) rows.push({ ts: c.ts, id: c.id, channel: "In person - Cash", customer: c.name || "", email: c.email || "", location: c.location || "", status: c.voided ? "voided" : "fulfilled",
        items: c.items.map((x) => `${x.qty} x ${x.name} (${x.size})`).join("; "), subtotal: c.subtotal, shipping: 0, tax: c.tax, total: c.total });
      const classes = await readClasses(env), bookings = await readBookings(env);
      const byId = Object.fromEntries(classes.map((c) => [c.id, c]));
      for (const b of bookings) { const c = byId[b.classId];
        rows.push({ ts: b.ts, id: b.sid, channel: "Class booking", customer: b.name, email: b.email, location: c ? `${c.title} (${c.date})` : "", status: "paid",
          items: `${b.seats} seat(s)`, subtotal: b.cents, shipping: 0, tax: 0, total: b.cents }); }
      const out = rows.map((r) => ({ ...r, date: chi(r.ts) })).filter((r) => r.date >= from && r.date <= to).sort((x, y) => y.ts - x.ts);
      return j({ rows: out, truncated });
    }
    if (route === "orders" && request.method === "GET") {
      const [res, raw] = await Promise.all([
        stripeGet(env, "/checkout/sessions?limit=60&expand[]=data.line_items"),
        env.ADMIN_KV.get("orderstatus"),
      ]);
      const st = raw ? JSON.parse(raw) : {};
      const orders = res.data.filter((s) => s.payment_status === "paid" && !(s.metadata && s.metadata.kind === "class")).map((s) => {
        const ship = s.shipping_details || (s.collected_information && s.collected_information.shipping_details) || null;
        return {
          id: s.id, created: s.created * 1000, total: s.amount_total, status: st[s.id] || ((s.metadata && s.metadata.fulfillment) === "inperson" ? "fulfilled" : "new"),
          name: (s.customer_details && s.customer_details.name) || "", email: (s.customer_details && s.customer_details.email) || "",
          phone: (s.customer_details && s.customer_details.phone) || "",
          fulfillment: (s.metadata && s.metadata.fulfillment) || "ship", event: (s.metadata && s.metadata.event) || "",
          address: ship && ship.address ? [ship.address.line1, ship.address.line2, ship.address.city, ship.address.state, ship.address.postal_code].filter(Boolean).join(", ") : "",
          items: ((s.line_items && s.line_items.data) || []).map((l) => ({ name: l.description, qty: l.quantity })),
        };
      });
      let cash = [];
      try { cash = JSON.parse((await env.ADMIN_KV.get("cashsales")) || "[]"); } catch { cash = []; }
      for (const c of cash.slice(-80)) {
        if (c.voided) continue;
        orders.push({ id: c.id, created: c.ts, total: c.total, status: st[c.id] || "fulfilled", name: c.name || "Cash sale", email: c.email || "", phone: "", fulfillment: "inperson", cash: true, event: c.location || "", address: "",
          items: c.items.map((x) => ({ name: `${x.name} (${x.size})`, qty: x.qty })) });
      }
      orders.sort((x, y) => y.created - x.created);
      return j({ orders });
    }
    if (route === "order-status" && request.method === "POST") {
      if (!/^(cs|cash)_[A-Za-z0-9_]+$/.test(body.id || "") || !STATUSES.includes(body.status)) return j({ error: "Bad request" }, 400);
      const st = JSON.parse((await env.ADMIN_KV.get("orderstatus")) || "{}");
      st[body.id] = body.status;
      const keys = Object.keys(st);
      if (keys.length > 400) delete st[keys[0]];
      await env.ADMIN_KV.put("orderstatus", JSON.stringify(st));
      return j({ ok: true });
    }
  } catch (e) {
    console.log("admin error", route, String(e));
    return j({ error: "That did not save. Please try again." }, 502);
  }
  return j({ error: "Not found" }, 404);
}

export async function serveImage(env, id) {
  if (!env.ADMIN_KV || !/^[a-f0-9]{16,32}$/.test(id)) return new Response("Not found", { status: 404 });
  const buf = await env.ADMIN_KV.get("img:" + id, "arrayBuffer");
  if (!buf) return new Response("Not found", { status: 404 });
  return new Response(buf, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
}
