(function () {
  "use strict";
  var root = document.querySelector("[data-ws-view]");
  if (!root) return;
  var BASE = String((window.QE_CONFIG || window.SITE_CONFIG || window.CONFIG || {}).CHECKOUT_URL || "").replace(/\/checkout$/, "");
  var cfg = window.QE_CONFIG || window.SITE_CONFIG || window.CONFIG || {};
  if (!BASE) { BASE = String(cfg.WHOLESALE_URL || "").replace(/\/wholesale-request$/, ""); }
  var TOKEN = "", EMAIL = "", me = null;
  try { TOKEN = sessionStorage.getItem("qe_ws_token") || ""; EMAIL = sessionStorage.getItem("qe_ws_email") || ""; } catch (e) {}
  var qs = new URLSearchParams(location.search);

  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c != null) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function money(c) { return "$" + (c / 100).toFixed(2); }
  function day(d) { if (!d) return ""; return new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" }); }
  function api(method, path, body) {
    var opt = { method: method, headers: { "Content-Type": "text/plain" } };
    if (TOKEN) opt.headers.Authorization = "Bearer " + TOKEN;
    if (body) opt.body = JSON.stringify(body);
    return fetch(BASE + path, opt).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401 && TOKEN) { signOut(); }
        if (!r.ok) throw new Error(j.error || "Something went wrong. Please try again.");
        return j;
      });
    });
  }
  function signOut() { TOKEN = ""; try { sessionStorage.removeItem("qe_ws_token"); } catch (e) {} me = null; }
  function msgBox() { return h("p", { "class": "ws-msg", role: "status", "aria-live": "polite" }); }
  function say(m, text, err) { m.className = "ws-msg" + (err ? " err" : ""); m.textContent = text || ""; }

  function login() {
    clear(root);
    var m = msgBox();
    var email = h("input", { type: "email", placeholder: "you@yourstore.com", autocomplete: "email", required: true, "aria-label": "Email", value: EMAIL });
    var form = h("form", { "class": "ws-card stack" }, [h("label", null, ["Your email", email]), h("button", { "class": "btn", type: "submit", text: "Email me a code" }), m]);
    form.addEventListener("submit", function (e) {
      e.preventDefault(); EMAIL = email.value.trim().toLowerCase(); say(m, "Sending...");
      api("POST", "/ws/login", { email: EMAIL }).then(function (r) { try { sessionStorage.setItem("qe_ws_email", EMAIL); } catch (x) {} if (r.vendor === false) notVendor(); else codeStep(); }).catch(function (er) { say(m, er.message, true); });
    });
    root.appendChild(form);
    root.appendChild(h("p", { "class": "muted center", text: "Not a vendor yet? Request a quote on the Wholesale page and we'll get you set up." }));
  }
  function notVendor() {
    clear(root);
    root.appendChild(h("div", { "class": "ws-card", role: "status" }, [
      h("h2", { text: "We don't see " + EMAIL + " as an approved vendor yet" }),
      h("p", { text: "The Wholesale Portal is for approved Queen E's vendors. To become one, request a wholesale quote on the Wholesale page and we'll get you set up. We've also let our team know you stopped by, so someone may reach out." }),
      h("div", { "class": "ws-actions" }, [h("a", { "class": "btn", href: "/wholesale/", text: "Go to the Wholesale page" }), h("button", { "class": "btn ghost", type: "button", text: "Try a different email", onclick: login })]),
      h("p", { "class": "muted", text: "Already a vendor? Check that you're using the email we have on file, or write info@queenesheirr.com." })]));
  }
  function codeStep() {
    clear(root);
    var m = msgBox();
    var code = h("input", { inputmode: "numeric", autocomplete: "one-time-code", maxlength: 6, placeholder: "6-digit code", required: true, "aria-label": "Code" });
    var form = h("form", { "class": "ws-card stack" }, [h("p", { text: "If " + EMAIL + " is a Queen E's vendor, a code is on its way. It lasts 10 minutes." }), h("label", null, ["Code", code]), h("button", { "class": "btn", type: "submit", text: "Sign in" }),
      h("button", { "class": "btn ghost", type: "button", text: "Use a different email", onclick: login }), m]);
    form.addEventListener("submit", function (e) {
      e.preventDefault(); say(m, "Checking...");
      api("POST", "/ws/verify", { email: EMAIL, code: code.value }).then(function (r) { TOKEN = r.token; try { sessionStorage.setItem("qe_ws_token", TOKEN); } catch (x) {} load(); }).catch(function (er) { say(m, er.message, true); });
    });
    root.appendChild(form); code.focus();
  }

  function load(note) {
    clear(root); root.appendChild(h("p", { "class": "muted center", text: "Loading..." }));
    api("GET", "/ws/me").then(function (d) { me = d; home(note); }).catch(function (er) { if (!TOKEN) login(); else { clear(root); root.appendChild(h("p", { "class": "ws-msg err", text: er.message })); } });
  }

  function home(note) {
    clear(root);
    var lede = document.querySelector("[data-ws-lede]"); if (lede) lede.textContent = "Welcome, " + me.vendor.business + ".";
    var top = h("p", { "class": "center" }, [h("button", { "class": "btn ghost", type: "button", text: "Sign out", onclick: function () { signOut(); login(); } })]);
    if (note) root.appendChild(h("p", { "class": "ws-card", role: "status", text: note }));
    var focus = qs.get("order");
    var open = me.orders.filter(function (o) { return o.status !== "delivered" && o.status !== "cancelled"; });
    var past = me.orders.filter(function (o) { return o.status === "delivered" || o.status === "cancelled"; });
    root.appendChild(refillForm());
    if (open.length) { root.appendChild(h("h2", { text: "Open orders" })); open.forEach(function (o) { root.appendChild(orderCard(o, o.id === focus)); }); }
    if (past.length) { root.appendChild(h("h2", { text: "Past orders" })); past.forEach(function (o) { root.appendChild(orderCard(o, false)); }); }
    root.appendChild(top);
  }

  function orderCard(o, hl) {
    var m = msgBox();
    var box = h("div", { "class": "ws-card", id: "o-" + o.id });
    box.appendChild(h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [h("strong", { text: new Date(o.created).toLocaleDateString() }), h("span", { "class": "ws-pill" + (o.status === "confirmed" ? " act" : ""), text: o.statusText + (o.paid ? " · Paid" : "") })]));
    o.lines.forEach(function (l) { box.appendChild(h("div", { "class": "ws-row" }, [h("span", { "class": "ws-name", text: l.qty + " x " + l.name }), h("span", { text: money(l.qty * l.unitCents) })])); });
    box.appendChild(h("p", null, [h("strong", { text: "Total " + money(o.total) })]));
    if (o.dropoff) box.appendChild(h("p", { text: "Drop-off: " + day(o.dropoff) }));
    if (o.ownerNote) box.appendChild(h("p", { text: "Note from LyKinda: " + o.ownerNote }));
    var acts = h("div", { "class": "ws-actions" });
    function pay() { say(m, "Opening secure payment..."); api("POST", "/ws/pay", { id: o.id }).then(function (r) { location.href = r.url; }).catch(function (er) { say(m, er.message, true); }); }
    if (o.status === "requested") box.appendChild(h("p", { "class": "muted", text: "LyKinda is reviewing this. You'll get an email with the final quote and drop-off date to approve." }));
    if (o.status === "confirmed") {
      box.appendChild(h("p", { text: "How would you like to pay?" }));
      acts.appendChild(h("button", { "class": "btn", type: "button", text: "Approve and pay by card now", onclick: function () {
        say(m, "Approving..."); api("POST", "/ws/approve", { id: o.id, pay: "card" }).then(function (r) { if (r.url) location.href = r.url; else load("Approved."); }).catch(function (er) { say(m, er.message, true); }); } }));
      acts.appendChild(h("button", { "class": "btn ghost", type: "button", text: "Approve and pay at drop-off", onclick: function () {
        say(m, "Approving..."); api("POST", "/ws/approve", { id: o.id, pay: "dropoff" }).then(function () { load("Approved. We'll see you on " + day(o.dropoff) + "."); }).catch(function (er) { say(m, er.message, true); }); } }));
    }
    if (o.status === "approved" && !o.paid) {
      box.appendChild(h("p", { "class": "muted", text: o.pay === "card" ? "Approved. Your card payment isn't finished yet." : "Approved. Please bring a check to the drop-off." }));
      if (o.pay === "card") acts.appendChild(h("button", { "class": "btn", type: "button", text: "Pay by card now", onclick: pay }));
    }
    if (o.status === "delivered" && !o.paid) acts.appendChild(h("button", { "class": "btn", type: "button", text: "Pay by card", onclick: pay }));
    if (o.status === "requested" || o.status === "confirmed") acts.appendChild(h("button", { "class": "btn ghost", type: "button", text: "Cancel request", onclick: function () {
      if (confirm("Cancel this request?")) api("POST", "/ws/cancel", { id: o.id }).then(function () { load("Request cancelled."); }).catch(function (er) { say(m, er.message, true); }); } }));
    box.appendChild(acts); box.appendChild(m);
    if (hl) setTimeout(function () { box.scrollIntoView({ block: "center" }); }, 50);
    return box;
  }

  function refillForm() {
    var form = h("form", { "class": "ws-card" }, [h("h2", { text: "Request a refill" }), h("p", { "class": "muted", text: "Pick the quantities you need. Wholesale prices are shown. You'll get an instant quote by email, then a final quote with a drop-off date to approve." })]);
    var inputs = [], m = msgBox();
    me.catalog.forEach(function (p) {
      p.sizes.forEach(function (s) {
        var q = h("input", { type: "number", min: 0, max: 500, value: 0, "aria-label": "Quantity of " + p.name + " " + s.label, disabled: s.soldOut });
        inputs.push({ id: p.id, size: s.label, cents: s.cents, el: q, name: p.name + " (" + s.label + ")" });
        form.appendChild(h("div", { "class": "ws-row" }, [h("span", { "class": "ws-name", text: p.name + " (" + s.label + ")" + (s.soldOut ? " - sold out" : "") }), h("span", { text: money(s.cents) }), q]));
      });
    });
    var totalEl = h("p", null, [h("strong", { text: "Total $0.00" })]);
    var note = h("textarea", { rows: 3, maxlength: 500, placeholder: "Anything we should know? (preferred drop-off days, etc.)", "aria-label": "Note" });
    var go = h("button", { "class": "btn", type: "submit", text: "Send my request" });
    form.addEventListener("input", function () { var t = 0; inputs.forEach(function (i) { t += (parseInt(i.el.value, 10) || 0) * i.cents; }); totalEl.firstChild.textContent = "Total " + money(t); });
    [totalEl, h("label", null, ["Note (optional)", note]), go, m].forEach(function (x) { form.appendChild(x); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var items = inputs.filter(function (i) { return (parseInt(i.el.value, 10) || 0) > 0; }).map(function (i) { return { id: i.id, size: i.size, qty: parseInt(i.el.value, 10) }; });
      if (!items.length) { say(m, "Add a quantity to at least one item.", true); return; }
      go.disabled = true; say(m, "Sending...");
      api("POST", "/ws/order", { items: items, note: note.value }).then(function () { load("Thank you! We sent your instant quote by email. LyKinda will review it and send the final quote and drop-off date."); })
        .catch(function (er) { go.disabled = false; say(m, er.message, true); });
    });
    return form;
  }

  if (qs.get("paid")) { /* returned from Stripe */ }
  if (TOKEN) load(qs.get("paid") ? "Thank you! Your payment was received." : ""); else login();
})();
