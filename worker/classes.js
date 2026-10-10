// Class dates, paid seat booking, and booking records. Stored in the ADMIN_KV namespace.
//   KV "classes":  [{ id, title, type, date, time, minutes, seats, cents, location, notes, show }]
//   KV "bookings": [{ sid, classId, name, email, phone, seats, cents, ts }]   (one entry per paid Checkout Session)
const todayCentral = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());

const MAX_PER_BOOKING = 10;
const TYPES = { jam: "Jam making & STEM lab", combined: "Jam making & etiquette", other: "Class" };
const DEFAULT_CENTS = { jam: 5500, combined: 8500, other: 5500 };

export async function readClasses(env) {
  if (!env.ADMIN_KV) return [];
  try { return JSON.parse((await env.ADMIN_KV.get("classes")) || "[]"); } catch { return []; }
}
export async function readBookings(env) {
  if (!env.ADMIN_KV) return [];
  try { return JSON.parse((await env.ADMIN_KV.get("bookings")) || "[]"); } catch { return []; }
}
function taken(bookings, classId) {
  return bookings.filter((b) => b.classId === classId).reduce((n, b) => n + (b.seats || 0), 0);
}

export function cleanClasses(list) {
  const out = [];
  for (const c of (Array.isArray(list) ? list : []).slice(0, 100)) {
    const type = TYPES[c.type] ? c.type : "other";
    const title = String(c.title || "").trim().slice(0, 100) || TYPES[type];
    const date = String(c.date || "");
    const time = String(c.time || "");
    const seats = parseInt(c.seats, 10);
    const minutes = parseInt(c.minutes, 10) || 120;
    const cents = Math.round(parseFloat(c.price) * 100);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Each class needs a date");
    if (!/^\d{2}:\d{2}$/.test(time)) throw new Error("Each class needs a start time");
    if (!(seats >= 1 && seats <= 200)) throw new Error("Seats must be between 1 and 200");
    if (!(cents >= 100 && cents <= 100000)) throw new Error("Price must be between $1 and $1,000 per person");
    const id = /^[a-z0-9-]{3,48}$/.test(c.id || "") ? c.id : `${type}-${date}-${time.replace(":", "")}`;
    out.push({ id, title, type, date, time, minutes: Math.min(Math.max(minutes, 15), 720), seats, cents, price: undefined,
      location: String(c.location || "").trim().slice(0, 200), notes: String(c.notes || "").trim().slice(0, 500), show: c.show !== false });
  }
  const ids = new Set();
  for (const c of out) { if (ids.has(c.id)) c.id += "-" + ids.size; ids.add(c.id); }
  return out.map(({ price, ...rest }) => rest);
}

export async function publicClasses(env) {
  const [list, bookings] = await Promise.all([readClasses(env), readBookings(env)]);
  const t = todayCentral();
  return list
    .filter((c) => c.show !== false && c.date >= t)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .map((c) => ({ id: c.id, title: c.title, type: c.type, date: c.date, time: c.time, minutes: c.minutes, cents: c.cents,
      location: c.location, notes: c.notes, left: Math.max(0, c.seats - taken(bookings, c.id)) }));
}

export async function adminClasses(env) {
  const [list, bookings] = await Promise.all([readClasses(env), readBookings(env)]);
  return list.map((c) => ({ ...c, price: (c.cents / 100).toFixed(2), booked: taken(bookings, c.id) }));
}

