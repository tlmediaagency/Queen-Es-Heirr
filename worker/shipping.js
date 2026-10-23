// Shipping for the admin app, built on Shippo: price a package, buy a USPS label, email tracking to the customer,
// follow delivery, refund unused labels, and schedule a USPS pickup or plan a drop-off day.
// Needs the secret SHIPPO_API_KEY (use a shippo_test_ key first). Customer emails go out through the Apps Script.

const SHIPPO = "https://api.goshippo.com";
const FOREST = "#1b3b22", GOLD = "#d4af37", CREAM = "#fcfaf7", INK = "#0e2012", LINEN = "#e5dbd1";
const SERIF = "Georgia,'Times New Roman',serif", SANS = "Helvetica,Arial,sans-serif";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^cs_[A-Za-z0-9_]+$/;
const DEFAULT_WEIGHTS = { "Jams": 14, "Pickled goods": 24, "Books": 12, "Curriculum & Resources": 4 };
const FLAT = { USPS_FlatRateEnvelope: "Flat Rate Envelope", USPS_FlatRateLegalEnvelope: "Legal Flat Rate Envelope", USPS_FlatRatePaddedEnvelope: "Padded Flat Rate Envelope", USPS_SmallFlatRateBox: "Small Flat Rate Box", USPS_FlatRateMediumBox1: "Medium Flat Rate Box (top loading)", USPS_FlatRateMediumBox2: "Medium Flat Rate Box (side loading)", USPS_LargeFlatRateBox: "Large Flat Rate Box" };
export const FLAT_BOXES = FLAT;
const STATUSES = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "RETURNED", "FAILURE", "UNKNOWN"];
const LOC_TYPES = ["Front Door", "Back Door", "Side Door", "Knock on Door or Ring Bell", "Mail Room", "Office", "Reception", "In/At Mailbox", "Other"];

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const num = (v, lo, hi) => { if (v === "" || v == null) return null; const x = Number(v); return Number.isFinite(x) && x >= lo && x <= hi ? x : null; };

export const DEFAULT_SHIP = {
  from: { name: "", company: "Queen E's Heirr", street1: "", street2: "", city: "", state: "", zip: "", phone: "", email: "info@queenesheirr.com" },
  presets: [
    { id: "small", name: "Small box (1-2 jars)", length: 8, width: 6, height: 4, maxOz: 32 },
    { id: "medium", name: "Medium box (3-4 jars)", length: 10, width: 8, height: 6, maxOz: 64 },
    { id: "large", name: "Large box (6+ jars)", length: 12, width: 10, height: 8, maxOz: 160 },
    { id: "book", name: "Book mailer", length: 10, width: 7, height: 1.5 },
    { id: "flat-s", name: "USPS Small Flat Rate Box", template: "USPS_SmallFlatRateBox", length: 0, width: 0, height: 0 },
    { id: "flat-m", name: "USPS Medium Flat Rate Box", template: "USPS_FlatRateMediumBox1", length: 0, width: 0, height: 0 },
    { id: "flat-l", name: "USPS Large Flat Rate Box", template: "USPS_LargeFlatRateBox", length: 0, width: 0, height: 0 },
  ],
  packagingOz: 6,
  markupCents: 0,
  weights: DEFAULT_WEIGHTS,
  emailShipped: true,
  emailDelivered: true,
};

const ADDR_KEYS = ["name", "company", "street1", "street2", "city", "state", "zip", "phone", "email"];
function cleanAddr(f) {
  f = f && typeof f === "object" ? f : {};
  const a = { name: one(f.name, 60), company: one(f.company, 60), street1: one(f.street1, 80), street2: one(f.street2, 60), city: one(f.city, 50), state: one(f.state, 20).toUpperCase(), zip: one(f.zip, 10), phone: one(f.phone, 20), email: EMAIL_RE.test(f.email || "") ? String(f.email).trim() : "" };
  if (a.state && !/^[A-Z]{2}$/.test(a.state)) throw new Error("Use the 2-letter state, like TX.");
  if (a.zip && !/^\d{5}(-\d{4})?$/.test(a.zip)) throw new Error("The ZIP code should look like 75001.");
  return a;
}
export async function readShipSettings(env) {
  let s = {};
  try { s = JSON.parse((await env.ADMIN_KV.get("shipping")) || "{}"); } catch { s = {}; }
  if (Array.isArray(s.presets)) s.presets = s.presets.map((x) => (x.maxOz == null && !x.template ? { ...x, maxOz: (DEFAULT_SHIP.presets.find((d) => d.id === x.id) || {}).maxOz || 0 } : x));
  if (Array.isArray(s.presets) && !s.presets.some((x) => x.template)) s.presets = s.presets.concat(DEFAULT_SHIP.presets.filter((x) => x.template));
  return { ...DEFAULT_SHIP, ret: { ...(DEFAULT_SHIP.ret || {}) }, ...s, from: { ...DEFAULT_SHIP.from, ...(s.from || {}) }, weights: { ...DEFAULT_WEIGHTS, ...(s.weights || {}) } };
}

