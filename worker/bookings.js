// Booking invoices: for keynotes and other special engagements.
//   1. In the admin app you enter the event (date, place, expected attendees, speaker), the fee, and what you need from the client.
//   2. The client gets a link to a hosted page (served by this Worker, never expires until paid or cancelled) that shows the details,
//      offers copies of the book for their program, and sends them to Stripe Checkout to pay by card.
//   3. When Stripe says the payment went through, the webhook marks the booking paid and emails the client a detailed summary
//      (what to expect, what we need, terms) and emails the owner(s).
// Stored in ADMIN_KV key "bookinv" (an array). Prices for books come from the record, never from the browser.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const FOREST = "#1b3b22", GOLD = "#d4af37", CREAM = "#fcfaf7", INK = "#0e2012", LINEN = "#e5dbd1", MUTED = "#5c6b5f";
const SERIF = "Georgia,'Times New Roman',serif", SANS = "Helvetica,Arial,sans-serif";
const API = "https://api.stripe.com/v1";
const MAX_BOOKS = 500;

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const many = (v, n) => String(v == null ? "" : v).replace(/\r/g, "").trim().slice(0, n);
const money = (c) => "$" + ((Number(c) || 0) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/, TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const toCents = (v, max = 100000000) => { const n = Math.round(Number(String(v == null ? "" : v).replace(/[$,]/g, "")) * 100); return Number.isFinite(n) && n >= 0 && n <= max ? n : NaN; };

export const DEFAULTS = {
  expect: [
    "Your speaker arrives about 45 to 60 minutes before the program for a quick sound check and walk-through of the room.",
    "The program runs for the time on this summary. Time for audience questions is built in unless we agreed otherwise.",
    "Participants are invited to follow along with reflection exercises. If you ordered workbooks, we bring them with us on event day and can arrange a book signing afterward.",
    "After the event we send a short thank-you note and a link for feedback, and we are glad to talk about next steps or a follow-up session.",
  ].map((x) => "- " + x).join("\n"),
  need: [
    "A named on-site contact with a cell phone number we can reach on event day.",
    "Arrival and load-in time, parking and entry instructions, and the room or stage location.",
    "Room setup: seating style, lectern or open floor, a wireless or lapel microphone, and a projector and screen (HDMI) if slides are used.",
    "A short introduction for the speaker (we can send a bio) and the name of the person who will introduce them.",
    "Your final headcount at least 7 days before the event, and your final book quantity if you are adding workbooks.",
    "Your event's photo and recording policy, and whether we may take photos for our own use.",
    "Bottled water at the lectern, and a place to set up a small book table if you ordered books.",
  ].map((x) => "- " + x).join("\n"),
  terms: [
    "Your payment holds the date and speaker for your event.",
    "If you need to reschedule, tell us at least 14 days before the event and we will gladly move you to another available date at no charge.",
    "Cancellations less than 14 days before the event, or no-shows, are non-refundable because the date was held for you.",
    "If we must cancel for illness, weather, or an emergency, we will reschedule at no cost or refund what you paid.",
    "Event details above are our shared understanding. Please tell us right away if anything is wrong or changes.",
  ].map((x) => "- " + x).join("\n"),
};

// ---- storage ------------------------------------------------------------------------------------
export async function readBookings(env) {
  try { const a = JSON.parse((await env.ADMIN_KV.get("bookinv")) || "[]"); return Array.isArray(a) ? a : []; } catch { return []; }
}
const saveAll = (env, list) => env.ADMIN_KV.put("bookinv", JSON.stringify(list.slice(0, 500)));
const newId = () => { const b = new Uint8Array(12); crypto.getRandomValues(b); return Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join(""); };
const find = (list, id) => list.find((b) => b.id === id);

// ---- display helpers ------------------------------------------------------------------------------
export function dateLabel(d) {
  const e = d.event || {};
  let out = "";
  if (DATE_RE.test(e.date || "")) out = new Date(e.date + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const t = (x) => { if (!TIME_RE.test(x || "")) return ""; const [h, m] = x.split(":").map(Number); return ((h + 11) % 12 + 1) + ":" + String(m).padStart(2, "0") + " " + (h < 12 ? "AM" : "PM"); };
  const a = t(e.start), b = t(e.end);
  if (a) out += (out ? ", " : "") + a + (b ? " to " + b : "");
  return out || "Date to be confirmed";
}
const total = (b) => (b.feeCents || 0) + (b.travelCents || 0);
const dueNow = (b) => (b.depositCents > 0 && b.depositCents < total(b) ? b.depositCents : total(b));
const balance = (b) => total(b) - dueNow(b);

/** Plain text with "- " bullets -> HTML. */
function rich(text, style = "") {
  const lines = String(text || "").split("\n").map((x) => x.trim()).filter(Boolean);
  let html = "", list = [];
  const flush = () => { if (list.length) { html += `<ul style="margin:0 0 14px;padding-left:20px;${style}">` + list.map((x) => `<li style="margin:0 0 6px">${esc(x)}</li>`).join("") + "</ul>"; list = []; } };
  for (const l of lines) { if (/^[-*•]\s+/.test(l)) list.push(l.replace(/^[-*•]\s+/, "")); else { flush(); html += `<p style="margin:0 0 12px;${style}">${esc(l)}</p>`; } }
  flush();
  return html;
}
const bullets = (text) => String(text || "").split("\n").map((x) => x.trim()).filter(Boolean).map((x) => "- " + x.replace(/^[-*•]\s+/, "")).join("\n");

const detailRows = (b) => {
  const e = b.event || {}, c = b.client || {};
  return [
    ["Event", e.title], ["When", dateLabel(b)], ["Where", e.location], ["Estimated attendees", e.attendees ? String(e.attendees) : ""],
    ["Speaker", e.speaker], ["Prepared for", [c.name, c.org].filter(Boolean).join(", ")],
  ].filter((r) => r[1]);
};
const detailTable = (b) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid ${LINEN};border-radius:12px;margin:0 0 18px">` +
  detailRows(b).map((r, i) => `<tr><td style="padding:10px 14px;font:700 12px ${SANS};letter-spacing:.08em;text-transform:uppercase;color:${MUTED};width:38%;border-top:${i ? "1px solid " + LINEN : "0"}">${esc(r[0])}</td><td style="padding:10px 14px;font:16px/1.4 ${SANS};color:${INK};border-top:${i ? "1px solid " + LINEN : "0"}">${esc(r[1])}</td></tr>`).join("") + "</table>";
const detailText = (b) => detailRows(b).map((r) => r[0] + ": " + r[1]).join("\n");

// ---- email --------------------------------------------------------------------------------------
async function sendMail(env, to, subject, html, text) {
  if (!env.MAIL_URL || !env.MAIL_SECRET) throw new Error("Email is not set up");
  if (!EMAIL_RE.test(to || "")) throw new Error("That booking has no valid email address.");
  const res = await fetch(env.MAIL_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action: "send_html", secret: env.MAIL_SECRET, to, subject, html, text }) });
  const out = await res.json().catch(() => null);
  if (!res.ok || !out || out.ok !== true) throw new Error("The email did not send.");
}
const P = (t) => `<p style="font:16px/1.65 ${SANS};color:${INK};margin:0 0 14px">${t}</p>`;
const H2 = (t) => `<h2 style="font:700 20px/1.3 ${SERIF};color:${FOREST};margin:22px 0 10px">${esc(t)}</h2>`;
function frame(title, inner, site) {
  return `<!doctype html><html><body style="margin:0;background:${CREAM}"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM}"><tr><td align="center" style="padding:24px 12px">` +
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border:1px solid ${LINEN};border-radius:18px;overflow:hidden">` +
    `<tr><td align="center" style="background:${FOREST};padding:24px"><a href="${site}" style="font:700 26px ${SERIF};color:#fff;text-decoration:none">Queen E's Heirr</a></td></tr><tr><td style="height:5px;background:${GOLD}"></td></tr>` +
    `<tr><td style="padding:30px 28px 18px"><h1 style="font:700 26px/1.2 ${SERIF};color:${FOREST};margin:0 0 18px">${esc(title)}</h1>${inner}</td></tr>` +
    `<tr><td align="center" style="background:${FOREST};padding:16px 24px;font:12px/1.7 ${SANS};color:#cfd8cd">Queen E's Heirr &middot; <a href="${site}" style="color:${GOLD}">queenesheirr.com</a> &middot; info@queenesheirr.com</td></tr></table></td></tr></table></body></html>`;
}
const button = (url, label) => `<p style="margin:22px 0"><a href="${esc(url)}" style="display:inline-block;background:${FOREST};color:#fff;text-decoration:none;font:700 14px ${SANS};letter-spacing:.08em;text-transform:uppercase;padding:14px 26px;border-radius:999px">${esc(label)}</a></p>`;
const siteOf = (env) => env.SITE_URL || "https://queenesheirr.com";
const linkOf = (origin, b) => `${origin}/booking/${b.id}`;
const owners = (env) => String(env.ADMIN_EMAILS || "").split(",").map((x) => x.trim()).filter((x) => EMAIL_RE.test(x)).slice(0, 5);

