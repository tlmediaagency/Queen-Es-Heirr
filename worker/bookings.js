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
const MAX_BOOKS = 500, MAX_DOCS = 3, MAX_DOC_MB = 3;

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
  let list = [];
  try { const a = JSON.parse((await env.ADMIN_KV.get("bookinv")) || "[]"); list = Array.isArray(a) ? a : []; } catch { list = []; }
  let has = false; try { has = !!(await env.ADMIN_KV.get("bkw9meta")); } catch { has = false; }
  for (const b of list) b.hasW9 = has;
  return list;
}
const saveAll = (env, list) => env.ADMIN_KV.put("bookinv", JSON.stringify(list.slice(0, 500).map((b) => { const { hasW9, ...rest } = b; return rest; })));
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
const BASE = "https://queenes-checkout.summer-paper-e090.workers.dev";
const originOf = (env, b) => b.origin || env.BOOKING_ORIGIN || BASE;
const w9Link = (env, b) => `${originOf(env, b)}/booking/${b.id}/w9`;
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

const INTAKE_NO = { link: "Link to the forms", files: "Forms attached on the booking page", later: "They will send the forms later" };
function intakeLines(b) {
  const i = b.intake; if (!i) return [];
  const out = [];
  if (i.vendor === "yes") {
    out.push(["Vendor forms required", "Yes. " + (INTAKE_NO[i.method] || "")]);
    if (i.method === "link" && i.link) out.push(["Forms link", i.link]);
    if (i.method === "files") out.push(["Forms attached", String((b.docs || []).length) + " file" + ((b.docs || []).length === 1 ? "" : "s")]);
  } else out.push(["Vendor forms required", "No"]);
  out.push(["W-9", i.w9 === "yes" ? "Requested (link provided)" : "Not needed"]);
  if (i.note) out.push(["Their note", i.note]);
  return out;
}
const intakeHtml = (b) => { const l = intakeLines(b); return l.length ? H2("Paperwork") + `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">` + l.map((r) => `<tr><td style="padding:4px 0;font:700 13px ${SANS};color:${MUTED};width:42%">${esc(r[0])}</td><td style="padding:4px 0;font:15px ${SANS};color:${INK}">${esc(r[1])}</td></tr>`).join("") + "</table>" : ""; };
const intakeText = (b) => { const l = intakeLines(b); return l.length ? "\nPAPERWORK\n" + l.map((r) => r[0] + ": " + r[1]).join("\n") + "\n" : ""; };

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
    button(url, "Review and pay") + P(`Need to tell us more about your event? Our <a href="${esc(siteOf(env))}/training/#ask">program request form</a> is the best place to do it.`) + P(`If anything above is not right, reply to this email or write info@queenesheirr.com and we will fix it before you pay.`), siteOf(env));
  const text = `Hi ${first},\n\nHere are the details of your booking with Queen E's Heirr:\n\n${detailText(b)}\n\nAmount due now: ${money(dueNow(b))}\n\nReview and pay: ${url}\n\nMore about your event? ${siteOf(env)}/training/#ask\n\nIf anything is not right, reply to this email.`;
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
    (balance(b) > 0 ? P(`<strong>Remaining balance:</strong> ${esc(money(balance(b)))}, due before the event. We will email you the invoice 5 days before your event.`) : "") +
    (paid.booksQty > 0 ? P(`<strong>Books for your program:</strong> ${esc(String(paid.booksQty))} ${paid.booksQty === 1 ? "copy" : "copies"}. ${esc((b.book && b.book.delivery) || "We bring them with us on event day.")}`) : "") +
    intakeHtml(b) + (b.intake && b.intake.vendor === "yes" && b.intake.method === "later" ? P("Please email your vendor forms to info@queenesheirr.com when you have them. We will complete them promptly.") : "") +
    (b.intake && b.intake.w9 === "yes" ? (b.hasW9 ? P(`As you asked, here is our W-9: <a href="${esc(w9Link(env, b))}">download our W-9</a>.`) : P("As you asked, we will email you our W-9 shortly.")) : "") +
    H2("What to expect") + rich(b.expect) + H2("What we need from you") + rich(b.need) +
    (b.notes ? H2("A note from us") + rich(b.notes) : "") + H2("Terms of this booking") + rich(b.terms, `font-size:14px;color:${MUTED}`) +
    P("Questions at any time? Reply to this email or write info@queenesheirr.com. We are excited to be with you."), siteOf(env));
  const text = `Hi ${first},\n\nThank you! Your payment came through and your date is held.\n\n${detailText(b)}\n\nPaid: ${money(paid.paidCents != null ? paid.paidCents : dueNow(b))}${paid.booksQty > 0 ? `\nBooks: ${paid.booksQty}` : ""}${balance(b) > 0 ? `\nRemaining balance: ${money(balance(b))} (we will email the invoice 5 days before your event)` : ""}\n${intakeText(b)}${b.intake && b.intake.vendor === "yes" && b.intake.method === "later" ? "\nPlease email your vendor forms to info@queenesheirr.com when you have them.\n" : ""}${b.intake && b.intake.w9 === "yes" ? (b.hasW9 ? "\nOur W-9: " + w9Link(env, b) + "\n" : "\nWe will email you our W-9 shortly.\n") : ""}\nWHAT TO EXPECT\n${bullets(b.expect)}\n\nWHAT WE NEED FROM YOU\n${bullets(b.need)}\n${b.notes ? "\nA NOTE FROM US\n" + b.notes + "\n" : ""}\nTERMS\n${bullets(b.terms)}\n\nQuestions? Reply to this email or write info@queenesheirr.com.`;
  await sendMail(env, b.client.email, `You are booked: ${one((b.event || {}).title, 80)}`, html, text);
}