export function cleanShipSettings(b) {
  b = b && typeof b === "object" ? b : {};
  const f = b.from || {};
  const from = { name: one(f.name, 60), company: one(f.company, 60), street1: one(f.street1, 80), street2: one(f.street2, 60), city: one(f.city, 50), state: one(f.state, 20).toUpperCase(), zip: one(f.zip, 10), phone: one(f.phone, 20), email: EMAIL_RE.test(f.email || "") ? String(f.email).trim() : "" };
  if (from.state && !/^[A-Z]{2}$/.test(from.state)) throw new Error("Use the 2-letter state, like TX.");
  if (from.zip && !/^\d{5}(-\d{4})?$/.test(from.zip)) throw new Error("The ZIP code should look like 75001.");
  const presets = (Array.isArray(b.presets) ? b.presets : []).slice(0, 10).map((p, i) => {
    if (p.template && FLAT[p.template]) return { id: /^[a-z0-9-]{2,20}$/.test(p.id || "") ? p.id : "flat" + (i + 1), name: one(p.name, 40) || FLAT[p.template], template: p.template, length: 0, width: 0, height: 0 };
    const L = num(p.length, 1, 60), W = num(p.width, 1, 60), H = num(p.height, 0.1, 60);
    const name = one(p.name, 40);
    if (!name || L == null || W == null || H == null) throw new Error("Each box needs a name and its length, width and height in inches.");
    return { id: /^[a-z0-9-]{2,20}$/.test(p.id || "") ? p.id : "box" + (i + 1), name, length: L, width: W, height: H, maxOz: num(p.maxOz, 0, 1120) || 0 };
  });
  if (!presets.length) throw new Error("Keep at least one box size.");
  const weights = {};
  for (const [k, def] of Object.entries(DEFAULT_WEIGHTS)) { const w = num((b.weights || {})[k], 0, 1600); weights[k] = w == null ? def : w; }
  const ret = cleanAddr(b.ret);
  if (ret.street1 && !(ret.city && ret.state && ret.zip)) throw new Error("The return address needs a city, state and ZIP.");
  return { from, ret, presets, packagingOz: num(b.packagingOz, 0, 400) ?? 6, markupCents: Math.round((num(b.markup, 0, 50) ?? (b.markupCents / 100 || 0)) * 100) || 0, weights, emailShipped: b.emailShipped !== false, emailDelivered: b.emailDelivered !== false };
}

// ---- Shippo ------------------------------------------------------------------------------------
async function shippo(env, method, path, body) {
  if (!env.SHIPPO_API_KEY) throw new Error("Shippo is not connected yet. Add your Shippo key in Cloudflare (a secret named SHIPPO_API_KEY).");
  const res = await fetch(SHIPPO + path, { method, headers: { Authorization: "ShippoToken " + env.SHIPPO_API_KEY, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const out = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = out && (out.detail || (Array.isArray(out) && out[0] && (out[0].text || out[0])) || Object.values(out || {}).flat().map((x) => (x && x.text) || x).filter((x) => typeof x === "string")[0]);
    throw new Error("Shippo said: " + (typeof msg === "string" ? msg : "that request did not work") + ".");
  }
  return out;
}
const mode = (env) => (!env.SHIPPO_API_KEY ? "none" : /^shippo_test_/.test(env.SHIPPO_API_KEY) ? "test" : "live");

async function hmacHex(secret, msg) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg)))).map((x) => x.toString(16).padStart(2, "0")).join("");
}
export const webhookKey = async (env) => (await hmacHex(env.SESSION_SECRET || "x", "shippo-webhook")).slice(0, 32);

const addrOf = (from) => ({ name: from.name || from.company, company: from.company, street1: from.street1, street2: from.street2, city: from.city, state: from.state, zip: from.zip, country: "US", phone: from.phone, email: from.email });

// ---- orders --------------------------------------------------------------------------------------
async function loadOrder(env, deps, id) {
  if (!ID_RE.test(id || "")) throw new Error("Order not found.");
  const s = await deps.stripeGet(env, `/checkout/sessions/${id}?expand[]=line_items.data.price.product`);
  if (s.payment_status !== "paid") throw new Error("That order is not paid.");
  const sd = s.shipping_details || (s.collected_information && s.collected_information.shipping_details) || null;
  const a = sd && sd.address;
  const st = await readShipSettings(env);
  const items = ((s.line_items && s.line_items.data) || []).map((l) => {
    const p = (l.price && l.price.product && typeof l.price.product === "object") ? l.price.product : {};
    const md = p.metadata || {};
    const per = num(md.weight_oz, 0, 1600) ?? st.weights[md.category] ?? 12;
    return { name: l.description, qty: l.quantity, weightOz: per, digital: md.digital === "true" };
  });
  return {
    id: s.id, created: s.created * 1000, total: s.amount_total, fulfillment: (s.metadata && s.metadata.fulfillment) || "ship",
    shippingPaid: (s.total_details && s.total_details.amount_shipping) || (s.shipping_cost && s.shipping_cost.amount_total) || 0,
    name: (sd && sd.name) || (s.customer_details && s.customer_details.name) || "", email: (s.customer_details && s.customer_details.email) || "", phone: (s.customer_details && s.customer_details.phone) || "",
    address: a ? { street1: a.line1 || "", street2: a.line2 || "", city: a.city || "", state: a.state || "", zip: a.postal_code || "", country: a.country || "US" } : null,
    items, quotedZip: (s.metadata && s.metadata.ship_zip) || "", shipService: (s.metadata && s.metadata.ship_service) || "",
  };
}

