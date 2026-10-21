var G={"four-oz-specialty":{name:"4 oz Specialty Jar",sizes:{"4 oz":350},soldOut:[]},apple:{name:"Apple Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},blackberry:{name:"Blackberry Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"blueberry-ginger":{name:"Blueberry Ginger Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"blueberry-peppered":{name:"Blueberry Peppered Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"braxtons-blueberry-bliss":{name:"Braxton's Blueberry Bliss",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"daring-n-dill":{name:"Daring n Dill",sizes:{"Regular (12 oz)":1e3},soldOut:[]},"jalapeno-pepper":{name:"Jalape\xF1o Pepper Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},peach:{name:"Peach Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},peppered:{name:"Peppered Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"pickled-cucumbers":{name:"Pickled Cucumbers",sizes:{"Large (16 oz)":1500},soldOut:[]},"pineapple-ginger":{name:"Pineapple Ginger Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"pineapple-mango-pepper":{name:"Pineapple Mango Pepper Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"poppin-sweet-peppers":{name:"Poppin Sweet Peppers",sizes:{"Regular (12 oz)":700},soldOut:[]},raspberry:{name:"Raspberry Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:["Large (12 oz)"]},"spencers-strawberry":{name:"Spencer's Strawberry SweeTTness",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"strawberry-mango":{name:"Strawberry Mango Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"sweet-and-savory":{name:"Sweet and Savory Pickles",sizes:{"Regular (12 oz)":1e3,"Large (16 oz)":1500},soldOut:[]},"tart-n-tangy":{name:"Tart n Tangy Pickles",sizes:{"Regular (12 oz)":1e3,"Large (16 oz)":1500},soldOut:["Regular (12 oz)"]},"wilderness-wild-n-free":{name:"Wilderness / Wild n Free",sizes:{"Large (16 oz)":1800},soldOut:[]}};var Ge={Jams:{Regular:8,Large:12},"Pickled goods":{Regular:12,Large:16}},z=["Jams","Pickled goods","Curriculum & Resources","Books"];function T(e,t){if(e!=="Jams"&&e!=="Pickled goods"&&e)return String(t||"").trim().replace(/\s+/g," ")||"Standard";let a=Ge[e==="Pickled goods"?"Pickled goods":"Jams"],n=String(t||"").trim().replace(/\s+/g," "),s=m=>`${m} (${a[m]} oz)`;if(!n)return s("Regular");let r=n.match(/(\d+(?:\.\d+)?)\s*oz\b/i);if(r){let m=Number(r[1]);return m===a.Regular?s("Regular"):m===a.Large?s("Large"):n}let o=n.toLowerCase();return o==="regular"?s("Regular"):o==="large"?s("Large"):n}var ue=[{id:"four-oz-specialty",name:"4 oz Specialty Jar",category:"Jams",description:"A small 4 oz jar, ideal for sampling or gifting.",sort:1,sizes:[{label:"4 oz",cents:350,soldOut:!1}]},{id:"apple",name:"Apple Jam",category:"Jams",description:"Crisp seasonal apples cooked into a sweet-tart spread. Good on toast, in oatmeal, or baked into something.",sort:2,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"blackberry",name:"Blackberry Jam",category:"Jams",description:"Ripe blackberries, small batch.",sort:3,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"blueberry-ginger",name:"Blueberry Ginger Jam",category:"Jams",description:"Ripe blueberries with a little zesty ginger. Nice with breakfast or a snack.",sort:4,sizes:[{label:"Regular",cents:700,soldOut:!1}]},{id:"blueberry-peppered",name:"Blueberry Peppered Jam",category:"Jams",description:"Sweet blueberries with a touch of pepper. Try it on cheese and crackers or a charcuterie board.",sort:5,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"braxtons-blueberry-bliss",name:"Braxton's Blueberry Bliss",category:"Jams",description:"Fresh, ripe blueberries for toast, scones, or a spoonful on its own.",sort:6,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"daring-n-dill",name:"Daring n Dill",category:"Pickled goods",description:"Pickled vegetables with a dill bite.",sort:7,sizes:[{label:"Regular",cents:1e3,soldOut:!1}]},{id:"jalapeno-pepper",name:"Jalape\xF1o Pepper Jam",category:"Jams",description:"Zesty and spicy. Use it as a dip or a marinade.",sort:8,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"peach",name:"Peach Jam",category:"Jams",description:"A fan favorite: juicy peaches for toast, pancakes, or baking.",sort:9,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"peppered",name:"Peppered Jam",category:"Jams",description:"Our original: sweet peppers and jalape\xF1os, mild heat. Great on sandwiches and charcuterie boards.",sort:10,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"pickled-cucumbers",name:"Pickled Cucumbers",category:"Pickled goods",description:"Classic dill pickles from fresh cucumbers, dill, and savory spices.",sort:11,sizes:[{label:"16 oz",cents:1500,soldOut:!1}]},{id:"pineapple-ginger",name:"Pineapple Ginger Jam",category:"Jams",description:"A tropical jam with a ginger kick.",sort:12,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"pineapple-mango-pepper",name:"Pineapple Mango Pepper Jam",category:"Jams",description:"Pineapple and mango with a little pepper heat. Try it glazed on chicken or on a cheese board.",sort:13,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"poppin-sweet-peppers",name:"Poppin Sweet Peppers",category:"Pickled goods",description:"Candied jalape\xF1os: sweet cane sugar, spicy peppers, and our own blend.",sort:14,sizes:[{label:"Regular",cents:700,soldOut:!1}]},{id:"raspberry",name:"Raspberry Jam",category:"Jams",description:"Juicy raspberries for toast, waffles, or ice cream.",sort:15,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!0}]},{id:"spencers-strawberry",name:"Spencer's Strawberry SweeTTness",category:"Jams",description:"Sun-ripened strawberries, cooked slowly. Good on toast, waffles, or straight from the jar.",sort:16,sizes:[{label:"Small 8 oz",cents:700,soldOut:!1},{label:"Large 12 oz",cents:1e3,soldOut:!1}]},{id:"strawberry-mango",name:"Strawberry Mango Jam",category:"Jams",description:"Strawberries and mango for toast, yogurt, or a tropical charcuterie board.",sort:17,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"sweet-and-savory",name:"Sweet and Savory Pickles",category:"Pickled goods",description:"Fresh cucumbers, dill, and a hint of sugar. Good on sandwiches, burgers, and boards.",sort:18,sizes:[{label:"12 oz",cents:1e3,soldOut:!1},{label:"16 oz",cents:1500,soldOut:!1}]},{id:"tart-n-tangy",name:"Tart n Tangy Pickles",category:"Pickled goods",description:"Bold spices and heat alongside classic dill.",sort:19,sizes:[{label:"12 oz",cents:1e3,soldOut:!0},{label:"16 oz",cents:1500,soldOut:!1}]},{id:"wilderness-wild-n-free",name:"Wilderness / Wild n Free",category:"Pickled goods",description:"16 oz, 9 major ingredients, holistically packed and formulated.",sort:20,sizes:[{label:"16 oz",cents:1800,soldOut:!1}]}];var pe=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<link rel="manifest" href="/admin/manifest.webmanifest"><link rel="icon" href="/admin/icon-192.png"><link rel="apple-touch-icon" href="/admin/icon-192.png">
<meta name="theme-color" content="#1b3b22"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="QE Admin"><title>Queen E's Heirr Shop Admin Portal</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@500;700&display=swap">
<style>
:root{--cream:#fcfaf7;--cream-deep:#f4f0eb;--linen:#e5dbd1;--forest:#1b3b22;--forest-deep:#142d19;--ink:#0e2012;--gold:#d4af37;--gold-light:#f7f1d8;--muted:#5c6b5a;--sage:#7a8c79;--red:#9b2c2c}
*{box-sizing:border-box}body{margin:0;background:var(--cream);color:var(--forest-deep);font-family:Inter,system-ui,sans-serif;line-height:1.5}
h1,h2,h3{font-family:'Playfair Display',Georgia,serif;color:var(--forest);margin:0 0 .4em}
.wrap{max-width:900px;margin:0 auto;padding:16px}
header{background:var(--ink);color:var(--cream-deep);padding:14px 16px}header .in{max-width:900px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:12px}
header b{font-family:'Playfair Display',serif;color:var(--gold);font-size:1.1rem}header small{opacity:.8}
nav{display:flex;gap:8px;margin:16px 0;flex-wrap:wrap}
nav[role=tablist]{gap:6px 4px;align-items:center;padding:8px 10px;background:#fff;border:1px solid var(--linen);border-radius:18px;margin:14px 0 22px}
nav[role=tablist] .sep{width:1px;align-self:stretch;min-height:26px;background:var(--linen);margin:0 8px}
@media(max-width:640px){nav[role=tablist] .sep{display:none}}
nav[role=tablist] .tab{border-color:transparent;background:transparent;min-height:40px;padding:0 14px}
nav[role=tablist] .tab[aria-selected=true]{background:var(--forest);border-color:var(--forest)}
nav[role=tablist] .tab.go{margin-left:auto;border-color:var(--gold);color:var(--forest)}
.seg{display:inline-flex;flex-wrap:wrap;gap:2px;padding:3px;background:var(--cream-deep,#f4f0eb);border-radius:999px;margin:4px 0 14px}
.seg .tab{border-color:transparent;background:transparent;min-height:34px;padding:0 14px;font-size:.68rem}
.seg .tab[aria-selected=true]{background:var(--forest);color:var(--gold-light)}
.tools{padding:12px 14px;background:#fff;border:1px solid var(--linen);border-radius:14px;margin:6px 0 18px;gap:12px 14px}
.tools label{font:600 .68rem Inter;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.tools select,.tools input{margin-top:4px;font-weight:400;letter-spacing:0;text-transform:none}
.tab,.btn{font:600 .72rem Inter;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:0 18px;min-height:44px;border:1px solid var(--linen);background:#fff;color:var(--forest);cursor:pointer}
.tab[aria-selected=true],.btn.primary{background:var(--forest);color:var(--gold-light);border-color:var(--forest)}
.btn.danger{color:var(--red)}.btn.small{min-height:36px;padding:0 14px}
.btn:disabled{opacity:.5;cursor:not-allowed}
:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.card{background:#fff;border:1px solid var(--linen);border-radius:20px;padding:16px;margin:12px 0}
label{display:grid;gap:4px;font:600 .68rem Inter;letter-spacing:.08em;text-transform:uppercase}
input,select,textarea{font:400 .95rem Inter;border:1px solid var(--linen);background:var(--cream);border-radius:12px;padding:10px 12px;width:100%;text-transform:none;letter-spacing:0}
.row{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));align-items:end}
.muted{color:var(--muted);font-size:.9rem}.msg{min-height:1.4em;font-size:.9rem}.err{color:var(--red)}.ok{color:var(--forest)}
.pill{display:inline-block;font:600 .68rem Inter;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:999px;background:var(--gold-light);color:var(--forest)}
.pill.event{background:var(--forest);color:var(--gold-light)}.pill.pickup{background:var(--cream-deep)}
.chk{display:flex;gap:8px;align-items:center;font:400 .9rem Inter;text-transform:none;letter-spacing:0}.chk input{width:auto}
.sizes .row{padding:10px 0;border-top:1px solid var(--linen)}
.hide{display:none}
.tools{display:flex;flex-wrap:wrap;align-items:end}.tools label{flex:1 1 130px;min-width:130px}.tools .btn{min-height:42px}
.totals{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0}.totals .card{margin:0;padding:10px 16px;flex:1 1 150px}.totals b{display:block;font:700 1.3rem 'Playfair Display',serif;color:var(--forest)}
table.rep{width:100%;border-collapse:collapse;font-size:.92rem;margin:8px 0 16px}table.rep th,table.rep td{padding:8px 6px;border-bottom:1px solid var(--linen);text-align:right}table.rep th:first-child,table.rep td:first-child{text-align:left}table.rep th{font:600 .68rem Inter;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.pill.void{background:#f3d9d9;color:var(--red)}
/* EVENT SALE (customer-facing) */
.sale{position:fixed;inset:0;background:var(--cream);display:flex;flex-direction:column;z-index:20;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.sale header{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 20px;background:var(--ink)}
.sale header img{width:52px;height:52px;border-radius:50%;flex:none}
.sale .brand{display:flex;align-items:center;gap:14px;color:var(--gold)}.sale .brand b{font-family:'Playfair Display',serif;font-size:1.5rem;display:block;line-height:1.1}.sale .brand span{color:var(--cream-deep);font-size:.8rem;letter-spacing:.14em;text-transform:uppercase}
.sale .staff{background:none;border:0;color:rgba(255,255,255,.35);font:600 .7rem Inter;letter-spacing:.1em;text-transform:uppercase;padding:14px}
.sale .scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:20px 20px 120px}
.sale .sbox{max-width:1400px;margin:0 auto 16px}.sale .sbox input{width:100%;font-size:1.1rem;padding:14px 18px;border-radius:999px;border:1.5px solid var(--linen);background:#fff}
.sale .grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));max-width:1400px;margin:0 auto}
.sale .tile{background:#fff;border:1.5px solid var(--linen);border-radius:22px;overflow:hidden;text-align:left;padding:0;font:inherit;color:inherit;display:flex;flex-direction:column;position:relative;min-height:56px}
.sale .tile:active{transform:scale(.98)}
.sale .tile img{width:100%;aspect-ratio:4/5;object-fit:cover;background:var(--cream-deep)}
.sale .tile img.ph{object-fit:contain;padding:22px;background:#fff}.sale .tile .meta{padding:12px 14px 16px}.sale .tile h3{font-size:1.15rem;margin:0 0 4px}.sale .tile .price{font-weight:600;color:var(--forest)}
.sale .tile .low{font-size:.8rem;color:#8a5a00;margin-top:2px}
.sale .tile.out{opacity:.55}.sale .tile .badge{position:absolute;top:10px;left:10px;background:var(--ink);color:var(--gold-light);font:600 .72rem Inter;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:99px}
.sale .bar{position:absolute;left:0;right:0;bottom:0;padding:14px 20px calc(14px + env(safe-area-inset-bottom));background:#fff;border-top:1px solid var(--linen);display:flex;align-items:center;justify-content:space-between;gap:12px}
.sale .bar .tot{font:700 1.25rem 'Playfair Display',serif;color:var(--forest)}
.sale .big{min-height:58px;padding:0 28px;border-radius:99px;border:0;background:var(--forest);color:var(--gold-light);font:700 1rem Inter;letter-spacing:.1em;text-transform:uppercase}
.sale .big:disabled{opacity:.45}.sale .big.alt{background:#fff;color:var(--forest);border:1.5px solid var(--forest)}
.sale .sheet-bg{position:absolute;inset:0;background:rgba(14,32,18,.55);display:flex;align-items:flex-end;justify-content:center;z-index:5}
.sale .sheet{background:var(--cream);width:min(640px,100%);max-height:88%;overflow-y:auto;border-radius:26px 26px 0 0;padding:22px 22px calc(22px + env(safe-area-inset-bottom))}
@media(min-width:700px){.sale .sheet-bg{align-items:center}.sale .sheet{border-radius:26px}}
.sale .sizeopt{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;min-height:64px;padding:12px 18px;margin-top:10px;background:#fff;border:1.5px solid var(--linen);border-radius:18px;font:600 1.05rem Inter;color:var(--forest-deep);text-align:left}
.sale .sizeopt:disabled{opacity:.5}.sale .sizeopt small{display:block;font-weight:400;color:#8a5a00}
.sale .line{display:grid;grid-template-columns:1fr auto auto;gap:12px;align-items:center;padding:14px 0;border-bottom:1px solid var(--linen)}
.sale .qty{display:flex;align-items:center;gap:6px}.sale .qty button{width:48px;height:48px;border-radius:50%;border:1.5px solid var(--linen);background:#fff;font:600 1.3rem Inter;color:var(--forest)}.sale .qty span{min-width:30px;text-align:center;font-weight:700}
.sale .thanks{position:absolute;inset:0;background:var(--forest);color:var(--gold-light);display:grid;place-items:center;text-align:center;z-index:9;padding:24px}.sale .thanks h1{color:var(--gold);font-size:3rem}
.sale input.pin{font-size:1.6rem;letter-spacing:.5em;text-align:center}

.toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:var(--ink);color:var(--cream-deep);padding:10px 18px;border-radius:999px;font-size:.9rem;z-index:9}
.drag-handle{cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;padding:6px 10px 6px 0;color:var(--muted,#6b6b6b);font-size:1.3rem;line-height:1}.card.dragging{opacity:.85;box-shadow:0 8px 24px rgba(0,0,0,.25);outline:2px solid var(--gold,#c9a84c)}
</style></head><body>
<div id="app"></div>
<script>
"use strict";
var TOKEN = null, EMAIL = "";
// The sign-in is kept on this device (and renewed while the app is in use) so a quiet stretch at an event never logs her out.
function keep(k, v) { try { if (v == null) { localStorage.removeItem(k); sessionStorage.removeItem(k); } else localStorage.setItem(k, v); } catch (e) { try { if (v != null) sessionStorage.setItem(k, v); } catch (e2) {} } }
function recall(k) { try { return localStorage.getItem(k) || sessionStorage.getItem(k); } catch (e) { return null; } }
TOKEN = recall("qe_t"); EMAIL = recall("qe_e") || "";
var app = document.getElementById("app");
function h(tag, attrs, kids) {
  var n = document.createElement(tag);
  if (attrs) Object.keys(attrs).forEach(function (k) {
    if (k === "text") n.textContent = attrs[k];
    else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
  });
  (kids || []).forEach(function (c) { if (c != null) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
  return n;
}
function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
function toast(t) { var x = h("div", { "class": "toast", role: "status", text: t }); document.body.appendChild(x); setTimeout(function () { x.remove(); }, 2200); }
function money(c) { return (c / 100).toLocaleString("en-US", { style: "currency", currency: "USD" }); }
/* LIST TOOLS: sort, type filter and date range for any list; CSV download */
function chiDate(ms) { return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date(ms)); }
function addDays(d, k) { var p = d.split("-"); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + k)).toISOString().slice(0, 10); }
function listTools(cfg, onChange) {
  var st = { sort: cfg.sorts[0][0], dir: cfg.dir || "desc", type: "", from: "", to: "", q: "" };
  var kids = [];
  if (cfg.search) {
    var qIn = h("input", { type: "search", placeholder: cfg.search, "aria-label": cfg.search, autocomplete: "off", style: "min-width:220px" });
    qIn.addEventListener("input", function () { st.q = qIn.value.trim().toLowerCase(); onChange(st); });
    kids.push(h("label", null, ["Search", qIn]));
  }
  var sortSel = h("select", { "aria-label": "Sort by" }, cfg.sorts.map(function (s) { return h("option", { value: s[0], text: s[1] }); }));
  var dirBtn = h("button", { "class": "btn small", type: "button", title: "Reverse the order", "aria-label": "Reverse the order", text: st.dir === "desc" ? "\\u2193" : "\\u2191" });
  sortSel.addEventListener("change", function () { st.sort = sortSel.value; onChange(st); });
  dirBtn.addEventListener("click", function () { st.dir = st.dir === "desc" ? "asc" : "desc"; dirBtn.textContent = st.dir === "desc" ? "\\u2193" : "\\u2191"; onChange(st); });
  kids.push(h("label", null, ["Sort by", sortSel]), dirBtn);
  if (cfg.types && cfg.types.length) {
    var typeSel = h("select", { "aria-label": cfg.typeLabel || "Type" }, [h("option", { value: "", text: "All" })].concat(cfg.types.map(function (t) { return h("option", { value: t, text: t }); })));
    typeSel.addEventListener("change", function () { st.type = typeSel.value; onChange(st); });
    kids.push(h("label", null, [cfg.typeLabel || "Type", typeSel]));
  }
  if (cfg.dateOf) {
    var from = h("input", { type: "date", "aria-label": "From date" }), to = h("input", { type: "date", "aria-label": "To date" });
    from.addEventListener("change", function () { st.from = from.value; onChange(st); });
    to.addEventListener("change", function () { st.to = to.value; onChange(st); });
    kids.push(h("label", null, ["From", from]), h("label", null, ["To", to]));
  }
  return { el: h("div", { "class": "tools" }, kids), state: st };
}
function applyTools(rows, st, cfg) {
  var out = rows.filter(function (r) {
    if (st.type && cfg.typeOf && cfg.typeOf(r) !== st.type) return false;
    if (st.q && cfg.textOf && cfg.textOf(r).toLowerCase().indexOf(st.q) < 0) return false;
    if (cfg.dateOf && (st.from || st.to)) { var d = cfg.dateOf(r) || ""; if (st.from && d < st.from) return false; if (st.to && d > st.to) return false; }
    return true;
  });
  var key = cfg.get[st.sort], dir = st.dir === "asc" ? 1 : -1;
  out.sort(function (a, b) {
    var x = key(a), y = key(b);
    if (x === y) return 0;
    if (x == null || x === "") return 1;
    if (y == null || y === "") return -1;
    return (x < y ? -1 : 1) * dir;
  });
  return out;
}
function uniq(list) { var seen = {}; return list.filter(function (x) { if (!x || seen[x]) return false; seen[x] = 1; return true; }); }
function csvDownload(name, header, rows) {
  var esc = function (v) { v = v == null ? "" : String(v); if (/^[=+\\-@\\t\\r]/.test(v)) v = "'" + v; return /[",\\n\\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  var text = "\\ufeff" + [header].concat(rows).map(function (r) { return r.map(esc).join(","); }).join("\\r\\n");
  var a = h("a", { href: URL.createObjectURL(new Blob([text], { type: "text/csv;charset=utf-8" })), download: name });
  document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}
function dollars(c) { return ((c || 0) / 100).toFixed(2); }
function timeOf(ms) { return new Date(ms).toLocaleTimeString("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit" }); }
function api(method, path, body) {
  var opt = { method: method, headers: { "Content-Type": "application/json" } };
  if (TOKEN) opt.headers.Authorization = "Bearer " + TOKEN;
  if (body) opt.body = JSON.stringify(body);
  return fetch("/admin/api/" + path, opt).then(function (r) {
    return r.json().catch(function () { return {}; }).then(function (d) {
      if (r.status === 401 && TOKEN) { signOut(); throw new Error("Please sign in again"); }
      if (!r.ok) throw new Error(d.error || "Something went wrong");
      return d;
    });
  });
}
function signOut() { TOKEN = null; keep("qe_t", null); renderLogin(); }

function shell(content) {
  clear(app);
  app.appendChild(h("header", null, [h("div", { "class": "in" }, [
    h("div", null, [h("b", { text: "Queen E's Heirr" }), h("br"), h("small", { text: "Shop Admin Portal" })]),
    h("button", { "class": "btn small", onclick: signOut, text: "Sign out" })])]));
  app.appendChild(h("div", { "class": "wrap" }, content));
}

function renderLogin(step) {
  clear(app);
  var msg = h("p", { "class": "msg", role: "status" });
  var email = h("input", { type: "email", autocomplete: "email", required: true, value: EMAIL });
  var code = h("input", { inputmode: "numeric", autocomplete: "one-time-code", maxlength: "6", placeholder: "6-digit code" });
  var form = h("form", { "class": "card", onsubmit: function (e) {
    e.preventDefault();
    if (!step) {
      msg.className = "msg"; msg.textContent = "Sending...";
      EMAIL = email.value.trim();
      api("POST", "login", { email: EMAIL }).then(function () { renderLogin("code"); }).catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
    } else {
      msg.className = "msg"; msg.textContent = "Checking...";
      api("POST", "verify", { email: EMAIL, code: code.value }).then(function (d) {
        TOKEN = d.token; keep("qe_t", TOKEN); keep("qe_e", EMAIL);
        start();
      }).catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
    }
  } }, [
    h("h1", { text: "Sign In" }),
    h("p", { "class": "muted", text: step ? "We emailed a 6-digit code to " + EMAIL + ". It works for 10 minutes." : "Enter your email and we will send you a sign-in code." }),
    step ? h("label", null, ["Code", code]) : h("label", null, ["Email", email]),
    h("p"), h("button", { "class": "btn primary", type: "submit", text: step ? "Sign in" : "Email me a code" }),
    step ? h("button", { "class": "btn small", type: "button", style: "margin-left:8px", onclick: function () { renderLogin(); }, text: "Start over" }) : null, msg]);
  app.appendChild(h("div", { "class": "wrap" }, [h("div", { style: "height:24px" }), form]));
  (step ? code : email).focus();
}

var PAYLABEL = { cash: "Cash", cashapp: "Cash App", venmo: "Venmo", tap: "Tap to Pay" };
var GROUPS = [
  ["Orders & Reports", [["orders", "Orders"], ["requests", "Requests"], ["ledger", "Ledger"], ["reports", "Reports"]]],
  ["Products", [["products", "Products"]]],
  ["Events", [["events", "Events"]]],
  ["Classes & Bookings", [["classes", "Classes"], ["bookings", "Bookings"]]],
  ["Marketing", [["subscribers", "Mailing List"], ["campaigns", "Email Campaigns"]]]
];
function groupOf(key) { return GROUPS.filter(function (g) { return g[1].some(function (v) { return v[0] === key; }); })[0] || null; }
var current = "orders";
var wakeLock = null, renewTimer = null;
function keepAwake(on) {   // keeps the screen from dimming or locking while the sale screen is open
  try {
    if (!on) { if (wakeLock) { wakeLock.release(); wakeLock = null; } return; }
    if (!navigator.wakeLock || wakeLock) return;
    navigator.wakeLock.request("screen").then(function (l) { wakeLock = l; l.addEventListener("release", function () { wakeLock = null; }); }).catch(function () {});
  } catch (e) {}
}
function renewSession() {
  if (!TOKEN) return;
  api("GET", "renew").then(function (d) { if (d && d.token) { TOKEN = d.token; keep("qe_t", TOKEN); } }).catch(function () {});
}
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState !== "visible" || !TOKEN) return;
  renewSession(); if (current === "sale") keepAwake(true);
});
function start() {
  if (!renewTimer) { renewSession(); renewTimer = setInterval(renewSession, 20 * 60 * 1000); }
  var body = h("div");
  var kids = [], grp = groupOf(current);
  GROUPS.forEach(function (g) {
    kids.push(h("button", { "class": "tab", role: "tab", "aria-selected": String(g === grp), onclick: function () { current = g[1][0][0]; start(); }, text: g[0] }));
  });
  kids.push(h("button", { "class": "tab go", role: "tab", "aria-selected": String(current === "sale"), onclick: function () { current = "sale"; start(); }, text: "Event Sale" }));
  var nav = h("nav", { role: "tablist" }, kids);
  var subnav = null;
  if (grp && grp[1].length > 1) {
    subnav = h("nav", { "class": "seg", "aria-label": grp[0] }, grp[1].map(function (v) {
      return h("button", { "class": "tab", "aria-selected": String(v[0] === current), onclick: function () { current = v[0]; start(); }, text: v[1] });
    }));
  }
  shell(subnav ? [nav, subnav, body] : [nav, body]);
  ({ orders: viewOrders, products: viewProducts, requests: viewRequests, classes: viewClasses, bookings: viewBookings, events: viewEvents, ledger: viewLedger, reports: viewReports, sale: viewSale, subscribers: viewSubscribers, campaigns: viewCampaigns })[current](body);
  keepAwake(current === "sale");
}
/* MARKETING: MAILING LIST */
var SUB_PAGE = 100;
function viewSubscribers(n) {
  loading(n);
  api("GET", "subscribers").then(function (d) {
    clear(n);
    var all = d.subscribers || [], q = "", flt = "subscribed", shown = SUB_PAGE;
    function count(s) { return all.filter(function (x) { return x.status === s; }).length; }
    var stats = h("p", { "class": "muted" });
    function drawStats() {
      stats.textContent = count("subscribed") + " subscribed \xB7 " + count("unsubscribed") + " unsubscribed \xB7 " + all.length + " total. You can send " + d.quota + " more emails today.";
    }
    n.appendChild(h("p", { "class": "muted", text: "This is the same list as the Subscribers tab in your Google Sheet. People who sign up on the website appear here, and anyone who clicks Unsubscribe is marked automatically." }));
    drawStats(); n.appendChild(stats);

    function refresh() { viewSubscribers(n); }
    var aName = h("input", { placeholder: "First and last name (optional)", autocomplete: "off", "aria-label": "Name" });
    var aMail = h("input", { type: "email", placeholder: "email@example.com", autocomplete: "off", "aria-label": "Email" });
    var aOk = h("input", { type: "checkbox" }), aMsg = h("p", { "class": "msg", role: "status" });
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Add Someone" }),
      h("div", { "class": "row" }, [h("label", null, ["Name", aName]), h("label", null, ["Email", aMail])]),
      h("label", { "class": "chk" }, [aOk, "This person asked to be on the list"]), h("p"),
      h("button", { "class": "btn primary", text: "Add to list", onclick: function () {
        if (!aOk.checked) { aMsg.className = "msg err"; aMsg.textContent = "Please confirm they asked to be added."; return; }
        api("POST", "subscriber", { op: "add", email: aMail.value, name: aName.value }).then(function (r) {
          if (r.existing && r.status === "unsubscribed") {
            if (!confirm("This person unsubscribed earlier. Only add them back if they asked you to. Add them back?")) return;
            return api("POST", "subscriber", { op: "add", email: aMail.value, name: aName.value, resubscribe: true }).then(function () { toast("Added back"); refresh(); });
          }
          toast(r.existing ? "Already on the list" : "Added"); refresh();
        }).catch(function (er) { aMsg.className = "msg err"; aMsg.textContent = er.message; });
      } }), aMsg]));

    var iBox = h("textarea", { rows: "6", placeholder: "One person per line:\\nJane Smith, jane@example.com\\nsam@example.com", "aria-label": "People to import" });
    var iOk = h("input", { type: "checkbox" }), iMsg = h("p", { "class": "msg", role: "status" });
    var iCard = h("div", { "class": "hide" }, [
      h("p", { "class": "muted", text: "Paste people you already have permission to email, such as customers who asked to hear from you. Anyone who unsubscribed before stays unsubscribed. Up to 500 at a time." }),
      iBox, h("label", { "class": "chk" }, [iOk, "These people asked to hear from Queen E's Heirr"]), h("p"),
      h("button", { "class": "btn primary", text: "Import", onclick: function () {
        var rows = iBox.value.split(/\\n/).map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
          var m = l.match(/[^\\s,;<>"]+@[^\\s,;<>"]+/); if (!m) return { name: "", email: l };
          return { email: m[0], name: l.replace(m[0], "").replace(/[<>",;]/g, " ").replace(/\\s+/g, " ").trim() };
        });
        if (!rows.length) { iMsg.className = "msg err"; iMsg.textContent = "Paste at least one email."; return; }
        api("POST", "subscribers-import", { rows: rows, consent: iOk.checked }).then(function (r) {
          toast("Added " + r.added);
          iMsg.className = "msg ok"; iMsg.textContent = "Added " + r.added + ". Already on the list: " + r.already + ". Stayed unsubscribed: " + r.unsubscribed + ". Not valid: " + r.invalid + ".";
          if (r.added) setTimeout(refresh, 2500);
        }).catch(function (er) { iMsg.className = "msg err"; iMsg.textContent = er.message; });
      } }), iMsg]);
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Import a List" }),
      h("button", { "class": "btn small", text: "Show import box", onclick: function (e) { iCard.classList.toggle("hide"); e.currentTarget.textContent = iCard.classList.contains("hide") ? "Show import box" : "Hide import box"; } }), iCard]));

    var search = h("input", { type: "search", placeholder: "Search name or email", "aria-label": "Search the list", autocomplete: "off" });
    var sel = h("select", { "aria-label": "Show" }, [["subscribed", "Subscribed"], ["unsubscribed", "Unsubscribed"], ["", "Everyone"]].map(function (o) { return h("option", { value: o[0], text: o[1] }); }));
    var list = h("div");
    function draw() {
      clear(list);
      var rows = all.filter(function (x) { return (!flt || x.status === flt) && (!q || (x.name + " " + x.email).toLowerCase().indexOf(q) > -1); })
        .sort(function (a, b) { return (b.on || "").localeCompare(a.on || ""); });
      list.appendChild(h("p", { "class": "muted", text: rows.length + " " + (rows.length === 1 ? "person" : "people") }));
      rows.slice(0, shown).forEach(function (s) {
        var sub = s.status === "subscribed";
        var nameIn = h("input", { value: s.name, placeholder: "Name", "aria-label": "Name for " + s.email, style: "max-width:240px" });
        nameIn.addEventListener("change", function () {
          api("POST", "subscriber", { op: "name", email: s.email, name: nameIn.value }).then(function () { s.name = nameIn.value; toast("Saved"); }).catch(function (er) { toast(er.message); });
        });
        list.appendChild(h("div", { "class": "card", style: "display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between" }, [
          h("div", null, [h("div", null, [h("a", { href: "mailto:" + s.email, text: s.email }), " ", h("span", { "class": "pill" + (sub ? "" : " void"), text: sub ? "Subscribed" : "Unsubscribed" })]),
            h("div", { "class": "muted", text: s.on ? "Joined " + chiDate(Date.parse(s.on)) : "" }), nameIn]),
          h("div", null, [
            h("button", { "class": "btn small", text: sub ? "Unsubscribe" : "Add back", onclick: function () {
              if (sub ? !confirm("Stop emailing " + s.email + "?") : !confirm("Only add " + s.email + " back if they asked you to. Add them back?")) return;
              api("POST", "subscriber", { op: "set", email: s.email, status: sub ? "unsubscribed" : "subscribed" }).then(function () { s.status = sub ? "unsubscribed" : "subscribed"; drawStats(); draw(); toast("Saved"); }).catch(function (er) { toast(er.message); });
            } }), " ",
            h("button", { "class": "btn small danger", text: "Remove", onclick: function () {
              if (!confirm("Remove " + s.email + " from the list completely? To keep them from being emailed again, use Unsubscribe instead.")) return;
              api("POST", "subscriber", { op: "delete", email: s.email }).then(function () { all.splice(all.indexOf(s), 1); drawStats(); draw(); toast("Removed"); }).catch(function (er) { toast(er.message); });
            } })])]));
      });
      if (rows.length > shown) list.appendChild(h("button", { "class": "btn", text: "Show more", onclick: function () { shown += SUB_PAGE; draw(); } }));
    }
    search.addEventListener("input", function () { q = search.value.trim().toLowerCase(); shown = SUB_PAGE; draw(); });
    sel.addEventListener("change", function () { flt = sel.value; shown = SUB_PAGE; draw(); });
    sel.value = flt;
    n.appendChild(h("div", { "class": "tools" }, [h("label", null, ["Search", search]), h("label", null, ["Show", sel]),
      h("button", { "class": "btn", text: "Download CSV", onclick: function () {
        csvDownload("mailing-list.csv", ["Name", "Email", "Status", "Joined"], all.map(function (s) { return [s.name, s.email, s.status, s.on ? chiDate(Date.parse(s.on)) : ""]; }));
      } })]));
    n.appendChild(list); draw();
  }).catch(function (er) { failed(n, er); });
}

/* MARKETING: EMAIL CAMPAIGNS */
var CAMP_KEY = "qe_campaign";
var CAMP_TEMPLATES = [
  ["blank", "Start from scratch", { subject: "", preheader: "", headline: "", body: "", buttonLabel: "", buttonUrl: "", includeEvents: false, includeClasses: false }],
  ["flavor", "New flavor or product", { subject: "Something new from Queen E's Heirr", preheader: "Small batch, made with love.", headline: "Just Out of the Kitchen", body: "We have something new for you, and we think you will love it.\\n\\nWrite a few sentences here about the flavor, what inspired it, and what to pair it with.\\n\\nIt is made in small batches, so once a batch is gone, it is gone.", buttonLabel: "Shop Now", buttonUrl: "https://queenesheirr.com/shop/", includeEvents: false, includeClasses: false }],
  ["events", "Where to find us", { subject: "Come see us!", preheader: "Our next markets and pop-ups.", headline: "Come Say Hello", body: "We would love to see you in person. Here is where you can find us next.\\n\\nStop by to taste, chat, and take a jar home.", buttonLabel: "See the Shop", buttonUrl: "https://queenesheirr.com/shop/", includeEvents: true, includeClasses: false }],
  ["class", "Class announcement", { subject: "New class dates are up", preheader: "Seats are limited.", headline: "Learn With Queen E's", body: "New class dates are open for booking, and seats are limited.\\n\\nBring a friend, learn something delicious, and take your creations home.", buttonLabel: "Book a Seat", buttonUrl: "https://queenesheirr.com/classes/", includeEvents: false, includeClasses: true }],
  ["thanks", "Thank you", { subject: "Thank you from Queen E's Heirr", preheader: "We are grateful for you.", headline: "Thank You", body: "Thank you for supporting Queen E's Heirr. Every jar, class, and kind word means so much to our family.\\n\\nWe are grateful for you.", buttonLabel: "", buttonUrl: "", includeEvents: false, includeClasses: false }]
];
function viewCampaigns(n) {
  clear(n);
  var D = ssGet(CAMP_KEY) || { subject: "", preheader: "", headline: "", body: "", imageUrl: "", buttonLabel: "", buttonUrl: "", greet: true, includeEvents: false, includeClasses: false };
  var sending = false, root = h("div"); n.appendChild(root);
  function save() { ssSet(CAMP_KEY, D); }

  // mailing address (required in the footer of every marketing email)
  var addr = h("textarea", { rows: "3", placeholder: "Queen E's Heirr\\nStreet address or PO Box\\nCity, State ZIP", "aria-label": "Mailing address" }), addrMsg = h("p", { "class": "msg", role: "status" });
  api("GET", "marketing-settings").then(function (s) { addr.value = s.address || ""; if (!s.address) { addrMsg.className = "msg err"; addrMsg.textContent = "Add your mailing address before sending. It goes in the footer of every email."; } }).catch(function () {});
  var addrCard = h("div", { "class": "card" }, [h("h3", { text: "Your Mailing Address" }),
    h("p", { "class": "muted", text: "The law requires a real mailing address (a PO Box works) at the bottom of marketing emails. It is added to every email automatically." }),
    addr, h("p"), h("button", { "class": "btn small primary", text: "Save address", onclick: function () {
      api("POST", "marketing-settings", { address: addr.value }).then(function (r) { addr.value = r.address; addrMsg.className = "msg ok"; addrMsg.textContent = "Saved."; preview(); }).catch(function (er) { addrMsg.className = "msg err"; addrMsg.textContent = er.message; });
    } }), addrMsg]);

  // template picker
  var tsel = h("select", { "aria-label": "Start from a template" }, CAMP_TEMPLATES.map(function (t) { return h("option", { value: t[0], text: t[1] }); }));
  root.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Write an Email" }),
    h("div", { "class": "tools" }, [h("label", null, ["Start from", tsel]), h("button", { "class": "btn", text: "Use this template", onclick: function () {
      var t = CAMP_TEMPLATES.filter(function (x) { return x[0] === tsel.value; })[0];
      if ((D.subject || D.body) && !confirm("Replace what you have written with this template?")) return;
      var img = D.imageUrl; D = Object.assign({ greet: true, imageUrl: img }, t[2]); save(); viewCampaigns(n);
    } })])]));

  function field(label, el) { return h("label", null, [label, el]); }
  function bind(el, key) { el.value = D[key] || ""; el.addEventListener("input", function () { D[key] = el.value; save(); queuePreview(); }); return el; }
  function flag(label, key) { var c = h("input", { type: "checkbox", checked: !!D[key] }); c.addEventListener("change", function () { D[key] = c.checked; save(); queuePreview(); }); return h("label", { "class": "chk" }, [c, label]); }
  var pick = photoPicker(D.imageUrl, "Photo added to the email.", "Photo at the top (optional)");
  var lastImg = D.imageUrl || "";
  var poll = setInterval(function () {
    if (!document.body.contains(root)) { clearInterval(poll); return; }
    if (pick.holder.url !== lastImg) { lastImg = pick.holder.url; D.imageUrl = lastImg; save(); queuePreview(); }
  }, 700);
  var form = h("div", { "class": "card", style: "display:grid;gap:14px" }, [
    field("Subject line (what shows in the inbox)", bind(h("input", { maxlength: "150" }), "subject")),
    field("Preview text (the gray text after the subject)", bind(h("input", { maxlength: "150" }), "preheader")),
    field("Headline inside the email", bind(h("input", { maxlength: "120" }), "headline")),
    field("Message", bind(h("textarea", { rows: "9", maxlength: "8000" }), "body")),
    h("p", { "class": "muted", text: "Leave a blank line to start a new paragraph. Web links turn into clickable links on their own." }),
    pick.node,
    h("div", { "class": "row" }, [field("Button text (optional)", bind(h("input", { maxlength: "40", placeholder: "Shop Now" }), "buttonLabel")), field("Button link", bind(h("input", { placeholder: "https://queenesheirr.com/shop/", inputmode: "url", autocapitalize: "off" }), "buttonUrl"))]),
    flag("Start with \u201CHi [first name],\u201D", "greet"),
    flag("Add my upcoming events", "includeEvents"),
    flag("Add my upcoming classes", "includeClasses")]);
  root.appendChild(form);

  // preview
  var frame = h("iframe", { title: "Email preview", sandbox: "", style: "width:100%;height:640px;border:1px solid var(--linen);border-radius:14px;background:#fff" });
  var pmsg = h("p", { "class": "msg", role: "status" }), ptimer = null;
  function preview() {
    var f = fields();
    if (!f.subject.trim() || (!f.headline.trim() && !f.body.trim())) { pmsg.className = "msg"; pmsg.textContent = "Add a subject and a message to see the preview."; frame.srcdoc = ""; return; }
    api("POST", "campaign-preview", { fields: f }).then(function (r) { frame.srcdoc = r.html; pmsg.className = "msg"; pmsg.textContent = ""; }).catch(function (er) { pmsg.className = "msg err"; pmsg.textContent = er.message; });
  }
  function queuePreview() { clearTimeout(ptimer); ptimer = setTimeout(preview, 700); }
  function fields() { return { subject: D.subject, preheader: D.preheader, headline: D.headline, body: D.body, imageUrl: D.imageUrl, buttonLabel: D.buttonLabel, buttonUrl: D.buttonUrl, greet: D.greet !== false, includeEvents: !!D.includeEvents, includeClasses: !!D.includeClasses }; }
  root.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Preview" }), pmsg, frame]));

  // send
  var smsg = h("p", { "class": "msg", role: "status" }), bar = h("progress", { max: "100", value: "0", style: "width:100%;display:none" });
  var testBtn = h("button", { "class": "btn", text: "Send me a test", onclick: function () {
    if (sending) return; testBtn.disabled = true; smsg.className = "msg"; smsg.textContent = "Sending a test...";
    api("POST", "campaign-test", { fields: fields() }).then(function (r) { smsg.className = "msg ok"; smsg.textContent = "Test sent to " + r.to + ". Check your inbox (and spam) to see how it looks on your phone."; })
      .catch(function (er) { smsg.className = "msg err"; smsg.textContent = er.message; }).then(function () { testBtn.disabled = false; });
  } });
  var sendBtn = h("button", { "class": "btn primary", text: "Send to the list", onclick: function () { go(); } });
  function lockForm(on) { sending = on; sendBtn.disabled = on; testBtn.disabled = on; form.style.opacity = on ? ".5" : ""; form.style.pointerEvents = on ? "none" : ""; window.onbeforeunload = on ? function () { return "Your email is still sending."; } : null; }
  function go() {
    if (sending) return;
    smsg.className = "msg"; smsg.textContent = "Checking the list...";
    api("POST", "campaign-start", { fields: fields() }).then(function (s) {
      if (!confirm("Send \u201C" + D.subject + "\u201D to " + s.total + " " + (s.total === 1 ? "person" : "people") + " now? This cannot be undone. Have you sent yourself a test?")) { smsg.textContent = ""; return; }
      lockForm(true); bar.style.display = ""; bar.max = s.total; bar.value = 0;
      var sent = 0, failed = 0, i = 0;
      function next() {
        if (i >= s.emails.length) return finish();
        var part = s.emails.slice(i, i + s.chunk);
        smsg.textContent = "Sending... " + Math.min(i + part.length, s.total) + " of " + s.total + ". Please keep this page open.";
        return api("POST", "campaign-chunk", { fields: fields(), emails: part }).then(function (r) { sent += r.sent; failed += r.failed; i += part.length; bar.value = i; return next(); })
          .catch(function (er) { failed += part.length; i += part.length; bar.value = i; smsg.textContent = "A group did not send (" + er.message + "). Continuing..."; return next(); });
      }
      function finish() {
        return api("POST", "campaign-done", { id: s.id, fields: fields(), total: s.total, sent: sent, failed: failed }).catch(function () {}).then(function () {
          lockForm(false); bar.style.display = "none"; smsg.className = failed ? "msg err" : "msg ok";
          smsg.textContent = "Done. Sent to " + sent + " of " + s.total + (failed ? ". " + failed + " did not send; check the Campaigns tab in your Google Sheet." : ".");
          history();
        });
      }
      return next();
    }).catch(function (er) { lockForm(false); smsg.className = "msg err"; smsg.textContent = er.message; });
  }
  root.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Send" }),
    h("p", { "class": "muted", text: "Always send yourself a test first. Emails go only to people who are currently subscribed, and each one has its own unsubscribe link." }),
    h("div", null, [testBtn, " ", sendBtn]), bar, smsg,
    h("p", { "class": "muted" }, [h("button", { "class": "btn small", text: "Start a new email", onclick: function () { if (confirm("Clear this email and start over?")) { ssSet(CAMP_KEY, null); viewCampaigns(n); } } })])]));

  root.appendChild(addrCard);
  // history
  var hist = h("div", { "class": "card" }); root.appendChild(hist);
  function history() {
    clear(hist); hist.appendChild(h("h3", { text: "Sent Emails" }));
    api("GET", "campaigns").then(function (r) {
      if (!r.campaigns.length) { hist.appendChild(h("p", { "class": "muted", text: "Nothing sent yet." })); return; }
      r.campaigns.forEach(function (c) {
        hist.appendChild(h("div", { style: "padding:8px 0;border-top:1px solid var(--linen)" }, [h("strong", { text: c.subject }),
          h("div", { "class": "muted", text: (c.on ? chiDate(Date.parse(c.on)) + " \xB7 " : "") + "sent to " + c.sent + " of " + c.total + (c.failed ? " \xB7 " + c.failed + " failed" : "") })]));
      });
    }).catch(function (er) { hist.appendChild(h("p", { "class": "msg err", text: er.message })); });
  }
  history(); preview();
}
function loading(n) { clear(n); n.appendChild(h("p", { "class": "muted", text: "Loading..." })); }
function failed(n, er) { clear(n); n.appendChild(h("p", { "class": "msg err", text: er.message })); }

/* PHOTO PICKER: shrinks the photo in the browser, uploads it, and fills in the address */
function photoPicker(current, readyMsg, label) {
  var holder = { url: current || "" };
  var preview = h("img", { alt: "", style: "max-width:140px;max-height:140px;border-radius:12px;border:1px solid var(--linen);" + (current ? "" : "display:none") });
  if (current) preview.src = current;
  var status = h("span", { "class": "muted" });
  var file = h("input", { type: "file", accept: "image/*", "aria-label": "Choose a product photo" });
  file.addEventListener("change", function () {
    var f = file.files && file.files[0]; if (!f) return;
    status.textContent = "Uploading...";
    var img = new Image(), objUrl = URL.createObjectURL(f);
    img.onload = function () {
      var max = 1200, sc = Math.min(1, max / Math.max(img.width, img.height));
      var c = document.createElement("canvas"); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
      var ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(objUrl);
      c.toBlob(function (blob) {
        var rd = new FileReader();
        rd.onload = function () {
          api("POST", "image", { data: String(rd.result).split(",")[1] }).then(function (d) {
            holder.url = d.url; preview.src = URL.createObjectURL(blob); preview.style.display = ""; status.textContent = readyMsg || "Photo ready. Click Save to use it.";
          }).catch(function (er) { status.textContent = er.message; });
        };
        rd.readAsDataURL(blob);
      }, "image/jpeg", 0.85);
    };
    img.onerror = function () { status.textContent = "That file could not be read as a photo."; };
    img.src = objUrl;
  });
  return { holder: holder, node: h("div", null, [h("label", null, [label || "Product photo", file]), h("div", { style: "margin-top:6px;display:flex;gap:10px;align-items:center" }, [preview, status])]) };
}

/* ORDERS */
var STATUS = [["new", "New"], ["in_production", "In production"], ["ready", "Ready"], ["fulfilled", "Fulfilled"]];
function viewOrders(n) {
  loading(n);
  api("GET", "orders").then(function (d) {
    clear(n);
    var filter = "open";
    var list = h("div");
    var orderType = function (o) { return o.fulfillment === "inperson" ? (o.cash ? "In person - " + (PAYLABEL[o.method] || "Cash") : "In person - Card") : o.fulfillment === "event" ? "Event pickup" : o.fulfillment === "pickup" ? "Pickup" : o.fulfillment === "digital" ? "Digital" : "Ship"; };
    var OCFG = { get: { date: function (o) { return o.created; }, amount: function (o) { return o.total; }, name: function (o) { return (o.name || o.email || "").toLowerCase(); } },
      dateOf: function (o) { return chiDate(o.created); }, typeOf: orderType };
    var tools = listTools({ sorts: [["date", "Date"], ["amount", "Amount"], ["name", "Name"]], types: ["Ship", "Digital", "Pickup", "Event pickup", "In person - Card", "In person - Cash", "In person - Cash App", "In person - Venmo", "In person - Tap to Pay"], dateOf: true }, function () { draw(); });
    function draw() {
      clear(list);
      var rows = d.orders.filter(function (o) { return filter === "all" || (filter === "open" ? o.status !== "fulfilled" : o.status === filter); });
      rows = applyTools(rows, tools.state, OCFG);
      if (!rows.length) list.appendChild(h("p", { "class": "muted", text: "No orders here." }));
      rows.forEach(function (o) {
        var sel = h("select", { "aria-label": "Order status", onchange: function () {
          api("POST", "order-status", { id: o.id, status: sel.value }).then(function () { o.status = sel.value; toast("Saved"); }).catch(function (er) { toast(er.message); });
        } }, STATUS.map(function (s) { return h("option", { value: s[0], selected: s[0] === o.status, text: s[1] }); }));
        var how = o.fulfillment === "inperson" ? h("span", { "class": "pill event", text: (o.cash ? "In person \\u00b7 " + (PAYLABEL[o.method] || "Cash") : "In person") + (o.event ? " \\u00b7 " + o.event : "") }) : o.fulfillment === "event" ? h("span", { "class": "pill event", text: "Event: " + o.event }) : o.fulfillment === "pickup" ? h("span", { "class": "pill pickup", text: "Pickup" }) : o.fulfillment === "digital" ? h("span", { "class": "pill pickup", text: "Digital (nothing to ship)" }) : h("span", { "class": "pill", text: "Ship" });
        list.appendChild(h("div", { "class": "card" }, [
          h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [
            h("strong", { text: o.name || o.email }), h("span", { "class": "muted", text: new Date(o.created).toLocaleString() + " \xB7 " + money(o.total) })]),
          h("p", null, [how]),
          h("ul", null, o.items.map(function (i) { return h("li", { text: i.qty + " x " + i.name }); })),
          h("p", { "class": "muted", text: [o.email, o.phone].filter(Boolean).join(" \xB7 ") }),
          o.address ? h("p", { "class": "muted", text: "Ship to: " + o.address }) : null,
          h("label", null, ["Status", sel]),
          o.refundUrl ? h("p", null, [h("a", { "class": "btn small", href: o.refundUrl, target: "_blank", rel: "noopener noreferrer", text: "Refund in Stripe" })]) : null,
          o.cash ? receiptControl(o) : null]));
      });
    }
    var chips = h("nav", { "class": "seg" }, [["open", "Open"], ["new", "New"], ["in_production", "In production"], ["ready", "Ready"], ["fulfilled", "Fulfilled"], ["all", "All"]].map(function (f) {
      return h("button", { "class": "tab", "aria-selected": String(f[0] === filter), onclick: function (e) {
        filter = f[0]; chips.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-selected", "false"); }); e.currentTarget.setAttribute("aria-selected", "true"); draw();
      }, text: f[1] });
    }));
    n.appendChild(chips); n.appendChild(tools.el); n.appendChild(list); n.appendChild(h("p", { "class": "muted", text: "Shows the most recent orders. Use Reports for full history." })); draw();
  }).catch(function (er) { failed(n, er); });
}

/* PRODUCTS */
var CATEGORIES = ["Jams", "Pickled goods", "Curriculum & Resources", "Books"];
function viewProducts(n) {
  loading(n);
  api("GET", "products").then(function (d) {
    clear(n);
    n.appendChild(h("p", { "class": "muted", text: "Leave Stock blank for unlimited. Changes show on the website within about a minute." }));
    n.appendChild(addProductCard(function () { viewProducts(n); }));
    var PCFG = { get: { name: function (p) { return p.name.toLowerCase(); }, price: function (p) { return p.sizes.length ? Math.min.apply(null, p.sizes.map(function (s) { return s.cents; })) : null; },
      stock: function (p) { return p.sizes.length ? p.sizes.reduce(function (t, s) { return t + (s.stock == null ? 100000 : s.stock); }, 0) : null; }, category: function (p) { return (p.category || "").toLowerCase(); }, order: function (p) { return p.sort; } },
      typeOf: function (p) { return p.category; }, textOf: function (p) { return p.name + " " + (p.category || "") + " " + p.sizes.map(function (s) { return s.label; }).join(" "); } };
    var ptools = listTools({ sorts: [["order", "Shop order"], ["name", "Name"], ["price", "Price"], ["stock", "Stock"], ["category", "Category"]], dir: "asc", types: CATEGORIES, typeLabel: "Category", search: "Search products by name" }, function () { draw(); });
    var plist = h("div");
    function draw() {
      clear(plist);
      var shown = applyTools(d.products, ptools.state, PCFG), byOrder = ptools.state.sort === "order" && !ptools.state.q;
      if (byOrder) plist.appendChild(h("p", { "class": "muted", text: "Shop order: use \\u25b2 \\u25bc on a product to move it. The shop shows products in this order when visitors pick \\u201cOur Order\\u201d, and inside each category tab." }));
      shown.forEach(function (p, i) {
        var move = byOrder ? function (dir) {
          var j = i + dir; if (j < 0 || j >= shown.length) return;
          var master = d.products.slice(), a = master.indexOf(shown[i]), b = master.indexOf(shown[j]);
          master[a] = shown[j]; master[b] = shown[i];
          api("POST", "products/order", { ids: master.map(function (x) { return x.id; }) }).then(function () { toast("Order saved"); viewProducts(n); }).catch(function (er) { toast(er.message); });
        } : null;
        var pc = productCard(p, function () { viewProducts(n); }, move, i, shown.length);
        pc.setAttribute("data-pid", p.id);
        if (byOrder) {
          var h3 = pc.firstChild && pc.firstChild.firstChild;
          if (h3) h3.insertBefore(h("span", { "class": "drag-handle", title: "Drag to reorder", "aria-hidden": "true", text: "\\u283f" }), h3.firstChild);
        }
        plist.appendChild(pc);
      });
      if (byOrder) enableDrag(plist, function (ids) {
        var byId = {}; shown.forEach(function (x) { byId[x.id] = x; });
        var slots = shown.map(function (x) { return d.products.indexOf(x); }).sort(function (a, b) { return a - b; });
        var master = d.products.slice();
        ids.forEach(function (id, k) { if (byId[id]) master[slots[k]] = byId[id]; });
        var out = master.map(function (x) { return x.id; });
        if (out.join() === d.products.map(function (x) { return x.id; }).join()) return;
        api("POST", "products/order", { ids: out }).then(function () { toast("Order saved"); viewProducts(n); }).catch(function (er) { toast(er.message); viewProducts(n); });
      });
      if (d.hidden.length && !ptools.state.type) {
        plist.appendChild(h("h2", { text: "Hidden Products" }));
        d.hidden.forEach(function (p) { plist.appendChild(productCard(p, function () { viewProducts(n); })); });
      }
    }
    n.appendChild(ptools.el); n.appendChild(plist); draw();
  }).catch(function (er) { failed(n, er); });
}
var OPTION_HINT = { "Curriculum & Resources": "Workbook, Teacher's guide, Set", "Books": "Paperback, Hardcover" };
// Drag a product up or down by its handle (works with a finger or a mouse).
function enableDrag(list, onDone) {
  list.addEventListener("pointerdown", function (e) {
    var hd = e.target.closest && e.target.closest(".drag-handle");
    if (!hd || e.button) return;
    var card = hd.closest(".card"); if (!card) return;
    e.preventDefault();
    var pid = e.pointerId; try { list.setPointerCapture(pid); } catch (er) {}
    card.classList.add("dragging");
    var move = function (ev) {
      var items = Array.prototype.filter.call(list.children, function (c) { return c !== card && c.getAttribute("data-pid"); });
      var before = null;
      for (var i = 0; i < items.length; i++) { var r = items[i].getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) { before = items[i]; break; } }
      var hiddenHead = list.querySelector("h2");
      if (before) list.insertBefore(card, before); else if (hiddenHead) list.insertBefore(card, hiddenHead); else list.appendChild(card);
      if (ev.clientY < 90) window.scrollBy(0, -16); else if (ev.clientY > window.innerHeight - 90) window.scrollBy(0, 16);
    };
    var up = function () {
      list.removeEventListener("pointermove", move); list.removeEventListener("pointerup", up); list.removeEventListener("pointercancel", up);
      try { list.releasePointerCapture(pid); } catch (er) {}
      card.classList.remove("dragging");
      onDone(Array.prototype.map.call(list.querySelectorAll(".card[data-pid]"), function (c) { return c.getAttribute("data-pid"); }));
    };
    list.addEventListener("pointermove", move); list.addEventListener("pointerup", up); list.addEventListener("pointercancel", up);
  });
}
function sizeRow(p, s, reload) {
  var nm = h("input", { value: s.label, "aria-label": "Size or option name", placeholder: OPTION_HINT[p.category] || "Regular or Large" });
  var price = h("input", { inputmode: "decimal", value: (s.cents / 100).toFixed(2), "aria-label": "Price" });
  var stock = h("input", { inputmode: "numeric", value: s.stock == null ? "" : String(s.stock), placeholder: "unlimited", "aria-label": "Stock" });
  var sold = h("input", { type: "checkbox", checked: s.soldOut });
  var b = h("button", { "class": "btn small primary", text: "Save", onclick: function () {
    b.disabled = true;
    var body = { stock: stock.value.trim() === "" ? null : stock.value.trim(), soldOut: sold.checked };
    if (nm.value.trim() !== s.label) body.label = nm.value;
    var steps = api("POST", "price/" + s.priceId, body);
    if (parseFloat(price.value) !== s.cents / 100) {
      steps = steps.then(function () { return api("POST", "price-change/" + s.priceId, { price: price.value }); });
    }
    steps.then(function () { toast("Saved"); reload(); }).catch(function (er) { toast(er.message); b.disabled = false; });
  } });
  return h("div", { "class": "row" }, [
    h("label", null, [p.category === "Jams" || p.category === "Pickled goods" ? "Size" : "Option", nm]), h("label", null, ["Price $", price]), h("label", null, ["Stock", stock]),
    h("label", { "class": "chk" }, [sold, "Sold out"]), b,
    h("button", { "class": "btn small danger", type: "button", text: "Remove", "aria-label": "Remove " + s.label, onclick: function () {
      if (!window.confirm("Remove \\u201c" + s.label + "\\u201d from " + p.name + "? It disappears from the shop. Past orders are not affected.")) return;
      api("POST", "price-remove/" + s.priceId, {}).then(function () { toast("Removed"); reload(); }).catch(function (er) { toast(er.message); });
    } })]);
}
function productCard(p, reload, move, idx, total) {
  var card = h("div", { "class": "card" });
  card.appendChild(h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center" }, [
    h("h3", { text: p.name + (p.active ? "" : " (hidden)") + (p.featured ? " \\u2605" : "") }),
    h("div", null, (move ? [
      h("button", { "class": "btn small", type: "button", "aria-label": "Move " + p.name + " up", text: "\\u25b2", disabled: idx === 0, onclick: function () { move(-1); } }), " ",
      h("button", { "class": "btn small", type: "button", "aria-label": "Move " + p.name + " down", text: "\\u25bc", disabled: idx === total - 1, onclick: function () { move(1); } }), " "] : []).concat([
      h("button", { "class": "btn small", "aria-pressed": String(!!p.featured), text: p.featured ? "\\u2605 Featured" : "\\u2606 Feature", title: "Featured products show first in the shop", onclick: function () {
        api("POST", "product/" + p.id, { featured: !p.featured }).then(function () { toast(p.featured ? "No longer featured" : "Featured"); reload(); }).catch(function (er) { toast(er.message); });
      } }), " ",
      h("button", { "class": "btn small", onclick: function () { details.classList.toggle("hide"); }, text: "Edit details" }), " ",
      h("button", { "class": "btn small" + (p.active ? " danger" : ""), text: p.active ? "Hide from shop" : "Show in shop", onclick: function () {
        api("POST", "product/" + p.id, { active: !p.active }).then(function () { toast("Saved"); reload(); }).catch(function (er) { toast(er.message); });
      } })]))]));
  var name = h("input", { value: p.name }), desc = h("textarea", { rows: "3", text: p.description }), pick = photoPicker(p.image);
  var cat = h("select", null, CATEGORIES.map(function (c) { return h("option", { value: c, selected: c === p.category, text: c }); }));
  var dig = h("input", { type: "checkbox", checked: !!p.digital });
  var buy = h("input", { value: p.buyUrl || "", placeholder: "https://www.amazon.com/dp/...", inputmode: "url", autocapitalize: "off" });
  var details = h("div", { "class": "hide" }, [
    h("label", null, ["Name", name]), h("label", null, ["Category", cat]), h("label", { "class": "chk" }, [dig, "Digital item (nothing ships, no shipping fee)"]), h("label", null, ["Description", desc]), h("label", null, ["Outside buy link (optional)", buy]), h("p", { "class": "muted", text: "Add an Amazon link and the website shows a Buy on Amazon button instead of Add to Cart. The item stays here, so you can still sell it at events." }), pick.node,
    h("p"), h("button", { "class": "btn small primary", text: "Save details", onclick: function () {
      var body = { name: name.value, description: desc.value, category: cat.value, digital: dig.checked, buyUrl: buy.value }; if (pick.holder.url && pick.holder.url !== p.image) body.image = pick.holder.url;
      api("POST", "product/" + p.id, body).then(function () { toast("Saved"); reload(); }).catch(function (er) { toast(er.message); });
    } })]);
  card.appendChild(details);
  var sizes = h("div", { "class": "sizes" }, p.sizes.map(function (s) { return sizeRow(p, s, reload); }));
  card.appendChild(sizes);
  var l = h("input", { placeholder: OPTION_HINT[p.category] || "Regular or Large" }), pr = h("input", { inputmode: "decimal", placeholder: "10.00" }), st = h("input", { inputmode: "numeric", placeholder: "unlimited" });
  card.appendChild(h("div", { "class": "row", style: "margin-top:8px" }, [h("label", null, [p.category === "Jams" || p.category === "Pickled goods" ? "New size" : "New option", l]), h("label", null, ["Price $", pr]), h("label", null, ["Stock", st]),
    h("button", { "class": "btn small", text: "Add size", onclick: function () {
      api("POST", "size/" + p.id, { label: l.value, price: pr.value, stock: st.value.trim() === "" ? null : st.value.trim() }).then(function () { toast("Added"); reload(); }).catch(function (er) { toast(er.message); });
    } })]));
  return card;
}
function addProductCard(reload) {
  var name = h("input"), desc = h("textarea", { rows: "2" }), pick = photoPicker("");
  var cat = h("select", null, CATEGORIES.map(function (c) { return h("option", { value: c, text: c }); }));
  var rows = [0, 1, 2].map(function (i) { return { l: h("input", { placeholder: i ? (i === 1 ? "Large" : "") : "Regular, or Download / Book" }), p: h("input", { inputmode: "decimal", placeholder: i ? "" : "7.00" }), s: h("input", { inputmode: "numeric", placeholder: "unlimited" }) }; });
  var dig = h("input", { type: "checkbox" });
  var box = h("div", { "class": "hide" }, [
    h("label", null, ["Product name", name]), h("label", null, ["Category", cat]), h("label", { "class": "chk" }, [dig, "Digital item (nothing ships, no shipping fee)"]), h("label", null, ["Description", desc]), pick.node,
    h("p", { "class": "muted", text: "Sizes or options (fill one, two or three rows)" })].concat(rows.map(function (r) {
      return h("div", { "class": "row" }, [h("label", null, ["Size", r.l]), h("label", null, ["Price $", r.p]), h("label", null, ["Stock", r.s])]);
    })).concat([h("p"), h("button", { "class": "btn primary", text: "Add product", onclick: function () {
      var sizes = rows.filter(function (r) { return r.l.value.trim() || r.p.value.trim(); }).map(function (r) { return { label: r.l.value, price: r.p.value, stock: r.s.value.trim() === "" ? null : r.s.value.trim() }; });
      api("POST", "product", { name: name.value, category: cat.value, digital: dig.checked, description: desc.value, image: pick.holder.url, sizes: sizes }).then(function () { toast("Product added"); reload(); }).catch(function (er) { toast(er.message); });
    } })]));
  return h("div", { "class": "card" }, [h("button", { "class": "btn primary", text: "+ Add a new product", onclick: function () { box.classList.toggle("hide"); } }), box]);
}

/* EVENTS */

/* CLASSES: dates people can book and pay for online */
var CLASS_TYPES = [["jam", "Jam making & STEM lab", "55.00"], ["combined", "Jam making & etiquette", "85.00"], ["other", "Other class", "55.00"]];
function fmtDay(d) { if (!d) return ""; var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }); }
function fmtTime(t) { if (!t) return ""; var p = t.split(":"), x = +p[0]; return (x % 12 || 12) + ":" + p[1] + (x >= 12 ? " PM" : " AM"); }
function viewClasses(n) {
  loading(n);
  api("GET", "classes").then(function (d) {
    clear(n);
    var classes = d.classes;
    var list = h("div"), msg = h("p", { "class": "msg", role: "status" });
    var CCFG = { get: { date: function (c) { return c.date ? c.date + (c.time || "") : null; }, price: function (c) { return parseFloat(c.price) || 0; }, booked: function (c) { return c.booked || 0; }, name: function (c) { return (c.title || "").toLowerCase(); } },
      dateOf: function (c) { return c.date; }, typeOf: function (c) { return (CLASS_TYPES.filter(function (t) { return t[0] === c.type; })[0] || ["", "Class"])[1]; } };
    var ctools = listTools({ sorts: [["date", "Date"], ["price", "Price"], ["booked", "Spots booked"], ["name", "Name"]], dir: "asc", types: CLASS_TYPES.map(function (t) { return t[1]; }), typeLabel: "Class type", dateOf: true }, function () { draw(); });
    function draw() {
      clear(list);
      applyTools(classes.slice(), ctools.state, CCFG).forEach(function (c) {
        var i = classes.indexOf(c);
        var f = function (k, type, label, extra) { var inp = h("input", Object.assign({ type: type, value: c[k] == null ? "" : c[k] }, extra || {})); inp.addEventListener("input", function () { c[k] = inp.value; }); return h("label", null, [label, inp]); };
        var typeSel = h("select", null, CLASS_TYPES.map(function (t) { return h("option", { value: t[0], text: t[1], selected: t[0] === c.type }); }));
        typeSel.addEventListener("change", function () { var was = c.type; c.type = typeSel.value; var t = CLASS_TYPES.filter(function (x) { return x[0] === c.type; })[0]; if (!c.price || CLASS_TYPES.some(function (x) { return x[0] === was && x[2] === c.price; })) { c.price = t[2]; draw(); } });
        var show = h("input", { type: "checkbox", checked: c.show !== false }); show.addEventListener("change", function () { c.show = show.checked; });
        var status = c.id && typeof c.booked === "number" ? c.booked + " of " + c.seats + " spots booked" : "New class";
        list.appendChild(h("div", { "class": "card" }, [
          h("div", { "class": "row" }, [f("title", "text", "Class name (shown on the site)"), h("label", null, ["Type", typeSel])]),
          h("div", { "class": "row", style: "margin-top:10px" }, [f("date", "date", "Date"), f("time", "time", "Start time"), f("minutes", "number", "Length (minutes)", { min: 15, max: 720 }), f("seats", "number", "Seats", { min: 1, max: 200 }), f("price", "number", "Price per person ($)", { min: 1, step: "0.01" })]),
          h("div", { "class": "row", style: "margin-top:10px" }, [f("location", "text", "Place"), f("notes", "text", "Note for customers (optional)")]),
          h("div", { style: "display:flex;justify-content:space-between;align-items:center;margin-top:10px;gap:8px;flex-wrap:wrap" }, [
            h("span", { "class": "pill", text: status }), h("label", { "class": "chk" }, [show, "Show on site"]),
            h("button", { "class": "btn small danger", text: "Delete", onclick: function () { if (c.booked > 0 && !window.confirm("This class already has bookings. Deleting it hides it from the site; the bookings stay in the Bookings tab. Delete anyway?")) return; classes.splice(i, 1); draw(); } })])]));
      });
      if (!classes.length) list.appendChild(h("p", { "class": "muted", text: "No class dates yet. Click Add class date." }));
    }
    n.appendChild(h("p", { "class": "muted", text: "Each date appears on the Classes page with a Book & pay button until the date passes or the seats run out. After someone pays, they get a receipt and a calendar invite." }));
    n.appendChild(ctools.el);
    n.appendChild(list);
    n.appendChild(h("div", { "class": "row" }, [
      h("button", { "class": "btn", text: "+ Add class date", onclick: function () { var t = CLASS_TYPES[0]; classes.push({ title: t[1], type: t[0], date: "", time: "14:00", minutes: 120, seats: 10, price: t[2], location: "", notes: "", show: true }); draw(); } }),
      h("button", { "class": "btn primary", text: "Save classes", onclick: function () {
        msg.className = "msg"; msg.textContent = "Saving...";
        api("PUT", "classes", { classes: classes }).then(function (r) { classes = r.classes; draw(); msg.className = "msg ok"; msg.textContent = "Saved. The Classes page is updated."; }).catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
      } })]));
    n.appendChild(msg);
    draw();
  }).catch(function (er) { failed(n, er); });
}

/* BOOKINGS: who paid for a spot in a class */
function viewBookings(n) {
  loading(n);
  api("GET", "bookings").then(function (d) {
    clear(n);
    var all = d.bookings, filter = "";
    var pick = h("select", { "aria-label": "Filter by class" });
    var seen = {};
    pick.appendChild(h("option", { value: "", text: "All classes" }));
    all.forEach(function (b) { if (b.cls && !seen[b.classId]) { seen[b.classId] = 1; pick.appendChild(h("option", { value: b.classId, text: b.cls.title + " - " + fmtDay(b.cls.date) })); } });
    var list = h("div");
    var BCFG = { get: { date: function (b) { return b.ts; }, amount: function (b) { return b.cents; }, classdate: function (b) { return b.cls ? b.cls.date : null; }, name: function (b) { return (b.name || "").toLowerCase(); } },
      dateOf: function (b) { return chiDate(b.ts); } };
    var btools = listTools({ sorts: [["date", "Date booked"], ["amount", "Amount"], ["classdate", "Class date"], ["name", "Name"]], dateOf: true }, function () { draw(); });
    function draw() {
      clear(list);
      var rows = applyTools(all.filter(function (b) { return !filter || b.classId === filter; }), btools.state, BCFG);
      var seats = rows.reduce(function (t, b) { return t + (b.seats || 0); }, 0);
      list.appendChild(h("p", { "class": "muted", text: rows.length + " booking" + (rows.length === 1 ? "" : "s") + ", " + seats + " spot" + (seats === 1 ? "" : "s") + " reserved" }));
      rows.forEach(function (b) {
        list.appendChild(h("div", { "class": "card" }, [
          h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [h("strong", { text: b.name || "(no name)" }), h("span", { "class": "pill", text: b.seats + (b.seats === 1 ? " spot" : " spots") + " \\u00b7 $" + (b.cents / 100).toFixed(2) })]),
          h("div", { "class": "muted", text: b.cls ? b.cls.title + " \\u00b7 " + fmtDay(b.cls.date) + " " + fmtTime(b.cls.time) : "Class removed" }),
          h("div", null, [b.email ? h("a", { href: "mailto:" + b.email, text: b.email }) : "", b.phone ? h("span", { text: "  \\u00b7  " }) : "", b.phone ? h("a", { href: "tel:" + b.phone, text: b.phone }) : ""]),
          h("div", { "class": "muted", text: "Booked " + new Date(b.ts).toLocaleString() })]));
      });
      if (!rows.length) list.appendChild(h("p", { "class": "muted", text: "No bookings yet." }));
    }
    pick.addEventListener("change", function () { filter = pick.value; draw(); });
    n.appendChild(h("p", { "class": "muted", text: "These are people who paid online to join one of your hosted classes (like jam making). Each booking shows how many spots they reserved, which counts against the class size you set on the Classes tab. Nothing to do here unless you want to contact someone." }));
    n.appendChild(h("label", null, ["Show", pick]));
    n.appendChild(btools.el);
    n.appendChild(list);
    n.appendChild(h("p", { "class": "muted", text: "Refunds are done in your Stripe dashboard (Payments)." }));
    draw();
  }).catch(function (er) { failed(n, er); });
}


/* REQUESTS: private group / event quote requests from the website (draft quotes in Stripe) */
function viewRequests(n) {
  loading(n);
  api("GET", "requests").then(function (d) {
    clear(n);
    var all = d.requests, filter = "pending";
    var FILTERS = [["pending", "Pending"], ["approved", "Approved"], ["done", "Done"]];
    var group = function (s) { return s === "draft" ? "pending" : s === "open" ? "approved" : "done"; };
    var label = { draft: "Pending your approval", open: "Approved - send it from Stripe", accepted: "Accepted by customer", canceled: "Declined", stale: "Expired" };
    var tabsEl = h("div", { "class": "seg" });
    var list = h("div"), msg = h("p", { "class": "msg", role: "status" });
    var RCFG = { get: { date: function (r) { return r.created; }, amount: function (r) { return r.total; }, wanted: function (r) { return r.date || null; }, name: function (r) { return (r.name || r.email || "").toLowerCase(); } },
      dateOf: function (r) { return chiDate(r.created); }, typeOf: function (r) { return r.cls; } };
    var rtools = listTools({ sorts: [["date", "Date sent"], ["amount", "Estimate"], ["wanted", "Wanted date"], ["name", "Name"]], types: uniq(all.map(function (r) { return r.cls; })), typeLabel: "Class", dateOf: true }, function () { draw(); });
    function draw() {
      clear(tabsEl); clear(list);
      FILTERS.forEach(function (f) {
        var count = all.filter(function (r) { return group(r.status) === f[0]; }).length;
        tabsEl.appendChild(h("button", { "class": "tab", "aria-selected": String(f[0] === filter), text: f[1] + " (" + count + ")", onclick: function () { filter = f[0]; draw(); } }));
      });
      var rows = applyTools(all.filter(function (r) { return group(r.status) === filter; }), rtools.state, RCFG);
      rows.forEach(function (r) {
        var actions = [h("a", { "class": "btn small", href: r.url, target: "_blank", rel: "noopener noreferrer", text: "Open quote in Stripe" })];
        if (r.status === "draft") {
          actions.push(h("button", { "class": "btn small primary", text: "Approve", onclick: function () { act(r, "approve"); } }));
          actions.push(h("button", { "class": "btn small danger", text: "Decline", onclick: function () { if (window.confirm("Decline this request? The quote is cancelled in Stripe.")) act(r, "decline"); } }));
        }
        list.appendChild(h("div", { "class": "card" }, [
          h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [h("strong", { text: r.name || r.email || "(no name)" }), h("span", { "class": "pill", text: label[r.status] || r.status })]),
          h("div", { text: r.cls + (r.attendees ? " \\u00b7 " + r.attendees + (r.wholesale ? " jars" : " people") : "") + (r.taxId ? " \\u00b7 Tax ID " + r.taxId : "") }),
          h("div", { "class": "muted", text: (r.date ? "Wanted: " + fmtDay(r.date) + "  \\u00b7  " : "") + (r.wholesale ? "Wholesale quote $" : "Estimate $") + (r.total / 100).toFixed(2) + "  \\u00b7  Sent " + new Date(r.created).toLocaleDateString() }),
          h("div", null, [r.email ? h("a", { href: "mailto:" + r.email, text: r.email }) : "", r.phone ? h("span", { text: "  \\u00b7  " }) : "", r.phone ? h("a", { href: "tel:" + r.phone, text: r.phone }) : ""]),
          r.notes ? h("p", { style: "margin:8px 0", text: "Notes: " + r.notes }) : null,
          h("div", { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:10px" }, actions)]));
      });
      if (!rows.length) list.appendChild(h("p", { "class": "muted", text: filter === "pending" ? "Nothing waiting. New class and wholesale requests appear here." : "Nothing here yet." }));
    }
    function act(r, action) {
      msg.className = "msg"; msg.textContent = "Working...";
      api("POST", "request-action", { id: r.id, action: action }).then(function (x) {
        r.status = x.status; draw(); msg.className = "msg ok";
        msg.textContent = action === "approve" ? "Approved. Open the quote in Stripe to adjust it and send it to the customer." : "Declined.";
      }).catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
    }
    n.appendChild(h("p", { "class": "muted", text: "Private group and event requests and wholesale orders become draft quotes in Stripe. Wholesale quotes are priced at $2.00 off each jar. Class prices are only an estimate: open the quote in Stripe to change the price, then Approve here and send it from Stripe." }));
    n.appendChild(tabsEl); n.appendChild(rtools.el); n.appendChild(list); n.appendChild(msg);
    draw();
  }).catch(function (er) { failed(n, er); });
}


/* Compact QR Code encoder: byte mode, error correction M, versions 1-10. Returns a boolean matrix. */
function qrMatrix(text) {
  var bytes = Array.prototype.slice.call(new TextEncoder().encode(text));
  var EPB = [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26], NB = [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5];
  function raw(v) { var r = (16 * v + 128) * v + 64; if (v >= 2) { var a = Math.floor(v / 7) + 2; r -= (25 * a - 10) * a - 55; if (v >= 7) r -= 36; } return r; }
  function dataCw(v) { return Math.floor(raw(v) / 8) - EPB[v] * NB[v]; }
  var ver = 1;
  for (; ver <= 10; ver++) { var cc = ver < 10 ? 8 : 16; if (4 + cc + bytes.length * 8 <= dataCw(ver) * 8) break; }
  if (ver > 10) throw new Error("QR text too long");
  var bits = [];
  function put(val, n) { for (var i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); }
  put(4, 4); put(bytes.length, ver < 10 ? 8 : 16); bytes.forEach(function (b) { put(b, 8); });
  var cap = dataCw(ver) * 8;
  put(0, Math.min(4, cap - bits.length)); while (bits.length % 8) bits.push(0);
  for (var pad = 0xEC; bits.length < cap; pad ^= 0xEC ^ 0x11) put(pad, 8);
  var data = []; for (var i = 0; i < bits.length; i += 8) { var x = 0; for (var j = 0; j < 8; j++) x = (x << 1) | bits[i + j]; data.push(x); }
  function mul(x, y) { var z = 0; for (var i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; } return z; }
  function divisor(deg) { var r = []; for (var i = 0; i < deg - 1; i++) r.push(0); r.push(1); var root = 1; for (i = 0; i < deg; i++) { for (var j = 0; j < r.length; j++) { r[j] = mul(r[j], root); if (j + 1 < r.length) r[j] ^= r[j + 1]; } root = mul(root, 2); } return r; }
  function remainder(d, div) { var r = div.map(function () { return 0; }); d.forEach(function (b) { var f = b ^ r.shift(); r.push(0); div.forEach(function (c, i) { r[i] ^= mul(c, f); }); }); return r; }
  var nb = NB[ver], eccLen = EPB[ver], rawCw = Math.floor(raw(ver) / 8), nShort = nb - rawCw % nb, shortLen = Math.floor(rawCw / nb), blocks = [], div = divisor(eccLen);
  var kk = 0;
  for (i = 0; i < nb; i++) { var dat = data.slice(kk, kk + shortLen - eccLen + (i < nShort ? 0 : 1)); kk += dat.length; var ecc = remainder(dat, div); if (i < nShort) dat.push(0); blocks.push(dat.concat(ecc)); }
  var all = [];
  for (i = 0; i < blocks[0].length; i++) blocks.forEach(function (b, j) { if (i !== shortLen - eccLen || j >= nShort) all.push(b[i]); });
  var size = ver * 4 + 17, m = [], fn = [];
  for (i = 0; i < size; i++) { m.push(new Array(size).fill(false)); fn.push(new Array(size).fill(false)); }
  function setF(x, y, d) { m[y][x] = d; fn[y][x] = true; }
  function bit(v, i) { return ((v >>> i) & 1) !== 0; }
  for (i = 0; i < size; i++) { setF(6, i, i % 2 === 0); setF(i, 6, i % 2 === 0); }
  function finder(cx, cy) { for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) { var d = Math.max(Math.abs(dx), Math.abs(dy)), xx = cx + dx, yy = cy + dy; if (xx >= 0 && xx < size && yy >= 0 && yy < size) setF(xx, yy, d !== 2 && d !== 4); } }
  finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
  var pos = []; if (ver > 1) { var na = Math.floor(ver / 7) + 2, step = Math.ceil((ver * 4 + 4) / (na * 2 - 2)) * 2; pos = [6]; for (var p = size - 7; pos.length < na; p -= step) pos.splice(1, 0, p); }
  pos.forEach(function (a, ia) { pos.forEach(function (b, ib) { if ((ia === 0 && ib === 0) || (ia === 0 && ib === pos.length - 1) || (ia === pos.length - 1 && ib === 0)) return; for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) setF(a + dx, b + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }); });
  function fmt(mask) {
    var d = mask, r = d; for (var i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
    var b = ((d << 10) | r) ^ 0x5412;
    for (i = 0; i <= 5; i++) setF(8, i, bit(b, i)); setF(8, 7, bit(b, 6)); setF(8, 8, bit(b, 7)); setF(7, 8, bit(b, 8));
    for (i = 9; i < 15; i++) setF(14 - i, 8, bit(b, i));
    for (i = 0; i < 8; i++) setF(size - 1 - i, 8, bit(b, i));
    for (i = 8; i < 15; i++) setF(8, size - 15 + i, bit(b, i));
    setF(8, size - 8, true);
  }
  fmt(0);
  if (ver >= 7) { var rr = ver; for (i = 0; i < 12; i++) rr = (rr << 1) ^ ((rr >>> 11) * 0x1F25); var vb = (ver << 12) | rr; for (i = 0; i < 18; i++) { var a = size - 11 + i % 3, b2 = Math.floor(i / 3); setF(a, b2, bit(vb, i)); setF(b2, a, bit(vb, i)); } }
  var n = 0;
  for (var right = size - 1; right >= 1; right -= 2) { if (right === 6) right = 5; for (var vert = 0; vert < size; vert++) for (var j = 0; j < 2; j++) { var x2 = right - j, up = ((right + 1) & 2) === 0, y2 = up ? size - 1 - vert : vert; if (!fn[y2][x2] && n < all.length * 8) { m[y2][x2] = bit(all[n >>> 3], 7 - (n & 7)); n++; } } }
  function applyMask(mask) { for (var y = 0; y < size; y++) for (var x = 0; x < size; x++) { var inv; switch (mask) { case 0: inv = (x + y) % 2 === 0; break; case 1: inv = y % 2 === 0; break; case 2: inv = x % 3 === 0; break; case 3: inv = (x + y) % 3 === 0; break; case 4: inv = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break; case 5: inv = x * y % 2 + x * y % 3 === 0; break; case 6: inv = (x * y % 2 + x * y % 3) % 2 === 0; break; default: inv = ((x + y) % 2 + x * y % 3) % 2 === 0; } if (!fn[y][x] && inv) m[y][x] = !m[y][x]; } }
  function penalty() {
    var s = 0, y, x, i, dark = 0;
    function line(get) { var run = 1, prev = get(0); for (var i = 1; i < size; i++) { var c = get(i); if (c === prev) { run++; if (run === 5) s += 3; else if (run > 5) s++; } else { run = 1; prev = c; } } }
    for (y = 0; y < size; y++) line(function (i) { return m[y][i]; });
    for (x = 0; x < size; x++) line(function (i) { return m[i][x]; });
    for (y = 0; y < size - 1; y++) for (x = 0; x < size - 1; x++) { var c = m[y][x]; if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) s += 3; }
    var A = "10111010000", B = "00001011101";
    function pat(str) { if (str === A || str === B) s += 40; }
    for (y = 0; y < size; y++) for (x = 0; x + 11 <= size; x++) { var rs = "", cs = ""; for (i = 0; i < 11; i++) { rs += m[y][x + i] ? 1 : 0; cs += m[x + i][y] ? 1 : 0; } pat(rs); pat(cs); }
    for (y = 0; y < size; y++) for (x = 0; x < size; x++) if (m[y][x]) dark++;
    var total = size * size; s += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
    return s;
  }
  var best = 0, bestPen = 1e9;
  for (var mk = 0; mk < 8; mk++) { applyMask(mk); fmt(mk); var pn = penalty(); if (pn < bestPen) { bestPen = pn; best = mk; } applyMask(mk); }
  applyMask(best); fmt(best);
  return m;
}
function qrSvg(text, px) {
  var m = qrMatrix(text), q = 4, n = m.length + q * 2, d = "";
  for (var y = 0; y < m.length; y++) for (var x = 0; x < m.length; x++) if (m[y][x]) d += "M" + (x + q) + " " + (y + q) + "h1v1h-1z";
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + n + " " + n + '" width="' + px + '" height="' + px + '" shape-rendering="crispEdges" role="img" aria-label="QR code to pay on your phone"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
}

/* Email (or re-send) a cash receipt; lets staff fix a mistyped address. */
function receiptControl(sale) {
  var wrap = h("div"), msg = h("p", { "class": "msg", role: "status" });
  var email = h("input", { type: "email", value: sale.email || "", placeholder: "customer@example.com", autocomplete: "off", "aria-label": "Receipt email" });
  var box = h("div", { "class": "hide" }, [h("label", null, ["Email for the receipt", email]), h("p"),
    h("button", { "class": "btn small primary", text: "Send receipt", onclick: function (e) {
      var b = e.currentTarget; b.disabled = true; msg.className = "msg"; msg.textContent = "Sending...";
      api("POST", "cash-receipt", { id: sale.id, email: email.value }).then(function (r) {
        sale.email = r.email; b.disabled = false;
        msg.className = r.emailed ? "msg ok" : "msg err";
        msg.textContent = r.emailed ? "Receipt sent to " + r.email + "." : "The address was saved, but the email did not send. Check that the Apps Script has the latest version deployed.";
      }).catch(function (er) { b.disabled = false; msg.className = "msg err"; msg.textContent = er.message; });
    } })]);
  wrap.appendChild(h("button", { "class": "btn small", text: sale.email ? "Edit email / resend receipt" : "Email a receipt", onclick: function () { box.classList.toggle("hide"); } }));
  wrap.appendChild(box); wrap.appendChild(msg);
  return wrap;
}

/* CASH LEDGER */
function viewLedger(n) {
  loading(n);
  api("GET", "cash-ledger").then(function (d) {
    clear(n);
    var all = d.sales, list = h("div"), totals = h("div", { "class": "totals" }), msg = h("p", { "class": "msg", role: "status" });
    var CFG = { get: { date: function (s) { return s.ts; }, amount: function (s) { return s.total; }, location: function (s) { return (s.location || "").toLowerCase(); }, name: function (s) { return (s.name || "").toLowerCase(); } },
      dateOf: function (s) { return chiDate(s.ts); }, typeOf: function (s) { return s.location; } };
    var tools = listTools({ sorts: [["date", "Date"], ["amount", "Amount"], ["location", "Location"], ["name", "Customer"]], types: uniq(all.map(function (s) { return s.location; })), typeLabel: "Location", dateOf: true }, function () { draw(); });
    var shown = [];
    function draw() {
      clear(list); clear(totals);
      shown = applyTools(all, tools.state, CFG);
      var live = shown.filter(function (s) { return !s.voided; });
      var sum = function (k) { return live.reduce(function (t, s) { return t + (s[k] || 0); }, 0); };
      [["Sales", String(live.length)], ["Subtotal", money(sum("subtotal"))], ["Tax", money(sum("tax"))], ["Total collected", money(sum("total"))]].forEach(function (x) {
        totals.appendChild(h("div", { "class": "card" }, [h("span", { "class": "muted", text: x[0] }), h("b", { text: x[1] })]));
      });
      if (!shown.length) list.appendChild(h("p", { "class": "muted", text: "No sales match." }));
      shown.forEach(function (s) {
        var head = [h("b", { text: money(s.total) }), " ", h("span", { "class": "pill", text: s.location || "No location" }), " ", h("span", { "class": "pill pickup", text: PAYLABEL[s.method] || "Cash" })];
        if (s.voided) head.push(" ", h("span", { "class": "pill void", text: "Voided" }));
        var kids = [h("div", null, head),
          h("div", { "class": "muted", text: new Date(s.ts).toLocaleDateString("en-US", { timeZone: "America/Chicago", month: "short", day: "numeric", year: "numeric" }) + " " + timeOf(s.ts) + (s.name ? " \\u00b7 " + s.name : "") + (s.email ? " \\u00b7 " + s.email : "") }),
          h("div", { text: s.items.map(function (x) { return x.qty + " \\u00d7 " + x.name + (x.size ? " (" + x.size + ")" : ""); }).join(", ") }),
          h("div", { "class": "muted", text: "Subtotal " + money(s.subtotal) + (s.tax ? " \\u00b7 Tax " + money(s.tax) : "") })];
        if (!s.voided) kids.push(receiptControl(s));
        if (!s.voided) kids.push(h("button", { "class": "btn small", text: "Void this sale", onclick: function () {
          if (!confirm("Void this sale? Stock goes back up." + (s.method && s.method !== "cash" ? " The money is NOT sent back: refund the customer in " + (PAYLABEL[s.method] || "the payment app") + " too." : " Use this for a mistake or a return."))) return;
          api("POST", "cash-void", { id: s.id }).then(function () { s.voided = true; draw(); }).catch(function (e) { msg.className = "msg err"; msg.textContent = e.message; });
        } }));
        list.appendChild(h("div", { "class": "card" }, kids));
      });
    }
    n.appendChild(h("h2", { text: "In-Person Ledger" }));
    n.appendChild(h("p", { "class": "muted", text: "Every cash, Cash App, Venmo and Tap to Pay sale recorded in the Event Sale screen. Voiding a sale puts stock back; it does not refund anyone." }));
    n.appendChild(tools.el); n.appendChild(totals);
    n.appendChild(h("button", { "class": "btn", text: "Download CSV", onclick: function () {
      csvDownload("ledger.csv", ["Date", "Time", "Paid with", "Location", "Customer", "Email", "Items", "Subtotal", "Tax", "Total", "Voided"], shown.map(function (s) {
        return [chiDate(s.ts), timeOf(s.ts), PAYLABEL[s.method] || "Cash", s.location, s.name, s.email, s.items.map(function (x) { return x.qty + " x " + x.name + (x.size ? " (" + x.size + ")" : ""); }).join("; "), dollars(s.subtotal), dollars(s.tax), dollars(s.total), s.voided ? "yes" : ""];
      }));
    } }));
    n.appendChild(list); n.appendChild(msg); draw();
  }).catch(function (e) { failed(n, e); });
}

/* REPORTS */
function viewReports(n) {
  var today = chiDate(Date.now()), y = today.slice(0, 4), m = today.slice(0, 7);
  function monthEnd(ym) { var p = ym.split("-"); return new Date(Date.UTC(+p[0], +p[1], 0)).toISOString().slice(0, 10); }
  var lm = (function () { var p = m.split("-"); var d = new Date(Date.UTC(+p[0], +p[1] - 2, 1)); return d.toISOString().slice(0, 7); })();
  var from = h("input", { type: "date", value: m + "-01" }), to = h("input", { type: "date", value: today });
  var out = h("div"), msg = h("p", { "class": "msg", role: "status" }), rows = [];
  function preset(label, a, b) { return h("button", { "class": "btn small", type: "button", text: label, onclick: function () { from.value = a; to.value = b; run(); } }); }
  n.appendChild(h("h2", { text: "Reports" }));
  n.appendChild(h("p", { "class": "muted", text: "Sales across the website, event card payments, cash and class bookings. Refunds are not subtracted, so check Stripe for refunds." }));
  n.appendChild(h("div", { "class": "row", style: "flex-wrap:wrap" }, [preset("This month", m + "-01", today), preset("Last month", lm + "-01", monthEnd(lm)), preset("Year to date", y + "-01-01", today)]));
  n.appendChild(h("div", { "class": "tools" }, [h("label", null, ["From", from]), h("label", null, ["To", to]), h("button", { "class": "btn primary", text: "Run report", onclick: run })]));
  n.appendChild(msg); n.appendChild(out);
  function group(key) {
    var g = {};
    rows.forEach(function (r) { if (r.status === "voided") return; var k = r[key] || "(none)"; var x = g[k] || (g[k] = { n: 0, sub: 0, ship: 0, tax: 0, total: 0 }); x.n++; x.sub += r.subtotal; x.ship += r.shipping; x.tax += r.tax; x.total += r.total; });
    return g;
  }
  function table(title, g) {
    var keys = Object.keys(g).sort(function (a, b) { return g[b].total - g[a].total; });
    if (!keys.length) return h("p", { "class": "muted", text: "No sales in this range." });
    var t = h("table", { "class": "rep" }, [h("tr", null, [title, "Sales", "Subtotal", "Shipping", "Tax", "Total"].map(function (x) { return h("th", { text: x }); }))]);
    var tot = { n: 0, sub: 0, ship: 0, tax: 0, total: 0 };
    keys.forEach(function (k) { var x = g[k]; ["n", "sub", "ship", "tax", "total"].forEach(function (f) { tot[f] += x[f]; });
      t.appendChild(h("tr", null, [k, String(x.n), money(x.sub), money(x.ship), money(x.tax), money(x.total)].map(function (v) { return h("td", { text: v }); }))); });
    t.appendChild(h("tr", null, ["All", String(tot.n), money(tot.sub), money(tot.ship), money(tot.tax), money(tot.total)].map(function (v) { return h("td", { style: "font-weight:700", text: v }); })));
    return t;
  }
  function run() {
    if (!from.value || !to.value || from.value > to.value) { msg.className = "msg err"; msg.textContent = "Choose a start date that is on or before the end date."; return; }
    msg.className = "msg"; msg.textContent = "Building report..."; clear(out);
    api("GET", "report?from=" + from.value + "&to=" + to.value).then(function (d) {
      rows = d.rows; msg.textContent = d.truncated ? "This range is very large, so older orders may be missing. Try a shorter range." : "";
      if (d.truncated) msg.className = "msg err";
      var live = rows.filter(function (r) { return r.status !== "voided"; });
      var sum = live.reduce(function (t, r) { return t + r.total; }, 0);
      out.appendChild(h("div", { "class": "totals" }, [["Transactions", String(live.length)], ["Total sales", money(sum)]].map(function (x) { return h("div", { "class": "card" }, [h("span", { "class": "muted", text: x[0] }), h("b", { text: x[1] })]); })));
      out.appendChild(h("h3", { text: "By Type" })); out.appendChild(table("Type", group("channel")));
      out.appendChild(h("h3", { text: "By Location / Event" })); out.appendChild(table("Location", group("location")));
      out.appendChild(h("h3", { text: "Download" }));
      var dl = function (label, fn) { return h("button", { "class": "btn", text: label, onclick: fn }); };
      var span = from.value + "_to_" + to.value;
      var mailMsg = h("p", { "class": "msg", role: "status" });
      out.appendChild(h("div", { "class": "row", style: "flex-wrap:wrap" }, [h("button", { "class": "btn primary", text: "Email this report to me", onclick: function (e) {
        var b = e.currentTarget; b.disabled = true; mailMsg.className = "msg"; mailMsg.textContent = "Sending...";
        api("POST", "report-email", { from: from.value, to: to.value }).then(function (r) { b.disabled = false; mailMsg.className = "msg ok"; mailMsg.textContent = "Sent to " + r.sent + " address" + (r.sent === 1 ? "" : "es") + " with the CSV files attached."; })
          .catch(function (er) { b.disabled = false; mailMsg.className = "msg err"; mailMsg.textContent = er.message; });
      } })]));
      out.appendChild(mailMsg);
      out.appendChild(h("p", { "class": "muted", text: "The previous month's report is also emailed automatically on the 1st of every month." }));
      out.appendChild(h("div", { "class": "row", style: "flex-wrap:wrap" }, [
        dl("All sales (CSV)", function () { csvDownload("sales-" + span + ".csv", ["Date", "Time", "Type", "Location", "Customer", "Email", "Items", "Subtotal", "Shipping", "Tax", "Total", "Status", "Reference"],
          rows.map(function (r) { return [r.date, timeOf(r.ts), r.channel, r.location, r.customer, r.email, r.items, dollars(r.subtotal), dollars(r.shipping), dollars(r.tax), dollars(r.total), r.status, r.id]; })); }),
        dl("Cash sales (CSV)", function () { csvDownload("cash-" + span + ".csv", ["Date", "Time", "Location", "Customer", "Email", "Items", "Subtotal", "Tax", "Total", "Status"],
          rows.filter(function (r) { return r.channel === "In person - Cash"; }).map(function (r) { return [r.date, timeOf(r.ts), r.location, r.customer, r.email, r.items, dollars(r.subtotal), dollars(r.tax), dollars(r.total), r.status]; })); }),
        dl("Class bookings (CSV)", function () { csvDownload("classes-" + span + ".csv", ["Booked", "Class", "Customer", "Email", "Spots", "Paid"],
          rows.filter(function (r) { return r.channel === "Class booking"; }).map(function (r) { return [r.date, r.location, r.customer, r.email, r.items, dollars(r.total)]; })); }),
        dl("Inventory (CSV)", function () {
          api("GET", "products").then(function (p) { csvDownload("inventory-" + today + ".csv", ["Product", "Category", "Size", "Price", "Stock", "Sold out"],
            p.products.concat(p.hidden || []).reduce(function (a, pr) { return a.concat(pr.sizes.map(function (s) { return [pr.name, pr.category, s.label, dollars(s.cents), s.stock == null ? "unlimited" : s.stock, s.soldOut ? "yes" : ""]; })); }, [])); })
            .catch(function (e) { msg.className = "msg err"; msg.textContent = e.message; });
        })]));
    }).catch(function (e) { msg.className = "msg err"; msg.textContent = e.message; });
  }
}

/* EVENT SALE: customer-facing selling screen for an iPad or phone at events. Payment is Stripe Checkout. */
var SALE_KEY = "qe_sale", CART_KEY = "qe_cart", PAY_KEY = "qe_pay";
function ssGet(k) { try { return JSON.parse(sessionStorage.getItem(k) || "null"); } catch (e) { return null; } }
function ssSet(k, v) { try { if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

function viewSale(n) {
  var pin = h("input", { type: "password", inputmode: "numeric", maxlength: "4", placeholder: "4-digit PIN", autocomplete: "off", "aria-label": "Staff PIN" });
  var tax = h("input", { type: "number", min: "0", max: "15", step: "0.01", value: "0", inputmode: "decimal" });
  var msg = h("p", { "class": "msg", role: "status" });
  var pickEv = h("select", { "aria-label": "Choose your event" }, [h("option", { value: "", text: "Loading your events..." })]);
  var noEv = h("p", { "class": "hide" }, [h("span", { "class": "msg err", text: "No upcoming events are listed yet. " }), h("button", { "class": "btn small", type: "button", text: "Add an event first", onclick: function () { current = "events"; start(); } })]);
  api("GET", "events").then(function (d) {
    var t = chiDate(Date.now());
    var soon = d.events.filter(function (e) { return e.name && e.date && e.date >= t; }).sort(function (a, b) { return a.date.localeCompare(b.date); });
    clear(pickEv);
    pickEv.appendChild(h("option", { value: "", text: soon.length ? "Choose an event..." : "No upcoming events listed" }));
    soon.forEach(function (e) { pickEv.appendChild(h("option", { value: e.name, text: e.name + " - " + fmtDay(e.date) + (e.date === t ? " (today)" : "") })); });
    var today = soon.filter(function (e) { return e.date === t; })[0];
    if (today) pickEv.value = today.name;
    if (!soon.length) noEv.className = "";
  }).catch(function () { clear(pickEv); pickEv.appendChild(h("option", { value: "", text: "Could not load events" })); });
  var caIn = h("input", { placeholder: "$QueenEsHeirr", autocomplete: "off", "aria-label": "Cash App name" }), vmIn = h("input", { placeholder: "@QueenEs-Heirr", autocomplete: "off", "aria-label": "Venmo username" });
  var linkMsg = h("p", { "class": "msg", role: "status" });
  api("GET", "pay-links").then(function (l) { caIn.value = l.cashapp ? "$" + l.cashapp : ""; vmIn.value = l.venmo ? "@" + l.venmo : ""; }).catch(function () {});
  n.appendChild(h("div", { "class": "card" }, [
    h("h2", { text: "Cash App and Venmo" }),
    h("p", { "class": "muted", text: "Add your business names and the bag screen shows a QR code with the exact total filled in. Customers scan it, confirm in their app, and staff confirms with the PIN. Leave a box empty to hide that option. Test each with a $1 sale first." }),
    h("label", null, ["Cash App name", caIn]), h("label", null, ["Venmo username", vmIn]), h("p"),
    h("button", { "class": "btn small primary", text: "Save payment names", onclick: function () {
      api("POST", "pay-links", { cashapp: caIn.value, venmo: vmIn.value }).then(function (r) { caIn.value = r.cashapp ? "$" + r.cashapp : ""; vmIn.value = r.venmo ? "@" + r.venmo : ""; linkMsg.className = "msg ok"; linkMsg.textContent = "Saved."; })
        .catch(function (er) { linkMsg.className = "msg err"; linkMsg.textContent = er.message; });
    } }), linkMsg]));
  n.appendChild(h("div", { "class": "card" }, [
    h("h2", { text: "Sell at an Event" }),
    h("p", { "class": "muted", text: "This turns the screen into a customer-facing store. Customers tap jars, review their bag, and pay by scanning a QR code with their phone, entering a card on the screen, or paying cash (confirmed with your PIN). Stripe emails card receipts, cash receipts are emailed from the shop, stock goes down automatically, and each sale appears in Orders as In person." }),
    h("p", { "class": "muted", text: "Choose a 4-digit staff PIN. Only the PIN gets you back to the admin screens. On an iPad, also turn on Guided Access (Settings, Accessibility) so customers cannot leave the page." }),
    h("label", null, ["Where are you selling today?", pickEv]),
    h("p", { "class": "muted", text: "Pick the event from your Events tab. Today's event is chosen for you. Selling somewhere new? Add it on the Events tab first, so every sale is tied to an event in the ledger and reports." }),
    noEv,
    h("p"),
    h("label", null, ["Staff PIN", pin]),
    h("p"),
    h("label", null, ["Sales tax for cash sales, % (optional)", tax]),
    h("p", { "class": "muted", text: "Card payments use Stripe Tax if you have turned it on. For cash sales, enter the rate you collect (ask your accountant), or leave it at 0." }),
    h("p"),
    h("button", { "class": "btn primary", text: "Start selling", onclick: function () {
      if (!/^\\d{4}$/.test(pin.value)) { msg.className = "msg err"; msg.textContent = "Enter exactly 4 digits."; return; }
      if (!pickEv.value) { msg.className = "msg err"; msg.textContent = "Choose the event you are selling at. If it is not listed, add it on the Events tab first."; return; }
      var base = { pin: pin.value, location: pickEv.value.slice(0, 80), taxPct: Math.min(15, Math.max(0, parseFloat(tax.value) || 0)) };
      api("GET", "pay-links").then(function (l) { base.links = l; }).catch(function () { base.links = {}; }).then(function () {
        ssSet(SALE_KEY, base); ssSet(CART_KEY, []); ssSet(PAY_KEY, null); renderSale();
      });
    } }), msg]));
}

function renderSale() {
  var st = ssGet(SALE_KEY); if (!st) { start(); return; }
  var products = [], cart = ssGet(CART_KEY) || [];
  clear(app);
  var root = h("div", { "class": "sale" }); app.appendChild(root);
  var grid = h("div", { "class": "grid" }), q = "";
  var searchIn = h("input", { type: "search", placeholder: "Search items", "aria-label": "Search items", autocomplete: "off", oninput: function () { q = searchIn.value.trim().toLowerCase(); drawGrid(); } });
  var scroll = h("div", { "class": "scroll" }, [h("div", { "class": "sbox" }, [searchIn]), grid]);
  var barTot = h("div", { "class": "tot" }), barCnt = h("div", { "class": "muted" });
  var viewBtn = h("button", { "class": "big", text: "View bag", onclick: function () { openBag(); } });
  var bar = h("div", { "class": "bar" }, [h("div", null, [barTot, barCnt]), viewBtn]);
  root.appendChild(h("header", null, [
    h("div", { "class": "brand" }, [h("img", { src: "/admin/icon-192.png", alt: "" }), h("div", null, [h("b", { text: "Queen E's Heirr" }), h("span", { text: "Curating Culture & Confections" })])]),
    h("button", { "class": "staff", text: "Staff", onclick: staffExit })]));
  root.appendChild(scroll); root.appendChild(bar);

  function find(id, size) { var p = products.filter(function (x) { return x.id === id; })[0]; return p ? { p: p, s: p.sizes.filter(function (z) { return z.label === size; })[0] } : null; }
  function open(p) { return p.sizes.filter(function (s) { return !s.soldOut; }); }
  function total() { return cart.reduce(function (t, l) { var f = find(l.id, l.size); return t + (f && f.s ? f.s.cents * l.qty : 0); }, 0); }
  function count() { return cart.reduce(function (t, l) { return t + l.qty; }, 0); }
  function save() { ssSet(CART_KEY, cart); }
  function maxQty(s) { return Math.min(20, typeof s.stock === "number" ? s.stock : 20); }
  function addLine(p, s) {
    var line = cart.filter(function (l) { return l.id === p.id && l.size === s.label; })[0];
    if (line) { if (line.qty >= maxQty(s)) { toast("That is all we have of that one"); return; } line.qty++; } else cart.push({ id: p.id, size: s.label, qty: 1 });
    save(); drawBar(); toast("Added to your bag");
  }
  function drawBar() { var c = count(); barTot.textContent = money(total()); barCnt.textContent = c + (c === 1 ? " item" : " items"); viewBtn.disabled = !c; }
  function overlay(inner) {
    var bg = h("div", { "class": "sheet-bg", onclick: function (e) { if (e.target === bg) bg.remove(); } }, [h("div", { "class": "sheet", role: "dialog" }, inner)]);
    root.appendChild(bg); return bg;
  }
  function drawGrid() {
    clear(grid);
    var hits = products.filter(function (p) { return !q || (p.name + " " + (p.category || "")).toLowerCase().indexOf(q) >= 0; });
    hits.forEach(function (p) {
      var o = open(p), out = !o.length, from = o.length ? Math.min.apply(null, o.map(function (s) { return s.cents; })) : 0;
      var low = o.length && o.every(function (s) { return typeof s.stock === "number" && s.stock <= 3; });
      var t = h("button", { "class": "tile" + (out ? " out" : ""), disabled: out, "aria-label": p.name, onclick: function () { pick(p); } }, [
        out ? h("span", { "class": "badge", text: "Sold out" }) : null,
        h("img", { src: p.image || "/admin/icon-512.png", alt: "", loading: "lazy", "class": p.image ? "" : "ph" }),
        h("div", { "class": "meta" }, [h("h3", { text: p.name }), out ? null : h("div", { "class": "price", text: (o.length > 1 ? "From " : "") + money(from) }), low ? h("div", { "class": "low", text: "Almost gone" }) : null])]);
      grid.appendChild(t);
    });
    if (!products.length) grid.appendChild(h("p", { "class": "muted", text: "Loading the shelf..." }));
    else if (!hits.length) grid.appendChild(h("p", { "class": "muted", text: "Nothing matches \\u201c" + q + "\\u201d." }));
  }
  function pick(p) {
    var o = open(p); if (!o.length) return;
    var bg;
    var opts = p.sizes.map(function (s) {
      var low = !s.soldOut && typeof s.stock === "number" && s.stock <= 5;
      return h("button", { "class": "sizeopt", disabled: s.soldOut, onclick: function () { addLine(p, s); bg.remove(); } }, [
        h("span", null, [s.label, low ? h("small", { text: "Only " + s.stock + " left" }) : null]),
        h("span", { text: s.soldOut ? "Sold out" : money(s.cents) })]);
    });
    bg = overlay([h("h2", { text: p.name }), p.description ? h("p", { "class": "muted", text: p.description }) : null].concat(opts, [
      h("p"), h("button", { "class": "big alt", style: "width:100%", text: "Close", onclick: function () { bg.remove(); } })]));
  }
  function openBag() {
    var bg, box = h("div"), msg = h("p", { "class": "msg", role: "status" });
    var payBtn = h("button", { "class": "big", style: "width:100%", text: "Pay by card", onclick: pay });
    var cashBtn = h("button", { "class": "big alt", style: "width:100%;margin-top:10px", text: "Pay with cash", onclick: function () { bg.remove(); showCash("cash"); } });
    var lk = st.links || {};
    var appBtns = [lk.cashapp ? ["cashapp", "Pay with Cash App"] : null, lk.venmo ? ["venmo", "Pay with Venmo"] : null].filter(Boolean).map(function (m) {
      return h("button", { "class": "big alt", style: "width:100%;margin-top:10px", text: m[1], onclick: function () { bg.remove(); showCash(m[0]); } });
    });
    function draw() {
      clear(box);
      cart = cart.filter(function (l) { return l.qty > 0; }); save(); drawBar();
      if (!cart.length) { bg.remove(); return; }
      cart.forEach(function (l) {
        var f = find(l.id, l.size); if (!f || !f.s) return;
        box.appendChild(h("div", { "class": "line" }, [
          h("div", null, [h("b", { text: f.p.name }), h("div", { "class": "muted", text: f.s.label + " \\u00b7 " + money(f.s.cents) })]),
          h("div", { "class": "qty" }, [h("button", { "aria-label": "Fewer", text: "\\u2212", onclick: function () { l.qty--; draw(); } }), h("span", { text: String(l.qty) }),
            h("button", { "aria-label": "More", text: "+", onclick: function () { if (l.qty < maxQty(f.s)) l.qty++; else toast("That is all we have"); draw(); } })]),
          h("b", { text: money(f.s.cents * l.qty) })]));
      });
      box.appendChild(h("div", { style: "display:flex;justify-content:space-between;padding:16px 0;font:700 1.4rem 'Playfair Display',serif;color:var(--forest)" }, [h("span", { text: "Subtotal" }), h("span", { text: money(total()) })]));
    }
    function pay() {
      payBtn.disabled = true; msg.className = "msg"; msg.textContent = "Getting your payment ready...";
      api("POST", "pos-checkout", { items: cart, location: st.location || "" }).then(function (r) { ssSet(PAY_KEY, r.id); showPay(r, total()); bg.remove(); })
        .catch(function (er) { payBtn.disabled = false; msg.className = "msg err"; msg.textContent = er.message; loadProducts(); });
    }
    bg = overlay([h("h2", { text: "Your Bag" }), box, h("p", { "class": "muted", text: "Card payments: tax, if any, and your receipt are handled on the secure payment page." }), payBtn, cashBtn].concat(appBtns, [msg,
      h("p"), h("button", { "class": "big alt", style: "width:100%", text: "Keep shopping", onclick: function () { bg.remove(); } }),
      h("p"), h("button", { "class": "staff", style: "color:var(--sage)", text: "Empty the bag", onclick: function () { cart.length = 0; draw(); } })]));
    draw();
  }
  function showCash(method) {
    method = method || "cash";
    var rate = Number(st.taxPct) || 0, sub = total(), tax = Math.round(sub * rate / 100), key = "k" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    var email = h("input", { type: "email", placeholder: "you@example.com", autocomplete: "email", inputmode: "email", "aria-label": "Email for your receipt" });
    var cname = h("input", { type: "text", maxlength: "100", placeholder: "Name (optional)", autocomplete: "name", "aria-label": "Name (optional)" });
    var pin = h("input", { "class": "pin", type: "password", inputmode: "numeric", maxlength: "4", autocomplete: "off", placeholder: "Staff PIN", "aria-label": "Staff PIN" });
    var msg = h("p", { "class": "msg err", role: "status" }), cbg;
    var done = h("button", { "class": "big", style: "width:100%", text: method === "cash" ? "Cash received" : "Payment received", onclick: function () {
      if (pin.value !== st.pin) { msg.textContent = "Staff PIN needed to confirm the payment."; pin.value = ""; return; }
      done.disabled = true; msg.className = "msg"; msg.textContent = "Recording the sale...";
      api("POST", "pos-cash", { items: cart, email: email.value, name: cname.value, taxPct: rate, key: key, location: st.location || "", method: method }).then(function (r) {
        cbg.remove(); cart.length = 0; save(); drawBar();
        var t = h("div", { "class": "thanks" }, [h("div", null, [h("h1", { text: "Thank You!" }), h("p", { text: r.emailed ? "A receipt is on its way to your email." : "Enjoy your jars!" })])]);
        root.appendChild(t); setTimeout(function () { t.remove(); }, 5000); loadProducts();
      }).catch(function (er) { done.disabled = false; msg.className = "msg err"; msg.textContent = er.message; });
    } });
    var rows = [h("div", { style: "display:flex;justify-content:space-between" }, [h("span", { text: "Subtotal" }), h("span", { text: money(sub) })])];
    if (tax > 0) rows.push(h("div", { style: "display:flex;justify-content:space-between" }, [h("span", { text: "Sales tax (" + rate + "%)" }), h("span", { text: money(tax) })]));
    var qrBlock = null;
    if (method !== "cash") {
      var lk2 = st.links || {}, amt = ((sub + tax) / 100).toFixed(2);
      var link = method === "cashapp" ? "https://cash.app/$" + lk2.cashapp + "/" + amt : "https://venmo.com/" + lk2.venmo + "?txn=pay&amount=" + amt + "&note=" + encodeURIComponent("Queen E's Heirr");
      var qb = h("div", { style: "width:min(280px,66vw);margin:10px auto;background:#fff;border-radius:18px;padding:10px;border:1.5px solid var(--linen)" });
      qb.innerHTML = qrSvg(link, 260).replace('width="260" height="260"', 'width="100%" height="auto" style="display:block"');
      qrBlock = h("div", null, [h("p", { style: "text-align:center;margin:0;font-weight:600", text: "Scan with your phone camera to pay " + money(sub + tax) + " in " + (PAYLABEL[method]) }), qb,
        h("p", { "class": "muted", style: "text-align:center", text: "The amount is filled in. Confirm the payment in the app, then show our team the \\u201cPayment sent\\u201d screen." })]);
    }
    cbg = overlay([h("h2", { style: "text-align:center", text: "Pay With " + PAYLABEL[method] }),
      h("div", { style: "font-size:1.05rem;margin:8px 0" }, rows),
      h("div", { style: "display:flex;justify-content:space-between;font:700 1.6rem 'Playfair Display',serif;color:var(--forest);padding:8px 0 14px;border-top:1px solid var(--linen)" }, [h("span", { text: "Total" }), h("span", { text: money(sub + tax) })]),
      qrBlock || h("p", { style: "margin:0 0 6px;font-weight:600", text: "Please hand your cash to our team." }),
      h("label", null, ["Name (optional)", cname]),
      h("p"),
      h("label", null, ["Email for a receipt (optional)", email]),
      h("p", { "class": "muted", text: "Team member: enter the staff PIN once the " + (method === "cash" ? "cash" : "payment") + " is received." }),
      pin, msg, h("p"), done, h("p"),
      h("button", { "class": "big alt", style: "width:100%", text: "Go back", onclick: function () { cbg.remove(); } })]);
  }
  function showPay(r, amount) {
    var pbg, timer, done = false;
    var qrBox = h("div", { style: "width:min(300px,70vw);margin:12px auto;background:#fff;border-radius:18px;padding:10px;border:1.5px solid var(--linen)" });
    qrBox.innerHTML = qrSvg(r.pay, 280).replace('width="280" height="280"', 'width="100%" height="auto" style="display:block"');
    var note = h("p", { "class": "muted", style: "text-align:center", text: "Waiting for payment..." });
    function stop() { done = true; clearInterval(timer); }
    function cancel() {
      stop(); ssSet(PAY_KEY, null); pbg.remove();
      api("POST", "pos-cancel", { id: r.id }).catch(function () {});
    }
    pbg = overlay([
      h("h2", { style: "text-align:center", text: "Total " + money(amount) }),
      h("p", { style: "text-align:center;margin:0;font-weight:600", text: "Scan with your phone camera to pay" }),
      h("p", { "class": "muted", style: "text-align:center;margin:4px 0", text: "Apple Pay, Google Pay, or card" }),
      qrBox,
      h("button", { "class": "big", style: "width:100%", text: "Pay on this screen instead", onclick: function () { stop(); window.location.href = r.url; } }),
      note, h("p"),
      h("button", { "class": "big alt", style: "width:100%", text: "Go back", onclick: cancel })]);
    timer = setInterval(function () {
      if (done || !document.body.contains(pbg)) { stop(); return; }
      api("GET", "pos-session?id=" + encodeURIComponent(r.id)).then(function (s) {
        if (s.paid) { stop(); pbg.remove(); finishPaid(); }
        else if (s.status === "expired") { stop(); ssSet(PAY_KEY, null); pbg.remove(); toast("That payment timed out. Please try again."); }
      }).catch(function () {});
    }, 2500);
  }
  function finishPaid() {
    ssSet(PAY_KEY, null); cart.length = 0; save(); drawBar();
    var t = h("div", { "class": "thanks" }, [h("div", null, [h("h1", { text: "Thank You!" }), h("p", { text: "Your payment went through. A receipt is on its way to your email." })])]);
    root.appendChild(t); setTimeout(function () { t.remove(); }, 6000); loadProducts();
  }
  function staffExit() {
    var pin = h("input", { "class": "pin", type: "password", inputmode: "numeric", maxlength: "4", autocomplete: "off", "aria-label": "Staff PIN" });
    var msg = h("p", { "class": "msg err", role: "status" }), bg;
    function go() { if (pin.value === st.pin) { ssSet(SALE_KEY, null); ssSet(CART_KEY, null); ssSet(PAY_KEY, null); bg.remove(); start(); } else { msg.textContent = "That PIN is not right."; pin.value = ""; } }
    pin.addEventListener("input", function () { if (pin.value.length === 4) go(); });
    bg = overlay([h("h2", { text: "Staff Only" }), h("p", { "class": "muted", text: "Enter the staff PIN to leave the sales screen." }), pin, msg, h("p"),
      h("button", { "class": "big alt", style: "width:100%", text: "Cancel", onclick: function () { bg.remove(); } })]);
    pin.focus();
  }
  function loadProducts() {
    return api("GET", "pos-products").then(function (d) { products = d.products; drawGrid(); drawBar(); }).catch(function () {});
  }
  function checkPaid() {
    var sid = ssGet(PAY_KEY); if (!sid) return;
    api("GET", "pos-session?id=" + encodeURIComponent(sid)).then(function (r) {
      if (r.paid) {
        finishPaid();
      } else if (r.status === "expired") ssSet(PAY_KEY, null);
    }).catch(function () {});
  }
  drawGrid(); drawBar(); loadProducts().then(checkPaid);
  var refresh = setInterval(function () { if (!document.body.contains(root)) { clearInterval(refresh); return; } loadProducts(); }, 60000);
  document.addEventListener("visibilitychange", function () { if (document.body.contains(root) && !document.hidden) { loadProducts(); checkPaid(); } });
}

function viewEvents(n) {
  loading(n);
  api("GET", "events").then(function (d) {
    clear(n);
    var events = d.events;
    var list = h("div"), msg = h("p", { "class": "msg", role: "status" });
    var ECFG = { get: { date: function (e) { return e.date || null; }, name: function (e) { return (e.name || "").toLowerCase(); } }, dateOf: function (e) { return e.date; } };
    var etools = listTools({ sorts: [["date", "Date"], ["name", "Name"]], dir: "asc", dateOf: true }, function () { draw(); });
    function draw() {
      clear(list);
      applyTools(events.slice(), etools.state, ECFG).forEach(function (e) {
        var i = events.indexOf(e);
        var f = function (k, type, label) { var inp = h("input", { type: type, value: e[k] || "" }); inp.addEventListener("input", function () { e[k] = inp.value; }); return h("label", null, [label, inp]); };
        var show = h("input", { type: "checkbox", checked: e.show !== false }); show.addEventListener("change", function () { e.show = show.checked; });
        list.appendChild(h("div", { "class": "card" }, [h("div", { "class": "row" }, [f("name", "text", "Event name"), f("date", "date", "Event date"), f("location", "text", "Place"), f("orderBy", "date", "Order by (last day)")]),
          h("div", { style: "display:flex;justify-content:space-between;margin-top:10px;gap:8px;flex-wrap:wrap" }, [h("label", { "class": "chk" }, [show, "Show in cart"]),
            h("button", { "class": "btn small danger", text: "Delete", onclick: function () { events.splice(i, 1); draw(); } })])]));
      });
      if (!events.length) list.appendChild(h("p", { "class": "muted", text: "No events yet. Click Add event." }));
    }
    n.appendChild(h("p", { "class": "muted", text: "Events appear as a pickup choice in the cart until the order-by date passes (or the event date if no order-by date is set)." }));
    n.appendChild(etools.el);
    n.appendChild(list);
    n.appendChild(h("div", { "class": "row" }, [
      h("button", { "class": "btn", text: "+ Add event", onclick: function () { events.push({ name: "", date: "", location: "", orderBy: "", show: true }); draw(); } }),
      h("button", { "class": "btn primary", text: "Save events", onclick: function () {
        msg.className = "msg"; msg.textContent = "Saving...";
        api("PUT", "events", { events: events }).then(function (r) { events = r.events; draw(); msg.className = "msg ok"; msg.textContent = "Saved. The shop is updated."; }).catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
      } })]));
    n.appendChild(msg);
    draw();
  }).catch(function (er) { failed(n, er); });
}

if (TOKEN && ssGet(SALE_KEY)) renderSale(); else if (TOKEN) start(); else renderLogin();
<\/script></body></html>
`;var ze=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date);var me={jam:"Jam making & STEM lab",combined:"Jam making & etiquette",other:"Class"};async function H(e){if(!e.ADMIN_KV)return[];try{return JSON.parse(await e.ADMIN_KV.get("classes")||"[]")}catch{return[]}}async function Y(e){if(!e.ADMIN_KV)return[];try{return JSON.parse(await e.ADMIN_KV.get("bookings")||"[]")}catch{return[]}}function _(e,t){return e.filter(a=>a.classId===t).reduce((a,n)=>a+(n.seats||0),0)}function he(e){let t=[];for(let n of(Array.isArray(e)?e:[]).slice(0,100)){let s=me[n.type]?n.type:"other",r=String(n.title||"").trim().slice(0,100)||me[s],o=String(n.date||""),m=String(n.time||""),d=parseInt(n.seats,10),p=parseInt(n.minutes,10)||120,y=Math.round(parseFloat(n.price)*100);if(!/^\d{4}-\d{2}-\d{2}$/.test(o))throw new Error("Each class needs a date");if(!/^\d{2}:\d{2}$/.test(m))throw new Error("Each class needs a start time");if(!(d>=1&&d<=200))throw new Error("Seats must be between 1 and 200");if(!(y>=100&&y<=1e5))throw new Error("Price must be between $1 and $1,000 per person");let h=/^[a-z0-9-]{3,48}$/.test(n.id||"")?n.id:`${s}-${o}-${m.replace(":","")}`;t.push({id:h,title:r,type:s,date:o,time:m,minutes:Math.min(Math.max(p,15),720),seats:d,cents:y,price:void 0,location:String(n.location||"").trim().slice(0,200),notes:String(n.notes||"").trim().slice(0,500),show:n.show!==!1})}let a=new Set;for(let n of t)a.has(n.id)&&(n.id+="-"+a.size),a.add(n.id);return t.map(({price:n,...s})=>s)}async function j(e){let[t,a]=await Promise.all([H(e),Y(e)]),n=ze();return t.filter(s=>s.show!==!1&&s.date>=n).sort((s,r)=>(s.date+s.time).localeCompare(r.date+r.time)).map(s=>({id:s.id,title:s.title,type:s.type,date:s.date,time:s.time,minutes:s.minutes,cents:s.cents,location:s.location,notes:s.notes,left:Math.max(0,s.seats-_(a,s.id))}))}async function $(e){let[t,a]=await Promise.all([H(e),Y(e)]);return t.map(n=>({...n,price:(n.cents/100).toFixed(2),booked:_(a,n.id)}))}async function Ae(e,t,a,n){let s;try{s=await e.json()}catch{return n.json({error:"Invalid request"},400,a.headers)}let r=parseInt(s&&s.seats,10);if(!(r>=1&&r<=10))return n.json({error:"Please choose 1 to 10 seats"},400,a.headers);let o=(await j(t)).find(p=>p.id===(s&&s.classId));if(!o)return n.json({error:"That class is no longer open for booking"},400,a.headers);if(r>o.left)return n.json({error:o.left?`Only ${o.left} seat(s) left`:"That class is full"},400,a.headers);let m=t.SITE_URL||"https://queenesheirr.com",d=new URLSearchParams;d.set("mode","payment"),d.set("success_url",`${m}/order-confirmed/?class=1&session_id={CHECKOUT_SESSION_ID}`),d.set("cancel_url",`${m}/classes/`),d.set("expires_at",String(Math.floor(Date.now()/1e3)+1860)),d.set("phone_number_collection[enabled]","true"),d.set("line_items[0][quantity]",String(r)),d.set("line_items[0][price_data][currency]","usd"),d.set("line_items[0][price_data][unit_amount]",String(o.cents)),d.set("line_items[0][price_data][product_data][name]",`${o.title} - ${o.date} ${o.time}`.slice(0,120)),d.set("line_items[0][price_data][product_data][description]",`Per person. Seats: ${r}.${o.location?" "+o.location:""}`.slice(0,300)),d.set("metadata[kind]","class"),d.set("metadata[classId]",o.id),d.set("metadata[seats]",String(r)),d.set("payment_intent_data[metadata][kind]","class"),t.CLASS_TAX_ENABLED==="true"&&(d.set("automatic_tax[enabled]","true"),d.set("billing_address_collection","required"),d.set("line_items[0][price_data][tax_behavior]","exclusive"));try{let p=await n.stripePost(t,"/checkout/sessions",d);return n.json({url:p.url},200,a.headers)}catch(p){return console.log("class checkout error",String(p)),n.json({error:"Could not start checkout"},502,a.headers)}}async function ge(e,t){let a=t.metadata||{};if(a.kind!=="class"||!e.ADMIN_KV)return;let n=await Y(e);if(n.some(m=>m.sid===t.id))return;let s=(await H(e)).find(m=>m.id===a.classId),r=t.customer_details||{},o={sid:t.id,classId:a.classId||"",name:String(r.name||"").slice(0,100),email:String(r.email||"").slice(0,200),phone:String(r.phone||"").slice(0,40),seats:parseInt(a.seats,10)||1,cents:t.amount_total||0,ts:Date.now()};if(n.push(o),await e.ADMIN_KV.put("bookings",JSON.stringify(n.slice(-1500))),e.MAIL_URL&&e.MAIL_SECRET&&s)try{await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"booking_notice",secret:e.MAIL_SECRET,booking:o,cls:{id:s.id,title:s.title,date:s.date,time:s.time,minutes:s.minutes,location:s.location,notes:s.notes,seats:s.seats,booked:_(n,s.id)}})})}catch(m){console.log("booking notice failed",String(m))}}async function fe(e){let[t,a]=await Promise.all([H(e),Y(e)]),n=Object.fromEntries(t.map(s=>[s.id,s]));return a.slice().reverse().map(s=>({...s,cls:n[s.classId]?{title:n[s.classId].title,date:n[s.classId].date,time:n[s.classId].time}:null}))}var R="#1b3b22",q="#d4af37",ee="#fcfaf7",He="#0e2012",we="#e5dbd1",te="Georgia,'Times New Roman',serif",V="Helvetica,Arial,sans-serif",ne=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,be=/^https:\/\/[^\s"'<>]{4,500}$/;var Q=e=>String(e??"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),N=(e,t)=>String(e??"").replace(/[\r\n]+/g," ").trim().slice(0,t);function Ye(e){e=e&&typeof e=="object"?e:{};let t={subject:N(e.subject,150),preheader:N(e.preheader,150),headline:N(e.headline,120),body:String(e.body||"").replace(/\r/g,"").slice(0,8e3).trim(),imageUrl:be.test(String(e.imageUrl||"").trim())?String(e.imageUrl).trim():"",buttonLabel:N(e.buttonLabel,40),buttonUrl:be.test(String(e.buttonUrl||"").trim())?String(e.buttonUrl).trim():"",greet:e.greet!==!1,includeEvents:e.includeEvents===!0,includeClasses:e.includeClasses===!0};if(!t.subject)throw new Error("Add a subject line.");if(!t.body&&!t.headline)throw new Error("Add a headline or a message.");if(t.buttonLabel&&!t.buttonUrl)throw new Error("The button needs a link that starts with https://");return t.buttonLabel||(t.buttonUrl=""),t}var ae=e=>new Date(e+"T12:00:00Z").toLocaleDateString("en-US",{timeZone:"UTC",weekday:"short",month:"short",day:"numeric"}),Fe=e=>{let[t,a]=String(e||"").split(":").map(Number);return Number.isFinite(t)?`${t%12||12}:${String(a||0).padStart(2,"0")} ${t>=12?"PM":"AM"}`:""},Ue=e=>e.replace(/https:\/\/[^\s<&]+(?:&amp;[^\s<&]+)*/g,t=>`<a href="${t}" style="color:${R};font-weight:600">${t}</a>`);function Je(e,t){let a=t.site||"https://queenesheirr.com",n=e.body?e.body.split(/\n{2,}/).map(h=>h.trim()).filter(Boolean):[],s=[],r="",o=h=>`<p style="font:16px/1.65 ${V};color:${He};margin:0 0 16px">${h}</p>`,m=h=>`<h3 style="font:700 18px/1.3 ${te};color:${R};margin:26px 0 8px;border-top:1px solid ${we};padding-top:20px">${Q(h)}</h3>`;e.greet&&(r+=o("{{HI}}"),s.push("{{HI}}","")),n.forEach(h=>{r+=o(Ue(Q(h)).replace(/\n/g,"<br>")),s.push(h,"")}),e.includeEvents&&t.events&&t.events.length&&(r+=m("Where to find us"),s.push("WHERE TO FIND US"),t.events.slice(0,6).forEach(h=>{r+=o(`<strong>${Q(ae(h.date))}</strong> &middot; ${Q(h.name)}${h.location?`<br><span style="color:#5c6b5a">${Q(h.location)}</span>`:""}`),s.push(`- ${ae(h.date)}: ${h.name}${h.location?" ("+h.location+")":""}`)}),s.push("")),e.includeClasses&&t.classes&&t.classes.length&&(r+=m("Upcoming classes"),s.push("UPCOMING CLASSES"),t.classes.slice(0,6).forEach(h=>{let b=`${ae(h.date)}${h.time?" at "+Fe(h.time):""}`,k=h.cents?` &middot; $${(h.cents/100).toFixed(2)}`:"";r+=o(`<strong>${Q(h.title)}</strong><br><span style="color:#5c6b5a">${Q(b)}${k}</span>`),s.push(`- ${h.title}: ${b}${h.cents?", $"+(h.cents/100).toFixed(2):""}`)}),r+=o(`<a href="${a}/classes/" style="color:${R};font-weight:600">See all classes and book a seat</a>`),s.push(`See all classes: ${a}/classes/`,"")),e.buttonLabel&&e.buttonUrl&&(r+=`<table role="presentation" cellspacing="0" cellpadding="0" style="margin:8px 0 8px"><tr><td style="background:${R};border:2px solid ${q};border-radius:999px"><a href="${Q(e.buttonUrl)}" style="display:inline-block;padding:13px 30px;font:700 14px ${V};letter-spacing:.06em;text-transform:uppercase;color:#fff;text-decoration:none">${Q(e.buttonLabel)}</a></td></tr></table>`,s.push(`${e.buttonLabel}: ${e.buttonUrl}`,""));let d=Q(t.address||"").replace(/\n/g,"<br>"),p=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${Q(e.subject)}</title></head><body style="margin:0;background:${ee}">`+(e.preheader?`<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${ee}">${Q(e.preheader)}</div>`:"")+`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${ee}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${we};border-radius:18px;overflow:hidden"><tr><td align="center" style="background:${R};padding:24px"><a href="${a}" style="font:700 26px ${te};color:#fff;text-decoration:none">Queen E's Heirr</a><div style="font:11px ${V};letter-spacing:.2em;text-transform:uppercase;color:${q};margin-top:6px">Curating Culture &amp; Confections</div></td></tr><tr><td style="height:5px;background:${q};line-height:5px;font-size:0">&nbsp;</td></tr>`+(e.imageUrl?`<tr><td><img src="${Q(e.imageUrl)}" alt="" width="600" style="display:block;width:100%;height:auto;border:0"></td></tr>`:"")+'<tr><td style="padding:30px 28px 22px">'+(e.headline?`<h1 style="font:700 28px/1.2 ${te};color:${R};margin:0 0 18px">${Q(e.headline)}</h1>`:"")+r+`</td></tr><tr><td align="center" style="background:${R};padding:18px 24px;font:12px/1.7 ${V};color:#cfd8cd">You are receiving this because you joined the Queen E's Heirr mailing list at queenesheirr.com.<br>`+(d?d+"<br>":"")+`<a href="{{UNSUB}}" style="color:${q}">Unsubscribe</a></td></tr></table></td></tr></table></body></html>`,y=[e.headline?e.headline.toUpperCase():"",e.headline?"":null,...s,"--","Queen E's Heirr | "+a,t.address||"","Unsubscribe: {{UNSUB}}"].filter(h=>h!==null).join(`
`);return{html:p,text:y}}async function O(e,t,a){if(!e.MAIL_URL||!e.MAIL_SECRET)throw new Error("Email is not set up");let n=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"mkt",op:t,secret:e.MAIL_SECRET,...a})}),s=await n.json().catch(()=>null);if(!n.ok||!s||s.ok!==!0)throw new Error(s&&s.error||"The mailing list did not answer. Make sure the newest Google Apps Script version is deployed.");return s}async function ye(e){try{return JSON.parse(await e.ADMIN_KV.get("marketing")||"{}")}catch{return{}}}async function je(e,t,a,n){let s={site:e.SITE_URL||"https://queenesheirr.com",address:n.address||"",events:[],classes:[]};return a.includeEvents&&(s.events=t.upcoming(await t.readEvents(e))),a.includeClasses&&(s.classes=await t.publicClasses(e)),s}async function ve(e,t,a,n,s,r,o){if(!/^(subscribers|subscriber|subscribers-import|marketing-settings|campaign-[a-z]+|campaigns)$/.test(e))return null;try{if(e==="marketing-settings"&&t==="GET")return o({address:(await ye(n)).address||""});if(e==="marketing-settings"&&t==="POST"){let d=String(a.address||"").replace(/\r/g,"").split(`
`).map(p=>p.trim()).filter(Boolean).slice(0,4).join(`
`).slice(0,300);return await n.ADMIN_KV.put("marketing",JSON.stringify({address:d})),o({ok:!0,address:d})}if(e==="subscribers"&&t==="GET"){let d=await O(n,"sub_list",{});return o({subscribers:d.subscribers,quota:d.quota})}if(e==="subscriber"&&t==="POST"){let d=String(a.email||"").trim().toLowerCase();if(!ne.test(d))return o({error:"That email address does not look right."},400);let p=a.op;return p==="add"?o(await O(n,"sub_add",{email:d,name:N(a.name,100),resubscribe:a.resubscribe===!0})):p==="set"?o(await O(n,"sub_set",{email:d,status:a.status==="unsubscribed"?"unsubscribed":"subscribed"})):p==="name"?o(await O(n,"sub_name",{email:d,name:N(a.name,100)})):p==="delete"?o(await O(n,"sub_delete",{email:d})):o({error:"Unknown action"},400)}if(e==="subscribers-import"&&t==="POST"){if(a.consent!==!0)return o({error:"Please confirm these people asked to hear from you."},400);let d=(Array.isArray(a.rows)?a.rows:[]).slice(0,500).map(p=>({name:N(p&&p.name,100),email:String(p&&p.email||"").trim().toLowerCase()}));return o(await O(n,"sub_import",{rows:d}))}if(e==="campaigns"&&t==="GET")return o({campaigns:(await O(n,"camp_list",{})).campaigns});if(e.startsWith("campaign-")&&t==="POST"){let d=Ye(a.fields),p=await ye(n),y=await je(n,r,d,p),h=Je(d,y);if(e==="campaign-preview")return o({html:h.html.split("{{UNSUB}}").join("#").split("{{HI}}").join("Hi Jane,"),missingAddress:!p.address});if(e==="campaign-test"){let b=await O(n,"camp_send",{subject:d.subject,html:h.html,text:h.text,emails:[s.e],test:!0});return o({ok:!0,sent:b.sent,to:s.e})}if(!p.address)return o({error:"Add your mailing address first (it goes in the footer of every email, which the law requires)."},400);if(e==="campaign-start"){let b=await O(n,"sub_list",{}),k=b.subscribers.filter(l=>l.status==="subscribed"&&ne.test(l.email)).map(l=>l.email);if(!k.length)return o({error:"There is nobody subscribed yet."},400);if(k.length>b.quota)return o({error:`Your daily sending limit has ${b.quota} emails left and this list has ${k.length} people. Try again tomorrow.`},400);let E=new Uint8Array(6);return crypto.getRandomValues(E),o({id:Array.from(E).map(l=>l.toString(16).padStart(2,"0")).join(""),total:k.length,quota:b.quota,emails:k,chunk:40})}if(e==="campaign-chunk"){let b=(Array.isArray(a.emails)?a.emails:[]).map(E=>String(E).trim().toLowerCase()).filter(E=>ne.test(E)).slice(0,40),k=await O(n,"camp_send",{subject:d.subject,html:h.html,text:h.text,emails:b});return o({ok:!0,sent:k.sent,failed:k.failed,skipped:k.skipped})}if(e==="campaign-done")return await O(n,"camp_log",{id:N(a.id,40),subject:d.subject,total:Number(a.total)||0,sent:Number(a.sent)||0,failed:Number(a.failed)||0}),o({ok:!0})}return o({error:"Not found"},404)}catch(d){return o({error:d.message||"Something went wrong"},400)}}var Ce="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",xe="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";var oe=new TextEncoder,Ke=["new","in_production","ready","fulfilled"],qe={cash:"Cash",cashapp:"Cash App",venmo:"Venmo",tap:"Tap to Pay"},Se=720*3600*1e3,w=(e,t=200,a={})=>new Response(JSON.stringify(e),{status:t,headers:{"Content-Type":"application/json","Cache-Control":"no-store",...a}});function Ie(e){return btoa(String.fromCharCode(...new Uint8Array(e))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function De(e){return Ie(oe.encode(e))}function Ve(e){return atob(e.replace(/-/g,"+").replace(/_/g,"/"))}async function K(e,t){let a=await crypto.subtle.importKey("raw",oe.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return Ie(await crypto.subtle.sign("HMAC",a,oe.encode(t)))}function Qe(e,t){if(e.length!==t.length)return!1;let a=0;for(let n=0;n<e.length;n++)a|=e.charCodeAt(n)^t.charCodeAt(n);return a===0}var W=e=>(e.ADMIN_EMAILS||"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);function Xe(){return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date)}async function F(e){if(!e.ADMIN_KV)return[];try{return JSON.parse(await e.ADMIN_KV.get("events")||"[]")}catch{return[]}}function Z(e){let t=Xe();return e.filter(a=>a.show!==!1&&a.date>=t&&(!a.orderBy||a.orderBy>=t)).sort((a,n)=>a.date.localeCompare(n.date)).map(a=>({id:a.id,name:a.name,date:a.date,location:a.location||""}))}async function We(e,t){let a=e.headers.get("Authorization")||"";if(!a.startsWith("Bearer ")||!t.SESSION_SECRET)return null;let[n,s]=a.slice(7).split(".");if(!n||!s||!Qe(s,await K(t.SESSION_SECRET,n)))return null;try{let r=JSON.parse(Ve(n));return r.exp<Date.now()||!W(t).includes(r.e)?null:r}catch{return null}}async function Ze(e,t,a){let n=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"send_code",secret:e.MAIL_SECRET,to:t,code:a})});if(!n.ok)throw new Error("mail "+n.status)}async function _e(e,t){if(!t.ADMIN_KV||!t.SESSION_SECRET||!t.MAIL_URL||!t.MAIL_SECRET)return w({error:"Admin is not set up yet"},503);let a;try{a=await e.json()}catch{return w({error:"Bad request"},400)}let n=String(a.email||"").trim().toLowerCase().slice(0,200);if(W(t).includes(n)){let s=parseInt(await t.ADMIN_KV.get("rl:"+n)||"0",10);if(s<5){await t.ADMIN_KV.put("rl:"+n,String(s+1),{expirationTtl:3600});let r=new Uint32Array(1);crypto.getRandomValues(r);let o=String(r[0]%1e6).padStart(6,"0");await t.ADMIN_KV.put("otp:"+n,JSON.stringify({h:await K(t.SESSION_SECRET,o+n),tries:0}),{expirationTtl:600});try{await Ze(t,n,o)}catch(m){console.log("send code failed",String(m))}}}return w({ok:!0})}async function $e(e,t){let a;try{a=await e.json()}catch{return w({error:"Bad request"},400)}let n=String(a.email||"").trim().toLowerCase(),s=String(a.code||"").replace(/\D/g,"").slice(0,6),r=t.ADMIN_KV&&await t.ADMIN_KV.get("otp:"+n),o=()=>w({error:"That code did not work. Request a new one."},401);if(!r||!W(t).includes(n)||s.length!==6)return o();let m=JSON.parse(r);if(m.tries>=5)return await t.ADMIN_KV.delete("otp:"+n),o();if(!Qe(m.h,await K(t.SESSION_SECRET,s+n)))return m.tries+=1,await t.ADMIN_KV.put("otp:"+n,JSON.stringify(m),{expirationTtl:600}),o();await t.ADMIN_KV.delete("otp:"+n);let d=De(JSON.stringify({e:n,exp:Date.now()+Se}));return w({token:`${d}.${await K(t.SESSION_SECRET,d)}`,email:n})}var se=(e,t)=>typeof e=="string"&&(/^https:\/\/(files\.stripe\.com|queenesheirr\.com)\/[^\s]+$/.test(e)||typeof t=="string"&&e.startsWith(t+"/img/")&&/^\/img\/[a-f0-9]{16,32}\.jpg$/.test(e.slice(t.length))),ke=e=>e.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60),re=e=>{let t=Math.round(parseFloat(e)*100);return Number.isFinite(t)&&t>=50&&t<=1e6?t:null},X=e=>e===null||e===""||e===void 0?null:Number.isInteger(+e)&&+e>=0&&+e<=1e5?+e:NaN;function Be(e){return!!(e&&e.metadata&&/^queenesheirr\.com (class|wholesale) request/.test(String(e.metadata.source||"")))}async function Pe(e,t,a,n){let s=Math.floor(Date.parse(a+"T00:00:00Z")/1e3)-86400,r=Math.floor(Date.parse(n+"T00:00:00Z")/1e3)+2*86400,o=A=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date(A)),m=[],d=await e.ADMIN_KV.get("orderstatus"),p=d?JSON.parse(d):{},y="",h=!1;for(let A=0;A<5;A++){let c=await t(e,`/checkout/sessions?limit=100&created[gte]=${s}&created[lte]=${r}&expand[]=data.line_items${y?"&starting_after="+y:""}`);for(let i of c.data){if(i.payment_status!=="paid"||i.metadata&&i.metadata.kind==="class")continue;let g=i.metadata&&i.metadata.fulfillment||"ship",u=i.created*1e3,C=i.customer_details||{};m.push({ts:u,id:i.id,channel:g==="inperson"?"In person - Card":g==="event"?"Online - Event pickup":g==="pickup"?"Online - Pickup":g==="digital"?"Online - Digital":"Online - Ship",customer:C.name||"",email:C.email||"",location:i.metadata&&i.metadata.event||"",status:p[i.id]||(g==="inperson"?"fulfilled":"new"),items:(i.line_items&&i.line_items.data||[]).map(f=>`${f.quantity} x ${f.description}`).join("; "),subtotal:i.amount_subtotal||0,shipping:i.total_details&&i.total_details.amount_shipping||0,tax:i.total_details&&i.total_details.amount_tax||0,total:i.amount_total||0})}if(!c.has_more)break;y=c.data[c.data.length-1].id,A===4&&(h=!0)}let b=[];try{b=JSON.parse(await e.ADMIN_KV.get("cashsales")||"[]")}catch{b=[]}for(let A of b)m.push({ts:A.ts,id:A.id,channel:`In person - ${qe[A.method]||"Cash"}`,customer:A.name||"",email:A.email||"",location:A.location||"",status:A.voided?"voided":"fulfilled",items:A.items.map(c=>`${c.qty} x ${c.name} (${c.size})`).join("; "),subtotal:A.subtotal,shipping:0,tax:A.tax,total:A.total});let k=await H(e),E=await Y(e),l=Object.fromEntries(k.map(A=>[A.id,A]));for(let A of E){let c=l[A.classId];m.push({ts:A.ts,id:A.sid,channel:"Class booking",customer:A.name,email:A.email,location:c?`${c.title} (${c.date})`:"",status:"paid",items:`${A.seats} seat(s)`,subtotal:A.cents,shipping:0,tax:0,total:A.cents})}return{rows:m.map(A=>({...A,date:o(A.ts)})).filter(A=>A.date>=a&&A.date<=n).sort((A,c)=>c.ts-A.ts),truncated:h}}var et=e=>(e=e==null?"":String(e),/^[=+\-@\t\r]/.test(e)&&(e="'"+e),/[",\n\r]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e),ie=(e,t)=>"\uFEFF"+[e,...t].map(a=>a.map(et).join(",")).join(`\r
`),M=e=>((e||0)/100).toFixed(2),Ee=e=>new Date(e).toLocaleTimeString("en-US",{timeZone:"America/Chicago",hour:"numeric",minute:"2-digit"});async function le(e,t,a,n,s,r={}){if(!e.MAIL_URL||!e.MAIL_SECRET)throw new Error("Email is not set up");let o=W(e);if(!o.length)throw new Error("No admin emails are set");let m=await Pe(e,t,a,n),d=r.filter?m.rows.filter(r.filter):m.rows,p=m.truncated,y=d.filter(i=>i.status!=="voided"),h=i=>{let g={};for(let u of y){let C=u[i]||"(none)",f=g[C]||(g[C]={n:0,total:0});f.n++,f.total+=u.total}return Object.entries(g).sort((u,C)=>C[1].total-u[1].total)},b=y.reduce((i,g)=>i+g.total,0),k=[r.heading||`Sales report for ${s} (${a} to ${n})`,"",`Transactions: ${y.length}`,`Total sales: $${M(b)}`,"","By type:",...h("channel").map(([i,g])=>`  ${i}: ${g.n} sale(s), $${M(g.total)}`),"","By location / event:",...h("location").map(([i,g])=>`  ${i}: ${g.n} sale(s), $${M(g.total)}`),"",...(r.extra||(()=>[]))(y),"Refunds are not subtracted. Check Stripe for refunds.",p?"This range was very large, so older orders may be missing.":""],E=ie(["Date","Time","Type","Location","Customer","Email","Items","Subtotal","Shipping","Tax","Total","Status","Reference"],d.map(i=>[i.date,Ee(i.ts),i.channel,i.location,i.customer,i.email,i.items,M(i.subtotal),M(i.shipping),M(i.tax),M(i.total),i.status,i.id])),l=ie(["Date","Time","Location","Customer","Email","Items","Subtotal","Tax","Total","Status"],d.filter(i=>i.channel==="In person - Cash").map(i=>[i.date,Ee(i.ts),i.location,i.customer,i.email,i.items,M(i.subtotal),M(i.tax),M(i.total),i.status])),x=ie(["Booked","Class","Customer","Email","Spots","Paid"],d.filter(i=>i.channel==="Class booking").map(i=>[i.date,i.location,i.customer,i.email,i.items,M(i.total)])),A=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"report_email",secret:e.MAIL_SECRET,to:o,subject:r.subject||`Queen E's Heirr sales report: ${s}`,text:k.join(`
`),files:[{name:`sales-${a}_to_${n}.csv`,text:E},{name:`cash-sales-${a}_to_${n}.csv`,text:l},{name:`class-bookings-${a}_to_${n}.csv`,text:x}]})}),c=await A.json().catch(()=>null);if(!A.ok||!c||c.ok!==!0)throw new Error("The email did not send. Check that the Apps Script has the latest version deployed.");return{sent:o.length,rows:y.length}}async function Te(e,t){if(!e.ADMIN_KV)return"no storage";let a=new Date;if(Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",hour:"numeric",hour12:!1}).format(a))%24!==7)return"not 7 AM";let r=(d=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(d))(new Date(a.getTime()-864e5)),o=[];try{o=JSON.parse(await e.ADMIN_KV.get("eventreports")||"[]")}catch{o=[]}let m=[];for(let d of(await F(e)).filter(p=>p.name&&p.date===r).slice(0,3)){let p=`${d.name}|${d.date}`;if(o.includes(p))continue;let y=new Date(d.date+"T00:00:00Z"),h=new Date(y.getTime()-60*864e5).toISOString().slice(0,10);await le(e,t,h,d.date,`${d.name} (${d.date})`,{filter:b=>b.location===d.name,subject:`Event wrap-up: ${d.name}`,heading:`Event wrap-up for ${d.name}${d.location?" at "+d.location:""} on ${d.date}. Includes online pickup orders, card and cash sales that used this event name.`,extra:b=>{let k={};for(let l of b)for(let x of String(l.items||"").split("; ")){let A=x.match(/^(\d+) x (.+)$/);A&&(k[A[2]]=(k[A[2]]||0)+Number(A[1]))}let E=Object.entries(k).sort((l,x)=>x[1]-l[1]);return["Units sold:",...E.length?E.map(([l,x])=>`  ${x} x ${l}`):["  none recorded"],""]}}),o.push(p),m.push(p)}return await e.ADMIN_KV.put("eventreports",JSON.stringify(o.slice(-200))),m.length?"sent "+m.join(", "):"none due"}async function Oe(e,t){let a=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date),[n,s]=a.split("-").map(Number),r=s===1?12:s-1,o=s===1?n-1:n,m=`${o}-${String(r).padStart(2,"0")}`;if(e.ADMIN_KV&&await e.ADMIN_KV.get("lastreport")===m)return"already sent";let d=`${m}-01`,p=new Date(Date.UTC(o,r,0)).toISOString().slice(0,10),y=new Date(Date.UTC(o,r-1,1)).toLocaleDateString("en-US",{timeZone:"UTC",month:"long",year:"numeric"});return await le(e,t,d,p,y),e.ADMIN_KV&&await e.ADMIN_KV.put("lastreport",m),"sent "+m}async function Me(e,t,a,n){let{stripeGet:s,stripePost:r,stockOf:o,loadCatalog:m,posCheckout:d,posCash:p,sendCashReceipt:y}=n,h=a.pathname;if(h==="/admin"||h==="/admin/")return new Response(pe,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer","Content-Security-Policy":"default-src 'none'; manifest-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"}});if(h==="/admin/thanks"){let x=a.searchParams.get("cancelled")==="1",A=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${x?"Payment cancelled":"Thank you"}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fcfaf7;color:#0e2012;font:400 18px/1.5 Georgia,serif;text-align:center;padding:24px}main{max-width:460px}img{width:96px;height:96px;border-radius:50%}h1{color:#1b3b22;font-size:2.2rem;margin:.6em 0 .2em}p{color:#5c6b5a}a{display:inline-block;margin-top:18px;padding:14px 26px;border-radius:99px;background:#1b3b22;color:#f7f1d8;text-decoration:none;font:600 14px/1 sans-serif;letter-spacing:.1em;text-transform:uppercase}</style></head>
<body><main><img src="/admin/icon-192.png" alt=""><h1>${x?"No payment was taken":"Thank you!"}</h1><p>${x?"Nothing was charged. You can close this window and try again.":"Your payment went through and a receipt is on its way to your email. Enjoy your jars!"}</p><p>If this is a window on top of the sales screen, tap <b>Done</b> to go back.</p><a href="/admin">Back to the sale</a></main></body></html>`;return new Response(A,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"}})}if(h==="/admin/manifest.webmanifest")return new Response(JSON.stringify({name:"Queen E's Heirr Shop Admin Portal",short_name:"QE Admin",start_url:"/admin",scope:"/admin",display:"standalone",background_color:"#fcfaf7",theme_color:"#1b3b22",icons:[{src:"/admin/icon-192.png",sizes:"192x192",type:"image/png"},{src:"/admin/icon-512.png",sizes:"512x512",type:"image/png"}]}),{headers:{"Content-Type":"application/manifest+json","Cache-Control":"public, max-age=3600"}});if(h==="/admin/icon-192.png"||h==="/admin/icon-512.png"){let x=Uint8Array.from(atob(h.includes("192")?Ce:xe),A=>A.charCodeAt(0));return new Response(x,{headers:{"Content-Type":"image/png","Cache-Control":"public, max-age=86400"}})}if(!h.startsWith("/admin/api/"))return null;let b=h.slice(11);if(e.method==="POST"&&b==="login")return _e(e,t);if(e.method==="POST"&&b==="verify")return $e(e,t);let k=await We(e,t);if(!k)return w({error:"Please sign in"},401);let E=x=>x&&x.image&&!se(x.image,a.origin),l=e.method==="POST"||e.method==="PUT"?await e.json().catch(()=>({})):{};try{let x=await ve(b,e.method,l,t,k,{upcoming:Z,readEvents:F,publicClasses:j},w);if(x)return x;if(b==="products"&&e.method==="GET"){let[c,i,g]=await Promise.all([s(t,"/products?active=true&limit=100"),s(t,"/products?active=false&limit=100"),s(t,"/prices?active=true&limit=100&type=one_time")]),u={};for(let v of g.data)(u[typeof v.product=="string"?v.product:v.product.id]||=[]).push(v);let C=(v,S)=>({id:v.id,name:v.name,image:v.images&&v.images[0]||"",active:S,category:z.includes(v.metadata&&v.metadata.category)?v.metadata.category:"Jams",description:v.description||"",digital:(v.metadata&&v.metadata.digital)==="true",buyUrl:v.metadata&&v.metadata.buy_url||"",sort:Number(v.metadata&&v.metadata.sort||1e3),featured:(v.metadata&&v.metadata.featured)==="true",restocked:Number(v.metadata&&v.metadata.restocked||0),sizes:(u[v.id]||[]).map(D=>({priceId:D.id,label:T(v.metadata&&v.metadata.category||"Jams",D.nickname),cents:D.unit_amount,stock:o(D),soldOut:(D.metadata&&D.metadata.sold_out)==="true"})).sort((D,J)=>D.cents-J.cents)}),f=v=>!(v.metadata&&v.metadata.kind==="class");return w({products:c.data.filter(f).map(v=>C(v,!0)).sort((v,S)=>v.sort-S.sort||v.name.localeCompare(S.name)),hidden:i.data.filter(f).map(v=>C(v,!1))})}let A;if(E(l))return w({error:"Photo addresses must come from Stripe (files.stripe.com) or queenesheirr.com"},400);if((A=b.match(/^price\/(price_[A-Za-z0-9]+)$/))&&e.method==="POST"){let c=new URLSearchParams;if("stock"in l){let g=X(l.stock);if(Number.isNaN(g))return w({error:"Stock must be a whole number"},400);c.set("metadata[stock]",g===null?"":String(g))}if("soldOut"in l&&c.set("metadata[sold_out]",l.soldOut?"true":"false"),typeof l.label=="string"){let g=l.label.trim().slice(0,40);if(!g)return w({error:"Give the option a name, like Paperback"},400);let u="Jams";try{let C=await s(t,`/prices/${A[1]}`),f=await s(t,`/products/${typeof C.product=="string"?C.product:C.product.id}`);u=f.metadata&&f.metadata.category||"Jams"}catch{}c.set("nickname",T(u,g))}if(![...c.keys()].length)return w({error:"Nothing to change"},400);let i=null;try{i=await s(t,`/prices/${A[1]}`)}catch{}if(await r(t,`/prices/${A[1]}`,c),i){let g=o(i),u=(i.metadata&&i.metadata.sold_out)==="true",C="stock"in l?X(l.stock):g,f="soldOut"in l?!!l.soldOut:u;if(typeof C=="number"&&C>0&&typeof g=="number"&&C>g||u&&!f)try{await r(t,`/products/${typeof i.product=="string"?i.product:i.product.id}`,new URLSearchParams({"metadata[restocked]":String(Date.now())}))}catch{}}return w({ok:!0})}if((A=b.match(/^price-remove\/(price_[A-Za-z0-9]+)$/))&&e.method==="POST"){let c=await s(t,`/prices/${A[1]}`),i=typeof c.product=="string"?c.product:c.product.id;return(await s(t,`/prices?active=true&limit=100&type=one_time&product=${i}`)).data.length<=1?w({error:"A product needs at least one size. Use \u201CHide from shop\u201D to take the whole product off the site."},400):(await r(t,`/prices/${c.id}`,new URLSearchParams({active:"false"})),w({ok:!0}))}if((A=b.match(/^price-change\/(price_[A-Za-z0-9]+)$/))&&e.method==="POST"){let c=re(l.price);if(c===null)return w({error:"Enter a price like 7.00"},400);let i=await s(t,`/prices/${A[1]}`),g=new URLSearchParams({product:typeof i.product=="string"?i.product:i.product.id,currency:"usd",unit_amount:String(c)});i.nickname&&g.set("nickname",i.nickname);for(let[u,C]of Object.entries(i.metadata||{}))(u==="stock"||u==="sold_out")&&g.set(`metadata[${u}]`,C);return await r(t,"/prices",g),await r(t,`/prices/${i.id}`,new URLSearchParams({active:"false"})),w({ok:!0})}if((A=b.match(/^size\/([A-Za-z0-9_-]+)$/))&&e.method==="POST"){let c=re(l.price),i=X(l.stock),g="Jams";try{let f=await s(t,`/products/${A[1]}`);g=f.metadata&&f.metadata.category||"Jams"}catch{}let u=T(g,String(l.label||"").trim().slice(0,40));if(c===null||!String(l.label||"").trim()||Number.isNaN(i))return w({error:"Give the size a name and a price like 7.00"},400);let C=new URLSearchParams({product:A[1],currency:"usd",unit_amount:String(c),nickname:u});return i!==null&&C.set("metadata[stock]",String(i)),await r(t,"/prices",C),w({ok:!0})}if((A=b.match(/^product\/([A-Za-z0-9_-]+)$/))&&e.method==="POST"){let c=new URLSearchParams;if(typeof l.name=="string"&&l.name.trim()&&c.set("name",l.name.trim().slice(0,100)),typeof l.description=="string"&&c.set("description",l.description.slice(0,1e3)),z.includes(l.category)&&c.set("metadata[category]",l.category),typeof l.digital=="boolean"&&c.set("metadata[digital]",String(l.digital)),typeof l.buyUrl=="string"){let i=l.buyUrl.trim();if(i&&!/^https:\/\/[^\s]{4,480}$/.test(i))return w({error:"The buy link must start with https://"},400);c.set("metadata[buy_url]",i)}return typeof l.active=="boolean"&&c.set("active",String(l.active)),typeof l.featured=="boolean"&&c.set("metadata[featured]",String(l.featured)),se(l.image,a.origin)&&c.set("images[0]",l.image),[...c.keys()].length?(await r(t,`/products/${A[1]}`,c),w({ok:!0})):w({error:"Nothing to change"},400)}if(b==="renew"&&e.method==="GET"){let c=De(JSON.stringify({e:k.e,exp:Date.now()+Se}));return w({token:`${c}.${await K(t.SESSION_SECRET,c)}`})}if(b==="products/order"&&e.method==="POST"){let c=Array.isArray(l.ids)?l.ids.filter(i=>typeof i=="string"&&/^[A-Za-z0-9_-]+$/.test(i)).slice(0,100):[];if(!c.length)return w({error:"Nothing to reorder"},400);for(let i=0;i<c.length;i+=5)await Promise.all(c.slice(i,i+5).map((g,u)=>r(t,`/products/${g}`,new URLSearchParams({"metadata[sort]":String((i+u+1)*10)}))));return w({ok:!0})}if(b==="product"&&e.method==="POST"){let c=String(l.name||"").trim().slice(0,100),i=ke(c),g=Array.isArray(l.sizes)?l.sizes.slice(0,6):[];if(!i||!g.length)return w({error:"A name and at least one size are needed"},400);let u=z.includes(l.category)?l.category:"Jams",C=g.map(S=>({label:String(S.label||"").trim()?T(u,String(S.label).trim().slice(0,40)):"",c:re(S.price),s:X(S.stock)}));if(C.some(S=>!S.label||S.c===null||Number.isNaN(S.s)))return w({error:"Each size needs a name and a price like 7.00"},400);let f=!0;try{await s(t,`/products/${i}`)}catch{f=!1}if(f)return w({error:"A product with that name already exists"},409);let v=new URLSearchParams({id:i,name:c,description:String(l.description||"").slice(0,1e3),"metadata[category]":u,"metadata[sort]":"900"});l.digital===!0&&v.set("metadata[digital]","true"),typeof l.buyUrl=="string"&&/^https:\/\/[^\s]{4,480}$/.test(l.buyUrl.trim())&&v.set("metadata[buy_url]",l.buyUrl.trim()),se(l.image,a.origin)&&v.set("images[0]",l.image),await r(t,"/products",v);for(let S of C){let D=new URLSearchParams({product:i,currency:"usd",unit_amount:String(S.c),nickname:S.label});S.s!==null&&D.set("metadata[stock]",String(S.s)),await r(t,"/prices",D)}return w({ok:!0,id:i})}if(b==="image"&&e.method==="POST"){let c=String(l.data||"");if(!/^[A-Za-z0-9+/=]+$/.test(c)||c.length>9e5)return w({error:"That photo is too large. Try a smaller one."},400);let i=Uint8Array.from(atob(c),C=>C.charCodeAt(0));if(i.length<1e3||i[0]!==255||i[1]!==216||i[2]!==255)return w({error:"Please choose a JPG or PNG photo"},400);let g=new Uint8Array(12);crypto.getRandomValues(g);let u=Array.from(g).map(C=>C.toString(16).padStart(2,"0")).join("");return await t.ADMIN_KV.put("img:"+u,i),w({ok:!0,url:`${a.origin}/img/${u}.jpg`})}if(b==="events"&&e.method==="GET")return w({events:await F(t)});if(b==="events"&&e.method==="PUT"){let c=(Array.isArray(l.events)?l.events:[]).slice(0,100),i=[];for(let g of c){let u=String(g.name||"").trim().slice(0,100),C=String(g.date||""),f=String(g.orderBy||"");if(!u||!/^\d{4}-\d{2}-\d{2}$/.test(C)||f&&!/^\d{4}-\d{2}-\d{2}$/.test(f))return w({error:"Each event needs a name and a date"},400);i.push({id:/^[a-z0-9-]{3,40}$/.test(g.id||"")?g.id:ke(u).slice(0,30)+"-"+C,name:u,date:C,location:String(g.location||"").trim().slice(0,200),orderBy:f,show:g.show!==!1})}return await t.ADMIN_KV.put("events",JSON.stringify(i)),w({ok:!0,events:i})}if(b==="classes"&&e.method==="GET")return w({classes:await $(t)});if(b==="classes"&&e.method==="PUT"){let c;try{c=he(l.classes)}catch(i){return w({error:i.message},400)}return await t.ADMIN_KV.put("classes",JSON.stringify(c)),w({ok:!0,classes:await $(t)})}if(b==="bookings"&&e.method==="GET")return w({bookings:await fe(t)});if(b==="requests"&&e.method==="GET"){let c=await s(t,"/quotes?limit=40&expand[]=data.customer"),i=/^(sk|rk)_test_/.test(t.STRIPE_SECRET_KEY||""),g=c.data.filter(Be).map(u=>({id:u.id,status:u.status,created:u.created*1e3,total:u.amount_total||0,name:u.customer&&u.customer.name||"",email:u.customer&&u.customer.email||"",cls:u.metadata&&u.metadata.class||u.description||"",date:u.metadata&&u.metadata.requested_date||"",attendees:u.metadata&&u.metadata.attendees||"",notes:u.metadata&&u.metadata.notes||"",phone:u.metadata&&u.metadata.phone||"",wholesale:/wholesale/.test(String(u.metadata&&u.metadata.source||"")),business:u.metadata&&u.metadata.business||"",taxId:u.metadata&&u.metadata.tax_id||"",url:`https://dashboard.stripe.com/${i?"test/":""}quotes/${u.id}`}));return w({requests:g})}if(b==="request-action"&&e.method==="POST"){if(!/^qt_[A-Za-z0-9]+$/.test(l.id||"")||!["approve","decline"].includes(l.action))return w({error:"Bad request"},400);let c=await s(t,`/quotes/${l.id}`);if(!Be(c))return w({error:"Not found"},404);if(c.status!=="draft")return w({error:"That request was already handled"},409);let i=await r(t,`/quotes/${l.id}/${l.action==="approve"?"finalize":"cancel"}`,new URLSearchParams);return w({ok:!0,status:i.status})}if(b==="pos-products"&&e.method==="GET")return w({products:await m(t)});if(b==="pos-checkout"&&e.method==="POST")try{return w(await d(t,a.origin,l.items,l.location))}catch(c){return w({error:String(c.message||"Could not start the payment").slice(0,160)},400)}if(b==="pos-cancel"&&e.method==="POST"){if(!/^cs_[A-Za-z0-9_]+$/.test(l.id||""))return w({error:"Bad request"},400);let c=await s(t,`/checkout/sessions/${l.id}`);return!c.metadata||c.metadata.fulfillment!=="inperson"?w({error:"Not found"},404):(c.status==="open"&&await r(t,`/checkout/sessions/${l.id}/expire`,new URLSearchParams),w({ok:!0}))}if(b==="pos-cash"&&e.method==="POST")try{return w(await p(t,l.items,l.email,l.taxPct,l.key,l.name,l.location,l.method,l.paymentId))}catch(c){return w({error:String(c.message||"Could not record the sale").slice(0,160)},400)}if(b==="pos-session"&&e.method==="GET"){let c=a.searchParams.get("id")||"";if(!/^cs_[A-Za-z0-9_]+$/.test(c))return w({error:"Bad request"},400);let i=await s(t,`/checkout/sessions/${c}`);return!i.metadata||i.metadata.fulfillment!=="inperson"?w({error:"Not found"},404):w({paid:i.payment_status==="paid",status:i.status})}if(b==="pay-links"&&e.method==="GET"){let c={};try{c=JSON.parse(await t.ADMIN_KV.get("paylinks")||"{}")}catch{c={}}return w({cashapp:c.cashapp||"",venmo:c.venmo||""})}if(b==="pay-links"&&e.method==="POST"){let c=String(l.cashapp||"").trim().replace(/^https?:\/\/cash\.app\//i,"").replace(/^\$/,"").replace(/\/+$/,""),i=String(l.venmo||"").trim().replace(/^https?:\/\/(account\.)?venmo\.com\/(u\/)?/i,"").replace(/^@/,"").replace(/[/?].*$/,"");return c&&!/^[A-Za-z0-9_]{1,24}$/.test(c)?w({error:"That Cash App name does not look right. It looks like $QueenEsHeirr."},400):i&&!/^[A-Za-z0-9_-]{1,40}$/.test(i)?w({error:"That Venmo username does not look right. It looks like @QueenEs-Heirr."},400):(await t.ADMIN_KV.put("paylinks",JSON.stringify({cashapp:c,venmo:i})),w({ok:!0,cashapp:c,venmo:i}))}if(b==="cash-ledger"&&e.method==="GET"){let c=[];try{c=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{c=[]}return w({sales:c.slice().reverse().map(i=>({id:i.id,ts:i.ts,name:i.name||"",location:i.location||"",email:i.email||"",subtotal:i.subtotal,tax:i.tax,total:i.total,rate:i.rate||0,method:i.method||"cash",paymentId:i.paymentId||"",voided:!!i.voided,items:i.items.map(g=>({name:g.name,size:g.size,qty:g.qty,cents:g.cents}))}))})}if(b==="cash-receipt"&&e.method==="POST"){let c=String(l.email||"").trim().slice(0,200);if(!/^cash_[a-f0-9]+$/.test(l.id||"")||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c))return w({error:"Enter a valid email address"},400);let i=[];try{i=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{i=[]}let g=i.find(C=>C.id===l.id);if(!g)return w({error:"Not found"},404);if(g.voided)return w({error:"That sale was voided"},409);g.email=c,await t.ADMIN_KV.put("cashsales",JSON.stringify(i));let u=await y(t,g);return w({ok:!0,emailed:u,email:c})}if(b==="cash-void"&&e.method==="POST"){if(!/^cash_[a-f0-9]+$/.test(l.id||""))return w({error:"Bad request"},400);let c=[];try{c=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{c=[]}let i=c.find(g=>g.id===l.id);if(!i)return w({error:"Not found"},404);if(i.voided)return w({error:"That sale is already voided"},409);for(let g of i.items){if(!g.priceId)continue;let u=await s(t,`/prices/${g.priceId}`),C=o(u);C!==null&&await r(t,`/prices/${g.priceId}`,new URLSearchParams({"metadata[stock]":String(C+g.qty)}))}return i.voided=!0,i.voidedAt=Date.now(),await t.ADMIN_KV.put("cashsales",JSON.stringify(c)),w({ok:!0})}if(b==="report"&&e.method==="GET"){let c=a.searchParams.get("from")||"",i=a.searchParams.get("to")||"";return!/^\d{4}-\d{2}-\d{2}$/.test(c)||!/^\d{4}-\d{2}-\d{2}$/.test(i)||c>i?w({error:"Choose a start and end date"},400):w(await Pe(t,s,c,i))}if(b==="report-email"&&e.method==="POST"){let c=String(l.from||""),i=String(l.to||"");if(!/^\d{4}-\d{2}-\d{2}$/.test(c)||!/^\d{4}-\d{2}-\d{2}$/.test(i)||c>i)return w({error:"Choose a start and end date"},400);try{return w({ok:!0,...await le(t,s,c,i,`${c} to ${i}`)})}catch(g){return w({error:String(g.message||"Could not send").slice(0,200)},502)}}if(b==="orders"&&e.method==="GET"){let[c,i]=await Promise.all([s(t,"/checkout/sessions?limit=60&expand[]=data.line_items"),t.ADMIN_KV.get("orderstatus")]),g=i?JSON.parse(i):{},u=c.data.filter(f=>f.payment_status==="paid"&&!(f.metadata&&f.metadata.kind==="class")).map(f=>{let v=f.shipping_details||f.collected_information&&f.collected_information.shipping_details||null;return{id:f.id,created:f.created*1e3,total:f.amount_total,status:g[f.id]||((f.metadata&&f.metadata.fulfillment)==="inperson"?"fulfilled":"new"),name:f.customer_details&&f.customer_details.name||"",email:f.customer_details&&f.customer_details.email||"",phone:f.customer_details&&f.customer_details.phone||"",refundUrl:typeof f.payment_intent=="string"&&f.payment_intent?`https://dashboard.stripe.com/${/^(sk|rk)_test_/.test(t.STRIPE_SECRET_KEY||"")?"test/":""}payments/${f.payment_intent}`:"",fulfillment:f.metadata&&f.metadata.fulfillment||"ship",event:f.metadata&&f.metadata.event||"",address:v&&v.address?[v.address.line1,v.address.line2,v.address.city,v.address.state,v.address.postal_code].filter(Boolean).join(", "):"",items:(f.line_items&&f.line_items.data||[]).map(S=>({name:S.description,qty:S.quantity}))}}),C=[];try{C=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{C=[]}for(let f of C.slice(-80))f.voided||u.push({id:f.id,created:f.ts,total:f.total,status:g[f.id]||"fulfilled",name:f.name||"Cash sale",email:f.email||"",phone:"",fulfillment:"inperson",cash:!0,method:f.method||"cash",event:f.location||"",address:"",items:f.items.map(v=>({name:`${v.name} (${v.size})`,qty:v.qty}))});return u.sort((f,v)=>v.created-f.created),w({orders:u})}if(b==="order-status"&&e.method==="POST"){if(!/^(cs|cash)_[A-Za-z0-9_]+$/.test(l.id||"")||!Ke.includes(l.status))return w({error:"Bad request"},400);let c=JSON.parse(await t.ADMIN_KV.get("orderstatus")||"{}");c[l.id]=l.status;let i=Object.keys(c);return i.length>400&&delete c[i[0]],await t.ADMIN_KV.put("orderstatus",JSON.stringify(c)),w({ok:!0})}}catch(x){return console.log("admin error",b,String(x)),w({error:"That did not save. Please try again."},502)}return w({error:"Not found"},404)}async function Ne(e,t){if(!e.ADMIN_KV||!/^[a-f0-9]{16,32}$/.test(t))return new Response("Not found",{status:404});let a=await e.ADMIN_KV.get("img:"+t,"arrayBuffer");return a?new Response(a,{headers:{"Content-Type":"image/jpeg","Cache-Control":"public, max-age=31536000, immutable","X-Content-Type-Options":"nosniff"}}):new Response("Not found",{status:404})}var ce="https://api.stripe.com/v1",Le=40,de=20;function tt(e,t){let a=(e.ALLOWED_ORIGINS||"").split(",").map(s=>s.trim()).filter(Boolean),n=a.includes(t);return{ok:n,headers:{"Access-Control-Allow-Origin":n?t:a[0]||"","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization","Access-Control-Max-Age":"86400",Vary:"Origin"}}}function B(e,t,a){return new Response(JSON.stringify(e),{status:t,headers:{"Content-Type":"application/json",...a}})}async function I(e,t){let a=await fetch(ce+t,{headers:{Authorization:`Bearer ${e.STRIPE_SECRET_KEY}`}});if(!a.ok)throw new Error(`Stripe ${a.status}`);return a.json()}function L(e){let t=e&&e.metadata&&e.metadata.stock;if(t==null||String(t).trim()==="")return null;let a=parseInt(t,10);return Number.isInteger(a)?Math.max(0,a):null}async function U(e){let[t,a]=await Promise.all([I(e,"/products?active=true&limit=100"),I(e,"/prices?active=true&limit=100&type=one_time")]),n=new Map;for(let r of a.data){if(r.currency!=="usd"||typeof r.unit_amount!="number")continue;let o=typeof r.product=="string"?r.product:r.product&&r.product.id;n.has(o)||n.set(o,[]),n.get(o).push(r)}let s=[];for(let r of t.data){let o=n.get(r.id);if(!o||!o.length)continue;let m=(r.metadata&&r.metadata.sold_out)==="true",d=z.includes(r.metadata&&r.metadata.category)?r.metadata.category:"Jams",p=o.map(y=>({label:T(d,y.nickname),priceId:y.id,cents:y.unit_amount,stock:L(y),soldOut:m||(y.metadata&&y.metadata.sold_out)==="true"||L(y)!==null&&L(y)<=0})).sort((y,h)=>y.cents-h.cents||y.label.localeCompare(h.label));s.push({id:r.id,name:r.name,category:d,description:r.description||"",image:r.images&&r.images[0]||"",featured:(r.metadata&&r.metadata.featured)==="true",digital:(r.metadata&&r.metadata.digital)==="true",buyUrl:/^https:\/\/[^\s]+$/.test(r.metadata&&r.metadata.buy_url||"")?r.metadata.buy_url:"",restocked:Number(r.metadata&&r.metadata.restocked||0),sort:Number(r.metadata&&r.metadata.sort||1e3),sizes:p})}return s.sort((r,o)=>r.sort-o.sort||r.name.localeCompare(o.name)),s}async function nt(e,t,a,n){let s=caches.default,r=new Request(new URL("/products",e.url).toString()),o=await s.match(r),m;if(o)m=await o.text();else{try{m=JSON.stringify(await U(t))}catch(p){return console.log("catalog error",String(p)),B({error:"Catalog unavailable"},502,a.headers)}let d=new Response(m,{headers:{"Content-Type":"application/json","Cache-Control":"public, max-age=60"}});n.waitUntil(s.put(r,d))}return new Response(m,{status:200,headers:{"Content-Type":"application/json",...a.headers}})}async function at(e,t,a){let n;try{n=await e.json()}catch{return B({error:"Invalid request"},400,a.headers)}let s=n&&n.items;if(!Array.isArray(s)||s.length===0||s.length>Le)return B({error:"Your bag is empty or too large"},400,a.headers);let r;try{r=await U(t)}catch(l){return console.log("catalog error",String(l)),B({error:"Could not start checkout"},502,a.headers)}r.length||(r=Object.keys(G).map(l=>({id:l,name:G[l].name,sizes:Object.keys(G[l].sizes).map(x=>({label:x,cents:G[l].sizes[x],soldOut:G[l].soldOut.includes(x)}))})));let o=new URLSearchParams,m=new Map,d=0;for(let l of s){let x=r.find(u=>u.id===(l&&l.id)),A=x&&x.sizes.find(u=>u.label===T(x.category,l.size)),c=l&&l.qty;if(!A||!Number.isInteger(c)||c<1||c>de)return B({error:"An item in your bag is no longer available"},400,a.headers);if(x.buyUrl)return B({error:`${x.name} is sold on Amazon. Please use the Buy on Amazon button.`},400,a.headers);if(A.soldOut)return B({error:`${x.name} (${A.label}) is sold out`},400,a.headers);let i=`${x.id}|${A.label}`,g=(m.get(i)||0)+c;if(m.set(i,g),typeof A.stock=="number"&&g>A.stock)return B({error:`Only ${A.stock} left of ${x.name} (${A.label})`},400,a.headers);A.priceId?o.set(`line_items[${d}][price]`,A.priceId):(o.set(`line_items[${d}][price_data][currency]`,"usd"),o.set(`line_items[${d}][price_data][unit_amount]`,String(A.cents)),t.TAX_ENABLED==="true"&&o.set(`line_items[${d}][price_data][tax_behavior]`,"exclusive"),o.set(`line_items[${d}][price_data][product_data][name]`,`${x.name} (${A.label})`)),o.set(`line_items[${d}][quantity]`,String(c)),d++}let p=s.length>0&&s.every(l=>{let x=r.find(A=>A.id===(l&&l.id));return x&&x.digital}),y=!p&&(n.fulfillment==="pickup"||n.fulfillment==="event"),h=null;if(!p&&n.fulfillment==="event"&&(h=Z(await F(t)).find(l=>l.id===n.eventId),!h))return B({error:"That event is no longer taking orders"},400,a.headers);let b=t.SITE_URL||"https://queenesheirr.com";o.set("mode","payment"),o.set("success_url",`${b}/order-confirmed/?session_id={CHECKOUT_SESSION_ID}`),o.set("cancel_url",`${b}/shop/`),o.set("phone_number_collection[enabled]","true"),o.set("metadata[fulfillment]",p?"digital":h?"event":y?"pickup":"ship"),h&&o.set("metadata[event]",`${h.name} (${h.date})`.slice(0,200)),p?(o.set("billing_address_collection","required"),o.set("custom_text[submit][message]","Digital item: nothing ships. We will email your download or access details to the address you enter here.")):y?(o.set("billing_address_collection","required"),o.set("custom_text[submit][message]",h?`Pickup at ${h.name} on ${h.date}${h.location?" ("+h.location+")":""}. We will email you the details.`:"Local pickup: we will email you to arrange a pickup time and place.")):(o.set("shipping_address_collection[allowed_countries][0]","US"),o.set("shipping_options[0][shipping_rate_data][type]","fixed_amount"),o.set("shipping_options[0][shipping_rate_data][display_name]","Flat-rate shipping"),o.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]",String(parseInt(t.SHIPPING_CENTS||"1000",10))),o.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]","usd"),t.TAX_ENABLED==="true"&&o.set("shipping_options[0][shipping_rate_data][tax_behavior]","exclusive")),t.TAX_ENABLED==="true"&&o.set("automatic_tax[enabled]","true");let k=await fetch(`${ce}/checkout/sessions`,{method:"POST",headers:{Authorization:`Bearer ${t.STRIPE_SECRET_KEY}`,"Content-Type":"application/x-www-form-urlencoded"},body:o}),E=await k.json();return!k.ok||!E.url?(console.log("Stripe error",k.status,JSON.stringify(E.error||{})),B({error:"Could not start checkout"},502,a.headers)):B({url:E.url},200,a.headers)}async function st(e,t){let a=n=>new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Queen E's Heirr</title><body style="font:18px Georgia,serif;text-align:center;padding:48px 24px;background:#fcfaf7;color:#1b3b22"><h1>Queen E's Heirr</h1><p>${n}</p>`,{status:410,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}});try{let n=await I(e,`/checkout/sessions/${t}`);return!n.metadata||n.metadata.fulfillment!=="inperson"?a("This payment link is not valid."):n.status!=="open"||!n.url?a(n.payment_status==="paid"?"This order is already paid. Thank you!":"This payment link has expired. Please ask for a new one."):new Response(null,{status:302,headers:{Location:n.url,"Cache-Control":"no-store","Referrer-Policy":"no-referrer"}})}catch{return a("This payment link is not valid.")}}var rt=["cash","cashapp","venmo","tap"];async function it(e,t,a,n,s,r,o,m,d){if(m=rt.includes(m)?m:"cash",d=/^(ch|py)_[A-Za-z0-9]+$/.test(d||"")?d:"",!e.ADMIN_KV)throw new Error("Storage is not set up");if(!Array.isArray(t)||t.length===0||t.length>20)throw new Error("The bag is empty");if(a=String(a||"").trim().slice(0,200),r=String(r||"").trim().slice(0,100),o=String(o||"").trim().slice(0,120),a&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a))throw new Error("That email address does not look right");let p=Math.min(Math.max(parseFloat(n)||0,0),15);s=/^[A-Za-z0-9_-]{8,64}$/.test(s||"")?s:"";let y=[];try{y=JSON.parse(await e.ADMIN_KV.get("cashsales")||"[]")}catch{y=[]}if(s){let u=y.find(C=>C.key===s);if(u)return{ok:!0,id:u.id,total:u.total,emailed:!!u.email,duplicate:!0}}let h=await U(e),b=new Map,k=[],E=0;for(let u of t){let C=h.find(J=>J.id===(u&&u.id)),f=C&&C.sizes.find(J=>J.label===T(C.category,u.size)),v=u&&u.qty;if(!f||!Number.isInteger(v)||v<1||v>de)throw new Error("An item in the bag is no longer available");if(f.soldOut)throw new Error(`${C.name} (${f.label}) is sold out`);let S=`${C.id}|${f.label}`,D=(b.get(S)||0)+v;if(b.set(S,D),typeof f.stock=="number"&&D>f.stock)throw new Error(`Only ${f.stock} left of ${C.name} (${f.label})`);k.push({name:C.name,size:f.label,qty:v,cents:f.cents,priceId:f.priceId,id:C.id}),E+=f.cents*v}let l=Math.round(E*p/100),x=E+l;for(let u of k){if(!u.priceId)continue;let C=await I(e,`/prices/${u.priceId}`),f=L(C);f!==null&&await P(e,`/prices/${u.priceId}`,new URLSearchParams({"metadata[stock]":String(Math.max(0,f-u.qty))}))}let A=new Uint8Array(6);crypto.getRandomValues(A);let c="cash_"+Array.from(A).map(u=>u.toString(16).padStart(2,"0")).join(""),i={id:c,key:s,method:m,paymentId:d,ts:Date.now(),name:r,location:o,email:a,subtotal:E,tax:l,total:x,rate:p,items:k.map(u=>({name:u.name,size:u.size,qty:u.qty,cents:u.cents,priceId:u.priceId}))};y.push(i),await e.ADMIN_KV.put("cashsales",JSON.stringify(y.slice(-1e3)));let g=a?await Re(e,i):!1;return{ok:!0,id:c,total:x,emailed:g}}async function Re(e,t){if(!t.email||!e.MAIL_URL||!e.MAIL_SECRET)return!1;try{let a=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"cash_receipt",secret:e.MAIL_SECRET,sale:t})});if(!a.ok)return!1;let n=await a.json().catch(()=>null);return!!(n&&n.ok===!0)}catch(a){return console.log("cash receipt failed",String(a)),!1}}async function ot(e,t,a,n){if(!Array.isArray(a)||a.length===0||a.length>Le)throw new Error("The bag is empty");let s=await U(e),r=new URLSearchParams,o=new Map,m=0;for(let p of a){let y=s.find(l=>l.id===(p&&p.id)),h=y&&y.sizes.find(l=>l.label===T(y.category,p.size)),b=p&&p.qty;if(!h||!h.priceId||!Number.isInteger(b)||b<1||b>de)throw new Error("An item in the bag is no longer available");if(h.soldOut)throw new Error(`${y.name} (${h.label}) is sold out`);let k=`${y.id}|${h.label}`,E=(o.get(k)||0)+b;if(o.set(k,E),typeof h.stock=="number"&&E>h.stock)throw new Error(`Only ${h.stock} left of ${y.name} (${h.label})`);r.set(`line_items[${m}][price]`,h.priceId),r.set(`line_items[${m}][quantity]`,String(b)),m++}r.set("mode","payment"),r.set("success_url",`${t}/admin/thanks`),r.set("cancel_url",`${t}/admin/thanks?cancelled=1`),r.set("expires_at",String(Math.floor(Date.now()/1e3)+1860)),r.set("metadata[fulfillment]","inperson"),r.set("metadata[event]",String(n||"").trim().slice(0,120)||"In-person sale"),e.TAX_ENABLED==="true"&&(r.set("automatic_tax[enabled]","true"),r.set("billing_address_collection","required"));let d=await P(e,"/checkout/sessions",r);return{url:d.url,id:d.id,pay:`${t}/pay/${d.id}`}}var lt={"Standalone Jam Making & STEM Lab":{id:"class-jam-stem-lab",cents:5500},"Jam Making & Etiquette Combined Class":{id:"class-jam-etiquette",cents:8500},"Private group or event (custom quote)":{id:"class-private-event",cents:8500}};async function P(e,t,a){let n=await fetch(ce+t,{method:"POST",headers:{Authorization:`Bearer ${e.STRIPE_SECRET_KEY}`,"Content-Type":"application/x-www-form-urlencoded"},body:a}),s=await n.json();if(!n.ok)throw new Error(`Stripe ${n.status} ${s.error&&s.error.message}`);return s}async function ct(e,t,a){try{return await I(e,`/products/${t.id}`)}catch{}let n=new URLSearchParams({id:t.id,name:a,"metadata[kind]":"class"});return P(e,"/products",n)}async function dt(e,t,a){let n;try{n=await e.json()}catch{return B({error:"Invalid request"},400,a.headers)}let s=String(n&&n.name||"").trim().slice(0,100),r=String(n&&n.email||"").trim().slice(0,200),o=lt[n&&n.class],m=parseInt(n&&n.attendees,10),d=String(n&&n.date||"").slice(0,10),p=String(n&&n.notes||"").slice(0,1e3);if(n&&n.website||!s||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r)||!o||!(m>=1&&m<=30)||!/^\d{4}-\d{2}-\d{2}$/.test(d))return B({error:"Invalid request"},400,a.headers);try{await ct(t,o,n.class);let h=(await I(t,`/customers?email=${encodeURIComponent(r)}&limit=1`)).data[0]||await P(t,"/customers",new URLSearchParams({name:s,email:r})),b=new URLSearchParams({customer:h.id,description:`${n.class} - requested date ${d}, ${m} attendee(s).`,"metadata[requested_date]":d,"metadata[attendees]":String(m),"metadata[notes]":p.slice(0,480),"metadata[source]":"queenesheirr.com class request","metadata[class]":String(n.class).slice(0,100),"metadata[phone]":String(n&&n.phone||"").slice(0,40),"line_items[0][price_data][currency]":"usd","line_items[0][price_data][product]":o.id,"line_items[0][price_data][unit_amount]":String(o.cents),"line_items[0][quantity]":String(m)}),k=await P(t,"/quotes",b);return B({ok:!0,quote:k.id},200,a.headers)}catch(y){return console.log("quote error",String(y)),B({error:"Could not create quote"},502,a.headers)}}var ut=200;async function pt(e,t,a){let n;try{n=await e.json()}catch{return B({error:"Invalid request"},400,a.headers)}let s=String(n&&n.business||"").trim().slice(0,100),r=String(n&&n.contact||"").trim().slice(0,100),o=String(n&&n.email||"").trim().slice(0,200);if(n&&n.website||!s||!r||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o)||!Array.isArray(n.items)||!n.items.length||n.items.length>40)return B({error:"Invalid request"},400,a.headers);try{let m=await U(t),d=[];for(let l of n.items){let x=parseInt(l&&l.qty,10),A=m.find(i=>i.id===(l&&l.id)),c=A&&A.sizes.find(i=>i.label===T(A.category,l.size));if(!c||!(x>=1&&x<=500))return B({error:"Invalid request"},400,a.headers);d.push({product:A,size:c,qty:x,cents:Math.max(100,c.cents-ut)})}let y=(await I(t,`/customers?email=${encodeURIComponent(o)}&limit=1`)).data[0]||await P(t,"/customers",new URLSearchParams({name:s,email:o})),h=d.map(l=>`${l.qty} x ${l.product.name} (${l.size.label})`).join("; "),b=d.reduce((l,x)=>l+x.qty,0),k=new URLSearchParams({customer:y.id,description:`Wholesale order - ${s}, ${b} jar(s) at retail less $2.00 each.`.slice(0,500),"metadata[source]":"queenesheirr.com wholesale request","metadata[class]":"Wholesale order","metadata[business]":s,"metadata[contact]":r,"metadata[tax_id]":String(n&&n.tax_id||"").slice(0,60),"metadata[phone]":String(n&&n.phone||"").slice(0,40),"metadata[attendees]":String(b),"metadata[notes]":(String(n&&n.notes||"").slice(0,200)+" | "+h).slice(0,490)});d.forEach((l,x)=>{k.set(`line_items[${x}][price_data][currency]`,"usd"),k.set(`line_items[${x}][price_data][product]`,l.product.id),k.set(`line_items[${x}][price_data][unit_amount]`,String(l.cents)),k.set(`line_items[${x}][quantity]`,String(l.qty))});let E=await P(t,"/quotes",k);return B({ok:!0,quote:E.id},200,a.headers)}catch(m){return console.log("wholesale quote error",String(m)),B({error:"Could not create quote"},502,a.headers)}}async function mt(e,t,a){let n=e.headers.get("Authorization")||"";if(!t.ADMIN_TOKEN||n!==`Bearer ${t.ADMIN_TOKEN}`)return B({error:"Not found"},404,a.headers);let s={created:[],skipped:[],errors:[]};for(let r of ue)try{let o=!0;try{await I(t,`/products/${r.id}`)}catch{o=!1}o||await P(t,"/products",new URLSearchParams({id:r.id,name:r.name,description:r.description||"","metadata[category]":r.category,"metadata[sort]":String(r.sort)}));let m=await I(t,`/prices?product=${encodeURIComponent(r.id)}&active=true&limit=20`),d=new Set(m.data.map(p=>p.nickname));for(let p of r.sizes){if(d.has(p.label)){s.skipped.push(`${r.id} ${p.label}`);continue}let y=new URLSearchParams({product:r.id,currency:"usd",unit_amount:String(p.cents),nickname:p.label});p.soldOut&&y.set("metadata[sold_out]","true"),await P(t,"/prices",y),s.created.push(`${r.id} ${p.label}`)}}catch(o){s.errors.push(`${r.id}: ${String(o)}`)}return B(s,s.errors.length?502:200,a.headers)}async function ht(e,t,a){if(!e||!t)return!1;let s=Object.fromEntries(t.split(",").map(p=>p.split("=").map(y=>y.trim())).filter(p=>p.length===2)).t,r=t.split(",").map(p=>p.trim()).filter(p=>p.startsWith("v1=")).map(p=>p.slice(3));if(!s||!r.length||Math.abs(Date.now()/1e3-Number(s))>300)return!1;let o=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),m=new Uint8Array(await crypto.subtle.sign("HMAC",o,new TextEncoder().encode(`${s}.${a}`))),d=Array.from(m).map(p=>p.toString(16).padStart(2,"0")).join("");return r.some(p=>p.length===d.length&&p.split("").reduce((y,h,b)=>y|h.charCodeAt(0)^d.charCodeAt(b),0)===0)}async function At(e,t){let a=await e.text();if(!await ht(t.STRIPE_WEBHOOK_SECRET,e.headers.get("Stripe-Signature"),a))return new Response("bad signature",{status:400});let n;try{n=JSON.parse(a)}catch{return new Response("bad json",{status:400})}if(n.type!=="checkout.session.completed"&&n.type!=="checkout.session.async_payment_succeeded")return new Response("ignored",{status:200});let s=n.data&&n.data.object;if(!s||s.payment_status!=="paid")return new Response("not paid",{status:200});if(s.metadata&&s.metadata.kind==="class"){try{await ge(t,s)}catch(r){return console.log("booking error",String(r)),new Response("error",{status:500})}return new Response("ok",{status:200})}try{let r=await I(t,`/checkout/sessions/${s.id}/line_items?limit=100`);for(let o of r.data){let m=o.price&&o.price.id;if(!m)continue;let d=await I(t,`/prices/${m}`),p=L(d);if(p===null)continue;let y=String(d.metadata&&d.metadata.applied||"").split(",").filter(Boolean);if(y.includes(s.id))continue;y.push(s.id);let h=new URLSearchParams({"metadata[stock]":String(Math.max(0,p-(o.quantity||0))),"metadata[applied]":y.slice(-5).join(",")});await P(t,`/prices/${m}`,h)}}catch(r){return console.log("webhook error",String(r)),new Response("error",{status:500})}return new Response("ok",{status:200})}async function gt(e,t,a,n){let s=e.headers.get("Authorization")||"";if(!t.ADMIN_TOKEN||s!==`Bearer ${t.ADMIN_TOKEN}`)return B({error:"Not found"},404,a.headers);let r=parseInt(n.searchParams.get("n"),10);if(!Number.isInteger(r)||r<0||r>1e5)return B({error:"Bad n"},400,a.headers);let o={set:[],kept:[],soldOutLeftAlone:[],errors:[]},m=await I(t,"/prices?active=true&limit=100&type=one_time");for(let d of m.data){let p=`${typeof d.product=="string"?d.product:d.product.id} ${d.nickname||"Regular"}`;if(d.metadata&&d.metadata.sold_out==="true"){o.soldOutLeftAlone.push(p);continue}if(L(d)!==null){o.kept.push(`${p} (${L(d)})`);continue}try{await P(t,`/prices/${d.id}`,new URLSearchParams({"metadata[stock]":String(r)})),o.set.push(p)}catch(y){o.errors.push(`${p}: ${String(y)}`)}}return B(o,o.errors.length?502:200,a.headers)}var Nt={async scheduled(e,t,a){let n=Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",day:"numeric"}).format(new Date)),s=Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",hour:"numeric",hour12:!1}).format(new Date))%24;a.waitUntil((async()=>{try{console.log("event reports",await Te(t,I))}catch(r){console.log("event reports failed",String(r))}if(n===1&&s===7)try{console.log("monthly report",await Oe(t,I))}catch(r){console.log("monthly report failed",String(r))}})())},async fetch(e,t,a){let n={ALLOWED_ORIGINS:"https://queenesheirr.com,https://www.queenesheirr.com",SITE_URL:"https://queenesheirr.com",SHIPPING_CENTS:"1000",...t},s=new URL(e.url),r=tt(n,e.headers.get("Origin")||"");if(e.method==="OPTIONS")return new Response(null,{status:204,headers:r.headers});if(n.ADMIN_HOST&&s.hostname===n.ADMIN_HOST&&s.pathname==="/")return Response.redirect(`https://${n.ADMIN_HOST}/admin`,302);if(!n.STRIPE_SECRET_KEY)return B({error:"Not configured"},500,r.headers);if(s.pathname==="/admin"||s.pathname.startsWith("/admin/")){let d=await Me(e,n,s,{stripeGet:I,stripePost:P,stockOf:L,loadCatalog:U,posCheckout:ot,posCash:it,sendCashReceipt:Re});if(d)return d}let o=s.pathname.match(/^\/img\/([a-f0-9]+)\.jpg$/);if(o&&e.method==="GET")return Ne(n,o[1]);let m=s.pathname.match(/^\/pay\/(cs_[A-Za-z0-9_]+)$/);return m&&e.method==="GET"?st(n,m[1]):s.pathname==="/events"&&e.method==="GET"?B(Z(await F(n)),200,{...r.headers,"Cache-Control":"public, max-age=60"}):s.pathname==="/classes"&&e.method==="GET"?B(await j(n),200,{...r.headers,"Cache-Control":"public, max-age=30"}):s.pathname==="/class-checkout"&&e.method==="POST"?r.ok?Ae(e,n,r,{json:B,stripePost:P}):B({error:"Origin not allowed"},403,r.headers):s.pathname==="/products"&&e.method==="GET"?nt(e,n,r,a):s.pathname==="/checkout"&&e.method==="POST"?r.ok?at(e,n,r):B({error:"Origin not allowed"},403,r.headers):s.pathname==="/class-request"&&e.method==="POST"?r.ok?dt(e,n,r):B({error:"Origin not allowed"},403,r.headers):s.pathname==="/wholesale-request"&&e.method==="POST"?r.ok?pt(e,n,r):B({error:"Origin not allowed"},403,r.headers):s.pathname==="/stripe-webhook"&&e.method==="POST"?At(e,n):s.pathname==="/admin/set-stock"&&e.method==="POST"?gt(e,n,r,s):s.pathname==="/admin/seed"&&e.method==="POST"?mt(e,n,r):B({error:"Not found"},404,r.headers)}};export{Nt as default};
