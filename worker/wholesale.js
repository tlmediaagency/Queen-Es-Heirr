// Wholesale refill portal. Approved vendors sign in with an emailed code, send a refill request and get an instant
// quote. LyKinda is notified, adjusts the order and sets a drop-off date, the vendor approves (and pays by card, or
// pays at drop-off), and she marks it delivered and paid.
// KV: "wsvendors" (approved vendors), "wsorders" (all refill orders).

const FOREST = "#1b3b22", GOLD = "#d4af37", CREAM = "#fcfaf7", INK = "#0e2012", LINEN = "#e5dbd1";
const SERIF = "Georgia,'Times New Roman',serif", SANS = "Helvetica,Arial,sans-serif";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ID_RE = /^[a-f0-9]{12}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const OFF_CENTS = 200;               // wholesale = retail less $2.00 per jar (same rule as the wholesale quote form)
const MAX_LINES = 40, MAX_QTY = 500, MAX_ORDERS = 400, SESSION_MS = 12 * 3600 * 1000;
const STATUS_TEXT = { requested: "Request received", confirmed: "Quote ready to approve", approved: "Approved", delivered: "Delivered", cancelled: "Cancelled" };

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const money = (c) => "$" + (c / 100).toFixed(2);
const todayCentral = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
const dayFmt = (d) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" });
const adminEmails = (env) => String(env.ADMIN_EMAILS || "").split(",").map((s) => s.trim()).filter((e) => EMAIL_RE.test(e)).slice(0, 5);
const wholesaleCents = (retail) => Math.max(100, retail - OFF_CENTS);
const total = (lines) => lines.reduce((t, l) => t + l.qty * l.unitCents, 0);

async function hmac(secret, msg) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg))))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
const same = (a, b) => { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };
const b64u = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));

async function readList(env, key) { try { const a = JSON.parse((await env.ADMIN_KV.get(key)) || "[]"); return Array.isArray(a) ? a : []; } catch { return []; } }
const writeList = (env, key, list) => env.ADMIN_KV.put(key, JSON.stringify(list));
const newId = () => { const b = new Uint8Array(6); crypto.getRandomValues(b); return Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join(""); };

// ---- email -----------------------------------------------------------------------------------------
function frame(title, inner, site) {
  return `<!doctype html><html><body style="margin:0;background:${CREAM}"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM}"><tr><td align="center" style="padding:24px 12px">` +
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${LINEN};border-radius:18px;overflow:hidden">` +
    `<tr><td align="center" style="background:${FOREST};padding:24px"><a href="${site}" style="font:700 26px ${SERIF};color:#fff;text-decoration:none">Queen E's Heirr</a></td></tr><tr><td style="height:5px;background:${GOLD};line-height:5px;font-size:0">&nbsp;</td></tr>` +
    `<tr><td style="padding:30px 28px 18px"><h1 style="font:700 26px/1.2 ${SERIF};color:${FOREST};margin:0 0 18px">${esc(title)}</h1>${inner}</td></tr>` +
    `<tr><td align="center" style="background:${FOREST};padding:16px 24px;font:12px/1.7 ${SANS};color:#cfd8cd">Queen E's Heirr Wholesale &middot; <a href="${site}" style="color:${GOLD}">queenesheirr.com</a></td></tr></table></td></tr></table></body></html>`;
}
const P = (t) => `<p style="font:16px/1.65 ${SANS};color:${INK};margin:0 0 14px">${t}</p>`;
const btn = (href, label) => `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:6px 0 18px"><tr><td style="background:${FOREST};border:2px solid ${GOLD};border-radius:999px"><a href="${esc(href)}" style="display:inline-block;padding:13px 30px;font:700 14px ${SANS};letter-spacing:.06em;text-transform:uppercase;color:#fff;text-decoration:none">${esc(label)}</a></td></tr></table>`;
function table(lines) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 14px;font:15px/1.5 ${SANS};color:${INK}">` +
    lines.map((l) => `<tr><td style="padding:7px 0;border-bottom:1px solid ${LINEN}">${l.qty} x ${esc(l.name)}</td><td align="right" style="padding:7px 0;border-bottom:1px solid ${LINEN}">${money(l.qty * l.unitCents)}</td></tr>`).join("") +
    `<tr><td style="padding:9px 0;font-weight:700">Total</td><td align="right" style="padding:9px 0;font-weight:700">${money(total(lines))}</td></tr></table>`;
}
const textLines = (lines) => lines.map((l) => `${l.qty} x ${l.name} - ${money(l.qty * l.unitCents)}`).join("\n") + `\nTotal: ${money(total(lines))}`;