const toShippoTo = (o) => ({ name: o.name, street1: o.address.street1, street2: o.address.street2, city: o.address.city, state: o.address.state, zip: o.address.zip, country: o.address.country, phone: o.phone, email: o.email });
const estWeight = (o, st) => Math.round(o.items.filter((i) => !i.digital).reduce((t, i) => t + i.weightOz * i.qty, 0) + st.packagingOz);

async function readRec(env, id) { try { return JSON.parse((await env.ADMIN_KV.get("ship:" + id)) || "null"); } catch { return null; } }
async function writeRec(env, rec) {
  await env.ADMIN_KV.put("ship:" + rec.id, JSON.stringify(rec));
  let list = []; try { list = JSON.parse((await env.ADMIN_KV.get("shiplist")) || "[]"); } catch { list = []; }
  if (!list.includes(rec.id)) { list.unshift(rec.id); await env.ADMIN_KV.put("shiplist", JSON.stringify(list.slice(0, 300))); }
}
async function setOrderStatus(env, id, status) {
  let st = {}; try { st = JSON.parse((await env.ADMIN_KV.get("orderstatus")) || "{}"); } catch { st = {}; }
  st[id] = status; const keys = Object.keys(st); if (keys.length > 400) delete st[keys[0]];
  await env.ADMIN_KV.put("orderstatus", JSON.stringify(st));
}

// ---- customer email ------------------------------------------------------------------------------
const dayFmt = (d) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" });
export function buildShipEmail(kind, o, rec, ctx) {
  const site = ctx.site || "https://queenesheirr.com";
  const first = String(o.name || "").trim().split(/\s+/)[0] || "";
  const title = kind === "delivered" ? "Your order was delivered" : kind === "note" ? "An update on your order" : kind === "shipdate" ? "Your order ships soon" : "Your order is on the way";
  const lead = kind === "delivered" ? "Your Queen E's Heirr order shows as delivered. We hope you love it!"
    : kind === "shipdate" ? `Your order is packed and planned to go out on ${rec.plannedDate ? dayFmt(rec.plannedDate) : "our next shipping day"}. We will email your tracking number as soon as it ships.`
      : kind === "note" ? "" : "Good news! Your Queen E's Heirr order is packed and has been handed to " + (rec.carrier || "USPS") + ".";
  const items = (o.items || []).map((i) => `${i.qty} x ${i.name}`);
  const track = rec.trackingNumber ? `${rec.carrier || "USPS"} tracking number: ${rec.trackingNumber}` : "";
  const planned = kind === "shipped" && rec.plannedDate ? `Expected to ship: ${dayFmt(rec.plannedDate)}.` : "";
  const p = (inner) => `<p style="font:16px/1.65 ${SANS};color:${INK};margin:0 0 14px">${inner}</p>`;
  const a = o.address;
  const where = a ? [a.street1, a.street2, `${a.city}, ${a.state} ${a.zip}`].filter(Boolean) : [];
  let h = p(`Hi ${esc(first || "there")},`);
  if (lead) h += p(esc(lead));
  if (rec.note) h += p(esc(rec.note).replace(/\n/g, "<br>"));
  if (planned) h += p(esc(planned));
  if (kind !== "delivered" && kind !== "shipdate" && rec.trackingNumber) {
    h += p(`${esc(track)}`);
    if (rec.trackingUrl) h += `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:6px 0 18px"><tr><td style="background:${FOREST};border:2px solid ${GOLD};border-radius:999px"><a href="${esc(rec.trackingUrl)}" style="display:inline-block;padding:13px 30px;font:700 14px ${SANS};letter-spacing:.06em;text-transform:uppercase;color:#fff;text-decoration:none">Track My Package</a></td></tr></table>`;
  }
  if (items.length) h += `<h3 style="font:700 17px ${SERIF};color:${FOREST};margin:22px 0 6px;border-top:1px solid ${LINEN};padding-top:18px">In this package</h3>` + p(items.map(esc).join("<br>"));
  if (where.length && kind !== "delivered") h += `<h3 style="font:700 17px ${SERIF};color:${FOREST};margin:18px 0 6px">Shipping to</h3>` + p(esc(o.name) + "<br>" + where.map(esc).join("<br>"));
  h += p("Questions? Just reply to this email and we will help.");
  const html = `<!doctype html><html><body style="margin:0;background:${CREAM}"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM}"><tr><td align="center" style="padding:24px 12px">` +
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${LINEN};border-radius:18px;overflow:hidden">` +
    `<tr><td align="center" style="background:${FOREST};padding:24px"><a href="${site}" style="font:700 26px ${SERIF};color:#fff;text-decoration:none">Queen E's Heirr</a></td></tr><tr><td style="height:5px;background:${GOLD};line-height:5px;font-size:0">&nbsp;</td></tr>` +
    `<tr><td style="padding:30px 28px 18px"><h1 style="font:700 26px/1.2 ${SERIF};color:${FOREST};margin:0 0 18px">${esc(title)}</h1>${h}</td></tr>` +
    `<tr><td align="center" style="background:${FOREST};padding:16px 24px;font:12px/1.7 ${SANS};color:#cfd8cd">Queen E's Heirr &middot; <a href="${site}" style="color:${GOLD}">queenesheirr.com</a></td></tr></table></td></tr></table></body></html>`;
  const text = [`${title}`, "", `Hi ${first || "there"},`, "", lead, rec.note || "", planned, track, rec.trackingUrl ? "Track it: " + rec.trackingUrl : "", "", items.length ? "In this package:\n" + items.join("\n") : "", "", "Questions? Reply to this email.", "", "Queen E's Heirr | " + site].filter((x, i, arr) => x !== "" || arr[i - 1] !== "").join("\n");
  return { subject: title + " - Queen E's Heirr", html, text };
}

