// Client admin API + app. Same-origin only (served by this Worker). Login: emailed 6-digit code.
// Needs: KV binding ADMIN_KV; secrets SESSION_SECRET, MAIL_SECRET; var ADMIN_EMAILS; var MAIL_URL (Apps Script web app URL).
import UI from "./admin-ui.js";

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

const okImage = (u) => typeof u === "string" && /^https:\/\/(files\.stripe\.com|queenesheirr\.com)\/[^\s]+$/.test(u);
const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
const cents = (d) => { const n = Math.round(parseFloat(d) * 100); return Number.isFinite(n) && n >= 50 && n <= 1000000 ? n : null; };
const stockVal = (v) => (v === null || v === "" || v === undefined ? null : Number.isInteger(+v) && +v >= 0 && +v <= 100000 ? +v : NaN);

export async function handleAdmin(request, env, url, d) {
  const { stripeGet, stripePost, stockOf } = d;
  const path = url.pathname;
  if (path === "/admin" || path === "/admin/") {
    return new Response(UI, { headers: {
      "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY", "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    } });
  }
  if (!path.startsWith("/admin/api/")) return null;
  const route = path.slice(11);
  if (request.method === "POST" && route === "login") return login(request, env);
  if (request.method === "POST" && route === "verify") return verify(request, env);
  const me = await session(request, env);
  if (!me) return j({ error: "Please sign in" }, 401);

  const imgBad = (b) => b && b.image && !okImage(b.image);
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
        id: p.id, name: p.name, active, category: (p.metadata && p.metadata.category) || "Jams", description: p.description || "",
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
      if (okImage(body.image)) q.set("images[0]", body.image);
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
      if (okImage(body.image)) q.set("images[0]", body.image);
      await stripePost(env, "/products", q);
      for (const s of parsed) {
        const pq = new URLSearchParams({ product: id, currency: "usd", unit_amount: String(s.c), nickname: s.label });
        if (s.s !== null) pq.set("metadata[stock]", String(s.s));
        await stripePost(env, "/prices", pq);
      }
      return j({ ok: true, id });
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
    if (route === "orders" && request.method === "GET") {
      const [res, raw] = await Promise.all([
        stripeGet(env, "/checkout/sessions?limit=60&expand[]=data.line_items"),
        env.ADMIN_KV.get("orderstatus"),
      ]);
      const st = raw ? JSON.parse(raw) : {};
      const orders = res.data.filter((s) => s.payment_status === "paid" && !(s.metadata && s.metadata.kind === "class")).map((s) => {
        const ship = s.shipping_details || (s.collected_information && s.collected_information.shipping_details) || null;
        return {
          id: s.id, created: s.created * 1000, total: s.amount_total, status: st[s.id] || "new",
          name: (s.customer_details && s.customer_details.name) || "", email: (s.customer_details && s.customer_details.email) || "",
          phone: (s.customer_details && s.customer_details.phone) || "",
          fulfillment: (s.metadata && s.metadata.fulfillment) || "ship", event: (s.metadata && s.metadata.event) || "",
          address: ship && ship.address ? [ship.address.line1, ship.address.line2, ship.address.city, ship.address.state, ship.address.postal_code].filter(Boolean).join(", ") : "",
          items: ((s.line_items && s.line_items.data) || []).map((l) => ({ name: l.description, qty: l.quantity })),
        };
      });
      return j({ orders });
    }
    if (route === "order-status" && request.method === "POST") {
      if (!/^cs_[A-Za-z0-9_]+$/.test(body.id || "") || !STATUSES.includes(body.status)) return j({ error: "Bad request" }, 400);
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
