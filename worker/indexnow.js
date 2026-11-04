// IndexNow: tells Bing, Yandex and other participating search engines about new or changed pages right away.
// The key file lives on the website root (queenesheirr.com/<key>.txt) so the engines can confirm we own the site.
export const INDEXNOW_KEY = "518e01a74346dae5152487270bb1965b";
const HOST = "queenesheirr.com";

export async function pingIndexNow(env, urls) {
  const list = [...new Set(urls)].filter((u) => typeof u === "string" && u.startsWith("https://" + HOST + "/")).slice(0, 100);
  if (!list.length) return false;
  const key = env.INDEXNOW_KEY || INDEXNOW_KEY;
  try {
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key, keyLocation: "https://" + HOST + "/" + key + ".txt", urlList: list }),
    });
    return r.status === 200 || r.status === 202;
  } catch { return false; }
}

// Pings any live Queen Talk posts that have not been sent yet. Called when the blog list is loaded, so a post is sent
// the first time it is live (including scheduled posts when their date arrives). Sent post ids are kept in KV "indexnow".
export async function pingNewPosts(env, posts) {
  let sent = [];
  try { sent = JSON.parse((await env.ADMIN_KV.get("indexnow")) || "[]"); } catch { sent = []; }
  const fresh = posts.filter((p) => !sent.includes(p.id)).slice(0, 50);
  if (!fresh.length) return;
  const ok = await pingIndexNow(env, fresh.map((p) => "https://" + HOST + "/stories/post/?s=" + encodeURIComponent(p.slug)).concat(["https://" + HOST + "/stories/"]));
  if (ok) await env.ADMIN_KV.put("indexnow", JSON.stringify(sent.concat(fresh.map((p) => p.id)).slice(-1000)));
}
