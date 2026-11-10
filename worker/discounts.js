// Discounts: percent off, dollars off, "buy X get Y free", and free shipping. Stored in ADMIN_KV key "discounts"; edited in the admin app.
// - Each discount applies to the whole order or to chosen products only.
// - Each is either automatic (no code) or needs a promo code. A code can be listed on the website's Deals page or kept private.
// - One discount per order: the one worth the most to the customer (the code they typed competes with the automatic ones).
// - Optional limits: a total number of uses, and one use per customer (matched by email, which checkout then locks in).
// - The Worker recomputes everything at checkout (prices come from the catalog), then hands Stripe a one-time coupon for the exact amount,
//   so Stripe Tax and receipts stay correct. Only a free-shipping discount touches shipping (it zeroes the shipping charge); tax is never discounted.
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const money = (c) => "$" + (c % 100 ? (c / 100).toFixed(2) : String(c / 100));
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const KINDS = ["percent", "amount", "bogo", "freeship"];

export function codeKey(v) { return String(v == null ? "" : v).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24); }

export async function readDiscounts(env) {
  try { const a = JSON.parse((await env.ADMIN_KV.get("discounts")) || "[]"); return Array.isArray(a) ? a : []; } catch { return []; }
}

function clean(list) {
  if (!Array.isArray(list) || list.length > 100) throw new Error("Too many discounts.");
  const seen = new Set(), codes = new Set();
  return list.map((d, i) => {
    const name = one(d.name, 80); if (!name) throw new Error("Every discount needs a name.");
    const kind = KINDS.includes(d.kind) ? d.kind : "percent";
    const out = { id: /^d[a-z0-9]{2,16}$/.test(d.id || "") && !seen.has(d.id) ? d.id : "d" + Date.now().toString(36) + i, name, kind,
      scope: d.scope === "items" ? "items" : "all", itemIds: [], code: codeKey(d.code), active: d.active !== false, show: d.show === true,
      maxUses: Math.max(0, Math.min(1000000, Math.round(Number(d.maxUses) || 0))), onePerCustomer: d.onePerCustomer === true,
      minCents: Math.max(0, Math.min(100000000, Math.round(Number(d.minCents) || 0))), start: DATE_RE.test(d.start || "") ? d.start : "", end: DATE_RE.test(d.end || "") ? d.end : "", note: one(d.note, 200) };
    seen.add(out.id);
    if (out.code) { if (out.code.length < 3) throw new Error("Promo codes need at least 3 letters or numbers (" + name + ")."); if (codes.has(out.code)) throw new Error("The code " + out.code + " is used twice."); codes.add(out.code); }
    if (out.start && out.end && out.end < out.start) throw new Error("The end date is before the start date for " + name + ".");
    if (kind === "percent") { out.percent = Math.round(Number(d.percent)); if (!(out.percent >= 1 && out.percent <= 100)) throw new Error("Percent off must be 1 to 100 (" + name + ")."); }
    if (kind === "amount") { out.cents = Math.round(Number(d.cents)); if (!(out.cents >= 1 && out.cents <= 100000000)) throw new Error("Check the dollars off for " + name + "."); }
    if (kind === "bogo") {
      out.buy = Math.round(Number(d.buy)); out.get = Math.round(Number(d.get));
      if (!(out.buy >= 1 && out.buy <= 50) || !(out.get >= 1 && out.get <= 50)) throw new Error("Buy and free amounts must be 1 to 50 (" + name + ").");
    }
    if (out.scope === "items") {
      out.itemIds = (Array.isArray(d.itemIds) ? d.itemIds : []).map((x) => one(x, 80)).filter(Boolean).slice(0, 200);
      if (!out.itemIds.length) throw new Error("Choose at least one product for " + name + ", or set it to the whole order.");
    }
    return out;
  });
}

const todayCT = () => new Date(Date.now() - 6 * 3600e3).toISOString().slice(0, 10); // central time, close enough for date windows
export function inWindow(d, today = todayCT()) { return d.active !== false && (!d.start || today >= d.start) && (!d.end || today <= d.end); }

/** Plain-English summary, e.g. "Buy 2, get 1 free on Apple Jam, Pear Jam. Orders of $25 or more." */
export function describe(d, nameOf = (x) => x) {
  if (d.kind === "freeship") return "Free shipping" + (d.scope === "items" ? " when your bag has " + d.itemIds.map(nameOf).join(" or ") : "") + (d.minCents ? (d.scope === "items" ? ", on" : " on") + " orders of " + money(d.minCents) + " or more" : "") + ". Applies to shipped orders.";
  const what = d.kind === "percent" ? d.percent + "% off" : d.kind === "amount" ? money(d.cents) + " off" : `Buy ${d.buy}, get ${d.get} free`;
  const where = d.scope === "items" ? " on " + d.itemIds.map(nameOf).join(", ") : d.kind === "bogo" ? " on any items" : " your whole order";
  return what + where + (d.minCents ? ". Orders of " + money(d.minCents) + " or more" : "") + ".";
}