export async function emailLink(env, b, origin) {
  const first = String((b.client && b.client.name) || "").trim().split(/\s+/)[0] || "there";
  const url = linkOf(origin, b);
  const html = frame("Your booking is ready to confirm",
    P(`Hi ${esc(first)},`) + P("Thank you for choosing Queen E's Heirr. Here are the details of your booking. Please look them over, and use the button below to confirm and pay securely by card. You will also have the chance to add copies of the J.U.D.A.H. workbook for your program.") +
    detailTable(b) + P(`<strong>Amount due now:</strong> ${esc(money(dueNow(b)))}` + (balance(b) > 0 ? ` (balance of ${esc(money(balance(b)))} due before the event)` : "")) +
    button(url, "Review and pay") + P(`If anything above is not right, reply to this email or write info@queenesheirr.com and we will fix it before you pay.`), siteOf(env));
  const text = `Hi ${first},\n\nHere are the details of your booking with Queen E's Heirr:\n\n${detailText(b)}\n\nAmount due now: ${money(dueNow(b))}\n\nReview and pay: ${url}\n\nIf anything is not right, reply to this email.`;
  await sendMail(env, b.client.email, `Your Queen E's Heirr booking: ${one((b.event || {}).title, 80)}`, html, text);
}

function summaryParts(b) {
  const paid = b.paid || {};
  const lines = [["Booking", money(dueNow(b) + 0)]];
  const rows = [];
  rows.push(["Booking fee" + (b.depositCents > 0 && b.depositCents < total(b) ? " (deposit)" : ""), money(dueNow(b))]);
  if (paid.booksQty > 0 && b.book) rows.push([`${esc0(b.book.name)}${b.book.size ? " (" + esc0(b.book.size) + ")" : ""} x ${paid.booksQty}`, money(paid.booksQty * b.book.unitCents)]);
  return { rows, lines };
}
const esc0 = (s) => String(s == null ? "" : s);