async function emailBalanceReceipt(env, b) {
  const first = String((b.client && b.client.name) || "").trim().split(/\s+/)[0] || "there", c = b.balancePaid ? b.balancePaid.cents : balance(b);
  await sendMail(env, b.client.email, `Balance received: ${one((b.event || {}).title, 70)}`, frame("Balance received", P(`Hi ${esc(first)},`) + P(`Thank you! We received your remaining balance of <strong>${esc(money(c))}</strong>. Your booking is paid in full.`) + detailTable(b) + P("We are looking forward to being with you."), siteOf(env)),
    `Hi ${first},\n\nThank you! We received your remaining balance of ${money(c)}. Your booking is paid in full.\n\n${detailText(b)}`);
}
async function emailOwners(env, b, origin) {
  const paid = b.paid || {};
  for (const to of owners(env)) {
    try {
      await sendMail(env, to, `Booking paid: ${one((b.event || {}).title, 70)}`,
        frame("Booking paid", P(`<strong>${esc((b.client || {}).name || "A client")}</strong> paid <strong>${esc(money(paid.paidCents))}</strong>${paid.booksQty > 0 ? ` including ${esc(String(paid.booksQty))} book${paid.booksQty === 1 ? "" : "s"}` : ""}.`) + detailTable(b) +
          P(`Phone: ${esc((b.client || {}).phone || "not given")}<br>Email: ${esc((b.client || {}).email || "")}`) + intakeHtml(b) + (b.intake && b.intake.vendor === "yes" ? P("<strong>Vendor forms are required.</strong> See Booking Invoices in the admin app for their link or files.") : "") + P("The client was emailed the summary of what to expect and what we need. Manage it in the admin app under Booking Invoices."), siteOf(env)),
        `Booking paid: ${(b.client || {}).name}\nPaid: ${money(paid.paidCents)}${paid.booksQty > 0 ? ` (${paid.booksQty} books)` : ""}\n\n${detailText(b)}\nPhone: ${(b.client || {}).phone || ""}\nEmail: ${(b.client || {}).email || ""}\n${intakeText(b)}`);
    } catch (e) { console.log("booking owner notice failed", String(e)); }
  }
}