/** lines: [{ id, cents (unit price), qty }]. Returns the cents taken off for one discount rule. */
export function amountFor(d, lines, shipVal = 0) {
  const sub = lines.reduce((t, l) => t + l.cents * l.qty, 0);
  if (sub < (d.minCents || 0)) return 0;
  if (d.kind === "freeship") return d.scope === "items" && !lines.some((l) => d.itemIds.includes(l.id)) ? 0 : shipVal;
  const el = d.scope === "items" ? lines.filter((l) => d.itemIds.includes(l.id)) : lines;
  const elSub = el.reduce((t, l) => t + l.cents * l.qty, 0);
  if (!elSub) return 0;
  if (d.kind === "percent") return Math.floor(elSub * d.percent / 100);
  if (d.kind === "amount") return Math.min(d.cents, elSub);
  // Buy X get Y free: in every full group of X+Y items, the cheapest Y are free.
  const units = []; for (const l of el) for (let i = 0; i < l.qty; i++) units.push(l.cents);
  units.sort((a, b) => b - a);
  const size = d.buy + d.get; let off = 0;
  for (let g = 0; (g + 1) * size <= units.length; g++) for (let k = d.buy; k < size; k++) off += units[g * size + k];
  return off;
}

// ---- usage limits ---------------------------------------------------------------------------------
// KV "discountuse": { [discountId]: { n: paid uses, e: [email keys that used it], d: [session ids counted], p: [{ s, t, k }] pending } }.
// A started checkout holds its use for 35 minutes (the Stripe page expires then), so abandoned bags don't use up a limited code.
const HOLD_MS = 35 * 60e3;
export function emailKey(v) {
  const t = String(v == null ? "" : v).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) || t.length > 254) return "";
  let [u, dom] = t.split("@");
  u = u.split("+")[0];
  if (dom === "gmail.com" || dom === "googlemail.com") { u = u.replace(/\./g, ""); dom = "gmail.com"; }
  return u + "@" + dom;
}
export async function readUse(env) { try { const o = JSON.parse((await env.ADMIN_KV.get("discountuse")) || "{}"); return o && typeof o === "object" ? o : {}; } catch { return {}; } }
function view(use, id, nowMs) {
  const r = use[id] || {}; const live = (r.p || []).filter((x) => nowMs - x.t < HOLD_MS);
  return { count: (r.n || 0) + live.length, paid: r.n || 0, emails: new Set([...(r.e || []), ...live.map((x) => x.k).filter(Boolean)]) };
}
const limited = (d) => d.maxUses > 0 || d.onePerCustomer;

/** Hold a use for a checkout that just started. */
export async function reserveUse(env, id, sessionId, ek) {
  const use = await readUse(env), r = use[id] || (use[id] = { n: 0, e: [], d: [], p: [] }), t = Date.now();
  r.p = (r.p || []).filter((x) => t - x.t < HOLD_MS).slice(-200); r.p.push({ s: sessionId, t, k: ek || "" });
  await env.ADMIN_KV.put("discountuse", JSON.stringify(use));
}
/** Payment finished: turn the hold into a real use (safe to run twice for the same order). */
export async function recordUse(env, session) {
  const md = (session && session.metadata) || {}; const id = md.discount_id; if (!id) return;
  const use = await readUse(env), r = use[id] || (use[id] = { n: 0, e: [], d: [], p: [] });
  if ((r.d || []).includes(session.id)) return;
  r.d = [...(r.d || []), session.id].slice(-300); r.p = (r.p || []).filter((x) => x.s !== session.id);
  r.n = (r.n || 0) + 1;
  const k = emailKey((session.customer_details && session.customer_details.email) || session.customer_email) || md.discount_ek || "";
  if (k && !r.e.includes(k)) r.e = [...r.e, k].slice(-5000);
  await env.ADMIN_KV.put("discountuse", JSON.stringify(use));
}