export function buildQrEmail(o, rec) {
  const title = "QR code to print at USPS";
  const html = `<!doctype html><html><body style="margin:0;background:${CREAM};font:16px/1.6 ${SANS};color:${INK}"><div style="max-width:520px;margin:0 auto;padding:24px"><h2 style="font-family:${SERIF};color:${FOREST}">${title}</h2>` +
    `<p>Order for <strong>${esc(o.name)}</strong> (${esc(rec.service || "USPS")}, tracking ${esc(rec.trackingNumber)}).</p>` +
    `<p>Seal the package, then show this code on your phone at a participating Post Office. The clerk scans it and prints the label for you. Do not need a printer.</p>` +
    `<p style="text-align:center"><img src="${esc(rec.qrUrl)}" alt="QR code" width="260" height="260" style="border:1px solid ${LINEN};padding:10px;background:#fff"></p>` +
    `<p><a href="${esc(rec.qrUrl)}">Open the QR code</a></p></div></body></html>`;
  return { subject: "QR code for " + (o.name || "order") + " - Queen E's Heirr", html, text: `${title}
Order for ${o.name}. Tracking ${rec.trackingNumber}.
Show this at a participating Post Office: ${rec.qrUrl}` };
}
async function sendMail(env, to, mail) {
  if (!env.MAIL_URL || !env.MAIL_SECRET) throw new Error("Email is not set up");
  if (!EMAIL_RE.test(to || "")) throw new Error("This order has no email address to send to.");
  const res = await fetch(env.MAIL_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action: "send_html", secret: env.MAIL_SECRET, to, subject: mail.subject, html: mail.html, text: mail.text }) });
  const out = await res.json().catch(() => null);
  if (!res.ok || !out || out.ok !== true) throw new Error("The email did not send. Make sure the newest Google Apps Script version is deployed.");
}

// Central time wall clock -> UTC ISO string (handles daylight saving)
function centralToUtc(date, hhmm) {
  const [y, m, d] = date.split("-").map(Number), [hh, mm] = hhmm.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(new Date(guess));
  const g = (t) => Number(parts.find((p) => p.type === t).value);
  const asLocal = Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"));
  return new Date(guess - (asLocal - guess)).toISOString();
}
const todayCentral = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());

