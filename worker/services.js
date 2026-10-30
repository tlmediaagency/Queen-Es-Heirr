// Training programs and their "starting at" prices. Stored in ADMIN_KV key "services"; edited in the admin app;
// the website's Etiquette & Leadership page loads them from GET /services (the page keeps built-in copies as a fallback).
const AUD = ["students", "professionals"];
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const SEED = [
  ["students", "Youth Dining & Social Graces", "Ages 8–17.", 12500],
  ["students", "Student Leadership Academy", "Voice, presence, and first Leadership habits.", 25000],
  ["students", "J.U.D.A.H. for Students", "The student Leadership curriculum.", 25000],
  ["professionals", "Executive Presence & Dining", "Business dining and how you enter a room.", 35000],
  ["professionals", "J.U.D.A.H. for Professionals", "The professional Leadership curriculum.", 45000],
  ["professionals", "J.U.D.A.H. Leadership Keynote", "The curriculum as a talk for schools and companies.", 150000]
].map((r, i) => ({ id: "s" + (i + 1), audience: r[0], title: r[1], blurb: r[2], cents: r[3], travel: true, active: true }));

export async function readServices(env) {
  const raw = await env.ADMIN_KV.get("services");
  if (raw == null) return SEED.map((s) => ({ ...s }));
  try { const a = JSON.parse(raw); return Array.isArray(a) ? a : []; } catch { return SEED.map((s) => ({ ...s })); }
}
function clean(list) {
  if (!Array.isArray(list) || list.length > 60) throw new Error("Too many programs.");
  const seen = new Set();
  return list.map((s, i) => {
    const title = one(s.title, 90); if (!title) throw new Error("Every program needs a name.");
    const cents = Math.round(Number(s.cents));
    if (!Number.isFinite(cents) || cents < 0 || cents > 100000000) throw new Error("Check the price for " + title + ".");
    let id = /^s[a-z0-9]{1,12}$/.test(s.id || "") && !seen.has(s.id) ? s.id : "s" + Date.now().toString(36) + i;
    seen.add(id);
    return { id, audience: AUD.includes(s.audience) ? s.audience : "students", title, blurb: one(s.blurb, 220), cents, travel: s.travel !== false, active: s.active !== false };
  });
}
export async function servicesRoute(route, method, body, env, me, j) {
  if (route === "services" && method === "GET") return j({ services: await readServices(env) });
  if (route === "services-save" && method === "POST") {
    try { const list = clean(body.services); await env.ADMIN_KV.put("services", JSON.stringify(list)); return j({ ok: true, services: list }); }
    catch (e) { return j({ error: e.message }, 400); }
  }
  return null;
}
export async function servicesPublic(env, headers, json) {
  const list = (await readServices(env)).filter((s) => s.active !== false).map((s) => ({ audience: s.audience, title: s.title, blurb: s.blurb, cents: s.cents, travel: s.travel }));
  return json({ services: list }, 200, { ...headers, "Cache-Control": "public, max-age=60" });
}
