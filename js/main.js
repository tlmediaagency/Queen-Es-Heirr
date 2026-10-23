(function () {
  const menuBtn = document.querySelector("[data-menu-btn]");
  const menu = document.querySelector("[data-menu]");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      const open = menu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
    const buttons = tabs.querySelectorAll("[data-tab]");
    const panels = tabs.parentElement.querySelectorAll("[data-panel]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const name = btn.getAttribute("data-tab");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        panels.forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-panel") !== name;
        });
      });
    });
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (!reduce && !coarse) {
    const count = 7;
    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const spots = [];
    const nodes = [];
    for (let i = 0; i < count; i++) {
      spots.push({ x: mouse.x, y: mouse.y });
      const span = document.createElement("span");
      span.className = "crown-trail";
      span.setAttribute("aria-hidden", "true");
      span.style.opacity = String((count - i) / count);
      span.innerHTML =
        '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 17 L5 8 L9 12 L12 6 L15 12 L19 8 L21 17 Z"/><rect x="4" y="18" width="16" height="2" rx="1"/></svg>';
      document.body.appendChild(span);
      nodes.push(span);
    }
    addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    (function tick() {
      let x = mouse.x;
      let y = mouse.y;
      spots.forEach(function (pos, i) {
        pos.x += (x - pos.x) * 0.35;
        pos.y += (y - pos.y) * 0.35;
        x = pos.x;
        y = pos.y;
        nodes[i].style.transform =
          "translate(" + pos.x + "px," + pos.y + "px) translate(-50%,-50%)";
      });
      requestAnimationFrame(tick);
    })();
  }

  var CFG = window.SITE_CONFIG || {};
  var KEY = "queen-e-cart";
  var MAX_QTY = 20;

  function loadCart() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(raw)) return [];
      return raw.filter(function (l) {
        return l && typeof l.id === "string" && typeof l.size === "string" && Number.isInteger(l.qty) && l.qty > 0 && sizeOf(l.id, l.size);
      }).map(function (l) { return { id: l.id, size: l.size, qty: Math.min(l.qty, MAX_QTY) }; });
    } catch (e) { return []; }
  }
  function saveCart(lines) {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) {}
  }
  function money(cents) {
    return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
  var catalog = window.PRODUCTS || [];
  var PLACEHOLDER = "/images/jar-placeholder.jpg";
  function findProduct(id) {
    return catalog.find(function (p) { return p.id === id; });
  }
  function sizeOf(id, label) {
    var p = findProduct(id);
    return p && p.sizes.find(function (s) { return s.label === label; });
  }
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }

  var panel = document.querySelector("[data-cart-panel]");
  var countEl = document.querySelector("[data-cart-count]");
  var linesEl = document.querySelector("[data-cart-lines]");
  var subEl = document.querySelector("[data-cart-subtotal]");
  var msgEl = document.querySelector("[data-cart-msg]");
  var checkoutBtn = document.getElementById("checkout");

  function setMsg(t) { if (msgEl) msgEl.textContent = t || ""; }

  var shipQ = { sig: "", zip: "", opts: [], chosen: null };
  function shipBox() { return document.querySelector("[data-ship-quote]"); }
  function resetShip() {
    shipQ.opts = []; shipQ.chosen = null;
    var o = document.querySelector("[data-ship-options]"); if (o) o.textContent = "";
  }
  function syncShipBox(allDigital) {
    var b = shipBox(); if (!b) return;
    var r = document.querySelector('input[name="fulfillment"]:checked');
    b.hidden = !!allDigital || (r && r.value !== "ship");
  }
  function render() {
    var lines = loadCart();
    var sig = JSON.stringify(lines); if (sig !== shipQ.sig) { shipQ.sig = sig; resetShip(); }
    var n = lines.reduce(function (a, l) { return a + l.qty; }, 0);
    if (countEl) countEl.textContent = String(n);
    if (!linesEl || !subEl) return;
    linesEl.textContent = "";
    var sub = 0;
    if (!lines.length) linesEl.appendChild(el("p", { "class": "muted" }, "Your bag is empty."));
    lines = lines.filter(function (l) { return findProduct(l.id) && sizeOf(l.id, l.size); });
    lines.forEach(function (line) {
      var product = findProduct(line.id);
      var cents = sizeOf(line.id, line.size).cents;
      sub += cents * line.qty;
      var row = el("div", { "class": "cart-line" });
      var info = el("div");
      info.appendChild(el("strong", null, product.name));
      info.appendChild(el("br"));
      info.appendChild(el("span", { "class": "muted" }, line.size));
      var qty = el("div", { "class": "qty" });
      var dec = el("button", { type: "button", "aria-label": "Remove one " + product.name }, "-");
      var inc = el("button", { type: "button", "aria-label": "Add one " + product.name }, "+");
      dec.addEventListener("click", function () { change(line.id, line.size, -1); });
      inc.addEventListener("click", function () { change(line.id, line.size, 1); });
      qty.appendChild(dec); qty.appendChild(el("span", null, String(line.qty))); qty.appendChild(inc);
      row.appendChild(info); row.appendChild(qty); row.appendChild(el("div", null, money(cents * line.qty)));
      linesEl.appendChild(row);
    });
    subEl.textContent = money(sub);
    if (checkoutBtn) checkoutBtn.disabled = !lines.length;
    var allDigital = lines.length > 0 && lines.every(function (l) { return findProduct(l.id).digital; });
    var fset = document.querySelector(".fulfill"), fnote = document.querySelector("[data-fulfill-note]");
    if (fset) fset.hidden = allDigital;
    syncShipBox(allDigital);
    if (fnote && allDigital) fnote.textContent = "Digital items: no shipping. Any sales tax is added at secure checkout, and we email your access details.";
    else if (fnote && fnote.textContent.indexOf("Digital items") === 0) fnote.textContent = "Orders are made in small batches and take about 5 business days to prepare, plus USPS delivery time. Any sales tax is added at secure checkout.";
  }

  function change(id, size, delta) {
    var lines = loadCart();
    var line = lines.find(function (l) { return l.id === id && l.size === size; });
    if (!line) return;
    line.qty = Math.min(line.qty + delta, MAX_QTY);
    saveCart(lines.filter(function (l) { return l.qty > 0; }));
    render();
  }

  function addToCart(id, size) {
    var s = sizeOf(id, size);
    if (!s || s.soldOut) return;
    var lines = loadCart();
    var existing = lines.find(function (l) { return l.id === id && l.size === size; });
    if (existing) existing.qty = Math.min(existing.qty + 1, MAX_QTY);
    else lines.push({ id: id, size: size, qty: 1 });
    saveCart(lines);
    setMsg("");
    render();
    if (panel) panel.classList.add("is-open");
  }

  document.querySelectorAll("[data-cart-open]").forEach(function (b) {
    b.addEventListener("click", function () { if (panel) panel.classList.add("is-open"); });
  });
  document.querySelectorAll("[data-cart-close]").forEach(function (b) {
    b.addEventListener("click", function () { if (panel) panel.classList.remove("is-open"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel) panel.classList.remove("is-open");
  });


  // Cookie notice. Only strictly necessary storage is used by default (shopping bag, layout choice).
  // Optional third-party content (e.g. analytics, if added later) must load only after "Accept all" (QE_hasConsent()).
  var CONSENT_KEY = "qe-consent";
  function getConsent() { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } }
  function setConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {}
    var bar = document.querySelector(".cookie-bar"); if (bar) bar.remove();
    document.dispatchEvent(new CustomEvent("qe-consent", { detail: v }));
  }
  window.QE_hasConsent = function () { return getConsent() === "all"; };
  function showCookieBar() {
    if (document.querySelector(".cookie-bar")) return;
    var bar = el("div", { "class": "cookie-bar", role: "dialog", "aria-label": "Cookie notice" });
    var t = el("p");
    t.appendChild(el("strong", null, "Jam goes great with cookies. \uD83C\uDF6A "));
    t.appendChild(document.createTextNode("Ours are the necessary, perfectly safe kind that keep your bag and settings in place. Anything extra from other sites stays off the table unless you say yes. "));
    var a = el("a", { href: "/privacy-policy/" }, "Privacy policy"); t.appendChild(a);
    var row = el("div", { "class": "cookie-actions" });
    var no = el("button", { type: "button", "class": "btn btn-ghost" }, "Just the basics");
    var yes = el("button", { type: "button", "class": "btn" }, "Sweet, accept all");
    no.addEventListener("click", function () { setConsent("essential"); });
    yes.addEventListener("click", function () { setConsent("all"); });
    row.appendChild(no); row.appendChild(yes); bar.appendChild(t); bar.appendChild(row);
    document.body.appendChild(bar);
  }
  if (getConsent() === null) showCookieBar();
  var footWrap = document.querySelector(".site-footer .foot > div:nth-child(2) p");
  if (footWrap) {
    footWrap.appendChild(document.createElement("br"));
    var cs = el("a", { href: "#", "data-cookie-settings": "" }, "Cookie settings");
    cs.addEventListener("click", function (e) { e.preventDefault(); showCookieBar(); });
    footWrap.appendChild(cs);
  }


  // Training inquiry: audience choice shows the matching program checkboxes and keeps the page tabs in sync.
  var audForm = document.querySelector("[data-audience-form]");
  if (audForm) {
    var showAudience = function (a, fromTab) {
      a = String(a).toLowerCase();
      audForm.querySelectorAll("[data-interests]").forEach(function (fs) {
        var on = fs.getAttribute("data-interests") === a;
        fs.hidden = !on; fs.disabled = !on;
      });
      audForm.querySelectorAll('input[name="audience"]').forEach(function (r) { r.checked = r.value.toLowerCase() === a; });
      if (!fromTab) { var tb = document.querySelector('[data-tab="' + a + '"]'); if (tb) tb.click(); }
    };
    audForm.querySelectorAll('input[name="audience"]').forEach(function (r) { r.addEventListener("change", function () { showAudience(r.value, false); }); });
    document.querySelectorAll("[data-tab]").forEach(function (tb) { tb.addEventListener("click", function () { showAudience(tb.getAttribute("data-tab"), true); }); });
    audForm.addEventListener("reset", function () { setTimeout(function () { showAudience("students", false); }, 0); });
  }

  // Shop grid
  var shop = document.querySelector("[data-shop]");
  var sortKey = "order";
  // Shop filter buttons: label, URL key, and the product categories each one covers.
  var CATS = [["Jams", "jams", ["Jams"]], ["Pickled Goods", "pickled-goods", ["Pickled goods"]], ["Books and Resources", "books", ["Books", "Curriculum & Resources"]]];
  var catGroup = function (name) { for (var i = 0; i < CATS.length; i++) if (CATS[i][0] === name) return CATS[i][2]; return null; };
  var soloCat = shop ? shop.getAttribute("data-category") : null;   // e.g. the Judah page shows only Books
  var catFilter = "";
  (function () {
    var m = /[?&]cat=([a-z-]+)/.exec(location.search) || /^#([a-z-]+)$/.exec(location.hash);
    if (m) CATS.forEach(function (c) { if (c[1] === m[1] || (c[1] === "books" && m[1] === "curriculum")) catFilter = c[0]; });
  })();
  if (shop) {
    var viewKey = "qe-shop-view", view = "grid";
    try { view = localStorage.getItem(viewKey) === "list" ? "list" : "grid"; } catch (e) {}
    shop.setAttribute("data-view", view);
    var tog = el("div", { "class": "view-toggle", role: "group", "aria-label": "Product layout" });
    var ICONS = {
      grid: "M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z",
      list: "M3 4h18v4H3zm0 6h18v4H3zm0 6h18v4H3z"
    };
    ["grid", "list"].forEach(function (v) {
      var b = el("button", { type: "button", "data-view-btn": v, "aria-pressed": String(v === view) });
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[v] + '"/></svg>' + (v === "grid" ? "Grid" : "List");
      b.addEventListener("click", function () {
        shop.setAttribute("data-view", v);
        try { localStorage.setItem(viewKey, v); } catch (e) {}
        tog.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      });
      tog.appendChild(b);
    });
    var sortSel = el("select", { "aria-label": "Sort products" });
    [["order", "Our Order"], ["featured", "Featured First"], ["name", "Name (A to Z)"], ["price-asc", "Price (low to high)"], ["price-desc", "Price (high to low)"], ["available", "Availability (in stock first)"], ["stock", "Most in stock"]].forEach(function (o) {
      sortSel.appendChild(el("option", { value: o[0] }, o[1]));
    });
    sortSel.addEventListener("change", function () { sortKey = sortSel.value; renderShop(); });
    var sortLab = el("label", { "class": "sort-field" }, "Sort by");
    sortLab.appendChild(sortSel);
    var tools = el("div", { "class": "shop-tools" });
    tools.appendChild(sortLab); tools.appendChild(tog);
    if (!soloCat) {
      var chips = el("div", { "class": "cat-chips", role: "group", "aria-label": "Shop by category" });
      chips.setAttribute("data-cat-chips", "");
      shop.parentNode.insertBefore(chips, shop);
      shop.parentNode.insertBefore(tools, shop);
    } else {
      sortLab.hidden = true; tog.hidden = true;
    }
  }
  function sortedCatalog() {
    var list = catalog.slice();
    var open = function (p) { return p.sizes.filter(function (s) { return !s.soldOut; }); };
    var minPrice = function (p) { var o = open(p); o = o.length ? o : p.sizes; return Math.min.apply(null, o.map(function (s) { return s.cents; })); };
    var stockOf = function (p) { return open(p).reduce(function (t, s) { return t + (typeof s.stock === "number" ? s.stock : 999); }, 0); };
    var byName = function (a, b) { return a.name.localeCompare(b.name); };
    var fresh = function (p) { return p.restocked && Date.now() - p.restocked < 14 * 864e5 && open(p).length > 0; };
    if (sortKey === "order") list.sort(function (a, b) { return (a.sort || 1000) - (b.sort || 1000) || byName(a, b); });
    else if (sortKey === "featured") list.sort(function (a, b) {
      return (!!b.featured - !!a.featured) || (fresh(b) - fresh(a)) || ((fresh(b) ? b.restocked : 0) - (fresh(a) ? a.restocked : 0)) ||
        ((open(b).length > 0) - (open(a).length > 0)) || ((a.sort || 1000) - (b.sort || 1000)) || byName(a, b);
    });
    else if (sortKey === "name") list.sort(byName);
    else if (sortKey === "price-asc") list.sort(function (a, b) { return minPrice(a) - minPrice(b) || byName(a, b); });
    else if (sortKey === "price-desc") list.sort(function (a, b) { return minPrice(b) - minPrice(a) || byName(a, b); });
    else if (sortKey === "available") list.sort(function (a, b) { return (open(b).length > 0) - (open(a).length > 0) || byName(a, b); });
    else if (sortKey === "stock") list.sort(function (a, b) { return stockOf(b) - stockOf(a) || byName(a, b); });
    return list;
  }
  function renderChips() {
    var box = document.querySelector("[data-cat-chips]");
    if (!box) return;
    box.textContent = "";
    var present = CATS.filter(function (c) { return catalog.some(function (p) { return c[2].indexOf(p.category) > -1; }); });
    if (present.length < 2) { box.hidden = true; return; }
    box.hidden = false;
    [["", "All"]].concat(present).forEach(function (c) {
      var b = el("button", { type: "button", "aria-pressed": String(catFilter === c[0]) }, c[0] === "" ? "All" : c[0]);
      b.addEventListener("click", function () { catFilter = c[0]; renderChips(); renderShop(); });
      box.appendChild(b);
    });
  }
  function isFood(p) { return p.category === "Jams" || p.category === "Pickled goods"; }
  function renderShop() {
    if (!shop) return;
    shop.textContent = "";
    renderChips();
    var shown = sortedCatalog().filter(function (p) { return soloCat ? soloCat.split("|").indexOf(p.category) > -1 : (!catFilter || (catGroup(catFilter) || []).indexOf(p.category) > -1); });
    if (!shown.length) shop.appendChild(el("p", { "class": "muted" }, soloCat ? "More to come. Join the mailing list to hear about the new releases as they are available." : "Nothing here yet."));
    shown.forEach(function (p) {
      var card = el("article", { "class": "card" });
      var imgSrc = p.image || PLACEHOLDER;
      var img = el("img", { src: imgSrc, alt: imgSrc === PLACEHOLDER ? p.name + " (photo coming soon)" : p.name + (isFood(p) ? " jar" : ""), loading: "lazy" });
      var body = el("div", { "class": "card-body" });
      var fresh = p.restocked && Date.now() - p.restocked < 14 * 864e5 && p.sizes.some(function (s) { return !s.soldOut; });
      body.appendChild(el("p", { "class": "kicker" }, p.category));
      if (p.featured || fresh) body.appendChild(el("span", { "class": "flag" }, p.featured ? "Featured" : "Just Restocked"));
      body.appendChild(el("h3", null, p.name));
      body.appendChild(el("p", null, p.description));
      var more = el("button", { type: "button", "class": "quick-link" }, "Quick view");
      more.setAttribute("aria-haspopup", "dialog");
      more.addEventListener("click", function () { quickView(p, imgSrc); });
      body.appendChild(more);
      purchaseControls(p).forEach(function (n) { body.appendChild(n); });
      card.appendChild(img); card.appendChild(body);
      img.style.cursor = "zoom-in"; img.addEventListener("click", function () { quickView(p, imgSrc); });
      shop.appendChild(card);
    });
  }
  // Size picker + Add to Cart, or a Buy on Amazon link when the product is sold elsewhere online.
  function purchaseControls(p, after) {
    var out = [];
    if (p.digital) out.push(el("p", { "class": "cart-note" }, "Digital item: nothing ships. We email your access details."));
    if (p.buyUrl) {
      var a = el("a", { "class": "btn", href: p.buyUrl, target: "_blank", rel: "noopener noreferrer" }, "Buy on Amazon");
      out.push(a);
      out.push(el("p", { "class": "cart-note" }, "Opens Amazon in a new tab. Want a copy in person? Find us at an event."));
      return out;
    }
    var label = el("label", { "class": "field" }, isFood(p) ? "Size" : "Option");
    var select = el("select");
    var firstOpen = null;
    p.sizes.forEach(function (s) {
      var o = el("option", { value: s.label }, s.label + " \u00b7 " + money(s.cents) + (s.soldOut ? " (sold out)" : (typeof s.stock === "number" && s.stock <= 5 ? " (only " + s.stock + " left)" : "")));
      if (s.soldOut) o.disabled = true; else if (!firstOpen) firstOpen = s.label;
      select.appendChild(o);
    });
    if (firstOpen) select.value = firstOpen;
    label.appendChild(select);
    var btn = el("button", { type: "button", "class": "btn" }, firstOpen ? "Add to Cart" : "Sold out");
    if (!firstOpen) btn.disabled = true;
    btn.addEventListener("click", function () { addToCart(p.id, select.value); if (after) after(); });
    out.push(label, btn);
    return out;
  }
  var qvLast = null;
  function quickView(p, imgSrc) {
    var old = document.querySelector(".qv-bg"); if (old) old.remove();
    qvLast = document.activeElement;
    function close() { bg.remove(); document.removeEventListener("keydown", onKey); if (qvLast && qvLast.focus) qvLast.focus(); }
    function onKey(e) { if (e.key === "Escape") close(); }
    var x = el("button", { type: "button", "class": "qv-x", "aria-label": "Close" }, "\u00d7");
    x.addEventListener("click", close);
    var info = el("div", { "class": "qv-info" });
    info.appendChild(el("p", { "class": "kicker" }, p.category));
    info.appendChild(el("h3", { id: "qv-title" }, p.name));
    String(p.description || "").split(/\n+/).forEach(function (para) { if (para.trim()) info.appendChild(el("p", { "class": "qv-desc" }, para)); });
    purchaseControls(p, close).forEach(function (n) { info.appendChild(n); });
    var box = el("div", { "class": "qv", role: "dialog", "aria-modal": "true", "aria-labelledby": "qv-title" });
    box.appendChild(x); box.appendChild(el("img", { src: imgSrc, alt: p.name })); box.appendChild(info);
    var bg = el("div", { "class": "qv-bg" });
    bg.appendChild(box);
    bg.addEventListener("click", function (e) { if (e.target === bg) close(); });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(bg);
    x.focus();
  }
  renderShop();


  // Queen Talk blog: posts are written in the admin app and served by the Worker.
  var blogList = document.querySelector("[data-blog-list]"), blogPost = document.querySelector("[data-blog-post]");
  function blogDate(d) { var p = String(d || "").split("-"); return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""; }
  function blogCard(p) {
    var href = "/stories/post/?s=" + encodeURIComponent(p.slug);
    var card = el("article", { "class": "card" });
    if (p.image) { var a1 = el("a", { href: href, "aria-hidden": "true", tabindex: "-1" }); a1.appendChild(el("img", { src: p.image, alt: "", loading: "lazy" })); card.appendChild(a1); }
    var pad = el("div", { "class": "pad" });
    if (p.category) pad.appendChild(el("p", { "class": "kicker" }, p.category));
    var h2 = el("h2"); h2.appendChild(el("a", { href: href }, p.title)); pad.appendChild(h2);
    pad.appendChild(el("p", { "class": "muted" }, p.excerpt));
    pad.appendChild(el("p", { "class": "post-meta" }, blogDate(p.date)));
    pad.appendChild(el("a", { "class": "quick-link", href: href }, "Read more"));
    card.appendChild(pad); return card;
  }
  if (blogList && CFG.CHECKOUT_URL) {
    fetch(workerUrl("/blog")).then(function (r) { return r.json(); }).then(function (d) {
      if (!d.posts || !d.posts.length) return;
      while (blogList.firstChild) blogList.removeChild(blogList.firstChild);
      d.posts.forEach(function (p) { blogList.appendChild(blogCard(p)); });
    }).catch(function () {});   // keep the built-in stories if the Worker can't be reached
  }
  if (blogPost) {
    var slug = (location.search.match(/[?&]s=([a-z0-9-]+)/) || [])[1];
    var fail = function () { blogPost.textContent = ""; blogPost.appendChild(el("p", { "class": "muted" }, "We couldn't find that post.")); blogPost.appendChild(el("p")).appendChild(el("a", { "class": "btn", href: "/stories/" }, "Back to Queen Talk")); };
    if (!slug || !CFG.CHECKOUT_URL) fail();
    else fetch(workerUrl("/blog/" + slug)).then(function (r) { if (!r.ok) throw new Error("x"); return r.json(); }).then(function (d) {
      var p = d.post; document.title = p.title + " | Queen E's Heirr";
      var setMeta = function (sel, val) { var m = document.querySelector(sel); if (m) m.setAttribute("content", val); };
      var url = "https://queenesheirr.com/stories/post/?s=" + p.slug;
      setMeta('meta[name="description"]', p.excerpt); setMeta('meta[property="og:title"]', p.title); setMeta('meta[property="og:description"]', p.excerpt); setMeta('meta[property="og:url"]', url);
      var can = document.querySelector('link[rel="canonical"]'); if (can) can.setAttribute("href", url);
      blogPost.textContent = "";
      if (p.category) blogPost.appendChild(el("p", { "class": "kicker" }, p.category));
      blogPost.appendChild(el("h1", null, p.title));
      blogPost.appendChild(el("p", { "class": "post-meta" }, blogDate(p.date) + (p.author ? " · " + p.author : "")));
      if (p.image) blogPost.appendChild(el("img", { "class": "post-hero", src: p.image, alt: "" }));
      var body = el("div", { "class": "post-body" }); body.innerHTML = p.html; blogPost.appendChild(body);
      var foot = el("p", { "class": "post-foot" });
      var sh = el("button", { "class": "btn", type: "button" }, "Share this post");
      sh.addEventListener("click", function () {
        if (navigator.share) { navigator.share({ title: p.title, url: d.post.share }).catch(function () {}); return; }
        try { navigator.clipboard.writeText(d.post.share).then(function () { sh.textContent = "Link copied"; }); } catch (e) { window.prompt("Copy this link", d.post.share); }
      });
      foot.appendChild(sh); foot.appendChild(document.createTextNode(" ")); foot.appendChild(el("a", { "class": "btn", href: "/stories/" }, "More from Queen Talk"));
      blogPost.appendChild(foot);
    }).catch(fail);
  }

  // Class dates: paid seat booking (Stripe Checkout through the Worker) + optional Google booking calendar.
  var classList = document.querySelector("[data-class-list]");
  function workerUrl(path) { return String(CFG.CHECKOUT_URL || "").replace(/\/checkout$/, path); }
  function prettyDate(d) {
    var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }
  function prettyTime(t) {
    var p = t.split(":"), h = +p[0], ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + ":" + p[1] + " " + ap;
  }
  if (classList && CFG.CHECKOUT_URL) {
    var cmsg = document.querySelector("[data-class-msg]");
    fetch(workerUrl("/classes")).then(function (r) { return r.json(); }).then(function (list) {
      classList.textContent = "";
      if (!Array.isArray(list) || !list.length) {
        classList.appendChild(el("p", { "class": "muted" }, "No public class dates are posted right now. Send a request below for a private or group class, or join the mailing list to hear first."));
        return;
      }
      list.forEach(function (c) {
        var card = el("article", { "class": "card pad class-card" });
        card.appendChild(el("p", { "class": "kicker" }, prettyDate(c.date) + " \u00b7 " + prettyTime(c.time)));
        card.appendChild(el("h3", null, c.title));
        var meta = money(c.cents) + " per person" + (c.location ? " \u00b7 " + c.location : "");
        card.appendChild(el("p", { "class": "muted" }, meta));
        if (c.notes) card.appendChild(el("p", null, c.notes));
        var row = el("div", { "class": "class-book" });
        if (c.left <= 0) {
          row.appendChild(el("span", { "class": "pill-full" }, "Class is full"));
        } else {
          var sel = el("select", { "aria-label": "Number of seats for " + c.title });
          for (var n = 1; n <= Math.min(c.left, 10); n++) sel.appendChild(el("option", { value: String(n) }, n + (n === 1 ? " seat" : " seats")));
          var btn = el("button", { type: "button", "class": "btn" }, "Book & pay");
          btn.addEventListener("click", function () {
            btn.disabled = true; if (cmsg) cmsg.textContent = "Taking you to secure checkout...";
            fetch(workerUrl("/class-checkout"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ classId: c.id, seats: +sel.value }) })
              .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
              .then(function (x) { if (x.ok && x.d.url) { window.location.href = x.d.url; } else { throw new Error(x.d.error || "Could not start checkout"); } })
              .catch(function (e) { btn.disabled = false; if (cmsg) cmsg.textContent = e.message + ". Please try again or use the request form below."; });
          });
          row.appendChild(sel); row.appendChild(btn);
          if (c.left <= 5) card.appendChild(el("p", { "class": "cart-note" }, "Only " + c.left + " seat" + (c.left === 1 ? "" : "s") + " left"));
        }
        card.appendChild(row); classList.appendChild(card);
      });
    }).catch(function () {
      classList.textContent = "";
      classList.appendChild(el("p", { "class": "muted" }, "Class dates could not be loaded. Please use the request form below."));
    });
  }
  var bookWrap = document.querySelector("[data-booking-link-wrap]");
  if (bookWrap && /^https:\/\/calendar\.(app\.google|google\.com)\//.test(CFG.BOOKING_URL || "")) {
    bookWrap.querySelector("a").setAttribute("href", CFG.BOOKING_URL);
    bookWrap.hidden = false;
  }

  // Wholesale request: one quantity box per jar size, priced $2.00 under retail.
  var wsForm = document.querySelector("form[data-wholesale]"), wsWrap = document.querySelector("[data-wholesale-items]"), wsQty = {};
  var WS_OFF = 200;
  function wsLines() {
    var out = [];
    catalog.forEach(function (p) { p.sizes.forEach(function (s) { var q = parseInt(wsQty[p.id + "|" + s.label], 10); if (q > 0) out.push({ id: p.id, size: s.label, qty: Math.min(q, 500), name: p.name, cents: Math.max(100, s.cents - WS_OFF) }); }); });
    return out;
  }
  function wsTotal() {
    var t = document.querySelector("[data-wholesale-total]");
    if (t) t.textContent = money(wsLines().reduce(function (a, l) { return a + l.cents * l.qty; }, 0));
  }
  function renderWholesale() {
    if (!wsWrap) return;
    wsWrap.textContent = "";
    ["Jams", "Pickled goods"].forEach(function (cat) {
      var items = catalog.filter(function (p) { return p.category === cat && p.sizes.some(function (s) { return !s.soldOut; }); });
      if (!items.length) return;
      wsWrap.appendChild(el("h3", null, cat));
      var tbl = el("div", { "class": "ws-list" });
      items.forEach(function (p) {
        p.sizes.forEach(function (s) {
          if (s.soldOut) return;
          var key = p.id + "|" + s.label;
          var inp = el("input", { type: "number", min: "0", max: "500", step: "1", inputmode: "numeric", value: wsQty[key] || "", "aria-label": p.name + " " + s.label + " quantity" });
          inp.addEventListener("input", function () { wsQty[key] = inp.value; wsTotal(); });
          var row = el("label", { "class": "ws-row" });
          row.appendChild(el("span", { "class": "ws-name" }, p.name + " \u00b7 " + s.label));
          row.appendChild(el("span", { "class": "ws-price" }, money(Math.max(100, s.cents - WS_OFF)) + " ea"));
          row.appendChild(inp);
          tbl.appendChild(row);
        });
      });
      wsWrap.appendChild(tbl);
    });
    wsTotal();
  }
  renderWholesale();

  // Floating "Leave a review" button (Google). Hidden until REVIEW_URL is set in config.js. Dismissal is remembered per browser.
  if (/^https:\/\/(g\.page|g\.co|search\.google\.com|www\.google\.com|maps\.app\.goo\.gl|goo\.gl)\//.test(CFG.REVIEW_URL || "")) {
    var revGone = false;
    try { revGone = localStorage.getItem("qe-review-dismissed") === "1"; } catch (e) {}
    if (!revGone) {
      var rev = el("div", { "class": "review-fab" });
      var revLink = el("a", { href: CFG.REVIEW_URL, target: "_blank", rel: "noopener noreferrer" }, "\u2605 Leave a review");
      var revX = el("button", { type: "button", "aria-label": "Hide the review button" }, "\u00d7");
      revX.addEventListener("click", function () { rev.remove(); try { localStorage.setItem("qe-review-dismissed", "1"); } catch (e) {} });
      rev.appendChild(revLink); rev.appendChild(revX);
      document.body.appendChild(rev);
    }
  }

  // Live catalog from Stripe (via the Worker). Falls back to js/products.js if unavailable.
  if (CFG.PRODUCTS_URL) {
    fetch(CFG.PRODUCTS_URL).then(function (r) {
      if (!r.ok) throw new Error("bad status");
      return r.json();
    }).then(function (list) {
      if (Array.isArray(list) && list.length) {
        var local = {};
        catalog.forEach(function (p) { local[p.id] = p; });
        list.forEach(function (p) {
          var l = local[p.id] || {};
          if (!p.image) p.image = l.image || PLACEHOLDER;
          if (!p.description) p.description = l.description || "";
        });
        catalog = list; renderShop(); render(); renderWholesale();
      }
    }).catch(function () {});
  }

  // Checkout
  function mailtoOrder(lines) {
    var body = lines.map(function (l) { return l.qty + " x " + findProduct(l.id).name + " (" + l.size + ")"; }).join("\n");
    var href = "mailto:" + (CFG.CONTACT_EMAIL || "") + "?subject=" + encodeURIComponent("Order request") +
      "&body=" + encodeURIComponent("Hello, I'd like to order:\n\n" + body + "\n\nName:\nShipping address:\nPhone:\n");
    window.location.href = href;
  }
  function fulfillment() {
    var r = document.querySelector('input[name="fulfillment"]:checked');
    return r && (r.value === "pickup" || r.value === "event") ? r.value : "ship";
  }
  var eventSel = document.querySelector("[data-event-select]");
  var eventOpt = document.querySelector("[data-event-option]");
  if (eventSel && eventOpt && CFG.CHECKOUT_URL) {
    fetch(CFG.CHECKOUT_URL.replace(/\/checkout$/, "/events")).then(function (r) { return r.json(); }).then(function (list) {
      if (!Array.isArray(list) || !list.length) return;
      list.forEach(function (e) {
        var when = new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
        eventSel.appendChild(el("option", { value: e.id }, e.name + " - " + when + (e.location ? " - " + e.location : "")));
      });
      eventOpt.hidden = false;
    }).catch(function () {});
  }
  function syncEventSelect() { if (eventSel) eventSel.hidden = fulfillment() !== "event"; }
  document.querySelectorAll('input[name="fulfillment"]').forEach(function (r) {
    r.addEventListener("change", function () {
      var note = document.querySelector("[data-fulfill-note]");
      syncEventSelect(); syncShipBox(false);
      if (note) note.textContent = fulfillment() === "event"
        ? "No shipping charge. Pick up your order at the event you choose. Any sales tax is added at secure checkout."
        : fulfillment() === "pickup"
        ? "No shipping charge. We will email you to arrange pickup. Any sales tax is added at secure checkout."
        : "Choose your shipping option above. Orders take about 5 business days to prepare, plus the delivery time shown. Any sales tax is added at secure checkout.";
    });
  });
  var zipIn = document.querySelector("[data-ship-zip]"), getBtn = document.querySelector("[data-ship-get]"), optBox = document.querySelector("[data-ship-options]");
  if (zipIn && getBtn && optBox && CFG.CHECKOUT_URL) {
    getBtn.addEventListener("click", function () {
      var zip = zipIn.value.replace(/\D/g, "").slice(0, 5);
      if (zip.length !== 5) { setMsg("Please enter a 5-digit ZIP code."); return; }
      var lines = loadCart(); if (!lines.length) return;
      getBtn.disabled = true; setMsg("Checking USPS prices...");
      fetch(workerUrl("/ship-quote"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ zip: zip, items: lines }) })
        .then(function (r) { return r.json().then(function (d) { if (!r.ok) throw new Error(d.error || "Could not get prices"); return d; }); })
        .then(function (d) {
          setMsg(""); shipQ.zip = zip; shipQ.opts = d.options; shipQ.chosen = null; optBox.textContent = "";
          d.options.forEach(function (o, i) {
            var lab = el("label", { "class": "ship-opt" }), inp = el("input", { type: "radio", name: "shipopt" });
            inp.addEventListener("change", function () { shipQ.chosen = o; setMsg(""); });
            lab.appendChild(inp);
            lab.appendChild(document.createTextNode(" " + o.service + " \u2014 " + money(o.cents) + (o.days ? " (about " + o.days + (o.days === 1 ? " day" : " days") + " in transit)" : "")));
            optBox.appendChild(lab);
            if (d.options.length === 1) { inp.checked = true; shipQ.chosen = o; }
          });
        }).catch(function (err) { setMsg(err.message); }).then(function () { getBtn.disabled = false; });
    });
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      var lines = loadCart();
      if (!lines.length) return;
      if (!CFG.CHECKOUT_URL) {
        setMsg("Online payment isn't switched on yet. Your email app will open with your order so we can follow up.");
        mailtoOrder(lines);
        return;
      }
      var needShip = fulfillment() === "ship" && !lines.every(function (l) { var pr = findProduct(l.id); return pr && pr.digital; });
      if (needShip && shipBox() && !shipQ.chosen) { setMsg("Enter your ZIP code, tap See shipping prices, and choose an option first."); return; }
      checkoutBtn.disabled = true;
      setMsg("Taking you to secure checkout...");
      fetch(CFG.CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines, fulfillment: fulfillment(), eventId: fulfillment() === "event" && eventSel ? eventSel.value : undefined, ship: needShip && shipQ.chosen ? { token: shipQ.chosen.token, cents: shipQ.chosen.cents, exp: shipQ.chosen.exp, sig: shipQ.chosen.sig } : undefined, shipZip: needShip && shipQ.chosen ? shipQ.zip : undefined, optin: !!(document.querySelector("[data-optin]") && document.querySelector("[data-optin]").checked) })
      }).then(function (r) {
        return r.json().then(function (d) { if (!r.ok) throw new Error(d.error || "Checkout failed"); return d; });
      }).then(function (d) {
        if (!d.url || d.url.indexOf("https://checkout.stripe.com/") !== 0) throw new Error("Unexpected checkout response");
        window.location.href = d.url;
      }).catch(function (err) {
        checkoutBtn.disabled = false; if (/shipping/i.test(err.message)) resetShip();
        setMsg("We couldn't start checkout: " + err.message + ". Please try again or email " + (CFG.CONTACT_EMAIL || "us") + ".");
      });
    });
  }

  // Order confirmation page clears the bag
  var clr = document.querySelector("[data-clear-cart]");
  if (clr && /[?&]class=1/.test(location.search)) {
    clr.removeAttribute("data-clear-cart"); clr = null;   // a class booking must not empty a shopping bag
    var h1 = document.querySelector("main h1"), lede = document.querySelector("main .lede");
    if (h1) h1.textContent = "You're booked.";
    if (lede) lede.textContent = "Stripe emailed you a receipt, and we'll email your class details and a calendar invite shortly.";
  }
  if (clr) { saveCart([]); }

  // Forms: POST to FORM_ENDPOINT (Google Apps Script) so every request is emailed to the shop.
  // Without an endpoint, open the visitor's email app. Never fake success.
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var status = el("p", { "class": "muted", role: "status", "aria-live": "polite", style: "grid-column:1/-1" });
    form.appendChild(status);
    var trap = el("input", { type: "text", name: "website", tabindex: "-1", autocomplete: "off", "aria-hidden": "true", style: "position:absolute;left:-9999px;height:0;width:0;opacity:0" });
    form.appendChild(trap);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var fields = {};
      new FormData(form).forEach(function (v, k) { fields[k] = (k in fields) ? fields[k] + ", " + String(v) : String(v); });
      var subject = form.getAttribute("data-form");
      var wsItems = null;
      if (form.hasAttribute("data-wholesale")) {
        wsItems = wsLines();
        if (!wsItems.length) { status.textContent = "Please enter a quantity for at least one jar."; return; }
        fields.order_items = wsItems.map(function (l) { return l.qty + " x " + l.name + " (" + l.size + ") @ " + money(l.cents); }).join("; ");
        fields.estimated_total = money(wsItems.reduce(function (a, l) { return a + l.cents * l.qty; }, 0));
      }
      if (CFG.FORM_ENDPOINT) {
        status.textContent = "Sending...";
        // Google Apps Script doesn't send CORS headers, so the reply is unreadable (opaque).
        // A resolved no-cors fetch means the request reached Google; a network failure rejects.
        fetch(CFG.FORM_ENDPOINT, { method: "POST", mode: "no-cors", body: JSON.stringify({ subject: subject, page: location.pathname, fields: fields }) })
          .then(function () {
            // Class registrations also create a draft quote in Stripe (best effort; the email above is the record).
            if (wsItems && CFG.WHOLESALE_URL) {
              var qf = Object.assign({}, fields, { items: wsItems.map(function (l) { return { id: l.id, size: l.size, qty: l.qty }; }), notes: fields.order_notes || "" });
              fetch(CFG.WHOLESALE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(qf) }).catch(function () {});
              wsQty = {}; renderWholesale();
            }
            if (form.hasAttribute("data-quote") && CFG.QUOTE_URL) {
              fetch(CFG.QUOTE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) }).catch(function () {});
            }
            form.reset();
            status.textContent = "Thank you. We received it and will reply by email.";
          })
          .catch(function () {
            status.textContent = "That didn't send. Please try again or email " + CFG.CONTACT_EMAIL + ".";
          });
      } else {
        var body = [];
        Object.keys(fields).forEach(function (k) { if (k !== "website") body.push(k.replace(/_/g, " ") + ": " + fields[k]); });
        status.textContent = "Your email app should open with this message ready to send. If it doesn't, email " + CFG.CONTACT_EMAIL + ".";
        window.location.href = "mailto:" + CFG.CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body.join("\n"));
      }
    });
  });

  render();
})();