// ---- routes --------------------------------------------------------------------------------------
export async function shippingRoute(route, method, body, env, me, deps, j, origin) {
  if (!/^(ship-[a-z-]+)$/.test(route)) return null;
  try {
    const st = await readShipSettings(env);
    if (route === "ship-settings" && method === "GET") {
      return j({ settings: st, mode: mode(env), webhookUrl: `${origin}/shippo-webhook?k=${await webhookKey(env)}`, lastQuote: await (async () => { try { return JSON.parse((await env.ADMIN_KV.get("shipquote")) || "null"); } catch { return null; } })(), lastWebhook: await (async () => { try { return JSON.parse((await env.ADMIN_KV.get("shipwebhook")) || "null"); } catch { return null; } })(), ready: !!(st.from.street1 && st.from.city && st.from.state && st.from.zip && st.from.phone) });
    }
    if (route === "ship-settings" && method === "POST") {
      const clean = cleanShipSettings(body.settings);
      await env.ADMIN_KV.put("shipping", JSON.stringify(clean));
      return j({ ok: true, settings: { ...DEFAULT_SHIP, ...clean } });
    }
    if (route === "ship-queue" && method === "GET") {
      const res = await deps.stripeGet(env, "/checkout/sessions?limit=60&expand[]=data.line_items");
      const orders = [];
      for (const s of res.data) {
        if (s.payment_status !== "paid" || (s.metadata && s.metadata.kind === "class")) continue;
        const ful = (s.metadata && s.metadata.fulfillment) || "ship";
        if (ful !== "ship") continue;
        const rec = await readRec(env, s.id);
        if (rec && !rec.voided) continue;
        const sd = s.shipping_details || (s.collected_information && s.collected_information.shipping_details) || null;
        const a = sd && sd.address;
        orders.push({ id: s.id, created: s.created * 1000, name: (sd && sd.name) || (s.customer_details && s.customer_details.name) || "", email: (s.customer_details && s.customer_details.email) || "",
          address: a ? [a.line1, a.line2, `${a.city}, ${a.state} ${a.postal_code}`].filter(Boolean).join(", ") : "", hasAddress: !!a, country: a ? a.country : "",
          shippingPaid: (s.total_details && s.total_details.amount_shipping) || 0,
          items: ((s.line_items && s.line_items.data) || []).map((l) => ({ name: l.description, qty: l.quantity })), voidedLabel: !!(rec && rec.voided) });
      }
      return j({ orders, ready: !!(st.from.street1 && st.from.zip && st.from.phone), mode: mode(env) });
    }
    if (route === "ship-shipped" && method === "GET") {
      let ids = []; try { ids = JSON.parse((await env.ADMIN_KV.get("shiplist")) || "[]"); } catch { ids = []; }
      const out = [];
      for (const id of ids.slice(0, 80)) { const r = await readRec(env, id); if (r && !r.voided) out.push(r); }
      return j({ shipments: out });
    }
    if (route === "ship-prepare" && method === "POST") {
      const o = await loadOrder(env, deps, body.id);
      return j({ order: { id: o.id, name: o.name, email: o.email, phone: o.phone, address: o.address, items: o.items, shippingPaid: o.shippingPaid, shipService: o.shipService, zipChanged: !!(o.quotedZip && o.address && o.address.zip && o.address.zip.slice(0, 5) !== o.quotedZip) }, weightOz: estWeight(o, st), presets: st.presets, mode: mode(env), ready: !!(st.from.street1 && st.from.zip && st.from.phone) });
    }
    if (route === "ship-rates" && method === "POST") {
      if (!(st.from.street1 && st.from.city && st.from.state && st.from.zip && st.from.phone)) return j({ error: "Add your ship-from address and phone in Shipping Setup first." }, 400);
      const o = await loadOrder(env, deps, body.id);
      if (!o.address || !o.address.street1) return j({ error: "This order has no shipping address." }, 400);
      if (o.address.country && o.address.country !== "US") return j({ error: "International orders need customs forms. Please make that label in Shippo directly." }, 400);
      const pc = body.parcel || {};
      const oz = num(pc.weight, 0.1, 1120);
      let parcel;
      if (pc.template) {
        if (!FLAT[pc.template] || oz == null) return j({ error: "Pick a flat rate box and enter the weight (ounces)." }, 400);
        parcel = { template: pc.template, weight: String(oz), mass_unit: "oz" };
      } else {
        const L = num(pc.length, 0.5, 60), W = num(pc.width, 0.5, 60), H = num(pc.height, 0.1, 60);
        if (L == null || W == null || H == null || oz == null) return j({ error: "Enter the box size (inches) and the weight (ounces)." }, 400);
        parcel = { length: String(L), width: String(W), height: String(H), distance_unit: "in", weight: String(oz), mass_unit: "oz" };
      }
      const req = { address_from: addrOf(st.from), address_to: toShippoTo(o), parcels: [parcel], async: false };
      if (st.ret && st.ret.street1 && st.ret.city && st.ret.state && st.ret.zip) req.address_return = addrOf({ ...st.ret, name: st.ret.name || st.ret.company || st.from.company || st.from.name, company: st.ret.company || st.from.company, phone: st.ret.phone || st.from.phone, email: st.ret.email || st.from.email });
      if (body.qr === true) req.extra = { qr_code_requested: true };
      const sh = await shippo(env, "POST", "/shipments/", req);
      const rates = (sh.rates || []).filter((r) => String(r.provider).toUpperCase() === "USPS").map((r) => ({
        id: r.object_id, service: r.servicelevel && r.servicelevel.name, token: r.servicelevel && r.servicelevel.token, amount: Number(r.amount), currency: r.currency, days: r.estimated_days, terms: r.duration_terms || "" }))
        .sort((a, b) => a.amount - b.amount);
      const warn = (sh.messages || []).map((m) => m.text).filter(Boolean).slice(0, 3);
      if (!rates.length) return j({ error: warn[0] ? "Shippo said: " + warn[0] : "No USPS prices came back. Check the address and weight.", warnings: warn }, 400);
      return j({ rates, warnings: warn, shipmentId: sh.object_id });
    }
    if (route === "ship-buy" && method === "POST") {
      const o = await loadOrder(env, deps, body.id);
      const existing = await readRec(env, o.id);
      if (existing && !existing.voided) return j({ error: "This order already has a label." }, 400);
      if (!/^[A-Za-z0-9]{10,60}$/.test(body.rateId || "")) return j({ error: "Pick a shipping price first." }, 400);
      const plannedDate = DATE_RE.test(body.shipDate || "") ? body.shipDate : "";
      const wantQr = body.qr === true;
      const tx = await shippo(env, "POST", "/transactions/", { rate: body.rateId, label_file_type: wantQr ? "PNG" : "PDF_4x6", async: false, metadata: ("Order " + o.id.slice(-10)).slice(0, 100) });
      if (tx.status !== "SUCCESS") {
        const m = (tx.messages || []).map((x) => x.text).filter(Boolean)[0];
        return j({ error: m ? "USPS said: " + m : "The label could not be made yet. Wait a moment and try again.", status: tx.status }, 400);
      }
      const rate = body.rateInfo || {};
      const rec = { id: o.id, name: o.name, email: o.email, transactionId: tx.object_id, trackingNumber: tx.tracking_number, trackingUrl: tx.tracking_url_provider || "", labelUrl: tx.label_url, qrUrl: wantQr ? (tx.qr_code_url || "") : "", carrier: "USPS",
        service: one(rate.service, 60), serviceToken: one(rate.token, 60), cost: Number(rate.amount) || null, boughtAt: Date.now(), plannedDate, status: "PRE_TRANSIT", statusDetail: "Label created", notified: {}, voided: false, mode: mode(env) };
      await writeRec(env, rec);
      if (rec.trackingNumber) await env.ADMIN_KV.put("shiptrack:" + rec.trackingNumber, o.id);
      await setOrderStatus(env, o.id, "ready");
      let emailed = false, emailError = "";
      if (body.notify !== false && st.emailShipped && o.email) {
        try { await sendMail(env, o.email, buildShipEmail("shipped", o, rec, { site: env.SITE_URL })); rec.notified.shipped = Date.now(); await writeRec(env, rec); emailed = true; } catch (e) { emailError = e.message; }
      }
      let qrEmailed = false, qrError = "";
      if (wantQr) {
        if (!rec.qrUrl) qrError = "USPS did not give a QR code for this service. Use the label instead.";
        else { try { await sendMail(env, st.from.email || me.e, buildQrEmail(o, rec)); qrEmailed = true; } catch (e) { qrError = e.message; } }
      }
      return j({ ok: true, shipment: rec, emailed, emailError, qrEmailed, qrError });
    }
    if (route === "ship-notify" && method === "POST") {
      const rec = await readRec(env, body.id);
      if (!rec || rec.voided) return j({ error: "There is no label for that order yet." }, 400);
      const kind = ["shipped", "delivered", "note", "shipdate"].includes(body.kind) ? body.kind : "note";
      const o = await loadOrder(env, deps, body.id);
      const copy = { ...rec, note: kind === "note" ? one(body.note, 800).replace(/ {2,}/g, " ") : "" };
      if (kind === "note" && !copy.note) return j({ error: "Write a short message to send." }, 400);
      await sendMail(env, o.email, buildShipEmail(kind, o, copy, { site: env.SITE_URL }));
      rec.notified = { ...rec.notified, [kind]: Date.now() };
      await writeRec(env, rec);
      return j({ ok: true });
    }
    if (route === "ship-void" && method === "POST") {
      const rec = await readRec(env, body.id);
      if (!rec || rec.voided) return j({ error: "There is no label to refund." }, 400);
      if (rec.status === "TRANSIT" || rec.status === "DELIVERED") return j({ error: "This package is already moving, so USPS will not refund the label." }, 400);
      const r = await shippo(env, "POST", "/refunds/", { transaction: rec.transactionId, async: false });
      rec.voided = true; rec.refund = r.status || "QUEUED"; rec.voidedAt = Date.now();
      await writeRec(env, rec);
      await setOrderStatus(env, rec.id, "new");
      return j({ ok: true, refund: rec.refund });
    }
    if (route === "ship-dropoff" && method === "POST") {
      const ids = (Array.isArray(body.ids) ? body.ids : []).filter((x) => ID_RE.test(x)).slice(0, 40);
      if (!ids.length || !DATE_RE.test(body.date || "")) return j({ error: "Pick the orders and a date." }, 400);
      if (body.date < todayCentral()) return j({ error: "Pick today or a later date." }, 400);
      let n = 0, mailed = 0;
      for (const id of ids) {
        const rec = await readRec(env, id); if (!rec || rec.voided) continue;
        rec.plannedDate = body.date; rec.plan = "dropoff"; await writeRec(env, rec); n++;
        if (body.notify === true && rec.email) { try { await sendMail(env, rec.email, buildShipEmail("shipdate", await loadOrder(env, deps, id), rec, { site: env.SITE_URL })); mailed++; } catch { /* keep going */ } }
      }
      return j({ ok: true, updated: n, emailed: mailed });
    }
    if (route === "ship-pickup" && method === "POST") {
      const ids = (Array.isArray(body.ids) ? body.ids : []).filter((x) => ID_RE.test(x)).slice(0, 40);
      const date = body.date, start = /^\d{2}:\d{2}$/.test(body.start || "") ? body.start : "09:00", end = /^\d{2}:\d{2}$/.test(body.end || "") ? body.end : "17:00";
      if (!ids.length || !DATE_RE.test(date || "")) return j({ error: "Pick the packages and a pickup date." }, 400);
      if (date < todayCentral()) return j({ error: "Pick today or a later date." }, 400);
      if (end <= start) return j({ error: "The pickup window needs to end after it starts." }, 400);
      const recs = [];
      for (const id of ids) { const r = await readRec(env, id); if (r && !r.voided) recs.push(r); }
      if (!recs.length) return j({ error: "None of those packages have labels." }, 400);
      const bad = recs.filter((r) => !/priority/i.test(r.serviceToken || r.service || ""));
      if (bad.length) return j({ error: `USPS only picks up Priority Mail and Priority Mail Express. ${bad.map((r) => r.name || r.id.slice(-6)).slice(0, 3).join(", ")} ${bad.length === 1 ? "has" : "have"} a different service. Take those to the post office or leave them with your carrier.` }, 400);
      if (!(st.from.street1 && st.from.zip && st.from.phone)) return j({ error: "Add your ship-from address and phone in Shipping Setup first." }, 400);
      const accts = await shippo(env, "GET", "/carrier_accounts?carrier=usps&service_levels=false");
      const acct = (accts.results || []).find((a) => a.active !== false) || (accts.results || [])[0];
      if (!acct) return j({ error: "No USPS account was found in Shippo." }, 400);
      const loc = LOC_TYPES.includes(body.locationType) ? body.locationType : "Front Door";
      const pk = await shippo(env, "POST", "/pickups/", {
        carrier_account: acct.object_id, transactions: recs.map((r) => r.transactionId), is_test: mode(env) !== "live",
        requested_start_time: centralToUtc(date, start), requested_end_time: centralToUtc(date, end),
        location: { building_location_type: loc, instructions: one(body.instructions, 200), address: addrOf(st.from) },
      });
      if (String(pk.status || "").toUpperCase() !== "CONFIRMED") return j({ error: (pk.messages || []).map((m) => m.text).filter(Boolean)[0] || "USPS did not confirm that pickup. Try a different day.", status: pk.status }, 400);
      for (const r of recs) { r.plannedDate = date; r.plan = "pickup"; r.pickup = { date, start, end, confirmation: pk.confirmation_code || "", cancelBy: pk.cancel_by_time || "" }; await writeRec(env, r); }
      return j({ ok: true, confirmation: pk.confirmation_code || "", count: recs.length, cancelBy: pk.cancel_by_time || "" });
    }
    return j({ error: "Not found" }, 404);
  } catch (e) {
    return j({ error: e.message || "Something went wrong" }, 400);
  }
}

