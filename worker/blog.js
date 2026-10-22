// Queen Talk blog: posts live in the ADMIN_KV key "blog" and are written in the admin app.
// The website (queenesheirr.com/stories/) fetches them from the public routes below.
// Post text is simple formatting (## headings, - lists, **bold**, [links](https://...), ![photo](url)); it is escaped and turned into safe HTML here.

const SITE = "https://queenesheirr.com";
const MAX_POSTS = 200;
const ID_RE = /^[a-f0-9]{12}$/;
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const one = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, n);
const slugify = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60).replace(/-+$/, "");
const todayCentral = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
const okImage = (u, origin) => typeof u === "string" && (
  /^https:\/\/(files\.stripe\.com|queenesheirr\.com)\/[^\s"'<>]+$/.test(u) ||
  (typeof origin === "string" && u.startsWith(origin + "/img/") && /^\/img\/[a-f0-9]{16,32}\.jpg$/.test(u.slice(origin.length))));
const okLink = (u) => /^(https:\/\/|mailto:)[^\s"'<>]{3,500}$/.test(u);

const SEED = [
  { id: "a1b2c3d4e5f6", slug: "where-the-jars-come-from", title: "Where the Jars Come From", category: "Family", author: "Queen E's Heirr", date: "2026-10-01", status: "published", image: SITE + "/images/family.png",
    excerpt: "LyKinda cooks from family tradition: fresh fruit, careful batches, and ingredients sourced close to home whenever she can.",
    body: "LyKinda cooks from family tradition: fresh fruit, careful batches, and ingredients sourced close to home whenever she can. The same care shows up at the table, in class, and in how she hosts." },
  { id: "f6e5d4c3b2a1", slug: "a-spoon-a-board-a-story", title: "A Spoon, a Board, a Story", category: "Hosting", author: "Queen E's Heirr", date: "2026-10-02", status: "published", image: SITE + "/images/tasting.jpg",
    excerpt: "Pair blueberry or strawberry jam with something creamy and something sharp.",
    body: "Pair blueberry or strawberry jam with something creamy and something sharp. Add pickled vegetables when you want the bite that makes people stay a little longer." },
];

export async function readPosts(env) {
  let raw = await env.ADMIN_KV.get("blog");
  if (raw == null) { await env.ADMIN_KV.put("blog", JSON.stringify(SEED)); return SEED.map((p) => ({ ...p })); }
  try { const a = JSON.parse(raw); return Array.isArray(a) ? a : []; } catch { return []; }
}
const writePosts = (env, posts) => env.ADMIN_KV.put("blog", JSON.stringify(posts));

// ---- text -> safe HTML ---------------------------------------------------------------------------
function inline(s) {
  let t = esc(s);
  t = t.replace(/\[([^\]\n]{1,200})\]\(([^)\s]{4,500})\)/g, (m, txt, url) => {
    const u = url.replace(/&amp;/g, "&");
    return okLink(u) ? `<a href="${esc(u)}" rel="noopener noreferrer"${u.startsWith("https://queenesheirr.com") || u.startsWith("mailto:") ? "" : ' target="_blank"'}>${txt}</a>` : txt;
  });
  t = t.replace(/\*\*([^*\n]{1,300})\*\*/g, "<strong>$1</strong>").replace(/(^|[\s(])\*([^*\n]{1,300})\*(?=$|[\s).,!?;:])/g, "$1<em>$2</em>");
  return t;
}
export function renderBody(text, origin) {
  const lines = String(text || "").replace(/\r/g, "").split("\n");
  const out = []; let para = [], list = null;
  const flushP = () => { if (para.length) { out.push("<p>" + para.map(inline).join("<br>") + "</p>"); para = []; } };
  const flushL = () => { if (list) { out.push(`<${list.t}>` + list.items.map((i) => "<li>" + inline(i) + "</li>").join("") + `</${list.t}>`); list = null; } };
  for (const raw of lines) {
    const l = raw.trimEnd(); let m;
    if (!l.trim()) { flushP(); flushL(); continue; }
    if ((m = l.match(/^(#{2,3})\s+(.{1,200})$/))) { flushP(); flushL(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); continue; }
    if (/^-{3,}$/.test(l.trim())) { flushP(); flushL(); out.push("<hr>"); continue; }
    if ((m = l.match(/^>\s?(.{1,600})$/))) { flushP(); flushL(); out.push(`<blockquote>${inline(m[1])}</blockquote>`); continue; }
    if ((m = l.match(/^!\[([^\]\n]{0,200})\]\((\S{4,500})\)$/))) {
      flushP(); flushL();
      const u = m[2].replace(/&amp;/g, "&");
      if (okImage(u, origin)) out.push(`<figure><img src="${esc(u)}" alt="${esc(m[1])}" loading="lazy">${m[1] ? `<figcaption>${esc(m[1])}</figcaption>` : ""}</figure>`);
      continue;
    }
    if ((m = l.match(/^[-*]\s+(.{1,600})$/))) { flushP(); if (!list || list.t !== "ul") { flushL(); list = { t: "ul", items: [] }; } list.items.push(m[1]); continue; }
    if ((m = l.match(/^\d+[.)]\s+(.{1,600})$/))) { flushP(); if (!list || list.t !== "ol") { flushL(); list = { t: "ol", items: [] }; } list.items.push(m[1]); continue; }
    flushL(); para.push(l);
  }
  flushP(); flushL();
  return out.join("\n");
}
const plain = (text) => String(text || "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[#>*_`-]+/g, " ").replace(/\s+/g, " ").trim();

function cleanPost(b, origin, existing, all) {
  b = b && typeof b === "object" ? b : {};
  const title = one(b.title, 120);
  if (!title) throw new Error("Give the post a title.");
  const body = String(b.body || "").replace(/\r/g, "").slice(0, 30000).trim();
  if (!body) throw new Error("Write something in the post.");
  let slug = slugify(one(b.slug, 80) || title);
  if (!SLUG_RE.test(slug)) slug = "post";
  const taken = (s) => all.some((p) => p.slug === s && (!existing || p.id !== existing.id));
  if (taken(slug)) { if (b.slug && existing && existing.slug !== slug) throw new Error("Another post already uses that web address. Change it a little."); let i = 2; while (taken(slug + "-" + i)) i++; slug = slug + "-" + i; }
  const status = b.status === "published" ? "published" : "draft";
  const date = DATE_RE.test(b.date || "") ? b.date : (existing && existing.date) || todayCentral();
  const image = String(b.image || "").trim();
  if (image && !okImage(image, origin)) throw new Error("That cover photo is not allowed. Upload it with the photo button.");
  return { id: existing ? existing.id : "", slug, title, category: one(b.category, 30), author: one(b.author, 60) || "Queen E's Heirr", date, status, image,
    excerpt: one(b.excerpt, 300) || plain(body).slice(0, 180).replace(/\s\S*$/, "") + "...", body, updated: Date.now() };
}

const live = (p) => p.status === "published" && p.date <= todayCentral();
const pub = (p) => ({ slug: p.slug, title: p.title, category: p.category || "", author: p.author, date: p.date, image: p.image || "", excerpt: p.excerpt });

// ---- admin ---------------------------------------------------------------------------------------
export async function blogRoute(route, method, body, env, me, j, origin) {
  if (!/^blog-[a-z]+$/.test(route)) return null;
  try {
    if (route === "blog-posts" && method === "GET") {
      const posts = (await readPosts(env)).slice().sort((a, b) => (b.date + b.updated).localeCompare(a.date + a.updated));
      return j({ posts: posts.map((p) => ({ ...p, live: live(p) })), today: todayCentral() });
    }
    if (route === "blog-preview" && method === "POST") {
      return j({ html: renderBody(body.body, origin) });
    }
    if (route === "blog-save" && method === "POST") {
      const posts = await readPosts(env);
      const existing = body.id && ID_RE.test(body.id) ? posts.find((p) => p.id === body.id) : null;
      if (body.id && !existing) return j({ error: "That post no longer exists." }, 404);
      if (!existing && posts.length >= MAX_POSTS) return j({ error: "You have reached the limit of " + MAX_POSTS + " posts. Delete some old ones first." }, 400);
      const p = cleanPost(body, origin, existing, posts);
      if (existing) Object.assign(existing, p);
      else { const b = new Uint8Array(6); crypto.getRandomValues(b); p.id = Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join(""); posts.push(p); }
      await writePosts(env, posts);
      return j({ ok: true, post: { ...(existing || p), live: live(existing || p) } });
    }
    if (route === "blog-delete" && method === "POST") {
      const posts = await readPosts(env);
      if (!ID_RE.test(body.id || "") || !posts.some((p) => p.id === body.id)) return j({ error: "That post no longer exists." }, 404);
      await writePosts(env, posts.filter((p) => p.id !== body.id));
      return j({ ok: true });
    }
    return j({ error: "Not found" }, 404);
  } catch (e) { return j({ error: e.message || "Something went wrong" }, 400); }
}

// ---- public --------------------------------------------------------------------------------------
// GET /blog, /blog/<slug>, /blog/share/<slug>, /blog/sitemap.xml
export async function blogPublic(url, env, headers, json) {
  const path = url.pathname;
  const cache = { ...headers, "Cache-Control": "public, max-age=60" };
  if (path === "/blog") {
    const posts = (await readPosts(env)).filter(live).sort((a, b) => b.date.localeCompare(a.date));
    return json({ posts: posts.map(pub) }, 200, cache);
  }
  if (path === "/blog/sitemap.xml") {
    const posts = (await readPosts(env)).filter(live);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      posts.map((p) => `  <url><loc>${SITE}/stories/post/?s=${esc(p.slug)}</loc><lastmod>${esc(p.date)}</lastmod></url>`).join("\n") + "\n</urlset>\n";
    return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
  }
  let m = path.match(/^\/blog\/share\/([a-z0-9-]{1,80})$/);
  if (m) {
    const p = (await readPosts(env)).filter(live).find((x) => x.slug === m[1]);
    if (!p) return Response.redirect(SITE + "/stories/", 302);
    const target = `${SITE}/stories/post/?s=${p.slug}`;
    const img = p.image && okImage(p.image, url.origin) ? p.image : SITE + "/images/og.jpg";
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(p.title)} | Queen E's Heirr</title>` +
      `<meta name="description" content="${esc(p.excerpt)}"><link rel="canonical" href="${esc(target)}">` +
      `<meta property="og:type" content="article"><meta property="og:site_name" content="Queen E's Heirr"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.excerpt)}"><meta property="og:url" content="${esc(target)}"><meta property="og:image" content="${esc(img)}">` +
      `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.excerpt)}"><meta name="twitter:image" content="${esc(img)}">` +
      `<meta http-equiv="refresh" content="0;url=${esc(target)}"></head><body><p><a href="${esc(target)}">${esc(p.title)}</a></p></body></html>`;
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } });
  }
  m = path.match(/^\/blog\/([a-z0-9-]{1,80})$/);
  if (m) {
    const p = (await readPosts(env)).filter(live).find((x) => x.slug === m[1]);
    if (!p) return json({ error: "Not found" }, 404, headers);
    return json({ post: { ...pub(p), html: renderBody(p.body, url.origin), share: `${url.origin}/blog/share/${p.slug}` } }, 200, cache);
  }
  return null;
}
