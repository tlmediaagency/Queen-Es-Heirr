// Email-safe rich text: turns whatever the campaign editor produces into a small, safe set of tags with inline styles.
const FOREST = "#1b3b22", LINEN = "#e5dbd1", GOLD = "#d4af37", INK = "#0e2012";
const SERIF = "Georgia,'Times New Roman',serif", SANS = "Helvetica,Arial,sans-serif";
const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const FONT_SIZES = { 1: 10, 2: 13, 3: 16, 4: 18, 5: 24, 6: 32, 7: 48 };
const KEYWORD_SIZES = { "x-small": 10, small: 13, medium: 16, large: 18, "x-large": 24, "xx-large": 32, "xxx-large": 48 };
const COLOR_RE = /^(#[0-9a-f]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))$/i;
const VOID = new Set(["br", "img"]);
const BLOCK = new Set(["p", "h2", "li", "blockquote", "ul", "ol"]);
const DROP_WITH_CONTENT = /<(script|style|iframe|object|embed|noscript|template|svg|head)\b[\s\S]*?<\/\1\s*>/gi;
const TAG_MAP = { p: "p", div: "p", h1: "h2", h2: "h2", h3: "h2", h4: "h2", ul: "ul", ol: "ol", li: "li", blockquote: "blockquote", b: "strong", strong: "strong", i: "em", em: "em", u: "u", span: "span", font: "span", a: "a", br: "br", img: "img" };

function parseAttrs(raw) {
  const out = {}, re = /([a-zA-Z_:][a-zA-Z0-9_:.-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m; while ((m = re.exec(raw))) out[m[1].toLowerCase()] = decode(m[2] != null ? m[2] : m[3] != null ? m[3] : m[4] != null ? m[4] : "");
  return out;
}
function cleanStyle(style, extra) {
  const keep = [];
  const add = (p, v) => { if (!keep.some((k) => k.startsWith(p + ":"))) keep.push(p + ":" + v); };
  String(style || "").split(";").forEach((d) => {
    const i = d.indexOf(":"); if (i < 0) return;
    const p = d.slice(0, i).trim().toLowerCase(), v = d.slice(i + 1).trim().toLowerCase();
    if (p === "color" && COLOR_RE.test(v)) add("color", v);
    else if (p === "font-size") { const px = /^(\d{1,2}(?:\.\d+)?)px$/.exec(v); const n = px ? parseFloat(px[1]) : KEYWORD_SIZES[v]; if (n) add("font-size", Math.min(48, Math.max(10, Math.round(n))) + "px"); }
    else if (p === "text-align" && /^(left|center|right)$/.test(v)) add("text-align", v);
    else if (p === "font-weight" && /^(bold|700|800|900|600)$/.test(v)) add("font-weight", "700");
    else if (p === "font-style" && v === "italic") add("font-style", "italic");
    else if (p === "text-decoration" && /underline/.test(v)) add("text-decoration", "underline");
  });
  (extra || []).forEach((e) => { const p = e.split(":")[0]; if (!keep.some((k) => k.startsWith(p + ":"))) keep.push(e); });
  return keep.join(";");
}
let WEB = false, IMG_OK = null;
const PSTYLE = `font:16px/1.65 ${SANS};color:${INK};margin:0 0 16px`;
function openWeb(tag, a) {
  const st = cleanStyle(a.style), at = st ? ` style="${st}"` : "";
  switch (tag) {
    case "p": case "h2": case "li": case "blockquote": return `<${tag}${at}>`;
    case "ul": case "ol": return `<${tag}>`;
    case "strong": case "em": case "u": return `<${tag}${at}>`;
    case "span": {
      let s = st;
      if (a.color && COLOR_RE.test(a.color)) s = cleanStyle(s + ";color:" + a.color);
      if (a.size && FONT_SIZES[a.size]) s = cleanStyle(s + ";font-size:" + FONT_SIZES[a.size] + "px");
      return `<span${s ? ` style="${s}"` : ""}>`;
    }
    case "a": { const href = String(a.href || ""); return `<a href="${esc(href)}" rel="noopener noreferrer"${/^https:\/\/(www\.)?queenesheirr\.com/.test(href) || href.startsWith("mailto:") ? "" : ' target="_blank"'}${at}>`; }
  }
  return "";
}
function open(tag, a) {
  if (WEB) return openWeb(tag, a);
  const st = cleanStyle(a.style);
  switch (tag) {
    case "p": return `<p style="${PSTYLE}${st ? ";" + st : ""}">`;
    case "h2": return `<h2 style="font:700 22px/1.3 ${SERIF};color:${FOREST};margin:22px 0 10px${st ? ";" + st : ""}">`;
    case "ul": case "ol": return `<${tag} style="margin:0 0 16px;padding-left:24px;font:16px/1.65 ${SANS};color:${INK}">`;
    case "li": return `<li style="margin:0 0 6px${st ? ";" + st : ""}">`;
    case "blockquote": return `<blockquote style="margin:0 0 16px;padding:4px 0 4px 16px;border-left:3px solid ${GOLD};font:16px/1.65 ${SANS};color:${INK}">`;
    case "strong": case "em": case "u": return `<${tag}${st ? ` style="${st}"` : ""}>`;
    case "span": {
      let s = st;
      if (a.color && COLOR_RE.test(a.color)) s = cleanStyle(s + ";color:" + a.color);
      if (a.size && FONT_SIZES[a.size]) s = cleanStyle(s + ";font-size:" + FONT_SIZES[a.size] + "px");
      return `<span${s ? ` style="${s}"` : ""}>`;
    }
    case "a": {
      const href = String(a.href || "");
      if (!/^(https:\/\/|mailto:)[^\s"'<>]+$/i.test(href)) return "<span>";
      return `<a href="${esc(href)}" style="color:${FOREST};font-weight:600${st ? ";" + st : ""}">`;
    }
  }
  return "";
}
export function sanitizeRich(input, max, opts) {
  WEB = !!(opts && opts.web); IMG_OK = (opts && opts.imgOk) || null;
  let html = String(input || "").replace(/\r/g, "").replace(/<!--[\s\S]*?-->/g, "").replace(DROP_WITH_CONTENT, "");
  html = html.slice(0, max || 40000);
  const out = [], stack = []; // stack of {tag, implicit}
  const hasBlock = () => stack.some((s) => BLOCK.has(s.tag));
  const popTo = (i) => { while (stack.length > i) out.push(`</${stack.pop().tag}>`); };
  const ensureInline = () => { if (!hasBlock()) { out.push(open("p", {})); stack.push({ tag: "p", implicit: true }); } };
  const text = (t) => {
    if (!t) return;
    t = t.replace(/&(?!(?:[a-z]{2,8}|#\d{1,6}|#x[0-9a-f]{1,5});)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const top = stack.length ? stack[stack.length - 1].tag : "";
    if (!t.trim() && (!stack.length || top === "ul" || top === "ol")) return;
    if (top === "ul" || top === "ol") return;
    ensureInline(); out.push(t);
  };
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g;
  let last = 0, m;
  while ((m = re.exec(html))) {
    text(html.slice(last, m.index)); last = re.lastIndex;
    const closing = m[1] === "/", src = m[2].toLowerCase(), tag = TAG_MAP[src];
    if (!tag) continue;
    if (closing) {
      if (VOID.has(tag)) continue;
      let i = -1; for (let k = stack.length - 1; k >= 0; k--) if (stack[k].tag === tag) { i = k; break; }
      if (i >= 0) popTo(i);
      continue;
    }
    const a = parseAttrs(m[3]);
    if (tag === "br") { ensureInline(); out.push("<br>"); continue; }
    if (tag === "img") {
      const srcUrl = String(a.src || "");
      if (!/^https:\/\/[^\s"'<>]{4,500}$/.test(srcUrl) || (IMG_OK && !IMG_OK(srcUrl))) continue;
      const w = parseInt(a["data-w"], 10), pct = [25, 50, 75, 100].includes(w) ? w : 100;
      ensureInline();
      out.push(`<img src="${esc(srcUrl)}" alt="${esc((a.alt || "").slice(0, 120))}" data-w="${pct}" ${WEB ? 'loading="lazy" ' : ""}style="display:block;width:${pct}%;max-width:100%;height:auto;margin:${WEB ? "1.2em" : "14px"} auto;border:0;border-radius:12px">`);
      continue;
    }
    if (tag === "p" || tag === "h2" || tag === "ul" || tag === "ol" || tag === "blockquote") { while (stack.length && (stack[stack.length - 1].tag === "p" || stack[stack.length - 1].tag === "h2")) popTo(stack.length - 1); }
    if (tag === "li") { let i = -1; for (let k = stack.length - 1; k >= 0; k--) { if (stack[k].tag === "li") { i = k; break; } if (stack[k].tag === "ul" || stack[k].tag === "ol") break; } if (i >= 0) popTo(i); if (!stack.some((s) => s.tag === "ul" || s.tag === "ol")) { out.push(open("ul", {})); stack.push({ tag: "ul" }); } }
    if (!BLOCK.has(tag)) ensureInline();
    const eff = tag === "a" && !/^(https:\/\/|mailto:)[^\s"'<>]+$/i.test(String(a.href || "")) ? "span" : tag;
    out.push(open(eff, a)); stack.push({ tag: eff });
  }
  text(html.slice(last));
  popTo(0);
  return out.join("").replace(/(<p(?: [^>]*)?>)\s*(<\/p>)/g, "$1<br>$2");
}
export function richToText(html) {
  return decode(String(html || "")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (m, h, t) => { const tt = t.replace(/<[^>]+>/g, ""); const u = decode(h); return tt.trim() === u ? tt : `${tt} (${u})`; })
    .replace(/<li[^>]*>/g, "- ").replace(/<\/(p|li|h2|blockquote|ul|ol)>/g, "\n").replace(/<br>/g, "\n").replace(/<img[^>]*>/g, "").replace(/<[^>]+>/g, ""))
    .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}
