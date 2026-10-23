// Mailing list + email campaigns for the admin app. The Google Sheet and the sending live in the Apps Script;
// this file validates input, builds the branded email, and relays to the script with the shared secret.

const FOREST = "#1b3b22", GOLD = "#d4af37", CREAM = "#fcfaf7", INK = "#0e2012", LINEN = "#e5dbd1";
const SERIF = "Georgia,'Times New Roman',serif", SANS = "Helvetica,Arial,sans-serif";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const HTTPS_RE = /^https:\/\/[^\s"'<>]{4,500}$/;
const CHUNK = 40;
export const TAGS = [["jam", "Jams & pickled goods"], ["leadership", "Leadership materials"], ["professional", "Professionals"], ["education", "Schools & organizations"], ["retailer", "Retailers"], ["general", "General news"]];
// Groups you add in the admin app live in KV "taggroups" as [{id,label}]; LIVE is the built-in list plus those.
let LIVE = TAGS.slice();
async function loadGroups(env) {
  let custom = [];
  try { const a = JSON.parse((await env.ADMIN_KV.get("taggroups")) || "[]"); if (Array.isArray(a)) custom = a.filter((g) => g && /^[a-z0-9-]{1,30}$/.test(g.id) && g.label); } catch {}
  LIVE = TAGS.concat(custom.filter((g) => !TAGS.some((t) => t[0] === g.id)).map((g) => [g.id, String(g.label).slice(0, 40)]));
  return { custom, all: LIVE };
}
export const cleanTags = (v) => { const out = []; (Array.isArray(v) ? v : String(v || "").split(/[,;]+/)).forEach((t) => { t = String(t || "").trim().toLowerCase(); if (LIVE.some((x) => x[0] === t) && !out.includes(t)) out.push(t); }); return out; };
const CAT_TAG = { "Jams": "jam", "Pickled goods": "jam", "Books": "leadership", "Curriculum & Resources": "leadership" };
// Interests guessed from what someone bought.
export function tagsFromSession(s) {
  const out = [];
  ((s.line_items && s.line_items.data) || []).forEach((l) => {
    const p = l.price && l.price.product && typeof l.price.product === "object" ? l.price.product : {};
    const t = CAT_TAG[(p.metadata || {}).category]; if (t && !out.includes(t)) out.push(t);
  });
  return out.length ? out : ["general"];
}
// Someone ticked "email me" at checkout. Called from the Stripe webhook and the manual sync.
export async function addOptIn(env, session, resubscribe) {
  const cd = session.customer_details || {};
  const email = String(cd.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { skipped: true };
  return mail(env, "sub_add", { email, name: one(cd.name, 100), tags: tagsFromSession(session), resubscribe: resubscribe === true });
}

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);

export function cleanCampaign(f) {
  f = f && typeof f === "object" ? f : {};
  const out = {
    subject: one(f.subject, 150),
    preheader: one(f.preheader, 150),
    headline: one(f.headline, 120),
    body: String(f.body || "").replace(/\r/g, "").slice(0, 8000).trim(),
    imageUrl: HTTPS_RE.test(String(f.imageUrl || "").trim()) ? String(f.imageUrl).trim() : "",
    buttonLabel: one(f.buttonLabel, 40),
    buttonUrl: HTTPS_RE.test(String(f.buttonUrl || "").trim()) ? String(f.buttonUrl).trim() : "",
    greet: f.greet !== false,
    includeEvents: f.includeEvents === true,
    includeClasses: f.includeClasses === true,
  };
  if (!out.subject) throw new Error("Add a subject line.");
  if (!out.body && !out.headline) throw new Error("Add a headline or a message.");
  if (out.buttonLabel && !out.buttonUrl) throw new Error("The button needs a link that starts with https://");
  if (!out.buttonLabel) out.buttonUrl = "";
  return out;
}

const dayFmt = (d) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" });
const timeFmt = (t) => { const [h, m] = String(t || "").split(":").map(Number); if (!Number.isFinite(h)) return ""; return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`; };
const linkify = (escaped) => escaped.replace(/https:\/\/[^\s<&]+(?:&amp;[^\s<&]+)*/g, (u) => `<a href="${u}" style="color:${FOREST};font-weight:600">${u}</a>`);

export function buildCampaign(f, ctx) {
  const site = ctx.site || "https://queenesheirr.com";
  const paras = f.body ? f.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) : [];
  const txt = [];
  let h = "";
  const p = (inner) => `<p style="font:16px/1.65 ${SANS};color:${INK};margin:0 0 16px">${inner}</p>`;
  const sub = (title) => `<h3 style="font:700 18px/1.3 ${SERIF};color:${FOREST};margin:26px 0 8px;border-top:1px solid ${LINEN};padding-top:20px">${esc(title)}</h3>`;
  if (f.greet) { h += p("{{HI}}"); txt.push("{{HI}}", ""); }
  paras.forEach((para) => { h += p(linkify(esc(para)).replace(/\n/g, "<br>")); txt.push(para, ""); });
  if (f.includeEvents && ctx.events && ctx.events.length) {
    h += sub("Where to find us");
    txt.push("WHERE TO FIND US");
    ctx.events.slice(0, 6).forEach((e) => {
      h += p(`<strong>${esc(dayFmt(e.date))}</strong> &middot; ${esc(e.name)}${e.location ? `<br><span style="color:#5c6b5a">${esc(e.location)}</span>` : ""}`);
      txt.push(`- ${dayFmt(e.date)}: ${e.name}${e.location ? " (" + e.location + ")" : ""}`);
    });
    txt.push("");
  }
  if (f.includeClasses && ctx.classes && ctx.classes.length) {
    h += sub("Upcoming classes");
    txt.push("UPCOMING CLASSES");
    ctx.classes.slice(0, 6).forEach((c) => {
      const when = `${dayFmt(c.date)}${c.time ? " at " + timeFmt(c.time) : ""}`;
      const price = c.cents ? ` &middot; $${(c.cents / 100).toFixed(2)}` : "";
      h += p(`<strong>${esc(c.title)}</strong><br><span style="color:#5c6b5a">${esc(when)}${price}</span>`);
      txt.push(`- ${c.title}: ${when}${c.cents ? ", $" + (c.cents / 100).toFixed(2) : ""}`);
    });
    h += p(`<a href="${site}/classes/" style="color:${FOREST};font-weight:600">See all classes and book a seat</a>`);
    txt.push(`See all classes: ${site}/classes/`, "");
  }
  if (f.buttonLabel && f.buttonUrl) {
    h += `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:8px 0 8px"><tr><td style="background:${FOREST};border:2px solid ${GOLD};border-radius:999px"><a href="${esc(f.buttonUrl)}" style="display:inline-block;padding:13px 30px;font:700 14px ${SANS};letter-spacing:.06em;text-transform:uppercase;color:#fff;text-decoration:none">${esc(f.buttonLabel)}</a></td></tr></table>`;
    txt.push(`${f.buttonLabel}: ${f.buttonUrl}`, "");
  }
  const addr = esc(ctx.address || "").replace(/\n/g, "<br>");
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(f.subject)}</title></head>` +
    `<body style="margin:0;background:${CREAM}">` +
    (f.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${CREAM}">${esc(f.preheader)}</div>` : "") +
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM}"><tr><td align="center" style="padding:24px 12px">` +
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${LINEN};border-radius:18px;overflow:hidden">` +
    `<tr><td align="center" style="background:${FOREST};padding:24px"><a href="${site}" style="font:700 26px ${SERIF};color:#fff;text-decoration:none">Queen E's Heirr</a><div style="font:11px ${SANS};letter-spacing:.2em;text-transform:uppercase;color:${GOLD};margin-top:6px">Curating Culture &amp; Confections</div></td></tr>` +
    `<tr><td style="height:5px;background:${GOLD};line-height:5px;font-size:0">&nbsp;</td></tr>` +
    (f.imageUrl ? `<tr><td><img src="${esc(f.imageUrl)}" alt="" width="600" style="display:block;width:100%;height:auto;border:0"></td></tr>` : "") +
    `<tr><td style="padding:30px 28px 22px">` +
    (f.headline ? `<h1 style="font:700 28px/1.2 ${SERIF};color:${FOREST};margin:0 0 18px">${esc(f.headline)}</h1>` : "") + h + `</td></tr>` +
    `<tr><td align="center" style="background:${FOREST};padding:18px 24px;font:12px/1.7 ${SANS};color:#cfd8cd">You are receiving this because you joined the Queen E's Heirr mailing list at queenesheirr.com.<br>` +
    (addr ? addr + "<br>" : "") + `<a href="{{UNSUB}}" style="color:${GOLD}">Unsubscribe</a></td></tr></table></td></tr></table></body></html>`;
  const text = [f.headline ? f.headline.toUpperCase() : "", f.headline ? "" : null, ...txt, "--", "Queen E's Heirr | " + site, ctx.address || "", "Unsubscribe: {{UNSUB}}"].filter((x) => x !== null).join("\n");
  return { html, text };
}