export function buildWsEmail(kind, o, ctx) {
  const site = ctx.site, link = `${site}/wholesale/portal/?order=${o.id}`, first = String(o.contact || o.business || "").split(/\s+/)[0] || "there";
  const when = o.dropoff ? dayFmt(o.dropoff) : "";
  let title, subject, body, text;
  if (kind === "received") {
    title = "We got your refill request";
    subject = "Your wholesale refill request - Queen E's Heirr";
    body = P(`Hi ${esc(first)},`) + P("Thank you! Here is your request with an instant quote. LyKinda will review it, confirm availability, and send you a final quote with a drop-off date to approve.") + table(o.lines) +
      P("Prices are wholesale (retail less $2.00 per jar), before any adjustments.") + btn(link, "View my request");
    text = `Hi ${first},\n\nThank you! Your refill request:\n${textLines(o.lines)}\n\nLyKinda will review it and send a final quote with a drop-off date to approve.\n${link}`;
  } else if (kind === "confirmed") {
    title = "Your quote is ready to approve";
    subject = "Your wholesale quote and drop-off date - Queen E's Heirr";
    body = P(`Hi ${esc(first)},`) + P(`Your order is confirmed for drop-off on <strong>${esc(when)}</strong>. Please review it and approve it below. You can pay by card online before the drop-off, or pay by check at drop-off.`) + table(o.lines) +
      (o.ownerNote ? P(`<em>Note from LyKinda:</em> ${esc(o.ownerNote)}`) : "") + btn(link, "Review and approve");
    text = `Hi ${first},\n\nYour order is confirmed for drop-off on ${when}.\n\n${textLines(o.lines)}\n${o.ownerNote ? "\nNote from LyKinda: " + o.ownerNote + "\n" : ""}\nReview and approve (pay by card online, or by check at drop-off):\n${link}`;
  } else if (kind === "delivered") {
    title = "Delivered, thank you!";
    subject = "Your wholesale order was delivered - Queen E's Heirr";
    body = P(`Hi ${esc(first)},`) + P("Your order has been delivered. Thank you for stocking Queen E's Heirr!") + table(o.lines) +
      (o.paid ? P(`Payment received (${esc(o.paid.method)}). Thank you!`) : P("Payment is due. Please pay by check, or approve a card payment in your portal.") + btn(link, "Open my portal"));
    text = `Hi ${first},\n\nYour order was delivered. Thank you!\n\n${textLines(o.lines)}\n${o.paid ? "Payment received." : "Payment is due. " + link}`;
  } else if (kind === "cancelled") {
    title = "Your request was cancelled";
    subject = "Your wholesale request - Queen E's Heirr";
    body = P(`Hi ${esc(first)},`) + P("Your wholesale request was cancelled. If this is a surprise, just reply to this email and we'll sort it out.") + (o.ownerNote ? P(`<em>Note:</em> ${esc(o.ownerNote)}`) : "");
    text = `Hi ${first},\n\nYour wholesale request was cancelled. Reply to this email if that's a surprise.${o.ownerNote ? "\nNote: " + o.ownerNote : ""}`;
  } else { // owner-facing
    const adminLink = `${site}`;
    const heads = { owner_new: "New wholesale refill request", owner_approved: "Wholesale order approved", owner_paid: "Wholesale order paid", owner_cancelled: "Wholesale request cancelled by vendor" };
    title = heads[kind] || "Wholesale update";
    subject = `${title}: ${o.business}`;
    const extra = kind === "owner_approved" ? P(`They chose to <strong>${o.pay === "card" ? "pay by card online" : "pay at drop-off"}</strong>. Drop-off: ${esc(when || "not set")}.`) : kind === "owner_paid" ? P(`Paid ${money(o.paid ? o.paid.amount : total(o.lines))} by card.`) : "";
    body = P(`<strong>${esc(o.business)}</strong> (${esc(o.contact || "")}, ${esc(o.vendor)}${o.phone ? ", " + esc(o.phone) : ""})`) + table(o.lines) + (o.note ? P(`<em>Their note:</em> ${esc(o.note)}`) : "") + extra +
      P(kind === "owner_new" ? "Open the admin app, go to Wholesale > Refill Orders, adjust anything that needs changing, set the drop-off date and send the quote." : "Open Wholesale > Refill Orders in the admin app.");
    text = `${title}: ${o.business}\n${o.contact || ""} ${o.vendor} ${o.phone || ""}\n\n${textLines(o.lines)}\n${o.note ? "\nTheir note: " + o.note : ""}\n${kind === "owner_approved" ? "\nPayment: " + (o.pay === "card" ? "card online" : "at drop-off") + (when ? "\nDrop-off: " + when : "") : ""}\n\nOpen Wholesale > Refill Orders in the admin app.`;
    void adminLink;
  }
  return { subject, html: frame(title, body, site), text };
}

