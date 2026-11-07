// Discounts: percent off, dollars off, and "buy X get Y free". Stored in ADMIN_KV key "discounts"; edited in the admin app.
// - Each discount applies to the whole order or to chosen products only.
// - Each is either automatic (no code) or needs a promo code. A code can be listed on the website's Deals page or kept private.
// - One discount per order: the one worth the most to the customer (the code they typed competes with the automatic ones).
// - The Worker recomputes everything at checkout (prices come from the catalog), then hands Stripe a one-time coupon for the exact amount,
//   so Stripe Tax and receipts stay correct. Shipping and tax are never discounted.
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const money = (c) => "$" + (c % 100 ? (c / 100).toFixed(2) : String(c / 100));
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const KINDS = ["percent", "amount", "bogo"];

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
  const what = d.kind === "percent" ? d.percent + "% off" : d.kind === "amount" ? money(d.cents) + " off" : `Buy ${d.buy}, get ${d.get} free`;
  const where = d.scope === "items" ? " on " + d.itemIds.map(nameOf).join(", ") : d.kind === "bogo" ? " on any items" : " your whole order";
  return what + where + (d.minCents ? ". Orders of " + money(d.minCents) + " or more" : "") + ".";
}

/** lines: [{ id, cents (unit price), qty }]. Returns the cents taken off for one discount rule. */
export function amountFor(d, lines) {
  const sub = lines.reduce((t, l) => t + l.cents * l.qty, 0);
  if (sub < (d.minCents || 0)) return 0;
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

/** Pick the best discount for this bag. Returns { cents, name, code?, note? } or { error }. */
export function bestDiscount(all, lines, codeRaw, today) {
  const sub = lines.reduce((t, l) => t + l.cents * l.qty, 0);
  const live = all.filter((d) => inWindow(d, today));
  const typed = codeKey(codeRaw);
  let coded = null;
  if (typed) {
    coded = live.find((d) => d.code && d.code === typed);
    if (!coded) return { error: "That promo code isn't valid or has ended." };
  }
  let best = null;
  for (const d of live.filter((x) => !x.code)) { const c = amountFor(d, lines); if (c > 0 && (!best || c > best.cents)) best = { cents: c, name: d.name, id: d.id }; }
  if (coded) {
    const c = amountFor(coded, lines);
    if (c <= 0) {
      if (sub < (coded.minCents || 0)) return { error: `That code needs an order of ${money(coded.minCents)} or more.` };
      return { error: coded.scope === "items" ? "That code doesn't apply to the items in your bag." : coded.kind === "bogo" ? `That code needs ${coded.buy + coded.get} items in your bag (buy ${coded.buy}, get ${coded.get} free).` : "That code doesn't apply to your bag." };
    }
    if (!best || c >= best.cents) return { cents: c, name: coded.name, id: coded.id, code: coded.code };
    return { ...best, note: `Your automatic deal "${best.name}" saves more than that code, so we applied it.` };
  }
  return best || { cents: 0 };
}

/** Never take so much off that Stripe has less than 50 cents to charge. */
export const capDiscount = (cents, subtotal) => Math.max(0, Math.min(cents, subtotal - 50));

// ---- public (the website) ------------------------------------------------------------------------
export async function publicDiscounts(env, headers, json, nameOf) {
  const today = todayCT();
  const list = (await readDiscounts(env)).filter((d) => inWindow(d, today) && (!d.code || d.show)).map((d) => ({
    name: d.name, text: describe(d, nameOf), code: d.code || "", automatic: !d.code, ends: d.end || "", note: d.note || "",
  }));
  return json({ discounts: list }, 200, { ...headers, "Cache-Control": "public, max-age=60" });
}

// ---- admin ----------------------------------------------------------------------------------------
export async function discountsRoute(route, method, body, env, me, deps, j) {
  if (route === "discounts" && method === "GET") {
    let products = [];
    try { products = (await deps.loadCatalog(env)).map((p) => ({ id: p.id, name: p.name })); } catch { products = []; }
    return j({ discounts: await readDiscounts(env), products, today: todayCT() });
  }
  if (route === "discounts-save" && method === "POST") {
    try { const list = clean(body.discounts); await env.ADMIN_KV.put("discounts", JSON.stringify(list)); return j({ ok: true, discounts: list }); }
    catch (e) { return j({ error: e.message }, 400); }
  }
  return null;
}