// ---- balance reminders ------------------------------------------------------------------------------
const balanceDue = (b) => b.status === "paid" && balance(b) > 0 && !b.balancePaid;
const chiToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
const daysUntil = (date) => Math.round((Date.parse(date + "T12:00:00Z") - Date.parse(chiToday() + "T12:00:00Z")) / 86400000);
// stage 1: 5 days out, stage 2: the day before, stage 3: the day of
export async function emailBalance(env, b, stage) {
  const first = String((b.client && b.client.name) || "").trim().split(/\s+/)[0] || "there";
  const url = linkOf(originOf(env, b), b), amt = money(balance(b));
  const lead = stage >= 3 ? "Your event is today, and the remaining balance has not come through yet." : stage === 2 ? "A friendly reminder: your event is tomorrow and the remaining balance is still open." : "Your event is coming up, and here is the invoice for the remaining balance.";
  const subj = (stage >= 3 ? "Balance due today: " : stage === 2 ? "Reminder, balance due: " : "Invoice for your remaining balance: ") + one((b.event || {}).title, 70);
  const html = frame(stage >= 3 ? "Balance due today" : stage === 2 ? "Balance reminder" : "Your remaining balance",
    P(`Hi ${esc(first)},`) + P(esc(lead)) + detailTable(b) + P(`<strong>Balance due:</strong> ${esc(amt)}`) + button(url, "Pay balance") +
    P("If you have already paid another way or have a question, just reply to this email and we will sort it out."), siteOf(env));
  await sendMail(env, b.client.email, subj, html, `Hi ${first},\n\n${lead}\n\n${detailText(b)}\n\nBalance due: ${amt}\nPay here: ${url}\n\nIf you already paid another way, reply to this email.`);
}
async function ownerBalanceNote(env, b, stage) {
  for (const to of owners(env)) {
    try { await sendMail(env, to, `Balance still unpaid: ${one((b.event || {}).title, 60)}`, frame("Balance still unpaid", P(`${esc((b.client || {}).name)} has not paid the ${esc(money(balance(b)))} balance. ${stage >= 3 ? "The event is today." : "The event is tomorrow."} A reminder was emailed to the client.`) + detailTable(b), siteOf(env)), `Balance unpaid: ${(b.client || {}).name} ${money(balance(b))}\n${detailText(b)}`); } catch (e) { console.log("owner balance note failed", String(e)); }
  }
}
/** Daily job: invoice the balance 5 days out, remind the day before, and the day of. Safe to run twice a day. */
export async function bookingReminders(env) {
  if (!env.ADMIN_KV) return { skipped: true };
  const list = await readBookings(env); let sent = 0;
  for (const b of list) {
    if (!balanceDue(b) || b.paused || !DATE_RE.test((b.event || {}).date || "")) continue;
    const d = daysUntil(b.event.date);
    const stage = d < 0 ? 0 : d === 0 ? 3 : d <= 1 ? 2 : d <= 5 ? 1 : 0;
    if (stage <= (b.balanceStage || 0)) continue;
    try { await emailBalance(env, b, stage); b.balanceStage = stage; b.balanceEmailAt = Date.now(); sent++; await saveAll(env, list); if (stage >= 2) await ownerBalanceNote(env, b, stage); }
    catch (e) { console.log("balance reminder failed", b.id, String(e)); }
  }
  return { sent };
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

async function createBalanceCheckout(env, b, origin) {
  const e = b.event || {}, p = new URLSearchParams(), tax = env.TAX_ENABLED === "true";
  p.set("mode", "payment"); p.set("success_url", `${origin}/booking/${b.id}?paid=1`); p.set("cancel_url", `${origin}/booking/${b.id}`);
  p.set("customer_email", b.client.email); p.set("metadata[kind]", "booking"); p.set("metadata[part]", "balance"); p.set("metadata[booking_id]", b.id); p.set("metadata[fulfillment]", "booking");
  p.set("line_items[0][quantity]", "1"); p.set("line_items[0][price_data][currency]", "usd"); p.set("line_items[0][price_data][unit_amount]", String(balance(b)));
  p.set("line_items[0][price_data][product_data][name]", one(`${e.title} (remaining balance)`, 120));
  if (tax) { p.set("line_items[0][price_data][tax_behavior]", "exclusive"); p.set("automatic_tax[enabled]", "true"); p.set("billing_address_collection", "required"); }
  const res = await fetch(`${API}/checkout/sessions`, { method: "POST", headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" }, body: p });
  const data = await res.json();
  if (!res.ok || !data.url) { console.log("balance checkout error", res.status, JSON.stringify(data.error || {})); throw new Error("Could not start checkout"); }
  return data.url;
}

/** Stripe webhook: a booking checkout was paid. Safe to run twice. */
export async function onBookingPaid(env, session, origin, deps = {}) {
  const md = session.metadata || {};
  if (md.kind !== "booking") return { skipped: true };
  const list = await readBookings(env), b = find(list, md.booking_id);
  if (!b) { console.log("booking not found", md.booking_id); return { missing: true }; }
  if (md.part === "balance") {
    if (b.balancePaid && b.balancePaid.sessionId === session.id) return { duplicate: true };
    b.balancePaid = { at: Date.now(), sessionId: session.id, cents: session.amount_total != null ? session.amount_total : balance(b) };
    await saveAll(env, list);
    try { await emailBalanceReceipt(env, b); } catch (e) { console.log("balance receipt failed", String(e)); }
    for (const to of owners(env)) { try { await sendMail(env, to, `Balance paid: ${one((b.event || {}).title, 70)}`, frame("Balance paid", P(`${esc((b.client || {}).name)} paid the remaining ${esc(money(b.balancePaid.cents))}.`) + detailTable(b), siteOf(env)), `Balance paid: ${(b.client || {}).name} ${money(b.balancePaid.cents)}`); } catch (e) { console.log("owner notice failed", String(e)); } }
    return { ok: true, balance: true };
  }
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
  if (b.status === "paid" && balanceDue(b)) {
    return pageShell("Balance due", `<h1>Remaining balance</h1><p class="muted">Thank you for booking with us. Here is the balance for your event.</p><div class="card">${detailList(b)}</div>` +
      `<div class="card"><div class="row tot" style="border:0;margin:0;padding:0"><span>Balance due (before any sales tax)</span><span>${esc(money(balance(b)))}</span></div></div>` +
      `<div class="card" style="text-align:center"><button class="pay" id="pay" type="button">Pay balance</button><p class="err" id="err" role="alert"></p><p class="muted" style="margin:0">Payments are processed securely by Stripe.</p></div>` +
      `<script>document.getElementById("pay").addEventListener("click",function(){var btn=this,err=document.getElementById("err");err.textContent="";btn.disabled=true;fetch(location.pathname+"/pay",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"}).then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||"Something went wrong");return d;});}).then(function(d){if(!d.url||d.url.indexOf("https://checkout.stripe.com/")!==0)throw new Error("Unexpected response");location.href=d.url;}).catch(function(e){err.textContent=e.message;btn.disabled=false;});});</script>`);
  }
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
    (bal > 0 ? `<p class="muted" style="margin:6px 0 0">Remaining balance of ${esc(money(bal))} is due before the event. We will email you the invoice 5 days before it.</p>` : "") + `</div>` + upsell +
    `<div class="card"><h2 style="margin-top:0">Paperwork</h2>` +
    `<label for="vendor"><strong>Does your organization require vendor forms to be completed before the event?</strong></label><select id="vendor" style="width:100%;height:44px;margin:6px 0 12px"><option value="">Please choose</option><option value="no">No</option><option value="yes">Yes</option></select>` +
    `<div id="vbox" style="display:none"><label for="vmethod"><strong>How would you like to get them to us?</strong></label><select id="vmethod" style="width:100%;height:44px;margin:6px 0 12px"><option value="">Please choose</option><option value="link">I have a link to the forms</option><option value="files">I will attach the documents now</option><option value="later">I will send them later</option></select>` +
    `<div id="vlink" style="display:none"><label for="vurl">Link to the forms</label><input id="vurl" type="url" placeholder="https://" style="width:100%;height:44px;margin:6px 0 12px;padding:0 10px;border:1px solid ${LINEN};border-radius:10px;font-size:16px"></div>` +
    `<div id="vfiles" style="display:none"><label for="vfile">Attach up to ${MAX_DOCS} files (PDF, Word, Excel, or image, ${MAX_DOC_MB} MB each)</label><input id="vfile" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" style="display:block;margin:6px 0 12px"></div></div>` +
    `<label for="w9"><strong>Does your organization need our W-9?</strong></label><select id="w9" style="width:100%;height:44px;margin:6px 0 12px"><option value="">Please choose</option><option value="no">No, we do not need one</option><option value="yes">Yes, we need it</option></select>` +
    `<p id="w9box" style="display:none;margin:0 0 12px;padding:12px;background:#f4ecd0;border:1px solid ${GOLD};border-radius:10px">` + (b.hasW9 ? `<a href="/booking/${b.id}/w9"><strong>Download our W-9 here</strong></a>. We will also include the link in your confirmation email.` : "We will email you our W-9 with your confirmation.") + `</p>` +
    `<label for="vnote">Anything else about paperwork or payment (optional)</label><textarea id="vnote" rows="2" maxlength="500" style="width:100%;margin-top:6px;padding:10px;border:1px solid ${LINEN};border-radius:10px;font:16px ${SANS}"></textarea></div>` +
    `<h2>Terms of this booking</h2><div class="muted">${rich(b.terms)}</div>` +
    `<div class="card" style="text-align:center"><button class="pay" id="pay" type="button">Confirm and pay</button><p class="err" id="err" role="alert"></p><p class="muted" style="margin:0">Payments are processed securely by Stripe. By paying you agree to the terms above.</p></div>` +
    `<script>(function(){var due=${dn},unit=${bk ? bk.unitCents : 0},max=${MAX_BOOKS},name=${JSON.stringify(bk ? bk.name : "")};var q=document.getElementById("qty");
function money(c){return "$"+(c/100).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});}
function qv(){if(!q)return 0;var n=parseInt(q.value,10);if(!(n>0))n=0;if(n>max)n=max;return n;}
function upd(){var n=qv();if(q)q.value=n;var r=document.getElementById("booksrow");if(r){r.style.display=n?"flex":"none";document.getElementById("bookslbl").textContent=name+" x "+n;document.getElementById("booksamt").textContent=money(n*unit);}document.getElementById("grand").textContent=money(due+n*unit);}
if(q){q.addEventListener("input",upd);document.getElementById("minus").addEventListener("click",function(){q.value=Math.max(0,qv()-1);upd();});document.getElementById("plus").addEventListener("click",function(){q.value=Math.min(max,qv()+1);upd();});}
upd();
function $(i){return document.getElementById(i);}
function sh(){var v=$("vendor").value,m=$("vmethod").value;$("vbox").style.display=v==="yes"?"block":"none";$("vlink").style.display=v==="yes"&&m==="link"?"block":"none";$("vfiles").style.display=v==="yes"&&m==="files"?"block":"none";}
$("w9").addEventListener("change",function(){$("w9box").style.display=$("w9").value==="yes"?"block":"none";});$("vendor").addEventListener("change",sh);$("vmethod").addEventListener("change",sh);
function b64(f){return new Promise(function(ok,no){var r=new FileReader();r.onload=function(){ok(String(r.result).split(",")[1]||"");};r.onerror=function(){no(new Error("Could not read "+f.name));};r.readAsDataURL(f);});}
function post(path,body){return fetch(location.pathname+path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}).then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||"Something went wrong");return d;});});}
$("pay").addEventListener("click",function(){var btn=this,err=$("err");err.textContent="";
var v=$("vendor").value,m=$("vmethod").value,w=$("w9").value,fl=$("vfile").files;
if(!v||!w){err.textContent="Please answer the paperwork questions above.";return;}
if(v==="yes"&&!m){err.textContent="Please choose how you will get us the vendor forms.";return;}
if(v==="yes"&&m==="link"&&!/^https?:[/][/]/i.test($("vurl").value.trim())){err.textContent="Please enter the link, starting with https://";return;}
if(v==="yes"&&m==="files"&&!fl.length){err.textContent="Please choose the file(s) to attach, or pick another option.";return;}
if(fl.length>${MAX_DOCS}){err.textContent="Please attach no more than ${MAX_DOCS} files.";return;}
for(var i=0;i<fl.length&&v==="yes"&&m==="files";i++){if(fl[i].size>${MAX_DOC_MB}*1048576){err.textContent=fl[i].name+" is larger than ${MAX_DOC_MB} MB.";return;}}
btn.disabled=true;var chain=Promise.resolve();
if(v==="yes"&&m==="files"){Array.prototype.forEach.call(fl,function(f){chain=chain.then(function(){return b64(f).then(function(d){return post("/doc",{name:f.name,type:f.type,data:d});});});});}
chain.then(function(){return post("/pay",{qty:qv(),intake:{vendor:v,method:v==="yes"?m:"",link:$("vurl").value.trim(),w9:w,note:$("vnote").value}});})
.then(function(d){if(!d.url||d.url.indexOf("https://checkout.stripe.com/")!==0)throw new Error("Unexpected response");location.href=d.url;}).catch(function(e){err.textContent=e.message;btn.disabled=false;});});})();</script>`);
}

export async function publicBooking(request, env, url, deps = {}) {
  const m = url.pathname.match(/^\/booking\/([a-f0-9]{24})(\/pay|\/doc|\/w9)?$/);
  if (!m || !env.ADMIN_KV) return null;
  const list = await readBookings(env), b = find(list, m[1]);
  const notFound = () => new Response(pageShell("Booking", `<h1>We could not find that booking</h1><p>Please check the link in your email, or write <a href="mailto:info@queenesheirr.com">info@queenesheirr.com</a>.</p>`), { status: 404, headers: PAGE_HEADERS });
  if (m[2] === "/w9") {
    if (request.method !== "GET" || !b || b.status === "cancelled") return notFound();
    const f = JSON.parse((await env.ADMIN_KV.get("bkw9")) || "null"); if (!f) return notFound();
    const bin = Uint8Array.from(atob(f.data), (c) => c.charCodeAt(0));
    return new Response(bin, { headers: { "Content-Type": "application/pdf", "Content-Disposition": 'attachment; filename="W-9.pdf"', "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
  }
  if (!m[2]) {
    if (request.method !== "GET") return null;
    if (b && (b.status === "sent" || b.status === "draft") && url.searchParams.get("paid") === "1") return new Response(pageShell("Booking", `<h1>Thank you!</h1><p>Your payment is being confirmed. This usually takes under a minute. Please refresh this page shortly, and watch your email for the full summary.</p>`), { headers: PAGE_HEADERS });
    return b ? new Response(bookingPage(b, url.origin), { headers: PAGE_HEADERS }) : notFound();
  }
  if (request.method !== "POST") return null;
  const isDoc = m[2] === "/doc";
  const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) return J({ error: "Origin not allowed" }, 403);
  if (!b) return J({ error: "That booking was not found" }, 404);
  if (isDoc) {
    if (b.status === "paid" || b.status === "cancelled") return J({ error: "This booking can no longer accept files here. Please email them to info@queenesheirr.com." }, 400);
    const d = await request.json().catch(() => ({}));
    const name = one(d.name, 120).replace(/[^\w.\- ()]/g, "_") || "file", ext = (name.split(".").pop() || "").toLowerCase();
    if (!["pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "jpeg"].includes(ext)) return J({ error: "That file type is not accepted. Please use PDF, Word, Excel, or an image." }, 400);
    const data = String(d.data || "");
    if (!/^[A-Za-z0-9+/=]+$/.test(data) || data.length < 4) return J({ error: "That file could not be read." }, 400);
    if (data.length * 0.75 > MAX_DOC_MB * 1048576) return J({ error: `${name} is larger than ${MAX_DOC_MB} MB.` }, 400);
    b.docs = b.docs || [];
    if (b.docs.length >= MAX_DOCS) return J({ error: `No more than ${MAX_DOCS} files, please.` }, 400);
    const ip = request.headers.get("CF-Connecting-IP") || "x", k = `rl:bookdoc:${ip}:${Math.floor(Date.now() / 3600000)}`;
    const cnt = parseInt((await env.ADMIN_KV.get(k)) || "0", 10); if (cnt >= 12) return J({ error: "Too many uploads. Please wait a little while." }, 429);
    await env.ADMIN_KV.put(k, String(cnt + 1), { expirationTtl: 3700 });
    const key = `bkdoc:${b.id}:${b.docs.length}`;
    await env.ADMIN_KV.put(key, JSON.stringify({ name, type: ext === "pdf" ? "application/pdf" : String(d.type || "application/octet-stream").slice(0, 100), data }));
    b.docs.push({ key, name, size: Math.round(data.length * 0.75), at: Date.now() });
    await saveAll(env, list);
    return J({ ok: true });
  }
  if (b.status === "paid" && balanceDue(b)) {
    try { return J({ url: await createBalanceCheckout(env, b, url.origin) }); } catch { return J({ error: "We could not start checkout. Please try again, or contact us." }, 502); }
  }
  if (b.status === "paid") return J({ error: "This booking is already paid. Thank you!" }, 400);
  if (b.status === "cancelled") return J({ error: "This booking is no longer active." }, 400);
  try {
    const ip = request.headers.get("CF-Connecting-IP") || "x", k = `rl:book:${ip}:${Math.floor(Date.now() / 3600000)}`;
    const n = parseInt((await env.ADMIN_KV.get(k)) || "0", 10);
    if (n >= 20) return J({ error: "Too many tries. Please wait a little while and try again." }, 429);
    await env.ADMIN_KV.put(k, String(n + 1), { expirationTtl: 3700 });
  } catch { /* storage hiccup: do not block */ }
  const body = await request.json().catch(() => ({}));
  {   // paperwork answers
    const t = body.intake || {};
    if (!["yes", "no"].includes(t.vendor) || !["yes", "no"].includes(t.w9)) return J({ error: "Please answer the paperwork questions." }, 400);
    const it = { vendor: t.vendor, w9: t.w9, method: "", link: "", note: many(t.note, 500), at: Date.now() };
    if (t.vendor === "yes") {
      if (!["link", "files", "later"].includes(t.method)) return J({ error: "Please choose how you will send the vendor forms." }, 400);
      it.method = t.method;
      if (t.method === "link") { const u = one(t.link, 500); if (!/^https?:\/\/[^\s]+$/i.test(u)) return J({ error: "Please enter a valid link starting with https://" }, 400); it.link = u; }
      if (t.method === "files" && !(b.docs && b.docs.length)) return J({ error: "Your files did not attach. Please try again." }, 400);
    }
    b.intake = it; await saveAll(env, list);
  }
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
  if (!/^bookinv(-[a-z0-9]+)*$/.test(route)) return null;
  try {
    const books = async () => { try { return (await deps.loadCatalog(env)).filter((p) => p.category === "Books" || p.category === "Curriculum & Resources").map((p) => ({ ...p, sizes: p.sizes.filter((z) => !z.soldOut) })).filter((p) => p.sizes.length); } catch { return []; } };
    if (route === "bookinv" && method === "GET") {
      const list = await readBookings(env);
      const bl = await books();
      return j({
        bookings: list.sort((a, b) => b.createdAt - a.createdAt).map((b) => ({ ...b, link: linkOf(origin, b), total: total(b), dueNow: dueNow(b), balanceCents: balance(b), balanceOpen: balanceDue(b) })),
        books: bl.flatMap((p) => p.sizes.map((s) => ({ key: p.id + "|" + s.label, label: `${p.name} (${s.label}) ${money(s.cents)}`, cents: s.cents }))),
        defaults: DEFAULTS,
        w9: await (async () => { try { return JSON.parse((await env.ADMIN_KV.get("bkw9meta")) || "null"); } catch { return null; } })(),
      });
    }
    if (method !== "POST") return null;
    if (route === "bookinv-w9-upload") {
      const data = String(body.data || "");
      if (!/^[A-Za-z0-9+/=]+$/.test(data) || data.length < 100) return j({ error: "That file could not be read." }, 400);
      if (data.length * 0.75 > 3 * 1048576) return j({ error: "The W-9 must be under 3 MB." }, 400);
      if (atob(data.slice(0, 8)).slice(0, 4) !== "%PDF") return j({ error: "Please upload the W-9 as a PDF." }, 400);
      await env.ADMIN_KV.put("bkw9", JSON.stringify({ data }));
      const meta = { name: one(body.name, 120) || "W-9.pdf", at: Date.now(), size: Math.round(data.length * 0.75) };
      await env.ADMIN_KV.put("bkw9meta", JSON.stringify(meta));
      return j({ ok: true, w9: meta });
    }
    if (route === "bookinv-w9-remove") { await env.ADMIN_KV.delete("bkw9"); await env.ADMIN_KV.delete("bkw9meta"); return j({ ok: true }); }
    const list = await readBookings(env);
    if (route === "bookinv-save") {
      const old = body.id ? find(list, String(body.id)) : null;
      if (body.id && !old) return j({ error: "That booking was not found." }, 404);
      if (old && (old.status === "paid" || old.status === "cancelled")) return j({ error: "A paid or cancelled booking cannot be edited." }, 400);
      const rec = clean(body, old, await books());
      rec.origin = origin; rec.balanceStage = old ? old.balanceStage : 0; rec.balancePaid = old ? old.balancePaid : null; rec.paused = old ? old.paused : false;
      if (old) list[list.indexOf(old)] = rec; else list.unshift(rec);
      await saveAll(env, list);
      const qid = !old && /^qt_[A-Za-z0-9]+$/.test(String(body.fromRequest || "")) ? body.fromRequest : "";
      let converted = false;
      if (qid && deps.stripeGet && deps.stripePost) {   // the website request is now an invoice, so close its Stripe quote
        try { const q = await deps.stripeGet(env, `/quotes/${qid}`); if (q && (q.status === "draft" || q.status === "open")) { await deps.stripePost(env, `/quotes/${qid}/cancel`, new URLSearchParams()); converted = true; } rec.fromRequest = qid; await saveAll(env, list); } catch (e) { console.log("quote close failed", String(e)); }
      }
      return j({ ok: true, converted, booking: { ...rec, link: linkOf(origin, rec), total: total(rec), dueNow: dueNow(rec) } });
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
    if (route === "bookinv-balance-paid") {   // balance paid by check, cash, Zelle
      if (!balanceDue(b)) return j({ error: "There is no open balance on that booking." }, 400);
      b.balancePaid = { at: Date.now(), sessionId: "manual", manual: true, cents: balance(b) }; await saveAll(env, list);
      try { await emailBalanceReceipt(env, b); } catch (e) { return j({ ok: true, warning: "Recorded, but the receipt email did not send: " + e.message }); }
      return j({ ok: true });
    }
    if (route === "bookinv-balance-send") {   // send the balance invoice right now
      if (!balanceDue(b)) return j({ error: "There is no open balance on that booking." }, 400);
      b.origin = origin; await emailBalance(env, b, Math.max(1, b.balanceStage || 1)); await saveAll(env, list); return j({ ok: true });
    }
    if (route === "bookinv-balance-pause") { b.paused = !b.paused; await saveAll(env, list); return j({ ok: true, paused: b.paused }); }
    if (route === "bookinv-doc") {
      const doc = (b.docs || [])[parseInt(body.n, 10)]; if (!doc) return j({ error: "File not found." }, 404);
      const f = JSON.parse((await env.ADMIN_KV.get(doc.key)) || "null"); if (!f) return j({ error: "File not found." }, 404);
      return j({ name: f.name, type: f.type, data: f.data });
    }
    if (route === "bookinv-summary") {
      if (b.status !== "paid") return j({ error: "The summary goes out after payment." }, 400);
      await emailSummary(env, b, origin); b.summarySentAt = Date.now(); await saveAll(env, list); return j({ ok: true });
    }
    return null;
  } catch (e) { return j({ error: e.message || "Something went wrong" }, 400); }
}