async function sendMail(env, to, mail) {
  if (!env.MAIL_URL || !env.MAIL_SECRET) throw new Error("Email is not set up");
  if (!EMAIL_RE.test(to || "")) throw new Error("No email address");
  const res = await fetch(env.MAIL_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action: "send_html", secret: env.MAIL_SECRET, to, subject: mail.subject, html: mail.html, text: mail.text }) });
  const out = await res.json().catch(() => null);
  if (!res.ok || !out || out.ok !== true) throw new Error("The email did not send. Make sure the newest Google Apps Script version is deployed.");
}
async function notifyOwners(env, kind, o) {
  const m = buildWsEmail(kind, o, { site: env.SITE_URL || "https://queenesheirr.com" });
  for (const to of adminEmails(env)) { try { await sendMail(env, to, m); } catch (e) { console.log("wholesale owner email failed", String(e)); } }
}

// ---- pricing / catalog ----------------------------------------------------------------------------
function portalCatalog(catalog) {
  return catalog.filter((p) => !p.digital && !p.buyUrl).map((p) => ({ id: p.id, name: p.name, category: p.category, image: p.image,
    sizes: p.sizes.map((s) => ({ label: s.label, cents: wholesaleCents(s.cents), retail: s.cents, soldOut: !!s.soldOut })) }));
}
function priceLines(catalog, items, stdSize, existing) {
  if (!Array.isArray(items) || !items.length || items.length > MAX_LINES) throw new Error("Add at least one item.");
  const out = [], seen = new Set();
  for (const it of items) {
    const qty = parseInt(it && it.qty, 10);
    const p = catalog.find((x) => x.id === (it && it.id) && !x.digital && !x.buyUrl);
    const s = p && p.sizes.find((z) => z.label === stdSize(p.category, it.size));
    if (!p || !s || !(qty >= 1 && qty <= MAX_QTY)) throw new Error("One of the items is no longer available.");
    const key = p.id + "|" + s.label;
    if (seen.has(key)) throw new Error("An item appears twice. Combine the quantities.");
    seen.add(key);
    const prev = existing && existing.find((l) => l.id === p.id && l.size === s.label);
    if (!prev && s.soldOut) throw new Error(`${p.name} (${s.label}) is sold out right now.`);
    let unit = prev ? prev.unitCents : wholesaleCents(s.cents);
    if (existing && it.unitCents != null && Number.isInteger(Number(it.unitCents)) && Number(it.unitCents) >= 0 && Number(it.unitCents) <= 100000) unit = Number(it.unitCents);
    out.push({ id: p.id, size: s.label, name: `${p.name} (${s.label})`, qty, unitCents: unit });
  }
  return out;
}

