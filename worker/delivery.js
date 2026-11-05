// Free local delivery for LyKinda's own delivery area (St. Tammany Parish towns). Not shipping: no label, no USPS.
// - The cart asks for a ZIP code; if it is on the list below, "Free local delivery" is offered next to the shipping prices.
// - The Worker re-checks the ZIP and town on checkout, so nobody outside the area can place a delivery order.
// - Orders are paid by card at checkout. The owner is emailed the address; the admin app has a "To Deliver" list.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const FOREST = "#1b3b22", GOLD = "#d4af37", CREAM = "#fcfaf7", INK = "#0e2012", LINEN = "#e5dbd1";
const SERIF = "Georgia,'Times New Roman',serif", SANS = "Helvetica,Arial,sans-serif";

export const TOWNS = ["Mandeville", "Slidell", "Covington", "Madisonville", "Abita Springs", "Lacombe"];
const TOWN_ZIPS = { "Mandeville": ["70448", "70470", "70471"], "Slidell": ["70458", "70459", "70460", "70461"], "Covington": ["70433", "70434", "70435"], "Madisonville": ["70447"], "Abita Springs": ["70420"], "Lacombe": ["70445"] };
const ZIP_TOWN = {}; for (const t of TOWNS) for (const z of TOWN_ZIPS[t]) ZIP_TOWN[z] = t;

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const money = (c) => "$" + (c / 100).toFixed(2);

export async function readDelivery(env) {
  let s = {};
  try { s = JSON.parse((await env.ADMIN_KV.get("delivery")) || "{}"); } catch { s = {}; }
  const minCents = Number.isFinite(s.minCents) && s.minCents >= 0 && s.minCents <= 100000 ? Math.round(s.minCents) : 0;
  const off = Array.isArray(s.off) ? s.off.filter((t) => TOWNS.includes(t)) : [];
  return { on: s.on !== false, minCents, off, towns: TOWNS.filter((t) => !off.includes(t)) };
}

// For the cart: is delivery offered for this ZIP right now?
export async function deliveryFor(env, zip) {
  const s = await readDelivery(env);
  const z = String(zip || "").replace(/\D/g, "").slice(0, 5);
  const t = ZIP_TOWN[z];
  if (!s.on || !t || s.off.includes(t)) return { available: false };
  return { available: true, towns: [t], minCents: s.minCents };
}

// On checkout: returns { ok, address } or { error }.
export async function checkDelivery(env, d, subtotalCents) {
  const s = await readDelivery(env);
  if (!s.on) return { error: "Local delivery isn't available right now. Please choose shipping or pickup." };
  d = d && typeof d === "object" ? d : {};
  const street = one(d.street, 100), unit = one(d.unit, 30), note = one(d.note, 200), zip = String(d.zip || "").replace(/\D/g, "").slice(0, 5);
  const town = TOWNS.find((t) => t.toLowerCase() === String(d.city || "").trim().toLowerCase());
  if (street.length < 4 || !/\d/.test(street)) return { error: "Please enter your street address for delivery." };
  if (!town || ZIP_TOWN[zip] !== town || s.off.includes(town)) return { error: "Free delivery isn't available to that address" + (s.towns.length ? " (we deliver to " + s.towns.join(", ") + ")" : "") + ". Please choose shipping or pickup." };
  if (subtotalCents < s.minCents) return { error: "Delivery orders start at " + money(s.minCents) + "." };
  return { ok: true, address: { street, unit, town, zip, note } };
}

// ---- email --------------------------------------------------------------------------------------
async function sendMail(env, to, subject, html, text) {
  if (!env.MAIL_URL || !env.MAIL_SECRET) throw new Error("Email is not set up");
  const res = await fetch(env.MAIL_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action: "send_html", secret: env.MAIL_SECRET, to, subject, html, text }) });
  const out = await res.json().catch(() => null);
  if (!res.ok || !out || out.ok !== true) throw new Error("The email did not send.");
}
const P = (t) => `<p style="font:16px/1.65 ${SANS};color:${INK};margin:0 0 14px">${t}</p>`;
function frame(title, inner, site) {
  return `<!doctype html><html><body style="margin:0;background:${CREAM}"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM}"><tr><td align="center" style="padding:24px 12px">` +
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${LINEN};border-radius:18px;overflow:hidden">` +
    `<tr><td align="center" style="background:${FOREST};padding:24px"><a href="${site}" style="font:700 26px ${SERIF};color:#fff;text-decoration:none">Queen E's Heirr</a></td></tr><tr><td style="height:5px;background:${GOLD}"></td></tr>` +
    `<tr><td style="padding:30px 28px 18px"><h1 style="font:700 26px/1.2 ${SERIF};color:${FOREST};margin:0 0 18px">${esc(title)}</h1>${inner}</td></tr>` +
    `<tr><td align="center" style="background:${FOREST};padding:16px 24px;font:12px/1.7 ${SANS};color:#cfd8cd">Queen E's Heirr &middot; <a href="${site}" style="color:${GOLD}">queenesheirr.com</a></td></tr></table></td></tr></table></body></html>`;
}
const addrOf = (md) => [md.delivery_addr, md.delivery_city && (md.delivery_city + ", LA " + (md.delivery_zip || ""))].filter(Boolean).join(", ");