// Public: Shippo calls this when a package's tracking changes. Protected by a secret in the web address.
export async function shippoWebhook(request, env, ctx, deps) {
  const url = new URL(request.url);
  const ok = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });
  if (!env.ADMIN_KV || !env.SESSION_SECRET) return ok({ error: "off" }, 503);
  if (url.searchParams.get("k") !== (await webhookKey(env))) return ok({ error: "no" }, 403);
  let ev; try { ev = await request.json(); } catch { return ok({ error: "bad" }, 400); }
  try { await env.ADMIN_KV.put("shipwebhook", JSON.stringify({ at: Date.now(), event: one(ev && ev.event, 40), matched: false })); } catch { /* not important */ }
  if (!ev || ev.event !== "track_updated" || !ev.data || !ev.data.tracking_number) return ok({ ok: true });
  const id = await env.ADMIN_KV.get("shiptrack:" + ev.data.tracking_number);
  if (!id) return ok({ ok: true, ignored: true });
  const rec = await readRec(env, id);
  if (!rec || rec.voided) return ok({ ok: true });
  try { await env.ADMIN_KV.put("shipwebhook", JSON.stringify({ at: Date.now(), event: "track_updated", matched: true })); } catch { /* not important */ }
  const ts = ev.data.tracking_status || {};
  const status = STATUSES.includes(ts.status) ? ts.status : "UNKNOWN";
  rec.status = status; rec.statusDetail = one(ts.status_details, 200); rec.statusDate = one(ts.status_date, 40);
  rec.eta = one(ev.data.eta, 40);
  rec.location = ts.location ? one([ts.location.city, ts.location.state].filter(Boolean).join(", "), 80) : "";
  await writeRec(env, rec);
  ctx.waitUntil((async () => {
    try {
      if (status === "DELIVERED") {
        await setOrderStatus(env, id, "fulfilled");
        const st = await readShipSettings(env);
        if (st.emailDelivered && !(rec.notified && rec.notified.delivered) && rec.email) {
          await sendMail(env, rec.email, buildShipEmail("delivered", await loadOrder(env, deps, id), rec, { site: env.SITE_URL }));
          rec.notified = { ...rec.notified, delivered: Date.now() }; await writeRec(env, rec);
        }
      }
      if ((status === "FAILURE" || status === "RETURNED") && !(rec.notified && rec.notified["alert_" + status])) {
        const to = String(env.ADMIN_EMAILS || "").split(",").map((x) => x.trim()).filter((x) => EMAIL_RE.test(x)).slice(0, 5);
        const what = status === "RETURNED" ? "is being returned to sender" : "has a delivery problem";
        const text = `The package for ${rec.name || "an order"} ${what}.\n\nUSPS says: ${rec.statusDetail || "no details"}\nTracking: ${rec.trackingNumber}${rec.trackingUrl ? "\n" + rec.trackingUrl : ""}\n\nOpen Shipping > Shipped in the admin app to email the customer or sort it out.`;
        const html = `<p style="font:16px/1.6 ${SANS};color:${INK}">${esc(text).replace(/\n/g, "<br>")}</p>`;
        for (const t of to) { try { await sendMail(env, t, { subject: `Shipping problem: ${rec.name || rec.trackingNumber}`, html, text }); } catch { /* keep going */ } }
        rec.notified = { ...rec.notified, ["alert_" + status]: Date.now() }; await writeRec(env, rec);
      }
    } catch (e) { console.log("shippo webhook follow-up failed", String(e)); }
  })());
  return ok({ ok: true });
}


