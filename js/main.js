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

  function render() {
    var lines = loadCart();
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
  var sortKey = "featured";
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
    [["featured", "Featured"], ["name", "Name (A to Z)"], ["price-asc", "Price (low to high)"], ["price-desc", "Price (high to low)"], ["available", "Availability (in stock first)"], ["stock", "Most in stock"]].forEach(function (o) {
      sortSel.appendChild(el("option", { value: o[0] }, o[1]));
    });
    sortSel.addEventListener("change", function () { sortKey = sortSel.value; renderShop(); });
    var sortLab = el("label", { "class": "sort-field" }, "Sort by");
    sortLab.appendChild(sortSel);
    var tools = el("div", { "class": "shop-tools" });
    tools.appendChild(sortLab); tools.appendChild(tog);
    shop.parentNode.insertBefore(tools, shop);
  }
  function sortedCatalog() {
    var list = catalog.slice();
    var open = function (p) { return p.sizes.filter(function (s) { return !s.soldOut; }); };
    var minPrice = function (p) { var o = open(p); o = o.length ? o : p.sizes; return Math.min.apply(null, o.map(function (s) { return s.cents; })); };
    var stockOf = function (p) { return open(p).reduce(function (t, s) { return t + (typeof s.stock === "number" ? s.stock : 999); }, 0); };
    var byName = function (a, b) { return a.name.localeCompare(b.name); };
    if (sortKey === "name") list.sort(byName);
    else if (sortKey === "price-asc") list.sort(function (a, b) { return minPrice(a) - minPrice(b) || byName(a, b); });
    else if (sortKey === "price-desc") list.sort(function (a, b) { return minPrice(b) - minPrice(a) || byName(a, b); });
    else if (sortKey === "available") list.sort(function (a, b) { return (open(b).length > 0) - (open(a).length > 0) || byName(a, b); });
    else if (sortKey === "stock") list.sort(function (a, b) { return stockOf(b) - stockOf(a) || byName(a, b); });
    return list;
  }
  function renderShop() {
    if (!shop) return;
    shop.textContent = "";
    sortedCatalog().forEach(function (p) {
      var card = el("article", { "class": "card" });
      var imgSrc = p.image || PLACEHOLDER;
      var img = el("img", { src: imgSrc, alt: imgSrc === PLACEHOLDER ? p.name + " (photo coming soon)" : p.name + " jar", loading: "lazy" });
      var body = el("div", { "class": "card-body" });
      body.appendChild(el("p", { "class": "kicker" }, p.category));
      body.appendChild(el("h3", null, p.name));
      body.appendChild(el("p", null, p.description));
      var label = el("label", { "class": "field" }, "Size");
      var select = el("select");
      var firstOpen = null;
      p.sizes.forEach(function (s) {
        var o = el("option", { value: s.label }, s.label + " \u00b7 " + money(s.cents) + (s.soldOut ? " (sold out)" : (typeof s.stock === "number" && s.stock <= 5 ? " (only " + s.stock + " left)" : "")));
        if (s.soldOut) o.disabled = true; else if (!firstOpen) firstOpen = s.label;
        select.appendChild(o);
      });
      if (firstOpen) select.value = firstOpen;
      label.appendChild(select);
      body.appendChild(label);
      var btn = el("button", { type: "button", "class": "btn" }, firstOpen ? "Add to Cart" : "Sold out");
      if (!firstOpen) btn.disabled = true;
      btn.addEventListener("click", function () { addToCart(p.id, select.value); });
      body.appendChild(btn);
      card.appendChild(img); card.appendChild(body);
      shop.appendChild(card);
    });
  }
  renderShop();


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
        catalog = list; renderShop(); render();
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
      syncEventSelect();
      if (note) note.textContent = fulfillment() === "event"
        ? "No shipping charge. Pick up your order at the event you choose. Any sales tax is added at secure checkout."
        : fulfillment() === "pickup"
        ? "No shipping charge. We will email you to arrange pickup. Any sales tax is added at secure checkout."
        : "Shipping and any sales tax are added at secure checkout.";
    });
  });
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      var lines = loadCart();
      if (!lines.length) return;
      if (!CFG.CHECKOUT_URL) {
        setMsg("Online payment isn't switched on yet. Your email app will open with your order so we can follow up.");
        mailtoOrder(lines);
        return;
      }
      checkoutBtn.disabled = true;
      setMsg("Taking you to secure checkout...");
      fetch(CFG.CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines, fulfillment: fulfillment(), eventId: fulfillment() === "event" && eventSel ? eventSel.value : undefined })
      }).then(function (r) {
        return r.json().then(function (d) { if (!r.ok) throw new Error(d.error || "Checkout failed"); return d; });
      }).then(function (d) {
        if (!d.url || d.url.indexOf("https://checkout.stripe.com/") !== 0) throw new Error("Unexpected checkout response");
        window.location.href = d.url;
      }).catch(function (err) {
        checkoutBtn.disabled = false;
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
      if (CFG.FORM_ENDPOINT) {
        status.textContent = "Sending...";
        // Google Apps Script doesn't send CORS headers, so the reply is unreadable (opaque).
        // A resolved no-cors fetch means the request reached Google; a network failure rejects.
        fetch(CFG.FORM_ENDPOINT, { method: "POST", mode: "no-cors", body: JSON.stringify({ subject: subject, page: location.pathname, fields: fields }) })
          .then(function () {
            // Class registrations also create a draft quote in Stripe (best effort; the email above is the record).
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