// ---- vendor session ---------------------------------------------------------------------------------
async function vendorSession(request, env) {
  const h = request.headers.get("Authorization") || "";
  if (!h.startsWith("Bearer ") || !env.SESSION_SECRET) return null;
  const [p, sig] = h.slice(7).split(".");
  if (!p || !sig || !same(sig, await hmac(env.SESSION_SECRET + ":ws", p))) return null;
  try {
    const o = JSON.parse(unb64u(p));
    if (!o.v || o.exp < Date.now()) return null;
    const vendor = (await readList(env, "wsvendors")).find((v) => v.email === o.v && v.active !== false);
    return vendor || null;
  } catch { return null; }
}

// ---- public routes (/ws/...) ------------------------------------------------------------------------
export async function wholesalePublic(request, env, url, c, deps) {
  const { json, loadCatalog, stdSize, stripePost } = deps;
  const path = url.pathname;
  if (!/^\/ws\//.test(path)) return null;
  if (!c.ok) return json({ error: "Origin not allowed" }, 403, c.headers);
  if (!env.ADMIN_KV || !env.SESSION_SECRET) return json({ error: "Not set up" }, 503, c.headers);
  const site = env.SITE_URL || "https://queenesheirr.com";
  let body = {};
  if (request.method === "POST") body = await request.json().catch(() => ({}));
  try {
    if (path === "/ws/login" && request.method === "POST") {
      const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
      const ip = request.headers.get("CF-Connecting-IP") || "x";
      const hr = Math.floor(Date.now() / 3600000);
      const ipk = `rl:wsip:${ip}:${hr}`, ipn = parseInt((await env.ADMIN_KV.get(ipk)) || "0", 10);
      if (ipn >= 20) return json({ error: "Too many tries. Please wait a while." }, 429, c.headers);
      await env.ADMIN_KV.put(ipk, String(ipn + 1), { expirationTtl: 3700 });
      const vendor = EMAIL_RE.test(email) && (await readList(env, "wsvendors")).find((v) => v.email === email && v.active !== false);
      if (vendor) {
        const rl = parseInt((await env.ADMIN_KV.get("rl:ws:" + email)) || "0", 10);
        if (rl < 5) {
          await env.ADMIN_KV.put("rl:ws:" + email, String(rl + 1), { expirationTtl: 3600 });
          const n = new Uint32Array(1); crypto.getRandomValues(n);
          const code = String(n[0] % 1000000).padStart(6, "0");
          await env.ADMIN_KV.put("wsotp:" + email, JSON.stringify({ h: await hmac(env.SESSION_SECRET + ":wsotp", code + email), tries: 0 }), { expirationTtl: 600 });
          const inner = P("Your sign-in code for the wholesale portal is:") + `<p style="font:700 34px ${SERIF};letter-spacing:.2em;color:${FOREST};margin:6px 0 18px">${code}</p>` + P("It works for 10 minutes. If you didn't ask for it, you can ignore this email.");
          try { await sendMail(env, email, { subject: `Your wholesale portal code: ${code}`, html: frame("Your sign-in code", inner, site), text: `Your Queen E's Heirr wholesale portal code is ${code}. It works for 10 minutes. If you didn't ask for it, ignore this email.` }); } catch (e) { console.log("ws code email failed", String(e)); }
        }
      }
      return json({ ok: true }, 200, c.headers); // same answer for everyone
    }
    if (path === "/ws/verify" && request.method === "POST") {
      const email = String(body.email || "").trim().toLowerCase(), code = String(body.code || "").replace(/\D/g, "").slice(0, 6);
      const bad = () => json({ error: "That code did not work. Request a new one." }, 401, c.headers);
      const raw = await env.ADMIN_KV.get("wsotp:" + email);
      const vendor = (await readList(env, "wsvendors")).find((v) => v.email === email && v.active !== false);
      if (!raw || !vendor || code.length !== 6) return bad();
      const o = JSON.parse(raw);
      if (o.tries >= 5) { await env.ADMIN_KV.delete("wsotp:" + email); return bad(); }
      if (!same(o.h, await hmac(env.SESSION_SECRET + ":wsotp", code + email))) { o.tries++; await env.ADMIN_KV.put("wsotp:" + email, JSON.stringify(o), { expirationTtl: 600 }); return bad(); }
      await env.ADMIN_KV.delete("wsotp:" + email);
      const p = b64u(JSON.stringify({ v: email, exp: Date.now() + SESSION_MS }));
      return json({ token: `${p}.${await hmac(env.SESSION_SECRET + ":ws", p)}`, business: vendor.business }, 200, c.headers);
    }
    const vendor = await vendorSession(request, env);
    if (!vendor) return json({ error: "Please sign in again." }, 401, c.headers);
    const orders = await readList(env, "wsorders");
    const mine = (id) => orders.find((o) => o.id === id && o.vendor === vendor.email);
    const view = (o) => ({ id: o.id, status: o.status, statusText: STATUS_TEXT[o.status], lines: o.lines, total: total(o.lines), note: o.note, ownerNote: o.status === "requested" ? "" : o.ownerNote, dropoff: o.status === "requested" ? "" : o.dropoff, pay: o.pay, paid: !!o.paid, created: o.created });
    if (path === "/ws/me" && request.method === "GET") {
      const catalog = portalCatalog(await loadCatalog(env));
      return json({ vendor: { business: vendor.business, contact: vendor.contact, email: vendor.email }, catalog, orders: orders.filter((o) => o.vendor === vendor.email).sort((a, b) => b.created - a.created).slice(0, 30).map(view) }, 200, { ...c.headers, "Cache-Control": "no-store" });
    }
    if (path === "/ws/order" && request.method === "POST") {
      if (orders.filter((o) => o.vendor === vendor.email && o.status === "requested").length >= 5) return json({ error: "You already have several open requests. We'll be in touch on those first." }, 400, c.headers);
      const catalog = await loadCatalog(env);
      const lines = priceLines(catalog, body.items, stdSize, null);
      const o = { id: newId(), vendor: vendor.email, business: vendor.business, contact: vendor.contact, phone: vendor.phone || "", lines, note: one(body.note, 500), ownerNote: "", dropoff: "", status: "requested", pay: "", paid: null, created: Date.now(), updated: Date.now() };
      orders.push(o);
      await writeList(env, "wsorders", orders.slice(-MAX_ORDERS));
      try { await sendMail(env, vendor.email, buildWsEmail("received", o, { site })); } catch (e) { console.log("ws received email failed", String(e)); }
      await notifyOwners(env, "owner_new", o);
      return json({ ok: true, order: view(o) }, 200, c.headers);
    }
    if ((path === "/ws/approve" || path === "/ws/pay") && request.method === "POST") {
      const o = mine(body.id);
      if (!o) return json({ error: "Order not found." }, 404, c.headers);
      if (path === "/ws/approve") {
        if (o.status !== "confirmed") return json({ error: "This quote isn't ready to approve (or was already approved)." }, 400, c.headers);
        o.pay = body.pay === "card" ? "card" : "dropoff"; o.status = "approved"; o.approvedAt = Date.now(); o.updated = Date.now();
        await writeList(env, "wsorders", orders);
        await notifyOwners(env, "owner_approved", o);
      } else if (!(o.status === "approved" || o.status === "delivered") || o.paid) return json({ error: "Nothing to pay on this order." }, 400, c.headers);
      if (o.pay !== "card" && path === "/ws/approve") return json({ ok: true, order: view(o) }, 200, c.headers);
      // pay by card: Stripe Checkout for exactly the approved lines (no tax, no shipping: wholesale drop-off)
      const q = new URLSearchParams({ mode: "payment", customer_email: o.vendor, success_url: `${site}/wholesale/portal/?paid=${o.id}`, cancel_url: `${site}/wholesale/portal/?order=${o.id}`,
        "metadata[kind]": "ws_order", "metadata[ws_order]": o.id, "payment_intent_data[description]": `Wholesale order - ${o.business}`.slice(0, 200) });
      o.lines.forEach((l, i) => {
        q.set(`line_items[${i}][price_data][currency]`, "usd"); q.set(`line_items[${i}][price_data][unit_amount]`, String(l.unitCents));
        q.set(`line_items[${i}][price_data][product_data][name]`, l.name.slice(0, 120)); q.set(`line_items[${i}][quantity]`, String(l.qty));
      });
      const s = await stripePost(env, "/checkout/sessions", q);
      if (!s.url) return json({ error: "Could not start the card payment." }, 502, c.headers);
      return json({ ok: true, url: s.url, order: view(o) }, 200, c.headers);
    }
    if (path === "/ws/cancel" && request.method === "POST") {
      const o = mine(body.id);
      if (!o || !(o.status === "requested" || o.status === "confirmed")) return json({ error: "That order can't be cancelled here. Please contact us." }, 400, c.headers);
      o.status = "cancelled"; o.updated = Date.now();
      await writeList(env, "wsorders", orders);
      await notifyOwners(env, "owner_cancelled", o);
      return json({ ok: true, order: view(o) }, 200, c.headers);
    }
    return json({ error: "Not found" }, 404, c.headers);
  } catch (e) {
    return json({ error: e.message || "Something went wrong" }, 400, c.headers);
  }
}

// Stripe webhook: a vendor paid by card.
export async function wsPaid(env, session) {
  const id = session.metadata && session.metadata.ws_order;
  if (!ID_RE.test(id || "")) return;
  const orders = await readList(env, "wsorders");
  const o = orders.find((x) => x.id === id);
  if (!o || o.paid) return;
  o.paid = { method: "card", at: Date.now(), amount: session.amount_total || total(o.lines) }; o.updated = Date.now();
  await writeList(env, "wsorders", orders);
  await notifyOwners(env, "owner_paid", o);
}

// ---- admin routes ------------------------------------------------------------------------------------
export async function wholesaleAdminRoute(route, method, body, env, me, deps, j) {
  if (!/^ws-[a-z-]+$/.test(route)) return null;
  const { loadCatalog, stdSize } = deps;
  const site = env.SITE_URL || "https://queenesheirr.com";
  try {
    if (route === "ws-vendors" && method === "GET") return j({ vendors: await readList(env, "wsvendors") });
    if (route === "ws-vendor" && method === "POST") {
      let vendors = await readList(env, "wsvendors");
      const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
      if (!EMAIL_RE.test(email)) return j({ error: "That email address does not look right." }, 400);
      if (body.op === "delete") { vendors = vendors.filter((v) => v.email !== email); await writeList(env, "wsvendors", vendors); return j({ ok: true, vendors }); }
      const business = one(body.business, 100);
      if (!business) return j({ error: "Add the business name." }, 400);
      const rec = { email, business, contact: one(body.contact, 100), phone: one(body.phone, 40), active: body.active !== false, added: Date.now() };
      const i = vendors.findIndex((v) => v.email === email);
      if (i >= 0) vendors[i] = { ...vendors[i], ...rec, added: vendors[i].added }; else { if (vendors.length >= 200) return j({ error: "That is the maximum number of vendors." }, 400); vendors.push(rec); }
      await writeList(env, "wsvendors", vendors);
      return j({ ok: true, vendors });
    }
    if (route === "ws-orders" && method === "GET") {
      const orders = (await readList(env, "wsorders")).sort((a, b) => b.created - a.created).map((o) => ({ ...o, total: total(o.lines) }));
      const catalog = (await loadCatalog(env)).filter((p) => !p.digital && !p.buyUrl).map((p) => ({ id: p.id, name: p.name, category: p.category, sizes: p.sizes.map((s) => ({ label: s.label, cents: wholesaleCents(s.cents) })) }));
      return j({ orders, catalog, today: todayCentral() });
    }
    if (route === "ws-order" && method === "POST") {
      const orders = await readList(env, "wsorders");
      const o = orders.find((x) => x.id === body.id && ID_RE.test(body.id || ""));
      if (!o) return j({ error: "That order no longer exists." }, 404);
      const action = ["save", "confirm", "delivered", "paid", "cancel", "reopen"].includes(body.action) ? body.action : "save";
      const open = o.status === "requested" || o.status === "confirmed" || o.status === "approved";
      if (Array.isArray(body.lines)) {
        if (!open) return j({ error: "This order is closed, so it can't be edited." }, 400);
        const next = priceLines(await loadCatalog(env), body.lines, stdSize, o.lines);
        const changed = JSON.stringify(next.map((l) => [l.id, l.size, l.qty, l.unitCents])) !== JSON.stringify(o.lines.map((l) => [l.id, l.size, l.qty, l.unitCents]));
        if (changed && o.paid) return j({ error: "This order was already paid by card, so the items can't change. Make a note or refund in Stripe." }, 400);
        if (changed && o.status !== "requested") { o.status = "requested"; o.pay = ""; }
        o.lines = next;
      }
      if (typeof body.dropoff === "string") {
        if (body.dropoff && !DATE_RE.test(body.dropoff)) return j({ error: "Pick a valid drop-off date." }, 400);
        o.dropoff = body.dropoff;
      }
      if (typeof body.ownerNote === "string") o.ownerNote = one(body.ownerNote, 500);
      const ctx = { site };
      let emailed = false, emailError = "";
      const mailVendor = async (kind) => { try { await sendMail(env, o.vendor, buildWsEmail(kind, o, ctx)); emailed = true; } catch (e) { emailError = e.message; } };
      if (action === "confirm") {
        if (!(o.status === "requested" || o.status === "confirmed")) return j({ error: "This order is already approved or closed." }, 400);
        if (!DATE_RE.test(o.dropoff || "") || o.dropoff < todayCentral()) return j({ error: "Set a drop-off date (today or later) before sending the quote." }, 400);
        if (!o.lines.length) return j({ error: "Add at least one item." }, 400);
        o.status = "confirmed"; o.confirmedAt = Date.now();
        await mailVendor("confirmed");
      } else if (action === "delivered") {
        if (!(o.status === "approved" || o.status === "confirmed")) return j({ error: "Only an approved order can be marked delivered." }, 400);
        o.status = "delivered"; o.deliveredAt = Date.now();
        if (body.email !== false) await mailVendor("delivered");
      } else if (action === "paid") {
        if (o.status === "cancelled") return j({ error: "This order was cancelled." }, 400);
        const m = ["check", "cash", "card", "other"].includes(body.paidMethod) ? body.paidMethod : "check";
        o.paid = { method: m, at: Date.now(), amount: total(o.lines) };
      } else if (action === "cancel") {
        if (o.status === "delivered") return j({ error: "A delivered order can't be cancelled." }, 400);
        o.status = "cancelled"; if (body.email === true) await mailVendor("cancelled");
      } else if (action === "reopen") {
        if (o.status !== "cancelled") return j({ error: "Only a cancelled order can be reopened." }, 400);
        o.status = "requested";
      }
      o.updated = Date.now();
      await writeList(env, "wsorders", orders);
      return j({ ok: true, order: { ...o, total: total(o.lines) }, emailed, emailError });
    }
    return j({ error: "Not found" }, 404);
  } catch (e) { return j({ error: e.message || "Something went wrong" }, 400); }
}