// ---- live shipping prices for the website bag ---------------------------------------------------------
const SERVICE_NAMES = { usps_ground_advantage: "USPS Ground Advantage", usps_priority: "USPS Priority Mail", usps_priority_express: "USPS Priority Mail Express", flat: "Flat-rate shipping" };
const QUOTE_TTL = 30 * 60 * 1000;
const sign = (env, payload) => hmacHex(env.SESSION_SECRET || "x", "quote|" + payload).then((h) => h.slice(0, 32));

// Weight of the physical items in a (validated) cart, in ounces, including packing.
export function cartWeight(catalog, items, st) {
  let oz = 0, physical = false;
  for (const it of items) {
    const p = catalog.find((x) => x.id === (it && it.id));
    if (!p || p.digital) continue;
    physical = true;
    oz += (num(p.weightOz, 0, 1600) ?? st.weights[p.category] ?? 12) * (it.qty || 1);
  }
  return physical ? Math.max(1, Math.round(oz + st.packagingOz)) : 0;
}

async function zipPlace(env, zip) {
  const key = "zip:" + zip;
  try { const c = await env.ADMIN_KV.get(key); if (c) return JSON.parse(c); } catch { /* look it up */ }
  try {
    const r = await fetch("https://api.zippopotam.us/us/" + zip, { signal: AbortSignal.timeout(2500) });
    if (!r.ok) return null;
    const d = await r.json(); const pl = d.places && d.places[0];
    if (!pl) return null;
    const out = { city: pl["place name"], state: pl["state abbreviation"] };
    await env.ADMIN_KV.put(key, JSON.stringify(out), { expirationTtl: 60 * 60 * 24 * 30 });
    return out;
  } catch { return null; }
}