export async function emailSummary(env, b, origin) {
  const first = String((b.client && b.client.name) || "").trim().split(/\s+/)[0] || "there";
  const paid = b.paid || {};
  const sp = summaryParts(b);
  const payTable = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 6px">` +
    sp.rows.map((r) => `<tr><td style="padding:6px 0;font:15px ${SANS};color:${INK}">${esc(r[0])}</td><td align="right" style="padding:6px 0;font:15px ${SANS};color:${INK}">${esc(r[1])}</td></tr>`).join("") +
    `<tr><td style="padding:8px 0;border-top:1px solid ${LINEN};font:700 15px ${SANS};color:${FOREST}">Total paid${paid.manual ? " (recorded by us)" : ""}</td><td align="right" style="padding:8px 0;border-top:1px solid ${LINEN};font:700 15px ${SANS};color:${FOREST}">${esc(money(paid.paidCents != null ? paid.paidCents : dueNow(b)))}</td></tr></table>`;
  const html = frame("You are booked!",
    P(`Hi ${esc(first)},`) + P("Thank you! Your payment came through and your date is held. Here is everything in one place: what is booked, what to expect, and what we need from you so the day goes beautifully.") +
    detailTable(b) + H2("Payment summary") + payTable +
    (balance(b) > 0 ? P(`<strong>Remaining balance:</strong> ${esc(money(balance(b)))}, due before the event. We will send that invoice separately.`) : "") +
    (paid.booksQty > 0 ? P(`<strong>Books for your program:</strong> ${esc(String(paid.booksQty))} ${paid.booksQty === 1 ? "copy" : "copies"}. ${esc((b.book && b.book.delivery) || "We bring them with us on event day.")}`) : "") +
    H2("What to expect") + rich(b.expect) + H2("What we need from you") + rich(b.need) +
    (b.notes ? H2("A note from us") + rich(b.notes) : "") + H2("Terms of this booking") + rich(b.terms, `font-size:14px;color:${MUTED}`) +
    P("Questions at any time? Reply to this email or write info@queenesheirr.com. We are excited to be with you."), siteOf(env));
  const text = `Hi ${first},\n\nThank you! Your payment came through and your date is held.\n\n${detailText(b)}\n\nPaid: ${money(paid.paidCents != null ? paid.paidCents : dueNow(b))}${paid.booksQty > 0 ? `\nBooks: ${paid.booksQty}` : ""}${balance(b) > 0 ? `\nRemaining balance: ${money(balance(b))} (we will invoice separately)` : ""}\n\nWHAT TO EXPECT\n${bullets(b.expect)}\n\nWHAT WE NEED FROM YOU\n${bullets(b.need)}\n${b.notes ? "\nA NOTE FROM US\n" + b.notes + "\n" : ""}\nTERMS\n${bullets(b.terms)}\n\nQuestions? Reply to this email or write info@queenesheirr.com.`;
  await sendMail(env, b.client.email, `You are booked: ${one((b.event || {}).title, 80)}`, html, text);
}

