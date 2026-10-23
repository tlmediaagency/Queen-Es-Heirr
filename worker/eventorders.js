// Event / pop-up pickup orders: confirmation + owner notice when an order comes in, a reminder the day before,
// a "sorry we missed you" follow-up, and the pick list the admin app shows for each event.
// Emails go out through the Apps Script "send_html" action (same as the shipping emails).

const FOREST = "#1b3b22", GOLD = "#d4af37", CREAM = "#fcfaf7", INK = "#0e2012", LINEN = "#e5dbd1";
const SERIF = "Georgia,'Times New Roman',serif", SANS = "Helvetica,Arial,sans-serif";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ID_RE = /^cs_[A-Za-z0-9_]+$/;
const EV_ID_RE = /^[a-z0-9-]{3,60}$/;
const SHOP_EMAIL = "info@queenesheirr.com";

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const dayFmt = (d) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" });
const todayCentral = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
const tomorrowCentral = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date(Date.now() + 86400000));

async function readEventsKV(env) { try { return JSON.parse((await env.ADMIN_KV.get("events")) || "[]"); } catch { return []; } }
async function readNotes(env) { try { return JSON.parse((await env.ADMIN_KV.get("evnotes")) || "{}"); } catch { return {}; } }
async function markNote(env, id, kind) {
  const n = await readNotes(env);
  n[id] = { ...(n[id] || {}), [kind]: Date.now() };
  const keys = Object.keys(n); if (keys.length > 500) delete n[keys[0]];
  await env.ADMIN_KV.put("evnotes", JSON.stringify(n));
}
async function orderStatuses(env) { try { return JSON.parse((await env.ADMIN_KV.get("orderstatus")) || "{}"); } catch { return {}; } }

const adminEmails = (env) => String(env.ADMIN_EMAILS || "").split(",").map((s) => s.trim()).filter((e) => EMAIL_RE.test(e)).slice(0, 5);

// ---- matching an order to an event ----------------------------------------------------------------
export function eventFor(events, session) {
  const md = session.metadata || {};
  if (md.event_id) { const e = events.find((x) => x.id === md.event_id); if (e) return e; }
  return events.find((x) => md.event && md.event === `${x.name} (${x.date})`) || null;
}
const isEventOrder = (s) => s.payment_status === "paid" && s.metadata && s.metadata.fulfillment === "event";
function orderView(s, st, notes) {
  return { id: s.id, created: s.created * 1000, name: (s.customer_details && s.customer_details.name) || "", email: (s.customer_details && s.customer_details.email) || "",
    phone: (s.customer_details && s.customer_details.phone) || "", total: s.amount_total, pickedUp: st[s.id] === "fulfilled",
    items: ((s.line_items && s.line_items.data) || []).map((l) => ({ name: l.description, qty: l.quantity })), notified: notes[s.id] || {} };
}

// ---- email ---------------------------------------------------------------------------------------
function frame(title, inner, site) {
  return `<!doctype html><html><body style="margin:0;background:${CREAM}"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM}"><tr><td align="center" style="padding:24px 12px">` +
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${LINEN};border-radius:18px;overflow:hidden">` +
    `<tr><td align="center" style="background:${FOREST};padding:24px"><a href="${site}" style="font:700 26px ${SERIF};color:#fff;text-decoration:none">Queen E's Heirr</a></td></tr><tr><td style="height:5px;background:${GOLD};line-height:5px;font-size:0">&nbsp;</td></tr>` +
    `<tr><td style="padding:30px 28px 18px"><h1 style="font:700 26px/1.2 ${SERIF};color:${FOREST};margin:0 0 18px">${esc(title)}</h1>${inner}</td></tr>` +
    `<tr><td align="center" style="background:${FOREST};padding:16px 24px;font:12px/1.7 ${SANS};color:#cfd8cd">Queen E's Heirr &middot; <a href="${site}" style="color:${GOLD}">queenesheirr.com</a></td></tr></table></td></tr></table></body></html>`;
}
const P = (t) => `<p style="font:16px/1.65 ${SANS};color:${INK};margin:0 0 14px">${t}</p>`;