export async function onDeliveryOrderPaid(env, stripeGet, sessionId) {
  const s = await stripeGet(env, `/checkout/sessions/${sessionId}?expand[]=line_items`);
  const md = s.metadata || {};
  if (s.payment_status !== "paid" || md.fulfillment !== "delivery") return { skipped: true };
  let sent = []; try { sent = JSON.parse((await env.ADMIN_KV.get("deliverynotes")) || "[]"); } catch { sent = []; }
  if (sent.includes(s.id)) return { duplicate: true };
  const site = env.SITE_URL || "https://queenesheirr.com";
  const cd = s.customer_details || {};
  const items = ((s.line_items && s.line_items.data) || []).map((l) => `${l.quantity} x ${l.description}`);
  const first = String(cd.name || "").trim().split(/\s+/)[0] || "there";
  const addr = addrOf(md);
  if (EMAIL_RE.test(cd.email || "")) {
    try {
      await sendMail(env, cd.email, "Your Queen E's Heirr order will be delivered",
        frame("Your order is on its way to being delivered", P(`Hi ${esc(first)},`) + P("Thank you for your order! It qualifies for free local delivery, and we will contact you soon to arrange a delivery time.") +
          P("<strong>Delivering to:</strong><br>" + esc(addr)) + P("<strong>Your order:</strong><br>" + items.map(esc).join("<br>")) + P("Need to change something? Reply to this email or write info@queenesheirr.com."), site),
        `Hi ${first},\n\nThank you for your order! It qualifies for free local delivery, and we will contact you soon to arrange a delivery time.\n\nDelivering to: ${addr}\n\nYour order:\n${items.join("\n")}\n\nNeed to change something? Write info@queenesheirr.com.`);
    } catch (e) { console.log("delivery confirm failed", String(e)); }
  }
  const owners = String(env.ADMIN_EMAILS || "").split(",").map((x) => x.trim()).filter((x) => EMAIL_RE.test(x)).slice(0, 5);
  for (const to of owners) {
    try {
      await sendMail(env, to, "New delivery order: " + (cd.name || "a customer"),
        frame("New delivery order", P(`<strong>${esc(cd.name || "A customer")}</strong> ordered free local delivery.`) + P("<strong>Address:</strong><br>" + esc(addr)) +
          (md.delivery_note ? P("<strong>Customer note:</strong> " + esc(md.delivery_note)) : "") + P("<strong>Phone:</strong> " + esc(cd.phone || "not given") + "<br><strong>Email:</strong> " + esc(cd.email || "")) +
          P("<strong>Order:</strong><br>" + items.map(esc).join("<br>")) + P("Contact them to set a delivery time, then mark it delivered in the admin app under <em>To Deliver</em>."), site),
        `New delivery order from ${cd.name || "a customer"}\nAddress: ${addr}\n${md.delivery_note ? "Note: " + md.delivery_note + "\n" : ""}Phone: ${cd.phone || "not given"}\nEmail: ${cd.email || ""}\n\n${items.join("\n")}\n\nMark it delivered in the admin app under To Deliver.`);
    } catch (e) { console.log("delivery owner notice failed", String(e)); }
  }
  sent.push(s.id); await env.ADMIN_KV.put("deliverynotes", JSON.stringify(sent.slice(-300)));
  return { ok: true };
}

// ---- admin ---------------------------------------------------------------------------------------
export async function deliveryRoute(route, method, body, env, me, deps, j) {
  if (!/^delivery-[a-z]+$/.test(route)) return null;
  try {
    if (route === "delivery-settings" && method === "GET") return j({ ...(await readDelivery(env)), allTowns: TOWNS });
    if (route === "delivery-settings" && method === "POST") {
      const minCents = Math.max(0, Math.min(100000, Math.round((Number(body.minDollars) || 0) * 100)));
      const off = Array.isArray(body.off) ? body.off.filter((t) => TOWNS.includes(t)) : [];
      await env.ADMIN_KV.put("delivery", JSON.stringify({ on: body.on !== false, minCents, off }));
      return j({ ok: true, ...(await readDelivery(env)) });
    }
    if (route === "delivery-queue" && method === "GET") {
      const res = await deps.stripeGet(env, "/checkout/sessions?limit=60&expand[]=data.line_items");
      let st = {}; try { st = JSON.parse((await env.ADMIN_KV.get("orderstatus")) || "{}"); } catch { st = {}; }
      const all = res.data.filter((s) => s.payment_status === "paid" && s.metadata && s.metadata.fulfillment === "delivery").map((s) => {
        const md = s.metadata, cd = s.customer_details || {};
        return { id: s.id, created: s.created * 1000, total: s.amount_total, name: cd.name || "", email: cd.email || "", phone: cd.phone || "",
          address: addrOf(md), note: md.delivery_note || "", done: st[s.id] === "fulfilled",
          items: ((s.line_items && s.line_items.data) || []).map((l) => ({ name: l.description, qty: l.quantity })) };
      });
      return j({ waiting: all.filter((o) => !o.done), done: all.filter((o) => o.done).slice(0, 15) });
    }
    if (route === "delivery-done" && method === "POST") {
      if (!/^cs_[A-Za-z0-9_]+$/.test(body.id || "")) return j({ error: "Bad request" }, 400);
      const st = JSON.parse((await env.ADMIN_KV.get("orderstatus")) || "{}");
      st[body.id] = body.undo ? "new" : "fulfilled";
      const keys = Object.keys(st); if (keys.length > 400) delete st[keys[0]];
      await env.ADMIN_KV.put("orderstatus", JSON.stringify(st));
      return j({ ok: true });
    }
  } catch (e) { return j({ error: e.message || "Something went wrong" }, 400); }
  return j({ error: "Not found" }, 404);
}