// POST /class-checkout  { classId, seats }
export async function classCheckout(request, env, c, h) {
  let b;
  try { b = await request.json(); } catch { return h.json({ error: "Invalid request" }, 400, c.headers); }
  const seats = parseInt(b && b.seats, 10);
  if (!(seats >= 1 && seats <= MAX_PER_BOOKING)) return h.json({ error: `Please choose 1 to ${MAX_PER_BOOKING} seats` }, 400, c.headers);
  const cls = (await publicClasses(env)).find((x) => x.id === (b && b.classId));
  if (!cls) return h.json({ error: "That class is no longer open for booking" }, 400, c.headers);
  if (seats > cls.left) return h.json({ error: cls.left ? `Only ${cls.left} seat(s) left` : "That class is full" }, 400, c.headers);
  const site = env.SITE_URL || "https://queenesheirr.com";
  const p = new URLSearchParams();
  p.set("mode", "payment");
  p.set("success_url", `${site}/order-confirmed/?class=1&session_id={CHECKOUT_SESSION_ID}`);
  p.set("cancel_url", `${site}/classes/`);
  p.set("expires_at", String(Math.floor(Date.now() / 1000) + 31 * 60));
  p.set("phone_number_collection[enabled]", "true");
  p.set("line_items[0][quantity]", String(seats));
  p.set("line_items[0][price_data][currency]", "usd");
  p.set("line_items[0][price_data][unit_amount]", String(cls.cents));
  p.set("line_items[0][price_data][product_data][name]", `${cls.title} - ${cls.date} ${cls.time}`.slice(0, 120));
  p.set("line_items[0][price_data][product_data][description]", `Per person. Seats: ${seats}.${cls.location ? " " + cls.location : ""}`.slice(0, 300));
  p.set("metadata[kind]", "class");
  p.set("metadata[classId]", cls.id);
  p.set("metadata[seats]", String(seats));
  p.set("payment_intent_data[metadata][kind]", "class");
  // Class tax is separate from product tax (services may be taxed differently). Set CLASS_TAX_ENABLED=true once confirmed.
  if (env.CLASS_TAX_ENABLED === "true") {
    p.set("automatic_tax[enabled]", "true");
    p.set("billing_address_collection", "required");
    p.set("line_items[0][price_data][tax_behavior]", "exclusive");
  }
  try {
    const s = await h.stripePost(env, "/checkout/sessions", p);
    return h.json({ url: s.url }, 200, c.headers);
  } catch (e) {
    console.log("class checkout error", String(e));
    return h.json({ error: "Could not start checkout" }, 502, c.headers);
  }
}

// Called from the Stripe webhook for a paid class session. Idempotent per session id.
export async function recordBooking(env, session) {
  const md = session.metadata || {};
  if (md.kind !== "class" || !env.ADMIN_KV) return;
  const bookings = await readBookings(env);
  if (bookings.some((x) => x.sid === session.id)) return;
  const cls = (await readClasses(env)).find((x) => x.id === md.classId);
  const cd = session.customer_details || {};
  const rec = {
    sid: session.id, classId: md.classId || "", name: String(cd.name || "").slice(0, 100), email: String(cd.email || "").slice(0, 200),
    phone: String(cd.phone || "").slice(0, 40), seats: parseInt(md.seats, 10) || 1, cents: session.amount_total || 0, ts: Date.now(),
  };
  bookings.push(rec);
  await env.ADMIN_KV.put("bookings", JSON.stringify(bookings.slice(-1500)));
  // Email + Google Calendar invite via the Apps Script web app (best effort; the booking is already saved).
  if (env.MAIL_URL && env.MAIL_SECRET && cls) {
    try {
      await fetch(env.MAIL_URL, {
        method: "POST", headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "booking_notice", secret: env.MAIL_SECRET, booking: rec, cls: {
          id: cls.id, title: cls.title, date: cls.date, time: cls.time, minutes: cls.minutes, location: cls.location, notes: cls.notes,
          seats: cls.seats, booked: taken(bookings, cls.id) } }),
      });
    } catch (e) { console.log("booking notice failed", String(e)); }
  }
}

export async function adminBookings(env) {
  const [list, bookings] = await Promise.all([readClasses(env), readBookings(env)]);
  const byId = Object.fromEntries(list.map((c) => [c.id, c]));
  return bookings.slice().reverse().map((b) => ({ ...b, cls: byId[b.classId] ? { title: byId[b.classId].title, date: byId[b.classId].date, time: byId[b.classId].time } : null }));
}