export function buildEventEmail(kind, o, ev, ctx) {
  const site = (ctx && ctx.site) || "https://queenesheirr.com";
  const first = String(o.name || "").trim().split(/\s+/)[0] || "";
  const when = ev ? dayFmt(ev.date) : "";
  const where = ev ? [ev.name, ev.location].filter(Boolean).join(" - ") : "our event";
  const hours = ev && ev.time ? ev.time : "";
  const items = (o.items || []).map((i) => `${i.qty} x ${i.name}`);
  const box = (rows) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM};border:1px solid ${LINEN};border-radius:12px;margin:0 0 18px"><tr><td style="padding:14px 16px;font:15px/1.7 ${SANS};color:${INK}">${rows.filter(Boolean).join("<br>")}</td></tr></table>`;
  const detail = box([`<strong>Where:</strong> ${esc(where)}`, when && `<strong>When:</strong> ${esc(when)}${hours ? ", " + esc(hours) : ""}`]);
  const list = items.length ? `<h3 style="font:700 17px ${SERIF};color:${FOREST};margin:18px 0 6px">Your order</h3>` + P(items.map(esc).join("<br>")) : "";
  let title, subject, body, text;
  if (kind === "confirm") {
    title = "Your order will be waiting for you";
    subject = `Your order for ${ev ? ev.name : "our event"} - Queen E's Heirr`;
    body = P(`Hi ${esc(first || "there")},`) + P("Thank you for your order! It will be packed and waiting for you to pick up at our event.") + detail + list + P("We will send you a quick reminder the day before. If you can't make it, just reply to this email and we'll work something out.");
    text = `Hi ${first || "there"},\n\nThank you for your order! It will be waiting for you at:\n${where}\n${when}${hours ? ", " + hours : ""}\n\nYour order:\n${items.join("\n")}\n\nWe will send a reminder the day before. If you can't make it, reply to this email and we'll work something out.\n\nQueen E's Heirr | ${site}`;
  } else if (kind === "reminder") {
    title = "See you tomorrow!";
    subject = `Reminder: pick up your order tomorrow - Queen E's Heirr`;
    body = P(`Hi ${esc(first || "there")},`) + P("Just a friendly reminder that your order will be waiting for you tomorrow.") + detail + list + P("Can't make it? Reply to this email and we'll arrange another way to get it to you.");
    text = `Hi ${first || "there"},\n\nReminder: your order will be waiting for you tomorrow.\n${where}\n${when}${hours ? ", " + hours : ""}\n\nYour order:\n${items.join("\n")}\n\nCan't make it? Reply to this email and we'll arrange another way to get it to you.\n\nQueen E's Heirr | ${site}`;
  } else if (kind === "missed") {
    title = "Sorry we missed you";
    subject = `Sorry we missed you - Queen E's Heirr`;
    body = P(`Hi ${esc(first || "there")},`) + P(`We're sorry we missed you at ${esc(ev ? ev.name : "our event")}. Your order is safe with us!`) + list +
      P(`Please reply to this email or write us at <a href="mailto:${SHOP_EMAIL}" style="color:${FOREST}">${SHOP_EMAIL}</a> so we can coordinate your pickup, and we'll find a time and place that works for you.`);
    text = `Hi ${first || "there"},\n\nWe're sorry we missed you at ${ev ? ev.name : "our event"}. Your order is safe with us!\n\nYour order:\n${items.join("\n")}\n\nPlease reply to this email or write us at ${SHOP_EMAIL} so we can coordinate your pickup.\n\nQueen E's Heirr | ${site}`;
  } else { // owner
    title = "New event order";
    subject = `New event order: ${o.name || o.email || "customer"} for ${ev ? ev.name : "an event"}`;
    body = P(`<strong>${esc(o.name || "A customer")}</strong> ordered for pickup at <strong>${esc(ev ? ev.name : "an event")}</strong>${when ? " on " + esc(when) : ""}.`) +
      box([o.email && `Email: ${esc(o.email)}`, o.phone && `Phone: ${esc(o.phone)}`, `Paid: $${((o.total || 0) / 100).toFixed(2)}`]) + list;
    text = `${o.name || "A customer"} ordered for pickup at ${ev ? ev.name : "an event"}${when ? " on " + when : ""}.\n${o.email || ""} ${o.phone || ""}\nPaid: $${((o.total || 0) / 100).toFixed(2)}\n\n${items.join("\n")}`;
  }
  return { subject, html: frame(title, body, site), text };
}

async function sendMail(env, to, mail) {
  if (!env.MAIL_URL || !env.MAIL_SECRET) throw new Error("Email is not set up");
  if (!EMAIL_RE.test(to || "")) throw new Error("This order has no email address.");
  const res = await fetch(env.MAIL_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action: "send_html", secret: env.MAIL_SECRET, to, subject: mail.subject, html: mail.html, text: mail.text }) });
  const out = await res.json().catch(() => null);
  if (!res.ok || !out || out.ok !== true) throw new Error("The email did not send. Make sure the newest Google Apps Script version is deployed.");
}

