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

  // Shop grid
  var shop = document.querySelector("[data-shop]");
  function renderShop() {
    if (!shop) return;
    shop.textContent = "";
    catalog.forEach(function (p) {
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
        var o = el("option", { value: s.label }, s.label + " \u00b7 " + money(s.cents) + (s.soldOut ? " (sold out)" : ""));
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

  // Live catalog from Stripe (via the Worker). Falls back to js/products.js if unavailable.
  if (CFG.PRODUCTS_URL) {
    fetch(CFG.PRODUCTS_URL).then(function (r) {
      if (!r.ok) throw new Error("bad status");
      return r.json();
    }).then(function (list) {
      if (Array.isArray(list) && list.length) { catalog = list; renderShop(); render(); }
    }).catch(function () {});
  }

  // Checkout
  function mailtoOrder(lines) {
    var body = lines.map(function (l) { return l.qty + " x " + findProduct(l.id).name + " (" + l.size + ")"; }).join("\n");
    var href = "mailto:" + (CFG.CONTACT_EMAIL || "") + "?subject=" + encodeURIComponent("Order request") +
      "&body=" + encodeURIComponent("Hello, I'd like to order:\n\n" + body + "\n\nName:\nShipping address:\nPhone:\n");
    window.location.href = href;
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
      checkoutBtn.disabled = true;
      setMsg("Taking you to secure checkout...");
      fetch(CFG.CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines })
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
  if (document.querySelector("[data-clear-cart]")) { saveCart([]); }

  // Forms: POST to FORM_ENDPOINT (Google Apps Script) so every request is emailed to the shop.
  // Without an endpoint, open the visitor's email app. Never fake success.
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var status = el("p", { "class": "muted", role: "status", "aria-live": "polite" });
    form.appendChild(status);
    var trap = el("input", { type: "text", name: "website", tabindex: "-1", autocomplete: "off", "aria-hidden": "true", style: "position:absolute;left:-9999px;height:0;width:0;opacity:0" });
    form.appendChild(trap);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var fields = {};
      new FormData(form).forEach(function (v, k) { fields[k] = String(v); });
      var subject = form.getAttribute("data-form");
      if (CFG.FORM_ENDPOINT) {
        status.textContent = "Sending...";
        // text/plain keeps this a "simple" request so Google Apps Script accepts it without a CORS preflight.
        fetch(CFG.FORM_ENDPOINT, { method: "POST", body: JSON.stringify({ subject: subject, page: location.pathname, fields: fields }) })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (!d || !d.ok) throw new Error("not ok");
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