async function mail(env, op, payload) {
  if (!env.MAIL_URL || !env.MAIL_SECRET) throw new Error("Email is not set up");
  const res = await fetch(env.MAIL_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action: "mkt", op, secret: env.MAIL_SECRET, ...payload }) });
  const out = await res.json().catch(() => null);
  if (!res.ok || !out || out.ok !== true) throw new Error((out && out.error) || "The mailing list did not answer. Make sure the newest Google Apps Script version is deployed.");
  return out;
}

export async function readSettings(env) {
  try { return JSON.parse((await env.ADMIN_KV.get("marketing")) || "{}"); } catch { return {}; }
}

async function context(env, deps, f, settings) {
  const ctx = { site: env.SITE_URL || "https://queenesheirr.com", address: settings.address || "", events: [], classes: [] };
  if (f.includeEvents) ctx.events = deps.upcoming(await deps.readEvents(env));
  if (f.includeClasses) ctx.classes = await deps.publicClasses(env);
  return ctx;
}

// Returns a Response for a marketing route, or null when the route isn't one of ours.
export async function marketingRoute(route, method, body, env, me, deps, j) {
  const isMine = /^(subscribers|subscriber|subscribers-import|subscribers-from-stripe|marketing-settings|campaign-[a-z]+|campaigns|groups|group-save|group-delete)$/.test(route);
  if (!isMine) return null;
  try {
    const G = await loadGroups(env);
    if (route === "groups" && method === "GET") return j({ groups: G.all.map((t) => ({ id: t[0], label: t[1], builtin: TAGS.some((x) => x[0] === t[0]) })) });
    if (route === "group-save" && method === "POST") {
      const label = one(body.label, 40);
      if (!label) return j({ error: "Give the group a name." }, 400);
      const custom = G.custom.slice();
      let id = one(body.id, 30);
      if (id && TAGS.some((t) => t[0] === id)) return j({ error: "Built-in groups can't be renamed." }, 400);
      if (id) { const g = custom.find((x) => x.id === id); if (!g) return j({ error: "That group no longer exists." }, 404); g.label = label; }
      else {
        if (G.all.some((t) => t[1].toLowerCase() === label.toLowerCase())) return j({ error: "A group with that name already exists." }, 400);
        if (custom.length >= 20) return j({ error: "That is the maximum number of custom groups." }, 400);
        id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30) || "group";
        let base = id, k = 2; while (G.all.some((t) => t[0] === id)) id = base.slice(0, 27) + "-" + k++;
        custom.push({ id, label });
      }
      await env.ADMIN_KV.put("taggroups", JSON.stringify(custom));
      const G2 = await loadGroups(env);
      return j({ ok: true, groups: G2.all.map((t) => ({ id: t[0], label: t[1], builtin: TAGS.some((x) => x[0] === t[0]) })) });
    }
    if (route === "group-delete" && method === "POST") {
      const custom = G.custom.filter((x) => x.id !== body.id);
      if (custom.length === G.custom.length) return j({ error: "Only groups you added can be deleted." }, 400);
      await env.ADMIN_KV.put("taggroups", JSON.stringify(custom));
      const G2 = await loadGroups(env);
      return j({ ok: true, groups: G2.all.map((t) => ({ id: t[0], label: t[1], builtin: TAGS.some((x) => x[0] === t[0]) })) });
    }
    if (route === "marketing-settings" && method === "GET") return j({ address: (await readSettings(env)).address || "" });
    if (route === "marketing-settings" && method === "POST") {
      const address = String(body.address || "").replace(/\r/g, "").split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 4).join("\n").slice(0, 300);
      await env.ADMIN_KV.put("marketing", JSON.stringify({ address }));
      return j({ ok: true, address });
    }
    if (route === "subscribers" && method === "GET") {
      const r = await mail(env, "sub_list", {});
      return j({ subscribers: r.subscribers, quota: r.quota });
    }
    if (route === "subscriber" && method === "POST") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!EMAIL_RE.test(email)) return j({ error: "That email address does not look right." }, 400);
      const op = body.op;
      if (op === "add") return j(await mail(env, "sub_add", { email, name: one(body.name, 100), tags: cleanTags(body.tags), resubscribe: body.resubscribe === true }));
      if (op === "tags") return j(await mail(env, "sub_tags", { email, tags: cleanTags(body.tags) }));
      if (op === "set") return j(await mail(env, "sub_set", { email, status: body.status === "unsubscribed" ? "unsubscribed" : "subscribed" }));
      if (op === "name") return j(await mail(env, "sub_name", { email, name: one(body.name, 100) }));
      if (op === "delete") return j(await mail(env, "sub_delete", { email }));
      return j({ error: "Unknown action" }, 400);
    }
    if (route === "subscribers-import" && method === "POST") {
      if (body.consent !== true) return j({ error: "Please confirm these people asked to hear from you." }, 400);
      const rows = (Array.isArray(body.rows) ? body.rows : []).slice(0, 500).map((r) => ({ name: one(r && r.name, 100), email: String((r && r.email) || "").trim().toLowerCase() }));
      return j(await mail(env, "sub_import", { rows, tags: cleanTags(body.tags) }));
    }
    if (route === "subscribers-from-stripe" && method === "POST") {
      // Pulls in customers who ticked the "email me" box at checkout. Never touches anyone who did not tick it.
      const rows = [];
      let after = "", seen = 0;
      for (let page = 0; page < 3; page++) {
        const r = await deps.stripeGet(env, `/checkout/sessions?limit=100&expand[]=data.line_items.data.price.product${after ? "&starting_after=" + after : ""}`);
        for (const s of r.data) {
          seen++;
          if (s.payment_status !== "paid" || !s.metadata || s.metadata.optin !== "1") continue;
          const em = String((s.customer_details && s.customer_details.email) || "").trim().toLowerCase();
          if (EMAIL_RE.test(em)) rows.push({ email: em, name: one(s.customer_details.name, 100), tags: tagsFromSession(s) });
        }
        if (!r.has_more || !r.data.length) break;
        after = r.data[r.data.length - 1].id;
      }
      if (!rows.length) return j({ ok: true, found: 0, seen, added: 0, already: 0, unsubscribed: 0, tagged: 0 });
      const out = await mail(env, "sub_import", { rows: rows.slice(0, 500) });
      return j({ ok: true, found: rows.length, seen, added: out.added, already: out.already, unsubscribed: out.unsubscribed, tagged: out.tagged });
    }
    if (route === "campaigns" && method === "GET") return j({ campaigns: (await mail(env, "camp_list", {})).campaigns });

    if (route.startsWith("campaign-") && method === "POST") {
      const f = cleanCampaign(body.fields);
      const settings = await readSettings(env);
      const ctx = await context(env, deps, f, settings);
      const built = buildCampaign(f, ctx);
      if (route === "campaign-preview") {
        return j({ html: built.html.split("{{UNSUB}}").join("#").split("{{HI}}").join("Hi Jane,"), missingAddress: !settings.address });
      }
      if (route === "campaign-test") {
        const r = await mail(env, "camp_send", { subject: f.subject, html: built.html, text: built.text, emails: [me.e], test: true });
        return j({ ok: true, sent: r.sent, to: me.e });
      }
      if (!settings.address) return j({ error: "Add your mailing address first (it goes in the footer of every email, which the law requires)." }, 400);
      if (route === "campaign-start") {
        const list = await mail(env, "sub_list", {});
        const want = cleanTags(body.audience);
        const emails = list.subscribers.filter((s) => s.status === "subscribed" && EMAIL_RE.test(s.email) && (!want.length || (s.tags || ["general"]).some((t) => want.includes(t)))).map((s) => s.email);
        if (!emails.length) return j({ error: want.length ? "Nobody is subscribed in that group yet." : "There is nobody subscribed yet." }, 400);
        if (emails.length > list.quota) return j({ error: `Your daily sending limit has ${list.quota} emails left and this list has ${emails.length} people. Try again tomorrow.` }, 400);
        const idb = new Uint8Array(6); crypto.getRandomValues(idb);
        return j({ id: Array.from(idb).map((x) => x.toString(16).padStart(2, "0")).join(""), audience: want, total: emails.length, quota: list.quota, emails, chunk: CHUNK });
      }
      if (route === "campaign-chunk") {
        const emails = (Array.isArray(body.emails) ? body.emails : []).map((x) => String(x).trim().toLowerCase()).filter((x) => EMAIL_RE.test(x)).slice(0, CHUNK);
        const r = await mail(env, "camp_send", { subject: f.subject, html: built.html, text: built.text, emails });
        return j({ ok: true, sent: r.sent, failed: r.failed, skipped: r.skipped });
      }
      if (route === "campaign-done") {
        await mail(env, "camp_log", { id: one(body.id, 40), subject: f.subject + (cleanTags(body.audience).length ? " [" + cleanTags(body.audience).join("+") + "]" : ""), total: Number(body.total) || 0, sent: Number(body.sent) || 0, failed: Number(body.failed) || 0 });
        return j({ ok: true });
      }
    }
    return j({ error: "Not found" }, 404);
  } catch (e) {
    return j({ error: e.message || "Something went wrong" }, 400);
  }
}