// Called from the Stripe webhook after payment: customer confirmation + owner notice (once per order).
export async function onEventOrderPaid(env, stripeGet, sessionId) {
  const s = await stripeGet(env, `/checkout/sessions/${sessionId}?expand[]=line_items`);
  if (!isEventOrder(s)) return { skipped: true };
  const notes = await readNotes(env);
  if (notes[s.id] && notes[s.id].confirm) return { duplicate: true };
  const events = await readEventsKV(env);
  const ev = eventFor(events, s);
  const o = orderView(s, {}, {});
  const ctx = { site: env.SITE_URL };
  const out = { customer: false, owner: false };
  if (o.email) { try { await sendMail(env, o.email, buildEventEmail("confirm", o, ev, ctx)); out.customer = true; } catch (e) { console.log("event confirm failed", String(e)); } }
  for (const to of adminEmails(env)) { try { await sendMail(env, to, buildEventEmail("owner", o, ev, ctx)); out.owner = true; } catch (e) { console.log("event owner notice failed", String(e)); } }
  if (out.customer) await markNote(env, s.id, "confirm");
  return out;
}

// Daily job (7 AM Central): reminder to everyone with an unpicked order for an event happening tomorrow.
export async function eventReminders(env, stripeGet) {
  const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", hour12: false }).format(new Date())) % 24;
  if (hour !== 7) return "not 7 AM";
  const events = (await readEventsKV(env)).filter((e) => e.name && e.date === tomorrowCentral()).slice(0, 3);
  let sent = 0;
  for (const ev of events) { const r = await sendBulk(env, stripeGet, ev, "reminder", 40); sent += r.sent; }
  return events.length ? `reminders sent: ${sent}` : "none due";
}

async function eventOrders(env, stripeGet, ev) {
  const res = await stripeGet(env, "/checkout/sessions?limit=100&expand[]=data.line_items");
  const [st, notes] = await Promise.all([orderStatuses(env), readNotes(env)]);
  return res.data.filter((s) => isEventOrder(s) && (eventFor([ev], s))).map((s) => orderView(s, st, notes));
}

async function sendBulk(env, stripeGet, ev, kind, cap) {
  const list = (await eventOrders(env, stripeGet, ev)).filter((o) => !o.pickedUp && EMAIL_RE.test(o.email) && !(o.notified && o.notified[kind]));
  let sent = 0, failed = 0;
  for (const o of list.slice(0, cap)) {
    try { await sendMail(env, o.email, buildEventEmail(kind, o, ev, { site: env.SITE_URL })); await markNote(env, o.id, kind); sent++; } catch { failed++; }
  }
  return { sent, failed, remaining: Math.max(0, list.length - cap) };
}

// ---- admin routes ---------------------------------------------------------------------------------
export async function eventOrdersRoute(route, method, body, env, me, deps, j) {
  if (!/^ev-[a-z-]+$/.test(route)) return null;
  try {
    if (route === "ev-events" && method === "GET") {
      const t = todayCentral(), cut = new Date(Date.now() - 45 * 86400000).toISOString().slice(0, 10);
      const events = (await readEventsKV(env)).filter((e) => e.name && e.date >= cut).sort((a, b) => b.date.localeCompare(a.date)).map((e) => ({ id: e.id, name: e.name, date: e.date, location: e.location || "", time: e.time || "", past: e.date < t }));
      return j({ events });
    }
    const events = await readEventsKV(env);
    const ev = events.find((e) => e.id === body.eventId && EV_ID_RE.test(body.eventId || ""));
    if (!ev) return j({ error: "Pick an event first." }, 400);
    if (route === "ev-orders" && method === "POST") {
      const orders = (await eventOrders(env, deps.stripeGet, ev)).sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      const tally = {};
      for (const o of orders) if (!o.pickedUp) for (const i of o.items) tally[i.name] = (tally[i.name] || 0) + i.qty;
      return j({ event: { id: ev.id, name: ev.name, date: ev.date, location: ev.location || "", time: ev.time || "" }, orders, tally: Object.entries(tally).sort((a, b) => b[1] - a[1]).map(([name, qty]) => ({ name, qty })) });
    }
    if (route === "ev-notify" && method === "POST") {
      const kind = ["confirm", "reminder", "missed"].includes(body.kind) ? body.kind : null;
      if (!kind || !ID_RE.test(body.id || "")) return j({ error: "Bad request" }, 400);
      const s = await deps.stripeGet(env, `/checkout/sessions/${body.id}?expand[]=line_items`);
      if (!isEventOrder(s) || !eventFor([ev], s)) return j({ error: "That order is not for this event." }, 400);
      const o = orderView(s, {}, {});
      await sendMail(env, o.email, buildEventEmail(kind, o, ev, { site: env.SITE_URL }));
      await markNote(env, s.id, kind);
      return j({ ok: true });
    }
    if (route === "ev-bulk" && method === "POST") {
      const kind = ["reminder", "missed"].includes(body.kind) ? body.kind : null;
      if (!kind) return j({ error: "Bad request" }, 400);
      return j({ ok: true, ...(await sendBulk(env, deps.stripeGet, ev, kind, 30)) });
    }
    return j({ error: "Not found" }, 404);
  } catch (e) { return j({ error: e.message || "Something went wrong" }, 400); }
}