export async function quoteOptions(env, catalog, items, zip, flatCents) {
  const st = await readShipSettings(env);
  const w = cartWeight(catalog, items, st);
  if (!w) return { error: "Nothing in your bag needs shipping." };
  if (!/^\d{5}$/.test(zip || "")) return { error: "Please enter a 5-digit ZIP code." };
  const exp = Date.now() + QUOTE_TTL;
  const wrap = async (token, cents, days) => ({ token, service: SERVICE_NAMES[token] || token, cents, days: days || null, exp, sig: await sign(env, `${zip}|${w}|${token}|${cents}|${exp}`) });
  const fallback = async (why) => {
    try { await env.ADMIN_KV.put("shipquote", JSON.stringify({ at: Date.now(), ok: false, why: String(why || "").slice(0, 300) })); } catch { /* ignore */ }
    return { zip, weightOz: w, fallback: true, options: [await wrap("flat", flatCents, null)] };
  };
  const ready = env.SHIPPO_API_KEY && st.from.street1 && st.from.city && st.from.state && st.from.zip && st.from.phone;
  if (!ready || w > 1100) return fallback(!env.SHIPPO_API_KEY ? "No SHIPPO_API_KEY secret was found on the worker." : w > 1100 ? "The bag is too heavy for one parcel." : "Shipping Setup is missing part of the ship-from address or phone: " + ["street1", "city", "state", "zip", "phone"].filter((k) => !st.from[k]).join(", ") + ".");
  try {
    const place = await zipPlace(env, zip);
    if (!place) return { error: "We could not find that ZIP code. Please check it." };
    const box = st.presets.filter((p) => !p.template && p.maxOz > 0).sort((a, b) => a.maxOz - b.maxOz);
    const pre = box.find((p) => w <= p.maxOz) || box[box.length - 1] || st.presets.find((p) => !p.template);
    const sh = await shippo(env, "POST", "/shipments/", {
      address_from: addrOf(st.from), async: false,
      address_to: { name: "Customer", street1: "100 Main St", city: place.city, state: place.state, zip, country: "US" },
      parcels: [{ length: String(pre.length), width: String(pre.width), height: String(pre.height), distance_unit: "in", weight: String(w), mass_unit: "oz" }],
    });
    const rates = (sh.rates || []).filter((r) => String(r.provider).toUpperCase() === "USPS" && SERVICE_NAMES[r.servicelevel && r.servicelevel.token] && r.servicelevel.token !== "flat");
    const best = {};
    for (const r of rates) { const t = r.servicelevel.token, c = Math.ceil(Number(r.amount) * 100); if (c > 0 && (!best[t] || c < best[t].c)) best[t] = { c, d: r.estimated_days }; }
    const order = ["usps_ground_advantage", "usps_priority", "usps_priority_express"].filter((t) => best[t]);
    if (!order.length) return fallback("Shippo returned no USPS prices (" + (sh.rates || []).length + " rates in all). " + (sh.messages || []).map((m) => m.text || m.code).filter(Boolean).slice(0, 2).join(" "));
    try { await env.ADMIN_KV.put("shipquote", JSON.stringify({ at: Date.now(), ok: true, why: "" })); } catch { /* ignore */ }
    return { zip, weightOz: w, city: place.city, state: place.state, options: await Promise.all(order.map((t) => wrap(t, best[t].c + st.markupCents, best[t].d))) };
  } catch (e) { console.log("quote failed", String(e)); return fallback(e.message || String(e)); }
}

export async function verifyQuote(env, catalog, items, q, zip) {
  if (!q || typeof q !== "object" || !SERVICE_NAMES[q.token]) return null;
  const st = await readShipSettings(env);
  const w = cartWeight(catalog, items, st);
  const cents = Number(q.cents), exp = Number(q.exp);
  if (!w || !Number.isInteger(cents) || cents < 0 || cents > 100000 || !(exp > Date.now())) return { stale: true };
  if (q.sig !== (await sign(env, `${zip}|${w}|${q.token}|${cents}|${exp}`))) return { stale: true };
  return { token: q.token, service: SERVICE_NAMES[q.token], cents };
}
