/* Site search: products (live catalog), pages, FAQs and Queen Talk posts. Loaded by main.js. No external services. */
(function () {
  "use strict";
  var CFG = window.SITE_CONFIG || {};
  var actions = document.querySelector(".actions");
  if (!actions || document.querySelector("[data-search-open]")) return;
  function el(tag, attrs, text) { var n = document.createElement(tag); if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; return n; }
  function workerUrl(path) { return String(CFG.CHECKOUT_URL || "").replace(/\/checkout$/, path); }

  var SYN = { jelly: "jam", jellies: "jam", preserves: "jam", jars: "jar", pickles: "pickled", pickle: "pickled", speaker: "keynote", speaking: "keynote", speak: "keynote", talk: "keynote", workbook: "book", curriculum: "judah", leader: "leadership", leaders: "leadership", manners: "etiquette", class: "classes", workshop: "classes", delivery: "shipping", ship: "shipping", deliver: "shipping", refill: "wholesale", vendor: "wholesale", bulk: "wholesale", coupon: "promo", discount: "deals", sale: "deals", code: "promo", where: "locations", store: "locations", gift: "gifts" };
  function stem(w) { w = w.toLowerCase().replace(/[^a-z0-9.]/g, "").replace(/\./g, ""); if (SYN[w]) w = SYN[w]; return w.length > 3 ? w.replace(/(ies|es|s)$/, "") : w; }
  function tokens(q) { return String(q).split(/\s+/).map(stem).filter(Boolean); }
  function norm(s) { return String(s || "").toLowerCase().replace(/\./g, "").replace(/[^a-z0-9\s]/g, " "); }
  function score(q, fields) {   // fields: [[text, weight], ...]; every word must match something
    var total = 0;
    for (var i = 0; i < q.length; i++) {
      var best = 0;
      for (var j = 0; j < fields.length; j++) {
        var t = fields[j][0];
        if (!t) continue;
        var at = t.indexOf(q[i]);
        if (at < 0) continue;
        var w = fields[j][1] * (at === 0 || t.charAt(at - 1) === " " ? 1 : 0.5);
        if (w > best) best = w;
      }
      if (!best) return 0;
      total += best;
    }
    return total;
  }

  var data = { products: null, posts: null }, loading = false, listeners = [];
  function loadData(done) {
    if (data.products && data.posts) return done();
    listeners.push(done);
    if (loading) return; loading = true;
    var pending = 2;
    function fin() { if (--pending === 0) { loading = false; listeners.splice(0).forEach(function (f) { f(); }); } }
    function toProducts(list) { return (Array.isArray(list) ? list : []).filter(function (p) { return p && p.name; }); }
    if (CFG.PRODUCTS_URL) fetch(CFG.PRODUCTS_URL).then(function (r) { return r.json(); }).then(function (l) { data.products = toProducts(l); }).catch(function () { data.products = toProducts(window.PRODUCTS); }).then(fin);
    else { data.products = toProducts(window.PRODUCTS); fin(); }
    if (CFG.CHECKOUT_URL) fetch(workerUrl("/blog")).then(function (r) { return r.json(); }).then(function (d) { data.posts = (d && d.posts) || []; }).catch(function () { data.posts = []; }).then(fin);
    else { data.posts = []; fin(); }
  }
  function loadIndex(done) {
    if (window.SITE_SEARCH) return done();
    var s = el("script", { src: "/js/search-index.js" }); s.onload = done; s.onerror = function () { window.SITE_SEARCH = []; done(); }; document.head.appendChild(s);
  }

  function run(query) {
    var q = tokens(query), out = { products: [], posts: [], pages: [], faqs: [] };
    if (!q.length) return out;
    (data.products || []).forEach(function (p) {
      var sizes = (p.sizes || []).map(function (s) { return s.label; }).join(" ");
      var sc = score(q, [[norm(p.name), 10], [norm(p.category), 4], [norm(sizes), 2], [norm(p.description), 3]]);
      if (sc) out.products.push({ sc: sc, p: p });
    });
    (data.posts || []).forEach(function (p) {
      var sc = score(q, [[norm(p.title), 8], [norm(p.category), 3], [norm(p.excerpt), 3]]);
      if (sc) out.posts.push({ sc: sc, p: p });
    });
    (window.SITE_SEARCH || []).forEach(function (e) {
      var sc = score(q, [[norm(e[2]), 9], [norm(e[3]), 4], [norm(e[4]), 2]]);
      if (!sc) return;
      (e[0] === "faq" ? out.faqs : out.pages).push({ sc: sc, e: e });
    });
    ["products", "posts", "pages", "faqs"].forEach(function (k) { out[k].sort(function (a, b) { return b.sc - a.sc; }); });
    return out;
  }

  var PAGE_SUGGEST = [["Shop jams and pickled goods", "/shop/"], ["Classes", "/classes/"], ["J.U.D.A.H. book and curriculum", "/judah/"], ["Book a keynote or training", "/training/#ask"], ["Wholesale", "/wholesale/"], ["Where to find the jars", "/locations/"], ["Deals and promo codes", "/deals/"]];
  var box, input, list, status, opener, lastFocus;
  function price(p) { var cents = (p.sizes || []).filter(function (s) { return typeof s.cents === "number"; }).map(function (s) { return s.cents; }); if (!cents.length) return ""; var lo = Math.min.apply(null, cents); return (cents.length > 1 ? "From $" : "$") + (lo % 100 ? (lo / 100).toFixed(2) : String(lo / 100)); }
  function link(href, title, sub, img) {
    var a = el("a", { href: href, "class": "srch-item" });
    if (img) { var i = el("img", { src: img, alt: "", loading: "lazy", width: "44", height: "44" }); a.appendChild(i); }
    var t = el("span", { "class": "srch-t" }); t.appendChild(el("strong", null, title)); if (sub) t.appendChild(el("span", { "class": "srch-s" }, sub));
    a.appendChild(t); return a;
  }
  function section(name, items) { if (!items.length) return; list.appendChild(el("h3", { "class": "srch-h" }, name)); items.forEach(function (n) { list.appendChild(n); }); }
  function render() {
    list.textContent = "";
    var val = input.value.trim();
    if (!val) {
      status.textContent = "";
      section("Popular", PAGE_SUGGEST.map(function (s) { return link(s[1], s[0]); }));
      return;
    }
    var r = run(val);
    var count = r.products.length + r.posts.length + r.pages.length + r.faqs.length;
    status.textContent = count ? count + (count === 1 ? " result" : " results") : "";
    section("Products", r.products.slice(0, 6).map(function (x) { return link("/shop/?find=" + encodeURIComponent(x.p.id), x.p.name, [x.p.category, price(x.p)].filter(Boolean).join(" · "), x.p.image); }));
    section("Pages", r.pages.slice(0, 5).map(function (x) { return link(x.e[1], x.e[2], x.e[3].slice(0, 110)); }));
    section("Questions", r.faqs.slice(0, 4).map(function (x) { return link(x.e[1], x.e[2], x.e[3].slice(0, 110)); }));
    section("Queen Talk", r.posts.slice(0, 4).map(function (x) { return link("/stories/post/?s=" + encodeURIComponent(x.p.slug || ""), x.p.title, x.p.category || ""); }));
    if (!count) {
      list.appendChild(el("p", { "class": "srch-none" }, "Nothing found for “" + val + "”. Try a simpler word, like jam, class, book or wholesale, or ask us:"));
      list.appendChild(link("/training/#ask", "Ask about a program", "Keynotes, workshops and training"));
      list.appendChild(link("mailto:" + (CFG.CONTACT_EMAIL || "info@queenesheirr.com"), "Email us", CFG.CONTACT_EMAIL || "info@queenesheirr.com"));
    }
  }
  function open() {
    if (!box) build();
    lastFocus = document.activeElement; box.hidden = false; document.body.classList.add("srch-open"); opener.setAttribute("aria-expanded", "true");
    input.focus(); render();
    loadIndex(function () { loadData(function () { if (!box.hidden) render(); }); });
  }
  function close() { if (!box || box.hidden) return; box.hidden = true; document.body.classList.remove("srch-open"); opener.setAttribute("aria-expanded", "false"); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function build() {
    box = el("div", { "class": "srch", role: "dialog", "aria-modal": "true", "aria-label": "Search the site" }); box.hidden = true;
    var panel = el("div", { "class": "srch-panel" });
    var form = el("form", { role: "search", "class": "srch-form", action: "#" });
    input = el("input", { type: "search", "class": "srch-input", placeholder: "Search jams, classes, the book, FAQs...", "aria-label": "Search", autocomplete: "off", spellcheck: "false", enterkeyhint: "search", maxlength: "80" });
    var x = el("button", { type: "button", "class": "srch-x", "aria-label": "Close search" }, "×");
    form.appendChild(input); form.appendChild(x);
    status = el("p", { "class": "srch-status", role: "status", "aria-live": "polite" });
    list = el("div", { "class": "srch-list" });
    panel.appendChild(form); panel.appendChild(status); panel.appendChild(list); box.appendChild(panel); document.body.appendChild(box);
    var timer; input.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(render, 90); });
    form.addEventListener("submit", function (e) { e.preventDefault(); var a = list.querySelector("a"); if (a) location.href = a.getAttribute("href"); });
    x.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        var items = Array.prototype.slice.call(box.querySelectorAll(".srch-input, .srch-item")), at = items.indexOf(document.activeElement);
        if (at < 0) return; e.preventDefault(); var next = items[Math.max(0, Math.min(items.length - 1, at + (e.key === "ArrowDown" ? 1 : -1)))]; if (next) next.focus();
      }
      if (e.key === "Tab") {   // keep focus inside the dialog
        var f = Array.prototype.slice.call(box.querySelectorAll("input, button, a[href]")); if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }
  opener = el("button", { type: "button", "class": "icon-btn", "data-search-open": "", "aria-label": "Search the site", "aria-haspopup": "dialog", "aria-expanded": "false" });
  opener.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5" stroke-linecap="round"/></svg>';
  opener.addEventListener("click", open);
  actions.insertBefore(opener, actions.firstChild);
  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName; if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
    e.preventDefault(); open();
  });
  window.SiteSearch = { run: run };
})();
