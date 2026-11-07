(function () {
  var box = document.querySelector("[data-deals]");
  var CFG = window.SITE_CONFIG || {};
  if (!box) return;
  var url = String(CFG.CHECKOUT_URL || "").replace(/\/checkout$/, "/discounts");
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  function none() { box.textContent = ""; box.appendChild(el("p", "muted", "No special deals right now. Check back soon, or join the mailing list to hear first.")); }
  if (!url) { none(); return; }
  fetch(url).then(function (r) { return r.json(); }).then(function (d) {
    var list = (d && d.discounts) || [];
    if (!list.length) { none(); return; }
    box.textContent = "";
    list.forEach(function (x) {
      var c = el("div", "deal");
      c.appendChild(el("h3", "", x.name));
      c.appendChild(el("p", "", x.text));
      if (x.code) {
        var line = el("p", "");
        line.appendChild(el("span", "code", x.code));
        var b = el("button", "btn small copy", "Copy code"); b.type = "button";
        b.addEventListener("click", function () {
          try { navigator.clipboard.writeText(x.code); b.textContent = "Copied"; } catch (e) { b.textContent = "Select and copy"; }
        });
        line.appendChild(b); c.appendChild(line);
      } else c.appendChild(el("p", "muted", "Applied automatically in your bag."));
      if (x.note) c.appendChild(el("p", "muted", x.note));
      if (x.ends) c.appendChild(el("p", "muted", "Ends " + x.ends));
      box.appendChild(c);
    });
  }).catch(none);
})();