/** Pick the best discount for this bag. ctx = { use, ek (email key or ""), now }. Returns { cents, name, id, code?, needEmail?, note? } or { error }. */
export function bestDiscount(all, lines, codeRaw, today, ctx = {}) {
  const sub = lines.reduce((t, l) => t + l.cents * l.qty, 0);
  const use = ctx.use || {}, nowMs = ctx.now || Date.now(), ek = ctx.ek || "";
  // Free shipping only helps a shipped order. shipVal = what shipping costs (their chosen option, else the flat estimate).
  const shipVal = ctx.noShip ? 0 : Math.max(0, ctx.shipCents || 0);
  const live = all.filter((d) => inWindow(d, today));
  const typed = codeKey(codeRaw);
  // Why a rule can't be used right now (null = fine).
  const blocked = (d) => {
    if (!limited(d)) return null;
    const v = view(use, d.id, nowMs);
    if (d.maxUses > 0 && v.count >= d.maxUses) return "That code has been fully claimed.";
    if (d.onePerCustomer && ek && v.emails.has(ek)) return "That offer has already been used with this email address.";
    return null;
  };
  let coded = null;
  if (typed) {
    coded = live.find((d) => d.code && d.code === typed);
    if (!coded) return { error: "That promo code isn't valid or has ended." };
    const why = blocked(coded); if (why) return { error: why };
  }
  const pack = (d, c, extra) => ({ cents: c, name: d.name, id: d.id, ...(d.code ? { code: d.code } : {}), ...(d.onePerCustomer && !ek ? { needEmail: true } : {}), ...(limited(d) ? { limited: true } : {}), ...(d.kind === "freeship" ? { freeShip: true } : {}), ...extra });
  let best = null;
  for (const d of live.filter((x) => !x.code)) { if (blocked(d)) continue; const c = amountFor(d, lines, shipVal); if (c > 0 && (!best || c > best.cents)) best = pack(d, c); }
  if (coded) {
    const c = amountFor(coded, lines, shipVal);
    if (c <= 0) {
      if (coded.kind === "freeship" && sub >= (coded.minCents || 0) && (coded.scope !== "items" || lines.some((l) => coded.itemIds.includes(l.id)))) return { error: ctx.noShip ? "That code is for free shipping, which applies to orders that ship." : "That code is for free shipping. Choose a shipping option first." };
      if (sub < (coded.minCents || 0)) return { error: `That code needs an order of ${money(coded.minCents)} or more.` };
      return { error: coded.scope === "items" ? "That code doesn't apply to the items in your bag." : coded.kind === "bogo" ? `That code needs ${coded.buy + coded.get} items in your bag (buy ${coded.buy}, get ${coded.get} free).` : "That code doesn't apply to your bag." };
    }
    if (!best || c >= best.cents) return pack(coded, c);
    return { ...best, note: `Your automatic deal "${best.name}" saves more than that code, so we applied it.` };
  }
  return best || { cents: 0 };
}

/** Never take so much off that Stripe has less than 50 cents to charge. */
export const capDiscount = (cents, subtotal) => Math.max(0, Math.min(cents, subtotal - 50));

// ---- public (the website) ------------------------------------------------------------------------
export async function publicDiscounts(env, headers, json, nameOf) {
  const today = todayCT(), use = await readUse(env), t = Date.now();
  const list = (await readDiscounts(env)).filter((d) => inWindow(d, today) && (!d.code || d.show) && !(d.maxUses > 0 && view(use, d.id, t).count >= d.maxUses)).map((d) => ({
    name: d.name, text: describe(d, nameOf), code: d.code || "", automatic: !d.code, ends: d.end || "",
    note: [d.note, d.onePerCustomer ? "One use per customer." : "", d.maxUses > 0 ? "Limited number available." : ""].filter(Boolean).join(" "),
  }));
  return json({ discounts: list }, 200, { ...headers, "Cache-Control": "public, max-age=60" });
}

// ---- admin ----------------------------------------------------------------------------------------
export async function discountsRoute(route, method, body, env, me, deps, j) {
  if (route === "discounts" && method === "GET") {
    let products = [];
    try { products = (await deps.loadCatalog(env)).map((p) => ({ id: p.id, name: p.name })); } catch { products = []; }
    const use = await readUse(env), uses = {}; for (const k of Object.keys(use)) uses[k] = view(use, k, Date.now()).paid;
    return j({ discounts: await readDiscounts(env), products, today: todayCT(), uses });
  }
  if (route === "discounts-save" && method === "POST") {
    try { const list = clean(body.discounts); await env.ADMIN_KV.put("discounts", JSON.stringify(list)); return j({ ok: true, discounts: list }); }
    catch (e) { return j({ error: e.message }, 400); }
  }
  return null;
}