async function emailOwners(env, b, origin) {
  const paid = b.paid || {};
  for (const to of owners(env)) {
    try {
      await sendMail(env, to, `Booking paid: ${one((b.event || {}).title, 70)}`,
        frame("Booking paid", P(`<strong>${esc((b.client || {}).name || "A client")}</strong> paid <strong>${esc(money(paid.paidCents))}</strong>${paid.booksQty > 0 ? ` including ${esc(String(paid.booksQty))} book${paid.booksQty === 1 ? "" : "s"}` : ""}.`) + detailTable(b) +
          P(`Phone: ${esc((b.client || {}).phone || "not given")}<br>Email: ${esc((b.client || {}).email || "")}`) + P("The client was emailed the summary of what to expect and what we need. Manage it in the admin app under Booking Invoices."), siteOf(env)),
        `Booking paid: ${(b.client || {}).name}\nPaid: ${money(paid.paidCents)}${paid.booksQty > 0 ? ` (${paid.booksQty} books)` : ""}\n\n${detailText(b)}\nPhone: ${(b.client || {}).phone || ""}\nEmail: ${(b.client || {}).email || ""}`);
    } catch (e) { console.log("booking owner notice failed", String(e)); }
  }
}

// ---- payment ------------------------------------------------------------------------------------
async function createCheckout(env, b, qty, origin) {
  const e = b.event || {};
  const p = new URLSearchParams();
  const tax = env.TAX_ENABLED === "true";
  p.set("mode", "payment");
  p.set("success_url", `${origin}/booking/${b.id}?paid=1`);
  p.set("cancel_url", `${origin}/booking/${b.id}`);
  p.set("customer_email", b.client.email);
  p.set("metadata[kind]", "booking");
  p.set("metadata[booking_id]", b.id);
  p.set("metadata[books_qty]", String(qty));
  p.set("metadata[fulfillment]", "booking");
  p.set("line_items[0][quantity]", "1");
  p.set("line_items[0][price_data][currency]", "usd");
  p.set("line_items[0][price_data][unit_amount]", String(dueNow(b)));
  p.set("line_items[0][price_data][product_data][name]", one(`${e.title}${balance(b) > 0 ? " (deposit)" : ""}`, 120));
  p.set("line_items[0][price_data][product_data][description]", one(`${dateLabel(b)}${e.location ? " · " + e.location : ""}${e.speaker ? " · Speaker: " + e.speaker : ""}`, 300));
  if (tax) p.set("line_items[0][price_data][tax_behavior]", "exclusive");
  if (qty > 0 && b.book) {
    p.set("line_items[1][quantity]", String(qty));
    p.set("line_items[1][price_data][currency]", "usd");
    p.set("line_items[1][price_data][unit_amount]", String(b.book.unitCents));
    p.set("line_items[1][price_data][product_data][name]", one(`${b.book.name}${b.book.size ? " (" + b.book.size + ")" : ""} for your program`, 120));
    if (tax) p.set("line_items[1][price_data][tax_behavior]", "exclusive");
  }
  if (tax) { p.set("automatic_tax[enabled]", "true"); p.set("billing_address_collection", "required"); }
  p.set("custom_text[submit][message]", "By paying you agree to the booking terms shown on the previous page.");
  const res = await fetch(`${API}/checkout/sessions`, { method: "POST", headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" }, body: p });
  const data = await res.json();
  if (!res.ok || !data.url) { console.log("booking checkout error", res.status, JSON.stringify(data.error || {})); throw new Error("Could not start checkout"); }
  return data.url;
}

/** Stripe webhook: a booking checkout was paid. Safe to run twice. */
export async function onBookingPaid(env, session, origin, deps = {}) {
  const md = session.metadata || {};
  if (md.kind !== "booking") return { skipped: true };
  const list = await readBookings(env), b = find(list, md.booking_id);
  if (!b) { console.log("booking not found", md.booking_id); return { missing: true }; }
  if (b.status === "paid" && b.paid && b.paid.sessionId === session.id) return { duplicate: true };
  const qty = Math.max(0, Math.min(MAX_BOOKS, parseInt(md.books_qty, 10) || 0));
  b.status = "paid";
  b.paid = { at: Date.now(), sessionId: session.id, booksQty: b.book ? qty : 0, paidCents: session.amount_total != null ? session.amount_total : dueNow(b) + qty * ((b.book && b.book.unitCents) || 0), email: (session.customer_details && session.customer_details.email) || b.client.email };
  await saveAll(env, list);
  if (qty > 0 && b.book && b.book.priceId && deps.stripeGet && deps.stripePost && deps.stockOf) {
    try {   // keep the shop's book count right
      const pr = await deps.stripeGet(env, `/prices/${b.book.priceId}`); const stock = deps.stockOf(pr);
      if (stock !== null) await deps.stripePost(env, `/prices/${b.book.priceId}`, new URLSearchParams({ "metadata[stock]": String(Math.max(0, stock - qty)) }));
    } catch (e) { console.log("book stock update failed", String(e)); }
  }
  try { await emailSummary(env, b, origin); b.summarySentAt = Date.now(); await saveAll(env, list); } catch (e) { console.log("booking summary email failed", String(e)); }
  await emailOwners(env, b, origin);
  return { ok: true };
}

// ---- public page ----------------------------------------------------------------------------------
const PAGE_HEADERS = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive", "Referrer-Policy": "no-referrer", "X-Frame-Options": "DENY",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'" };

function pageShell(title, inner) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)}</title>
<style>*{box-sizing:border-box}body{margin:0;background:${CREAM};color:${INK};font:16px/1.6 ${SANS}}header{background:${FOREST};text-align:center;padding:22px 16px;border-bottom:5px solid ${GOLD}}header span{font:700 26px ${SERIF};color:#fff}
main{max-width:680px;margin:0 auto;padding:28px 16px 60px}h1{font:700 30px/1.2 ${SERIF};color:${FOREST};margin:0 0 6px}h2{font:700 20px ${SERIF};color:${FOREST};margin:28px 0 10px}.card{background:#fff;border:1px solid ${LINEN};border-radius:18px;padding:20px;margin:16px 0}
dl{margin:0;display:grid;grid-template-columns:minmax(110px,32%) 1fr;gap:10px 14px}dt{font:700 12px ${SANS};letter-spacing:.08em;text-transform:uppercase;color:${MUTED};padding-top:3px}dd{margin:0}
.row{display:flex;justify-content:space-between;gap:12px;padding:6px 0}.tot{border-top:1px solid ${LINEN};margin-top:8px;padding-top:10px;font-weight:700;color:${FOREST}}.muted{color:${MUTED};font-size:14px}
.qty{display:flex;align-items:center;gap:10px;margin:10px 0}.qty button{width:44px;height:44px;border-radius:50%;border:1px solid ${FOREST};background:#fff;font-size:22px;color:${FOREST};cursor:pointer}.qty input{width:84px;height:44px;text-align:center;font-size:18px;border:1px solid ${LINEN};border-radius:10px}
.pay{display:block;width:100%;background:${FOREST};color:#fff;border:0;border-radius:999px;padding:16px;font:700 15px ${SANS};letter-spacing:.08em;text-transform:uppercase;cursor:pointer}.pay[disabled]{opacity:.6}.err{color:#a02020;margin:10px 0 0;min-height:1.2em}
.notice{background:#f4ecd0;border:1px solid ${GOLD};border-radius:12px;padding:14px;margin:16px 0}ul{padding-left:20px}li{margin:0 0 6px}</style></head><body><header><span>Queen E's Heirr</span></header><main>${inner}</main></body></html>`;
}
const detailList = (b) => `<dl>${detailRows(b).map((r) => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl>`;

function bookingPage(b, origin) {
  const e = b.event || {};
  if (b.status === "cancelled") return pageShell("Booking", `<h1>This booking is no longer active</h1><p>Please contact us at <a href="mailto:info@queenesheirr.com">info@queenesheirr.com</a> if you have questions.</p>`);
  if (b.status === "paid") {
    return pageShell("Booking confirmed", `<h1>You are booked!</h1><p>Thank you. Your payment came through. We emailed a full summary of what to expect and what we need from you to <strong>${esc((b.paid && b.paid.email) || b.client.email)}</strong>.</p><div class="card">${detailList(b)}</div>` +
      `<h2>What to expect</h2>${rich(b.expect)}<h2>What we need from you</h2>${rich(b.need)}<p class="muted">Questions? Write <a href="mailto:info@queenesheirr.com">info@queenesheirr.com</a>.</p>`);
  }
  const bk = b.book;
  const dn = dueNow(b), bal = balance(b);
  const upsell = bk ? `<div class="card"><h2 style="margin-top:0">Add the book for your program</h2><p>Give every participant their own copy of <strong>${esc(bk.name)}${bk.size ? " (" + esc(bk.size) + ")" : ""}</strong>.` +
    (bk.regularCents && bk.regularCents > bk.unitCents ? ` Program price <strong>${esc(money(bk.unitCents))}</strong> each <span class="muted">(regularly ${esc(money(bk.regularCents))})</span>.` : ` <strong>${esc(money(bk.unitCents))}</strong> each.`) +
    ` ${esc(bk.delivery || "We bring them with us on event day.")}</p>` +
    `<div class="qty"><button type="button" id="minus" aria-label="One fewer copy">&minus;</button><input id="qty" type="number" inputmode="numeric" min="0" max="${MAX_BOOKS}" value="${bk.suggestedQty > 0 ? Math.min(MAX_BOOKS, bk.suggestedQty) : 0}" aria-label="Number of copies"><button type="button" id="plus" aria-label="One more copy">+</button><span class="muted">copies</span></div></div>` : "";
  return pageShell(`Booking: ${e.title || ""}`,
    `<h1>${esc(e.title || "Your booking")}</h1><p class="muted">Please review the details, then confirm and pay securely by card.</p><div class="card">${detailList(b)}</div>` +
    (b.notes ? `<div class="notice">${rich(b.notes)}</div>` : "") +
    `<div class="card"><div class="row"><span>${esc(e.title || "Booking")} ${bal > 0 ? "(deposit)" : ""}</span><span>${esc(money(dn))}</span></div>` +
    `<div class="row" id="booksrow" style="display:none"><span id="bookslbl"></span><span id="booksamt"></span></div><div class="row tot"><span>Total today (before any sales tax)</span><span id="grand">${esc(money(dn))}</span></div>` +
    (bal > 0 ? `<p class="muted" style="margin:6px 0 0">Remaining balance of ${esc(money(bal))} is due before the event; we will send it separately.</p>` : "") + `</div>` + upsell +
    `<h2>Terms of this booking</h2><div class="muted">${rich(b.terms)}</div>` +
    `<div class="card" style="text-align:center"><button class="pay" id="pay" type="button">Confirm and pay</button><p class="err" id="err" role="alert"></p><p class="muted" style="margin:0">Payments are processed securely by Stripe. By paying you agree to the terms above.</p></div>` +
    `<script>(function(){var due=${dn},unit=${bk ? bk.unitCents : 0},max=${MAX_BOOKS},name=${JSON.stringify(bk ? bk.name : "")};var q=document.getElementById("qty");
function money(c){return "$"+(c/100).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});}
function qv(){if(!q)return 0;var n=parseInt(q.value,10);if(!(n>0))n=0;if(n>max)n=max;return n;}
function upd(){var n=qv();if(q)q.value=n;var r=document.getElementById("booksrow");if(r){r.style.display=n?"flex":"none";document.getElementById("bookslbl").textContent=name+" x "+n;document.getElementById("booksamt").textContent=money(n*unit);}document.getElementById("grand").textContent=money(due+n*unit);}
if(q){q.addEventListener("input",upd);document.getElementById("minus").addEventListener("click",function(){q.value=Math.max(0,qv()-1);upd();});document.getElementById("plus").addEventListener("click",function(){q.value=Math.min(max,qv()+1);upd();});}
upd();
document.getElementById("pay").addEventListener("click",function(){var btn=this,err=document.getElementById("err");err.textContent="";btn.disabled=true;
fetch(location.pathname+"/pay",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({qty:qv()})}).then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||"Something went wrong");return d;});})
.then(function(d){if(!d.url||d.url.indexOf("https://checkout.stripe.com/")!==0)throw new Error("Unexpected response");location.href=d.url;}).catch(function(e){err.textContent=e.message;btn.disabled=false;});});})();</script>`);
}

export async function publicBooking(request, env, url, deps = {}) {
  const m = url.pathname.match(/^\/booking\/([a-f0-9]{24})(\/pay)?$/);
  if (!m || !env.ADMIN_KV) return null;
  const list = await readBookings(env), b = find(list, m[1]);
  const notFound = () => new Response(pageShell("Booking", `<h1>We could not find that booking</h1><p>Please check the link in your email, or write <a href="mailto:info@queenesheirr.com">info@queenesheirr.com</a>.</p>`), { status: 404, headers: PAGE_HEADERS });
  if (!m[2]) {
    if (request.method !== "GET") return null;
    if (b && (b.status === "sent" || b.status === "draft") && url.searchParams.get("paid") === "1") return new Response(pageShell("Booking", `<h1>Thank you!</h1><p>Your payment is being confirmed. This usually takes under a minute. Please refresh this page shortly, and watch your email for the full summary.</p>`), { headers: PAGE_HEADERS });
    return b ? new Response(bookingPage(b, url.origin), { headers: PAGE_HEADERS }) : notFound();
  }
  if (request.method !== "POST") return null;
  const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) return J({ error: "Origin not allowed" }, 403);
  if (!b) return J({ error: "That booking was not found" }, 404);
  if (b.status === "paid") return J({ error: "This booking is already paid. Thank you!" }, 400);
  if (b.status === "cancelled") return J({ error: "This booking is no longer active." }, 400);
  try {
    const ip = request.headers.get("CF-Connecting-IP") || "x", k = `rl:book:${ip}:${Math.floor(Date.now() / 3600000)}`;
    const n = parseInt((await env.ADMIN_KV.get(k)) || "0", 10);
    if (n >= 20) return J({ error: "Too many tries. Please wait a little while and try again." }, 429);
    await env.ADMIN_KV.put(k, String(n + 1), { expirationTtl: 3700 });
  } catch { /* storage hiccup: do not block */ }
  const body = await request.json().catch(() => ({}));
  let qty = b.book ? parseInt(body.qty, 10) : 0; if (!(qty > 0)) qty = 0; qty = Math.min(qty, MAX_BOOKS);
  if (qty > 0 && b.book && b.book.priceId && deps.stripeGet && deps.stockOf) {
    try { const pr = await deps.stripeGet(env, `/prices/${b.book.priceId}`); const st = deps.stockOf(pr); if (st !== null && qty > st) return J({ error: `We only have ${st} ${st === 1 ? "copy" : "copies"} on hand right now. Please lower the number or contact us for a larger order.` }, 400); } catch { /* let checkout proceed */ }
  }
  try { return J({ url: await createCheckout(env, b, qty, url.origin) }); }
  catch { return J({ error: "We could not start checkout. Please try again, or contact us." }, 502); }
}

// ---- admin ----------------------------------------------------------------------------------------
function clean(body, old, books) {
  const c = body.client || {}, e = body.event || {}, bk = body.book || {};
  const client = { name: one(c.name, 100), org: one(c.org, 120), email: one(c.email, 200).toLowerCase(), phone: one(c.phone, 40) };
  if (!client.name) throw new Error("Add the client's name.");
  if (!EMAIL_RE.test(client.email)) throw new Error("Add a valid client email. Stripe sends the receipt there.");
  const event = { title: one(e.title, 140), date: DATE_RE.test(e.date || "") ? e.date : "", start: TIME_RE.test(e.start || "") ? e.start : "", end: TIME_RE.test(e.end || "") ? e.end : "", location: one(e.location, 240), attendees: Math.max(0, Math.min(100000, parseInt(e.attendees, 10) || 0)), speaker: one(e.speaker, 120) };
  if (!event.title) throw new Error("Add an event name.");
  if (!event.date) throw new Error("Choose the event date.");
  const feeCents = toCents(body.fee); if (!(feeCents >= 50)) throw new Error("Enter the fee, for example 1500.00.");
  const travelCents = body.travel === "" || body.travel == null ? 0 : toCents(body.travel); if (Number.isNaN(travelCents)) throw new Error("Check the travel amount.");
  const depositCents = body.deposit === "" || body.deposit == null ? 0 : toCents(body.deposit); if (Number.isNaN(depositCents)) throw new Error("Check the deposit amount.");
  if (depositCents > 0 && (depositCents < 50 || depositCents >= feeCents + travelCents)) throw new Error("The deposit must be less than the total, or leave it blank to collect the full amount.");
  let book = null;
  if (bk.key) {
    const [pid, label] = String(bk.key).split("|");
    const prod = books.find((p) => p.id === pid), size = prod && prod.sizes.find((s) => s.label === label);
    if (!size) throw new Error("That book is no longer in the shop. Choose another or turn off the book offer.");
    const unit = bk.unit === "" || bk.unit == null ? size.cents : toCents(bk.unit, 1000000);
    if (!(unit >= 50)) throw new Error("Check the program price for the book.");
    book = { productId: pid, name: prod.name, size: label, priceId: size.priceId || "", regularCents: size.cents, unitCents: unit, suggestedQty: Math.max(0, Math.min(MAX_BOOKS, parseInt(bk.suggestedQty, 10) || 0)), delivery: one(bk.delivery, 200) || "We bring them with us on event day." };
  }
  return {
    id: old ? old.id : newId(), createdAt: old ? old.createdAt : Date.now(), status: old ? old.status : "draft",
    client, event, feeCents, travelCents, depositCents, book,
    expect: many(body.expect, 4000), need: many(body.need, 4000), terms: many(body.terms, 4000), notes: many(body.notes, 1500),
    sentAt: old ? old.sentAt : null, paid: old ? old.paid : null, summarySentAt: old ? old.summarySentAt : null, internal: many(body.internal, 1500),
  };
}

export async function bookingsRoute(route, method, body, env, me, deps, j, origin) {
  if (!/^bookinv(-[a-z]+)?$/.test(route)) return null;
  try {
    const books = async () => { try { return (await deps.loadCatalog(env)).filter((p) => p.category === "Books" || /j\.?u\.?d\.?a\.?h|workbook|book/i.test(p.name)); } catch { return []; } };
    if (route === "bookinv" && method === "GET") {
      const list = await readBookings(env);
      const bl = await books();
      return j({
        bookings: list.sort((a, b) => b.createdAt - a.createdAt).map((b) => ({ ...b, link: linkOf(origin, b), total: total(b), dueNow: dueNow(b) })),
        books: bl.flatMap((p) => p.sizes.map((s) => ({ key: p.id + "|" + s.label, label: `${p.name} (${s.label}) ${money(s.cents)}`, cents: s.cents }))),
        defaults: DEFAULTS,
      });
    }
    if (method !== "POST") return null;
    const list = await readBookings(env);
    if (route === "bookinv-save") {
      const old = body.id ? find(list, String(body.id)) : null;
      if (body.id && !old) return j({ error: "That booking was not found." }, 404);
      if (old && (old.status === "paid" || old.status === "cancelled")) return j({ error: "A paid or cancelled booking cannot be edited." }, 400);
      const rec = clean(body, old, await books());
      if (old) list[list.indexOf(old)] = rec; else list.unshift(rec);
      await saveAll(env, list);
      return j({ ok: true, booking: { ...rec, link: linkOf(origin, rec), total: total(rec), dueNow: dueNow(rec) } });
    }
    const b = find(list, String(body.id || ""));
    if (!b) return j({ error: "That booking was not found." }, 404);
    if (route === "bookinv-send") {
      if (b.status === "paid" || b.status === "cancelled") return j({ error: "That booking is " + b.status + "." }, 400);
      await emailLink(env, b, origin);
      b.status = "sent"; b.sentAt = Date.now(); await saveAll(env, list);
      return j({ ok: true });
    }
    if (route === "bookinv-cancel") {
      if (b.status === "paid") return j({ error: "A paid booking cannot be cancelled here. Refund it in Stripe first." }, 400);
      b.status = "cancelled"; await saveAll(env, list); return j({ ok: true });
    }
    if (route === "bookinv-delete") {
      if (b.status === "paid") return j({ error: "A paid booking cannot be deleted." }, 400);
      await saveAll(env, list.filter((x) => x !== b)); return j({ ok: true });
    }
    if (route === "bookinv-paid") {   // paid another way (check, cash, Zelle)
      if (b.status === "paid" || b.status === "cancelled") return j({ error: "That booking is " + b.status + "." }, 400);
      const qty = b.book ? Math.max(0, Math.min(MAX_BOOKS, parseInt(body.booksQty, 10) || 0)) : 0;
      b.status = "paid"; b.paid = { at: Date.now(), sessionId: "manual", manual: true, booksQty: qty, paidCents: dueNow(b) + qty * (b.book ? b.book.unitCents : 0), email: b.client.email, note: one(body.note, 200) };
      await saveAll(env, list);
      if (body.email !== false) { try { await emailSummary(env, b, origin); b.summarySentAt = Date.now(); await saveAll(env, list); } catch (e) { return j({ ok: true, warning: "Marked paid, but the summary email did not send: " + e.message }); } }
      return j({ ok: true });
    }
    if (route === "bookinv-summary") {
      if (b.status !== "paid") return j({ error: "The summary goes out after payment." }, 400);
      await emailSummary(env, b, origin); b.summarySentAt = Date.now(); await saveAll(env, list); return j({ ok: true });
    }
    return null;
  } catch (e) { return j({ error: e.message || "Something went wrong" }, 400); }
}
