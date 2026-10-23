var _={"four-oz-specialty":{name:"4 oz Specialty Jar",sizes:{"4 oz":350},soldOut:[]},apple:{name:"Apple Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},blackberry:{name:"Blackberry Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"blueberry-ginger":{name:"Blueberry Ginger Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"blueberry-peppered":{name:"Blueberry Peppered Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"braxtons-blueberry-bliss":{name:"Braxton's Blueberry Bliss",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"daring-n-dill":{name:"Daring n Dill",sizes:{"Regular (12 oz)":1e3},soldOut:[]},"jalapeno-pepper":{name:"Jalape\xF1o Pepper Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},peach:{name:"Peach Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},peppered:{name:"Peppered Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"pickled-cucumbers":{name:"Pickled Cucumbers",sizes:{"Large (16 oz)":1500},soldOut:[]},"pineapple-ginger":{name:"Pineapple Ginger Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"pineapple-mango-pepper":{name:"Pineapple Mango Pepper Jam",sizes:{"Regular (8 oz)":700},soldOut:[]},"poppin-sweet-peppers":{name:"Poppin Sweet Peppers",sizes:{"Regular (12 oz)":700},soldOut:[]},raspberry:{name:"Raspberry Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:["Large (12 oz)"]},"spencers-strawberry":{name:"Spencer's Strawberry SweeTTness",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"strawberry-mango":{name:"Strawberry Mango Jam",sizes:{"Regular (8 oz)":700,"Large (12 oz)":1e3},soldOut:[]},"sweet-and-savory":{name:"Sweet and Savory Pickles",sizes:{"Regular (12 oz)":1e3,"Large (16 oz)":1500},soldOut:[]},"tart-n-tangy":{name:"Tart n Tangy Pickles",sizes:{"Regular (12 oz)":1e3,"Large (16 oz)":1500},soldOut:["Regular (12 oz)"]},"wilderness-wild-n-free":{name:"Wilderness / Wild n Free",sizes:{"Large (16 oz)":1800},soldOut:[]}};var mn={Jams:{Regular:8,Large:12},"Pickled goods":{Regular:12,Large:16}},$=["Jams","Pickled goods","Curriculum & Resources","Books"];function F(e,t){if(e!=="Jams"&&e!=="Pickled goods"&&e)return String(t||"").trim().replace(/\s+/g," ")||"Standard";let a=mn[e==="Pickled goods"?"Pickled goods":"Jams"],n=String(t||"").trim().replace(/\s+/g," "),o=p=>`${p} (${a[p]} oz)`;if(!n)return o("Regular");let r=n.match(/(\d+(?:\.\d+)?)\s*oz\b/i);if(r){let p=Number(r[1]);return p===a.Regular?o("Regular"):p===a.Large?o("Large"):n}let s=n.toLowerCase();return s==="regular"?o("Regular"):s==="large"?o("Large"):n}var ut=[{id:"four-oz-specialty",name:"4 oz Specialty Jar",category:"Jams",description:"A small 4 oz jar, ideal for sampling or gifting.",sort:1,sizes:[{label:"4 oz",cents:350,soldOut:!1}]},{id:"apple",name:"Apple Jam",category:"Jams",description:"Crisp seasonal apples cooked into a sweet-tart spread. Good on toast, in oatmeal, or baked into something.",sort:2,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"blackberry",name:"Blackberry Jam",category:"Jams",description:"Ripe blackberries, small batch.",sort:3,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"blueberry-ginger",name:"Blueberry Ginger Jam",category:"Jams",description:"Ripe blueberries with a little zesty ginger. Nice with breakfast or a snack.",sort:4,sizes:[{label:"Regular",cents:700,soldOut:!1}]},{id:"blueberry-peppered",name:"Blueberry Peppered Jam",category:"Jams",description:"Sweet blueberries with a touch of pepper. Try it on cheese and crackers or a charcuterie board.",sort:5,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"braxtons-blueberry-bliss",name:"Braxton's Blueberry Bliss",category:"Jams",description:"Fresh, ripe blueberries for toast, scones, or a spoonful on its own.",sort:6,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"daring-n-dill",name:"Daring n Dill",category:"Pickled goods",description:"Pickled vegetables with a dill bite.",sort:7,sizes:[{label:"Regular",cents:1e3,soldOut:!1}]},{id:"jalapeno-pepper",name:"Jalape\xF1o Pepper Jam",category:"Jams",description:"Zesty and spicy. Use it as a dip or a marinade.",sort:8,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"peach",name:"Peach Jam",category:"Jams",description:"A fan favorite: juicy peaches for toast, pancakes, or baking.",sort:9,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"peppered",name:"Peppered Jam",category:"Jams",description:"Our original: sweet peppers and jalape\xF1os, mild heat. Great on sandwiches and charcuterie boards.",sort:10,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"pickled-cucumbers",name:"Pickled Cucumbers",category:"Pickled goods",description:"Classic dill pickles from fresh cucumbers, dill, and savory spices.",sort:11,sizes:[{label:"16 oz",cents:1500,soldOut:!1}]},{id:"pineapple-ginger",name:"Pineapple Ginger Jam",category:"Jams",description:"A tropical jam with a ginger kick.",sort:12,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"pineapple-mango-pepper",name:"Pineapple Mango Pepper Jam",category:"Jams",description:"Pineapple and mango with a little pepper heat. Try it glazed on chicken or on a cheese board.",sort:13,sizes:[{label:"8 oz",cents:700,soldOut:!1}]},{id:"poppin-sweet-peppers",name:"Poppin Sweet Peppers",category:"Pickled goods",description:"Candied jalape\xF1os: sweet cane sugar, spicy peppers, and our own blend.",sort:14,sizes:[{label:"Regular",cents:700,soldOut:!1}]},{id:"raspberry",name:"Raspberry Jam",category:"Jams",description:"Juicy raspberries for toast, waffles, or ice cream.",sort:15,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!0}]},{id:"spencers-strawberry",name:"Spencer's Strawberry SweeTTness",category:"Jams",description:"Sun-ripened strawberries, cooked slowly. Good on toast, waffles, or straight from the jar.",sort:16,sizes:[{label:"Small 8 oz",cents:700,soldOut:!1},{label:"Large 12 oz",cents:1e3,soldOut:!1}]},{id:"strawberry-mango",name:"Strawberry Mango Jam",category:"Jams",description:"Strawberries and mango for toast, yogurt, or a tropical charcuterie board.",sort:17,sizes:[{label:"8 oz",cents:700,soldOut:!1},{label:"12 oz",cents:1e3,soldOut:!1}]},{id:"sweet-and-savory",name:"Sweet and Savory Pickles",category:"Pickled goods",description:"Fresh cucumbers, dill, and a hint of sugar. Good on sandwiches, burgers, and boards.",sort:18,sizes:[{label:"12 oz",cents:1e3,soldOut:!1},{label:"16 oz",cents:1500,soldOut:!1}]},{id:"tart-n-tangy",name:"Tart n Tangy Pickles",category:"Pickled goods",description:"Bold spices and heat alongside classic dill.",sort:19,sizes:[{label:"12 oz",cents:1e3,soldOut:!0},{label:"16 oz",cents:1500,soldOut:!1}]},{id:"wilderness-wild-n-free",name:"Wilderness / Wild n Free",category:"Pickled goods",description:"16 oz, 9 major ingredients, holistically packed and formulated.",sort:20,sizes:[{label:"16 oz",cents:1800,soldOut:!1}]}];var ht=`<!doctype html>
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
@media print{header,nav,.noprint,.toast,button,.btn{display:none!important}body{background:#fff}.card{break-inside:avoid;box-shadow:none}}
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
  ["Orders & Reports", [["orders", "Orders"], ["requests", "Requests"], ["ledger", "Ledger"], ["reports", "Reports"], ["eventpickups", "Event Pickups"]]],
  ["Products", [["products", "Products"]]],
  ["Shipping", [["toship", "To Ship"], ["shipped", "Shipped"], ["shipsetup", "Shipping Setup"]]],
  ["Events", [["events", "Events"]]],
  ["Blog", [["blog", "Blog Posts"]]],
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
  ({ orders: viewOrders, products: viewProducts, requests: viewRequests, classes: viewClasses, bookings: viewBookings, events: viewEvents, ledger: viewLedger, reports: viewReports, sale: viewSale, eventpickups: viewEventPickups, subscribers: viewSubscribers, campaigns: viewCampaigns, toship: viewToShip, shipped: viewShipped, shipsetup: viewShipSetup, blog: viewBlog })[current](body);
  keepAwake(current === "sale");
}

/* SHIPPING */
function shipBadge(st) { var m = { PRE_TRANSIT: "Label made", TRANSIT: "On the way", DELIVERED: "Delivered", RETURNED: "Returned", FAILURE: "Problem", UNKNOWN: "Label made" }; return m[st] || "Label made"; }
function shipDay(d) { return d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : ""; }
function modeNote(mode) { return mode === "test" ? h("p", { "class": "msg err", text: "Test mode: labels are practice only and cost nothing." }) : mode === "none" ? h("p", { "class": "msg err", text: "Shippo is not connected yet. Add your Shippo key in Cloudflare (a secret named SHIPPO_API_KEY)." }) : null; }
function viewToShip(n) {
  loading(n);
  api("GET", "ship-queue").then(function (d) {
    clear(n);
    var mn = modeNote(d.mode); if (mn) n.appendChild(mn);
    if (!d.ready) n.appendChild(h("p", { "class": "msg err", text: "Fill in Shipping Setup (your ship-from address and phone) before making labels." }));
    n.appendChild(h("p", { "class": "muted", text: "Paid orders that still need to go out. Open one to pick a box, see USPS prices, and print the label." }));
    if (!d.orders.length) n.appendChild(h("p", { "class": "muted", text: "Nothing waiting to ship. Nice work!" }));
    d.orders.forEach(function (o) {
      var box = h("div");
      var card = h("div", { "class": "card" }, [
        h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [h("strong", { text: o.name || o.email }), h("span", { "class": "muted", text: new Date(o.created).toLocaleDateString() })]),
        h("ul", null, o.items.map(function (i) { return h("li", { text: i.qty + " x " + i.name }); })),
        h("p", { "class": "muted", text: o.hasAddress ? o.address : "No shipping address on this order." }),
        h("p", null, [h("button", { "class": "btn small primary", text: "Make label", onclick: function () { if (!box.firstChild) shipPrepare(o, box, function () { viewToShip(n); }); } })]), box]);
      n.appendChild(card);
    });
    if (d.orders.length) n.appendChild(h("p", { "class": "muted", text: "Pickup and drop-off days are set after the label is made, on the Shipped tab." }));
  }).catch(function (er) { failed(n, er); });
}
function shipPrepare(o, box, done) {
  box.appendChild(h("p", { "class": "muted", text: "Getting ready..." }));
  api("POST", "ship-prepare", { id: o.id }).then(function (d) {
    clear(box);
    if (!d.order.address) { box.appendChild(h("p", { "class": "msg err", text: "This order has no shipping address." })); return; }
    var pre = h("select", null, d.presets.map(function (p) { return h("option", { value: p.id, text: p.name + " (" + p.length + "x" + p.width + "x" + p.height + ")" }); }));
    var L = h("input", { inputmode: "decimal" }), W = h("input", { inputmode: "decimal" }), H = h("input", { inputmode: "decimal" }), oz = h("input", { inputmode: "decimal", value: String(d.weightOz) });
    function fill() { var p = d.presets.filter(function (x) { return x.id === pre.value; })[0]; if (p) { L.value = p.length; W.value = p.width; H.value = p.height; } }
    function fill2() { var p = d.presets.filter(function (x) { return x.id === pre.value; })[0]; var flat = p && p.template; [L, W, H].forEach(function (i) { i.disabled = !!flat; }); fill(); }
    pre.onchange = fill2; fill2();
    var out = h("div"), msg = h("p", { "class": "msg", role: "status" }), qr = h("input", { type: "checkbox" });
    var sd = h("input", { type: "date" }), nt = h("input", { type: "checkbox", checked: true });
    box.appendChild(h("div", { "class": "card" }, [
      h("p", { "class": "muted", text: "Customer paid " + money(d.order.shippingPaid || 0) + " for shipping" + (d.order.shipService ? " (" + d.order.shipService + ")" : "") + "." }),
      d.order.zipChanged ? h("p", { "class": "msg err", text: "The customer quoted shipping to a different ZIP than the address they entered. Compare the label price to what they paid." }) : null,
      h("label", null, ["Box", pre]),
      h("div", { "class": "row" }, [h("label", null, ["Length in", L]), h("label", null, ["Width in", W]), h("label", null, ["Height in", H]), h("label", null, ["Weight oz", oz])]),
      h("p", { "class": "muted", text: "Weight is the items plus packing material. Change it if the scale says otherwise. 16 oz = 1 lb." }),
      h("label", { "class": "chk" }, [qr, "No printer: email me a QR code to show at the Post Office"]),
      h("button", { "class": "btn small primary", text: "See USPS prices", onclick: function () {
        msg.className = "msg"; msg.textContent = "Checking USPS..."; clear(out);
        var cur = d.presets.filter(function (x) { return x.id === pre.value; })[0] || {};
        api("POST", "ship-rates", { id: o.id, qr: qr.checked, parcel: { template: cur.template || "", length: L.value, width: W.value, height: H.value, weight: oz.value } }).then(function (r) {
          msg.textContent = (r.warnings && r.warnings[0]) || "";
          out.appendChild(h("label", { "class": "chk" }, [nt, "Email the customer their tracking"]));
          out.appendChild(h("label", null, ["Planned ship date (optional)", sd]));
          r.rates.forEach(function (rt) {
            out.appendChild(h("div", { style: "display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid var(--linen);padding:8px 0" }, [
              h("span", null, [h("strong", { text: rt.service }), h("br"), h("span", { "class": "muted", text: (rt.days ? rt.days + " day" + (rt.days > 1 ? "s" : "") : rt.terms) || "" })]),
              h("button", { "class": "btn small", text: "Buy " + money(Math.round(rt.amount * 100)), onclick: function (e) {
                if (!confirm("Buy this " + rt.service + " label for " + money(Math.round(rt.amount * 100)) + "?")) return;
                e.currentTarget.disabled = true;
                api("POST", "ship-buy", { id: o.id, rateId: rt.id, rateInfo: { service: rt.service, token: rt.token, amount: rt.amount }, shipDate: sd.value, notify: nt.checked, qr: qr.checked }).then(function (b) {
                  clear(box);
                  box.appendChild(h("div", { "class": "card" }, [h("p", { "class": "msg ok", text: "Label ready. Tracking " + b.shipment.trackingNumber + (b.emailed ? ". Customer emailed." : b.emailError ? ". Email not sent: " + b.emailError : ".") + (b.qrEmailed ? " QR code emailed to you." : b.qrError ? " " + b.qrError : "") }),
                    h("p", null, [h("a", { "class": "btn small primary", href: b.shipment.labelUrl, target: "_blank", rel: "noopener noreferrer", text: "Open / print label" }), " ", b.shipment.qrUrl ? h("a", { "class": "btn small", href: b.shipment.qrUrl, target: "_blank", rel: "noopener noreferrer", text: "Open QR code" }) : null, " ", h("button", { "class": "btn small", text: "Done", onclick: done })])]));
                }).catch(function (er) { e.target.disabled = false; msg.className = "msg err"; msg.textContent = er.message; });
              } })]));
          });
        }).catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
      } }), msg, out]));
  }).catch(function (er) { clear(box); box.appendChild(h("p", { "class": "msg err", text: er.message })); });
}
function viewShipped(n) {
  loading(n);
  api("GET", "ship-shipped").then(function (d) {
    clear(n);
    var sel = {};
    var list = d.shipments || [];
    if (!list.length) { n.appendChild(h("p", { "class": "muted", text: "No labels yet." })); return; }
    var date = h("input", { type: "date" }), start = h("input", { type: "time", value: "09:00" }), end = h("input", { type: "time", value: "17:00" });
    var loc = h("select", null, ["Front Door", "Back Door", "Side Door", "Knock on Door or Ring Bell", "Mail Room", "Office", "Reception", "In/At Mailbox", "Other"].map(function (x) { return h("option", { value: x, text: x }); }));
    var ins = h("input", { placeholder: "Where to leave packages (optional)" }), pm = h("p", { "class": "msg", role: "status" }), notifyPlan = h("input", { type: "checkbox" });
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Pickup or drop-off day" }),
      h("p", { "class": "muted", text: "Tick the packages below, pick a day. USPS will pick up Priority Mail packages from your address (free, one request per day). Ground Advantage packages must be dropped off, so just save the day." }),
      h("label", null, ["Day", date]), h("div", { "class": "row" }, [h("label", null, ["From", start]), h("label", null, ["To", end])]),
      h("label", null, ["Where", loc]), h("label", null, ["Note for the carrier", ins]),
      h("label", { "class": "chk" }, [notifyPlan, "Email customers their planned ship day"]), h("p"),
      h("button", { "class": "btn small primary", text: "Schedule USPS pickup", onclick: function () {
        var ids = Object.keys(sel).filter(function (k) { return sel[k]; });
        api("POST", "ship-pickup", { ids: ids, date: date.value, start: start.value, end: end.value, locationType: loc.value, instructions: ins.value }).then(function (r) { toast("Pickup confirmed " + (r.confirmation || "")); viewShipped(n); }).catch(function (er) { pm.className = "msg err"; pm.textContent = er.message; });
      } }), " ",
      h("button", { "class": "btn small", text: "Save as my drop-off day", onclick: function () {
        var ids = Object.keys(sel).filter(function (k) { return sel[k]; });
        api("POST", "ship-dropoff", { ids: ids, date: date.value, notify: notifyPlan.checked }).then(function (r) { toast("Saved for " + r.updated + (r.emailed ? ", emailed " + r.emailed : "")); viewShipped(n); }).catch(function (er) { pm.className = "msg err"; pm.textContent = er.message; });
      } }), pm]));
    list.forEach(function (r) {
      var cb = h("input", { type: "checkbox", onchange: function () { sel[r.id] = cb.checked; } });
      var note = h("input", { placeholder: "Send a quick message about this order" });
      var plan = r.pickup ? "USPS pickup " + shipDay(r.pickup.date) + (r.pickup.confirmation ? " (#" + r.pickup.confirmation + ")" : "") : r.plannedDate ? (r.plan === "dropoff" ? "Drop-off " : "Ship ") + shipDay(r.plannedDate) : "";
      n.appendChild(h("div", { "class": "card" }, [
        h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [h("label", { "class": "chk" }, [cb, h("strong", { text: r.name || r.email })]), h("span", { "class": "pill", text: shipBadge(r.status) })]),
        h("p", { "class": "muted", text: [r.service, r.trackingNumber, r.statusDetail, r.location].filter(Boolean).join(" \xB7 ") }),
        plan ? h("p", { text: plan }) : null,
        h("p", null, [
          r.labelUrl ? h("a", { "class": "btn small", href: r.labelUrl, target: "_blank", rel: "noopener noreferrer", text: "Label" }) : null, " ", r.qrUrl ? h("a", { "class": "btn small", href: r.qrUrl, target: "_blank", rel: "noopener noreferrer", text: "QR code" }) : null, " ",
          r.trackingUrl ? h("a", { "class": "btn small", href: r.trackingUrl, target: "_blank", rel: "noopener noreferrer", text: "Track" }) : null, " ",
          h("button", { "class": "btn small", text: r.notified && r.notified.shipped ? "Resend tracking email" : "Email tracking", onclick: function () { api("POST", "ship-notify", { id: r.id, kind: "shipped" }).then(function () { toast("Sent"); }).catch(function (er) { toast(er.message); }); } }), " ",
          r.status === "PRE_TRANSIT" ? h("button", { "class": "btn small danger", text: "Refund label", onclick: function () { if (!confirm("Cancel this label and ask for a refund? Only works if it has not been scanned.")) return; api("POST", "ship-void", { id: r.id }).then(function () { toast("Refund requested"); viewShipped(n); }).catch(function (er) { toast(er.message); }); } }) : null]),
        h("div", { "class": "row" }, [h("label", null, ["Message to customer", note]), h("button", { "class": "btn small", text: "Send", onclick: function () { api("POST", "ship-notify", { id: r.id, kind: "note", note: note.value }).then(function () { note.value = ""; toast("Sent"); }).catch(function (er) { toast(er.message); }); } })])]));
    });
  }).catch(function (er) { failed(n, er); });
}
function viewShipSetup(n) {
  loading(n);
  api("GET", "ship-settings").then(function (d) {
    clear(n);
    var s = d.settings, f = s.from, mn = modeNote(d.mode); if (mn) n.appendChild(mn);
    var F = {}; ["name", "company", "street1", "street2", "city", "state", "zip", "phone", "email"].forEach(function (k) { F[k] = h("input", { value: f[k] || "" }); });
    var fromCard = h("div", { "class": "card" }, [h("h3", { text: "Ship-from address" }),
      h("div", { "class": "row" }, [h("label", null, ["Your name", F.name]), h("label", null, ["Business", F.company])]),
      h("label", null, ["Street", F.street1]), h("label", null, ["Apt / suite", F.street2]),
      h("div", { "class": "row" }, [h("label", null, ["City", F.city]), h("label", null, ["State (2 letters)", F.state]), h("label", null, ["ZIP", F.zip])]),
      h("div", { "class": "row" }, [h("label", null, ["Phone", F.phone]), h("label", null, ["Email", F.email])])]);
    var R = {}, rt = s.ret || {}; ["company", "street1", "street2", "city", "state", "zip"].forEach(function (k) { R[k] = h("input", { value: rt[k] || "" }); });
    var retCard = h("div", { "class": "card" }, [h("h3", { text: "Return address on the label (optional)" }),
      h("p", { "class": "muted", text: "USPS requires a return address on every label, and customers will see it. To keep her home address private, enter a PO Box or business mailbox here. Her home address above is still used for pickups and for pricing. Leave this blank to print the home address." }),
      h("label", null, ["Name on label", R.company]), h("label", null, ["Street or PO Box", R.street1]), h("label", null, ["Apt / suite", R.street2]),
      h("div", { "class": "row" }, [h("label", null, ["City", R.city]), h("label", null, ["State (2 letters)", R.state]), h("label", null, ["ZIP", R.zip])])]);
    var presets = s.presets.map(function (p) { return { id: p.id, template: p.template || "", maxOz: h("input", { value: p.maxOz || "", inputmode: "decimal" }), name: h("input", { value: p.name }), l: h("input", { value: p.length }), w: h("input", { value: p.width }), h: h("input", { value: p.height }) }; });
    var boxCard = h("div", { "class": "card" }, [h("h3", { text: "Box sizes (inches)" })].concat(presets.map(function (p) { return p.template ? h("div", { "class": "row" }, [h("label", null, ["Name (USPS box)", p.name])]) : h("div", { "class": "row" }, [h("label", null, ["Name", p.name]), h("label", null, ["L", p.l]), h("label", null, ["W", p.w]), h("label", null, ["H", p.h]), h("label", null, ["Website auto-box up to oz", p.maxOz])]); })).concat([h("p", { "class": "muted", text: "For the website's live shipping prices, the app picks the smallest box whose \\"up to oz\\" is at least the bag's weight. Leave blank to never auto-pick that box." })]));
    var WK = ["Jams", "Pickled goods", "Books", "Curriculum & Resources"], WI = {};
    WK.forEach(function (k) { WI[k] = h("input", { value: s.weights[k], inputmode: "decimal" }); });
    var pack = h("input", { value: s.packagingOz, inputmode: "decimal" });
    var markup = h("input", { value: ((s.markupCents || 0) / 100).toFixed(2), inputmode: "decimal" });
    var wCard = h("div", { "class": "card" }, [h("h3", { text: "Typical weights (ounces)" }), h("p", { "class": "muted", text: "Used to guess the package weight. You can set an exact weight on any product, and always change it before buying a label." })]
      .concat(WK.map(function (k) { return h("label", null, [k + " (each)", WI[k]]); }), [h("label", null, ["Box + padding", pack]), h("label", null, ["Extra added to every website shipping price, in dollars (handling)", markup])]));
    var e1 = h("input", { type: "checkbox", checked: s.emailShipped }), e2 = h("input", { type: "checkbox", checked: s.emailDelivered });
    var eCard = h("div", { "class": "card" }, [h("h3", { text: "Customer emails" }),
      h("label", { "class": "chk" }, [e1, "Email tracking when a label is made"]), h("label", { "class": "chk" }, [e2, "Email when USPS shows it was delivered"])]);
    var msg = h("p", { "class": "msg", role: "status" });
    var wh = h("input", { value: d.webhookUrl, readonly: "readonly", onclick: function (e) { e.target.select(); } });
    n.appendChild(fromCard); n.appendChild(retCard); n.appendChild(boxCard); n.appendChild(wCard); n.appendChild(eCard);
    n.appendChild(h("p", null, [h("button", { "class": "btn primary", text: "Save shipping setup", onclick: function () {
      var from = {}; Object.keys(F).forEach(function (k) { from[k] = F[k].value; });
      var weights = {}; WK.forEach(function (k) { weights[k] = WI[k].value; });
      var ret = {}; Object.keys(R).forEach(function (k) { ret[k] = R[k].value; });
      api("POST", "ship-settings", { settings: { from: from, ret: ret, presets: presets.map(function (p) { return { id: p.id, template: p.template, name: p.name.value, length: p.l.value, width: p.w.value, height: p.h.value, maxOz: p.maxOz.value }; }), markup: markup.value, weights: weights, packagingOz: pack.value, emailShipped: e1.checked, emailDelivered: e2.checked } })
        .then(function () { toast("Saved"); msg.className = "msg ok"; msg.textContent = "Saved."; }).catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
    } }), msg]));
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Website shipping prices" }),
      h("p", { "class": d.lastQuote && !d.lastQuote.ok ? "msg err" : "muted", text: d.lastQuote ? "Last price check from the website: " + new Date(d.lastQuote.at).toLocaleString() + (d.lastQuote.ok ? " worked." : " fell back to the flat rate. Reason: " + d.lastQuote.why) : "No price checks from the website yet." })]));
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Delivery updates from Shippo" }),
      h("p", { "class": "muted", text: "In Shippo, go to Settings > API > Webhooks, add a webhook for Track Updated, and paste this address. Then orders mark themselves delivered." }), wh,
      h("p", { "class": "muted", text: d.lastWebhook ? "Last message from Shippo: " + new Date(d.lastWebhook.at).toLocaleString() + (d.lastWebhook.matched ? " (matched a package)" : " (a test or unknown package, nothing to update)") : "Nothing received from Shippo yet. After you press Send sample in Shippo, reload this page to check." })]));
  }).catch(function (er) { failed(n, er); });
}

/* BLOG (Queen Talk) */
var SITE_URL = "https://queenesheirr.com";
function postStatus(p) { return p.status !== "published" ? "Draft" : p.live ? "Published" : "Scheduled " + p.date; }
function viewBlog(n) {
  loading(n);
  api("GET", "blog-posts").then(function (d) { clear(n); blogList(n, d.posts, d.today); }).catch(function (er) { failed(n, er); });
}
function blogList(n, posts, today) {
  n.appendChild(h("p", { "class": "muted", text: "Posts show on your website under Queen Talk. Drafts stay private until you publish. Pick a future date to schedule one." }));
  n.appendChild(h("p", null, [h("button", { "class": "btn primary", text: "Write a new post", onclick: function () { clear(n); blogEditor(n, null, today); } })]));
  if (!posts.length) n.appendChild(h("p", { "class": "muted", text: "No posts yet." }));
  posts.forEach(function (p) {
    var live = p.status === "published" && p.live;
    n.appendChild(h("div", { "class": "card" }, [
      h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [h("strong", { text: p.title }), h("span", { "class": "pill" + (live ? "" : " void"), text: postStatus(p) })]),
      h("p", { "class": "muted", text: [p.category, p.date, p.author].filter(Boolean).join(" \xB7 ") }),
      h("p", null, [h("button", { "class": "btn small primary", text: "Edit", onclick: function () { clear(n); blogEditor(n, p, today); } }), " ",
        live ? h("a", { "class": "btn small", href: SITE_URL + "/stories/post/?s=" + p.slug, target: "_blank", rel: "noopener noreferrer", text: "View on site" }) : null])]));
  });
}
function blogEditor(n, p, today) {
  var isNew = !p; p = p || { title: "", slug: "", category: "", author: "Queen E's Heirr", date: today, status: "draft", image: "", excerpt: "", body: "" };
  var title = h("input", { value: p.title, maxlength: "120" }), cat = h("input", { value: p.category, maxlength: "30", list: "blogcats", placeholder: "Family, Hosting, Recipes..." });
  var cats = h("datalist", { id: "blogcats" }, ["Family", "Hosting", "Recipes", "Leadership", "News"].map(function (c) { return h("option", { value: c }); }));
  var author = h("input", { value: p.author, maxlength: "60" }), date = h("input", { type: "date", value: p.date });
  var status = h("select", null, [["draft", "Draft (private)"], ["published", "Published"]].map(function (o) { return h("option", { value: o[0], selected: o[0] === p.status, text: o[1] }); }));
  var excerpt = h("textarea", { rows: "2", maxlength: "300", placeholder: "One or two sentences shown on the Queen Talk page. Leave blank to use the start of the post." }); excerpt.value = p.excerpt && !isNew ? p.excerpt : "";
  var slug = h("input", { value: p.slug, maxlength: "80", placeholder: "made-from-the-title", autocapitalize: "off" });
  var body = h("textarea", { rows: "16", maxlength: "30000", "aria-label": "Post text", style: "font-family:inherit;line-height:1.5" }); body.value = p.body;
  var cover = photoPicker(p.image, "Cover photo ready.", "Cover photo (optional)");
  var inl = photoPicker("", "Photo ready. Press Add photo to post.", "Photo inside the post");
  var msg = h("p", { "class": "msg", role: "status" });
  function wrap(a, b, ph) { var s0 = body.selectionStart, e0 = body.selectionEnd, sel = body.value.slice(s0, e0) || ph; body.value = body.value.slice(0, s0) + a + sel + b + body.value.slice(e0); body.focus(); body.setSelectionRange(s0 + a.length, s0 + a.length + sel.length); queue(); }
  function line(pre, ph) { var s0 = body.selectionStart; var before = body.value.slice(0, s0), nl = before.length && !/\\n\\n$/.test(before) ? (/\\n$/.test(before) ? "\\n" : "\\n\\n") : ""; body.value = before + nl + pre + ph + "\\n\\n" + body.value.slice(body.selectionEnd); body.focus(); queue(); }
  var bar = h("div", { style: "display:flex;flex-wrap:wrap;gap:6px" }, [
    h("button", { type: "button", "class": "btn small", text: "Heading", onclick: function () { line("## ", "Heading"); } }),
    h("button", { type: "button", "class": "btn small", text: "Bold", onclick: function () { wrap("**", "**", "bold text"); } }),
    h("button", { type: "button", "class": "btn small", text: "Link", onclick: function () { var u = prompt("Paste the web link (starts with https://)"); if (u) wrap("[", "](" + u.trim() + ")", "link text"); } }),
    h("button", { type: "button", "class": "btn small", text: "Bulleted list", onclick: function () { line("- ", "First item\\n- Second item"); } }),
    h("button", { type: "button", "class": "btn small", text: "Quote", onclick: function () { line("> ", "A favorite line"); } })]);
  var frame = h("iframe", { title: "Post preview", sandbox: "", style: "width:100%;height:520px;border:1px solid var(--linen);border-radius:14px;background:#fff" });
  var pt = null;
  function queue() { clearTimeout(pt); pt = setTimeout(prev, 600); }
  function prev() {
    api("POST", "blog-preview", { body: body.value }).then(function (r) {
      frame.srcdoc = '<meta charset="utf-8"><style>body{font:17px/1.7 Georgia,serif;color:#0e2012;max-width:640px;margin:20px auto;padding:0 16px}h2,h3{color:#1b3b22}img{max-width:100%;border-radius:12px}blockquote{border-left:4px solid #d4af37;margin:1em 0;padding:.2em 1em;color:#3d5440}a{color:#1b3b22}figure{margin:1.2em 0}figcaption{font-size:.85em;color:#667}</style><h1 style="color:#1b3b22;font-size:1.8rem">' +
        title.value.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }) + "</h1>" + r.html;
    }).catch(function () {});
  }
  body.addEventListener("input", queue); title.addEventListener("input", queue);
  function save(goStatus) {
    var payload = { id: p.id, title: title.value, slug: slug.value, category: cat.value, author: author.value, date: date.value, status: goStatus || status.value, image: cover.holder.url, excerpt: excerpt.value, body: body.value };
    msg.className = "msg"; msg.textContent = "Saving...";
    return api("POST", "blog-save", payload).then(function (r) { p = r.post; status.value = p.status; slug.value = p.slug; isNew = false; msg.className = "msg ok"; msg.textContent = p.status === "published" ? (p.live ? "Saved and live on your site." : "Saved. It will go live on " + p.date + ".") : "Saved as a draft."; toast("Saved"); drawActions(); return r; })
      .catch(function (er) { msg.className = "msg err"; msg.textContent = er.message; });
  }
  var actions = h("div");
  function drawActions() {
    clear(actions);
    if (p.id && p.status === "published" && p.live) {
      var url = SITE_URL + "/stories/post/?s=" + p.slug, share = location.origin + "/blog/share/" + p.slug;
      actions.appendChild(h("p", null, [h("a", { "class": "btn small", href: url, target: "_blank", rel: "noopener noreferrer", text: "View on site" }), " ",
        h("button", { "class": "btn small", type: "button", text: "Copy link for Facebook/Instagram", onclick: function () { try { navigator.clipboard.writeText(share); toast("Link copied"); } catch (e) { prompt("Copy this link", share); } } }), " ",
        h("button", { "class": "btn small", type: "button", text: "Email this to subscribers", onclick: function () {
          if (!confirm("This opens a new email in Email Campaigns with this post ready. You can edit it and pick who gets it before sending. Continue?")) return;
          ssSet(CAMP_KEY, { subject: p.title, preheader: p.excerpt, headline: p.title, body: p.excerpt, imageUrl: p.image || "", buttonLabel: "Read the Post", buttonUrl: url, greet: true, includeEvents: false, includeClasses: false });
          current = "campaigns"; start();
        } })]));
      actions.appendChild(h("p", { "class": "muted", text: "The Facebook/Instagram link shows the post's title and photo when pasted into a post or message." }));
    }
  }
  n.appendChild(h("p", null, [h("button", { "class": "btn small", text: "\u2190 All posts", onclick: function () { viewBlog(n); } })]));
  n.appendChild(h("div", { "class": "card", style: "display:grid;gap:14px" }, [cats,
    h("label", null, ["Title", title]), h("div", { "class": "row" }, [h("label", null, ["Category", cat]), h("label", null, ["Author", author])]),
    cover.node, h("label", null, ["Short summary (optional)", excerpt]),
    h("div", null, [h("p", { style: "margin:0 0 6px;font-weight:600", text: "Post" }), bar, h("div", { style: "height:6px" }), body,
      h("p", { "class": "muted", text: "Leave a blank line between paragraphs. Use the buttons above for headings, bold, links and lists." })]),
    h("div", null, [inl.node, h("p"), h("button", { type: "button", "class": "btn small", text: "Add photo to post", onclick: function () {
      if (!inl.holder.url) { toast("Choose a photo first"); return; }
      var s0 = body.selectionStart; var cap = prompt("Caption (optional)") || "";
      body.value = body.value.slice(0, s0) + (s0 && !/\\n\\n$/.test(body.value.slice(0, s0)) ? "\\n\\n" : "") + "![" + cap.replace(/[\\[\\]\\n]/g, " ") + "](" + inl.holder.url + ")\\n\\n" + body.value.slice(s0); inl.holder.url = ""; toast("Photo added"); queue();
    } })])]));
  n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Preview" }), frame]));
  n.appendChild(h("div", { "class": "card", style: "display:grid;gap:14px" }, [
    h("div", { "class": "row" }, [h("label", null, ["Publish date", date]), h("label", null, ["Status", status])]),
    h("label", null, ["Web address ending (optional)", slug]),
    h("p", { "class": "muted", text: "Published posts with a date of today or earlier show right away. A later date schedules the post." }),
    h("div", null, [h("button", { "class": "btn primary", text: "Save", onclick: function () { save(); } }), " ",
      h("button", { "class": "btn", text: "Save & publish", onclick: function () { save("published"); } }), " ",
      h("button", { "class": "btn danger", text: "Delete", onclick: function () {
        if (!p.id) { viewBlog(n); return; }
        if (!confirm("Delete this post for good? To just hide it, set it to Draft instead.")) return;
        api("POST", "blog-delete", { id: p.id }).then(function () { toast("Deleted"); viewBlog(n); }).catch(function (er) { toast(er.message); });
      } })]), msg, actions]));
  drawActions(); prev();
}

/* EVENT PICKUPS */
function viewEventPickups(n) {
  loading(n);
  api("GET", "ev-events").then(function (d) {
    clear(n);
    if (!d.events.length) { n.appendChild(h("p", { "class": "muted", text: "No events yet. Add one under Events, and online pickup orders will show up here." })); return; }
    var sel = h("select", { "aria-label": "Event" }, d.events.map(function (e) { return h("option", { value: e.id, text: e.name + " - " + e.date + (e.past ? " (past)" : "") }); }));
    var out = h("div");
    n.appendChild(h("div", { "class": "noprint" }, [h("p", { "class": "muted", text: "Pick an event to see who ordered ahead for pickup. Mark people as picked up at the event. Afterwards you can email everyone who didn't come." }), h("label", null, ["Event", sel])]));
    n.appendChild(out);
    function load() {
      loading(out);
      api("POST", "ev-orders", { eventId: sel.value }).then(function (r) { clear(out); draw(r); }).catch(function (er) { failed(out, er); });
    }
    function draw(r) {
      var left = r.orders.filter(function (o) { return !o.pickedUp; }), picked = r.orders.length - left.length;
      out.appendChild(h("h2", { text: r.event.name }));
      out.appendChild(h("p", { "class": "muted", text: [r.event.date, r.event.time, r.event.location].filter(Boolean).join(" \xB7 ") + " \xB7 " + r.orders.length + " order" + (r.orders.length === 1 ? "" : "s") + ", " + picked + " picked up" }));
      var msg = h("p", { "class": "msg noprint", role: "status" });
      function bulk(kind, label, confirmText) {
        return h("button", { "class": "btn small", text: label, onclick: function (e) {
          if (!confirm(confirmText)) return; var b = e.currentTarget; b.disabled = true; msg.className = "msg"; msg.textContent = "Sending...";
          api("POST", "ev-bulk", { eventId: sel.value, kind: kind }).then(function (x) { msg.className = "msg ok"; msg.textContent = "Sent " + x.sent + (x.failed ? ", " + x.failed + " failed" : "") + (x.remaining ? ". " + x.remaining + " more are waiting, press the button again." : "."); load(); })
            .catch(function (er) { b.disabled = false; msg.className = "msg err"; msg.textContent = er.message; });
        } });
      }
      out.appendChild(h("div", { "class": "noprint", style: "display:flex;gap:8px;flex-wrap:wrap;margin:8px 0" }, [
        h("button", { "class": "btn small primary", text: "Print pick list", onclick: function () { window.print(); } }),
        bulk("reminder", "Email a reminder to everyone not picked up", "Email a reminder to everyone who hasn't picked up yet and hasn't already had one?"),
        bulk("missed", "Send \u201Csorry we missed you\u201D", "Send \u201Csorry we missed you\u201D to everyone NOT marked picked up? Mark the people who did pick up first.")]));
      out.appendChild(msg);
      if (r.tally.length) out.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Bring to the event" })].concat(r.tally.map(function (t) { return h("div", { text: t.qty + " x " + t.name }); }))));
      if (!r.orders.length) out.appendChild(h("p", { "class": "muted", text: "No pickup orders for this event yet." }));
      r.orders.forEach(function (o) {
        var tags = [];
        if (o.notified.confirm) tags.push("confirmed");
        if (o.notified.reminder) tags.push("reminded");
        if (o.notified.missed) tags.push("missed-you sent");
        function mark(done) { api("POST", "order-status", { id: o.id, status: done ? "fulfilled" : "ready" }).then(function () { load(); }).catch(function (er) { toast(er.message); }); }
        function send(kind) { api("POST", "ev-notify", { eventId: sel.value, id: o.id, kind: kind }).then(function () { toast("Sent"); load(); }).catch(function (er) { toast(er.message); }); }
        out.appendChild(h("div", { "class": "card" }, [
          h("div", { style: "display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap" }, [h("strong", { text: o.name || o.email }), h("span", { "class": "pill" + (o.pickedUp ? "" : " event"), text: o.pickedUp ? "Picked up" : "Waiting" })]),
          h("ul", null, o.items.map(function (i) { return h("li", { text: i.qty + " x " + i.name }); })),
          h("p", { "class": "muted", text: [o.email, o.phone].filter(Boolean).join(" \xB7 ") + (tags.length ? " \xB7 " + tags.join(", ") : "") }),
          h("p", { "class": "noprint" }, [
            h("button", { "class": "btn small" + (o.pickedUp ? "" : " primary"), text: o.pickedUp ? "Undo picked up" : "Mark picked up", onclick: function () { mark(!o.pickedUp); } }), " ",
            !o.pickedUp ? h("button", { "class": "btn small", text: "Send reminder", onclick: function () { send("reminder"); } }) : null, " ",
            !o.pickedUp ? h("button", { "class": "btn small", text: "Sorry we missed you", onclick: function () { send("missed"); } }) : null, " ",
            h("button", { "class": "btn small", text: "Resend confirmation", onclick: function () { send("confirm"); } })])]));
      });
    }
    sel.addEventListener("change", load);
    var up = d.events.filter(function (e) { return !e.past; }).slice(-1)[0];
    if (up) sel.value = up.id;
    load();
  }).catch(function (er) { failed(n, er); });
}
/* MARKETING: MAILING LIST */
var SUB_PAGE = 100;
var TAGS = [["jam", "Jams & pickled goods"], ["leadership", "Leadership materials"], ["professional", "Professionals"], ["education", "Schools & organizations"], ["general", "General news"]];
function tagName(t) { var x = TAGS.filter(function (y) { return y[0] === t; })[0]; return x ? x[1] : t; }
function tagPicker(selected) {
  var boxes = TAGS.map(function (t) { return { t: t[0], c: h("input", { type: "checkbox", checked: (selected || []).indexOf(t[0]) > -1 }) }; });
  return { node: h("div", { style: "display:flex;flex-wrap:wrap;gap:6px 16px" }, boxes.map(function (b) { return h("label", { "class": "chk" }, [b.c, tagName(b.t)]); })),
    get: function () { return boxes.filter(function (b) { return b.c.checked; }).map(function (b) { return b.t; }); } };
}
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
    function tagStats() { return TAGS.map(function (t) { return tagName(t[0]) + " " + all.filter(function (x) { return x.status === "subscribed" && (x.tags || ["general"]).indexOf(t[0]) > -1; }).length; }).join(" \xB7 "); }
    var tstats = h("p", { "class": "muted" });
    n.appendChild(h("p", { "class": "muted", text: "This is the same list as the Subscribers tab in your Google Sheet. People who sign up on the website appear here, and anyone who clicks Unsubscribe is marked automatically." }));
    drawStats(); n.appendChild(stats); tstats.textContent = "Groups: " + tagStats(); n.appendChild(tstats);
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Customers Who Opted In at Checkout" }),
      h("p", { "class": "muted", text: "New opt-ins are added automatically. This button catches any that were missed. It only ever adds people who ticked the box, and never anyone who unsubscribed." }),
      h("button", { "class": "btn small", text: "Pull in checkout opt-ins", onclick: function (e) {
        var b = e.currentTarget; b.disabled = true;
        api("POST", "subscribers-from-stripe", {}).then(function (r) { toast("Added " + r.added + (r.tagged ? ", updated " + r.tagged : "")); if (r.added || r.tagged) viewSubscribers(n); else { b.disabled = false; } }).catch(function (er) { b.disabled = false; toast(er.message); });
      } })]));

    function refresh() { viewSubscribers(n); }
    var aName = h("input", { placeholder: "First and last name (optional)", autocomplete: "off", "aria-label": "Name" });
    var aMail = h("input", { type: "email", placeholder: "email@example.com", autocomplete: "off", "aria-label": "Email" });
    var aTags = tagPicker([]);
    var aOk = h("input", { type: "checkbox" }), aMsg = h("p", { "class": "msg", role: "status" });
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Add Someone" }),
      h("div", { "class": "row" }, [h("label", null, ["Name", aName]), h("label", null, ["Email", aMail])]),
      h("p", { "class": "muted", text: "Interests (optional, helps you send the right emails):" }), aTags.node,
      h("label", { "class": "chk" }, [aOk, "This person asked to be on the list"]), h("p"),
      h("button", { "class": "btn primary", text: "Add to list", onclick: function () {
        if (!aOk.checked) { aMsg.className = "msg err"; aMsg.textContent = "Please confirm they asked to be added."; return; }
        api("POST", "subscriber", { op: "add", email: aMail.value, name: aName.value, tags: aTags.get() }).then(function (r) {
          if (r.existing && r.status === "unsubscribed") {
            if (!confirm("This person unsubscribed earlier. Only add them back if they asked you to. Add them back?")) return;
            return api("POST", "subscriber", { op: "add", email: aMail.value, name: aName.value, tags: aTags.get(), resubscribe: true }).then(function () { toast("Added back"); refresh(); });
          }
          toast(r.existing ? "Already on the list" : "Added"); refresh();
        }).catch(function (er) { aMsg.className = "msg err"; aMsg.textContent = er.message; });
      } }), aMsg]));

    var iBox = h("textarea", { rows: "6", placeholder: "One person per line:\\nJane Smith, jane@example.com\\nsam@example.com", "aria-label": "People to import" });
    var iTags = tagPicker([]);
    var iOk = h("input", { type: "checkbox" }), iMsg = h("p", { "class": "msg", role: "status" });
    var iCard = h("div", { "class": "hide" }, [
      h("p", { "class": "muted", text: "Paste people you already have permission to email, such as customers who asked to hear from you. Anyone who unsubscribed before stays unsubscribed. Up to 500 at a time." }),
      iBox, h("p", { "class": "muted", text: "Put everyone in these groups (optional):" }), iTags.node, h("label", { "class": "chk" }, [iOk, "These people asked to hear from Queen E's Heirr"]), h("p"),
      h("button", { "class": "btn primary", text: "Import", onclick: function () {
        var rows = iBox.value.split(/\\n/).map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
          var m = l.match(/[^\\s,;<>"]+@[^\\s,;<>"]+/); if (!m) return { name: "", email: l };
          return { email: m[0], name: l.replace(m[0], "").replace(/[<>",;]/g, " ").replace(/\\s+/g, " ").trim() };
        });
        if (!rows.length) { iMsg.className = "msg err"; iMsg.textContent = "Paste at least one email."; return; }
        api("POST", "subscribers-import", { rows: rows, consent: iOk.checked, tags: iTags.get() }).then(function (r) {
          toast("Added " + r.added);
          iMsg.className = "msg ok"; iMsg.textContent = "Added " + r.added + ". Already on the list: " + r.already + ". Stayed unsubscribed: " + r.unsubscribed + ". Not valid: " + r.invalid + ".";
          if (r.added) setTimeout(refresh, 2500);
        }).catch(function (er) { iMsg.className = "msg err"; iMsg.textContent = er.message; });
      } }), iMsg]);
    n.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Import a List" }),
      h("button", { "class": "btn small", text: "Show import box", onclick: function (e) { iCard.classList.toggle("hide"); e.currentTarget.textContent = iCard.classList.contains("hide") ? "Show import box" : "Hide import box"; } }), iCard]));

    var search = h("input", { type: "search", placeholder: "Search name or email", "aria-label": "Search the list", autocomplete: "off" });
    var sel = h("select", { "aria-label": "Show" }, [["subscribed", "Subscribed"], ["unsubscribed", "Unsubscribed"], ["", "Everyone"]].map(function (o) { return h("option", { value: o[0], text: o[1] }); }));
    var segSel = h("select", { "aria-label": "Group" }, [h("option", { value: "", text: "All groups" })].concat(TAGS.map(function (t) { return h("option", { value: t[0], text: t[1] }); })));
    var seg = "";
    segSel.addEventListener("change", function () { seg = segSel.value; shown = SUB_PAGE; draw(); });
    var list = h("div");
    function draw() {
      clear(list);
      var rows = all.filter(function (x) { return (!flt || x.status === flt) && (!seg || (x.tags || ["general"]).indexOf(seg) > -1) && (!q || (x.name + " " + x.email).toLowerCase().indexOf(q) > -1); })
        .sort(function (a, b) { return (b.on || "").localeCompare(a.on || ""); });
      list.appendChild(h("p", { "class": "muted", text: rows.length + " " + (rows.length === 1 ? "person" : "people") }));
      rows.slice(0, shown).forEach(function (s) {
        var sub = s.status === "subscribed";
        var tp = tagPicker(s.tags || ["general"]);
        var editBox = h("div", { "class": "hide", style: "margin-top:8px" }, [tp.node, h("p"), h("button", { "class": "btn small primary", text: "Save groups", onclick: function () {
          var t = tp.get(); api("POST", "subscriber", { op: "tags", email: s.email, tags: t }).then(function () { s.tags = t.length ? t : ["general"]; tstats.textContent = "Groups: " + tagStats(); toast("Saved"); draw(); }).catch(function (er) { toast(er.message); });
        } })]);
        var nameIn = h("input", { value: s.name, placeholder: "Name", "aria-label": "Name for " + s.email, style: "max-width:240px" });
        nameIn.addEventListener("change", function () {
          api("POST", "subscriber", { op: "name", email: s.email, name: nameIn.value }).then(function () { s.name = nameIn.value; toast("Saved"); }).catch(function (er) { toast(er.message); });
        });
        list.appendChild(h("div", { "class": "card", style: "display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between" }, [
          h("div", null, [h("div", null, [h("a", { href: "mailto:" + s.email, text: s.email }), " ", h("span", { "class": "pill" + (sub ? "" : " void"), text: sub ? "Subscribed" : "Unsubscribed" })]),
            h("div", { "class": "muted", text: s.on ? "Joined " + chiDate(Date.parse(s.on)) : "" }), nameIn,
            h("div", { style: "margin-top:6px" }, [h("span", { "class": "muted", text: "Groups: " + (s.tags || ["general"]).map(tagName).join(", ") + " " }),
              h("button", { "class": "btn small", text: "Edit groups", onclick: function (e) { editBox.classList.toggle("hide"); } })]), editBox]),
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
    n.appendChild(h("div", { "class": "tools" }, [h("label", null, ["Search", search]), h("label", null, ["Show", sel]), h("label", null, ["Group", segSel]),
      h("button", { "class": "btn", text: "Download CSV", onclick: function () {
        csvDownload("mailing-list.csv", ["Name", "Email", "Status", "Joined", "Groups"], all.map(function (s) { return [s.name, s.email, s.status, s.on ? chiDate(Date.parse(s.on)) : "", (s.tags || []).map(tagName).join("; ")]; }));
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
  var aud = { tags: [] }, audCounts = {}, audNote = h("p", { "class": "muted" });
  function audText() {
    var picked = aud.tags;
    var cnt = Object.keys(audCounts).length ? (picked.length ? audCounts.__some(picked) : audCounts.__all) : null;
    audNote.textContent = (picked.length ? "Sending to: " + picked.map(tagName).join(" + ") : "Sending to: everyone subscribed") + (cnt == null ? "" : " (" + cnt + " " + (cnt === 1 ? "person" : "people") + ")");
  }
  api("GET", "subscribers").then(function (r) {
    var subs = (r.subscribers || []).filter(function (x) { return x.status === "subscribed"; });
    audCounts.__all = subs.length;
    audCounts.__some = function (tags) { return subs.filter(function (x) { return (x.tags || ["general"]).some(function (t) { return tags.indexOf(t) > -1; }); }).length; };
    audText();
  }).catch(function () {});
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
  var sendBtn = h("button", { "class": "btn primary", text: "Send", onclick: function () { go(); } });
  function lockForm(on) { sending = on; sendBtn.disabled = on; testBtn.disabled = on; form.style.opacity = on ? ".5" : ""; form.style.pointerEvents = on ? "none" : ""; window.onbeforeunload = on ? function () { return "Your email is still sending."; } : null; }
  function go() {
    if (sending) return;
    smsg.className = "msg"; smsg.textContent = "Checking the list...";
    api("POST", "campaign-start", { fields: fields(), audience: aud.tags }).then(function (s) {
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
        return api("POST", "campaign-done", { id: s.id, audience: aud.tags, fields: fields(), total: s.total, sent: sent, failed: failed }).catch(function () {}).then(function () {
          lockForm(false); bar.style.display = "none"; smsg.className = failed ? "msg err" : "msg ok";
          smsg.textContent = "Done. Sent to " + sent + " of " + s.total + (failed ? ". " + failed + " did not send; check the Campaigns tab in your Google Sheet." : ".");
          history();
        });
      }
      return next();
    }).catch(function (er) { lockForm(false); smsg.className = "msg err"; smsg.textContent = er.message; });
  }
  var audBoxes = TAGS.map(function (t) { var c = h("input", { type: "checkbox" }); c.addEventListener("change", function () { aud.tags = audBoxes.filter(function (b) { return b.c.checked; }).map(function (b) { return b.t; }); audText(); }); return { t: t[0], c: c }; });
  root.appendChild(h("div", { "class": "card" }, [h("h3", { text: "Who Gets It" }),
    h("p", { "class": "muted", text: "Leave everything unticked to email the whole list, or tick groups to reach only those people. Someone in more than one group gets it once." }),
    h("div", { style: "display:flex;flex-wrap:wrap;gap:6px 16px" }, audBoxes.map(function (b) { return h("label", { "class": "chk" }, [b.c, tagName(b.t)]); })), audNote]));
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
  var wt = h("input", { value: p.weightOz || "", inputmode: "decimal", placeholder: "Leave blank to use the category default" });
  var buy = h("input", { value: p.buyUrl || "", placeholder: "https://www.amazon.com/dp/...", inputmode: "url", autocapitalize: "off" });
  var details = h("div", { "class": "hide" }, [
    h("label", null, ["Name", name]), h("label", null, ["Category", cat]), h("label", { "class": "chk" }, [dig, "Digital item (nothing ships, no shipping fee)"]), h("label", null, ["Description", desc]), h("label", null, ["Weight in ounces, packed (for shipping labels)", wt]), h("label", null, ["Outside buy link (optional)", buy]), h("p", { "class": "muted", text: "Add an Amazon link and the website shows a Buy on Amazon button instead of Add to Cart. The item stays here, so you can still sell it at events." }), pick.node,
    h("p"), h("button", { "class": "btn small primary", text: "Save details", onclick: function () {
      var body = { name: name.value, description: desc.value, category: cat.value, digital: dig.checked, buyUrl: buy.value, weightOz: wt.value }; if (pick.holder.url && pick.holder.url !== p.image) body.image = pick.holder.url;
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
        list.appendChild(h("div", { "class": "card" }, [h("div", { "class": "row" }, [f("name", "text", "Event name"), f("date", "date", "Event date"), f("location", "text", "Place"), f("time", "text", "Hours (optional)"), f("orderBy", "date", "Order by (last day)")]),
          h("div", { style: "display:flex;justify-content:space-between;margin-top:10px;gap:8px;flex-wrap:wrap" }, [h("label", { "class": "chk" }, [show, "Show in cart"]),
            h("button", { "class": "btn small danger", text: "Delete", onclick: function () { events.splice(i, 1); draw(); } })])]));
      });
      if (!events.length) list.appendChild(h("p", { "class": "muted", text: "No events yet. Click Add event." }));
    }
    n.appendChild(h("p", { "class": "muted", text: "Events appear as a pickup choice in the cart until the order-by date passes (or the event date if no order-by date is set)." }));
    n.appendChild(etools.el);
    n.appendChild(list);
    n.appendChild(h("div", { "class": "row" }, [
      h("button", { "class": "btn", text: "+ Add event", onclick: function () { events.push({ name: "", date: "", location: "", time: "", orderBy: "", show: true }); draw(); } }),
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
`;var gn=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date);var mt={jam:"Jam making & STEM lab",combined:"Jam making & etiquette",other:"Class"};async function ee(e){if(!e.ADMIN_KV)return[];try{return JSON.parse(await e.ADMIN_KV.get("classes")||"[]")}catch{return[]}}async function te(e){if(!e.ADMIN_KV)return[];try{return JSON.parse(await e.ADMIN_KV.get("bookings")||"[]")}catch{return[]}}function Qe(e,t){return e.filter(a=>a.classId===t).reduce((a,n)=>a+(n.seats||0),0)}function gt(e){let t=[];for(let n of(Array.isArray(e)?e:[]).slice(0,100)){let o=mt[n.type]?n.type:"other",r=String(n.title||"").trim().slice(0,100)||mt[o],s=String(n.date||""),p=String(n.time||""),i=parseInt(n.seats,10),l=parseInt(n.minutes,10)||120,u=Math.round(parseFloat(n.price)*100);if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw new Error("Each class needs a date");if(!/^\d{2}:\d{2}$/.test(p))throw new Error("Each class needs a start time");if(!(i>=1&&i<=200))throw new Error("Seats must be between 1 and 200");if(!(u>=100&&u<=1e5))throw new Error("Price must be between $1 and $1,000 per person");let c=/^[a-z0-9-]{3,48}$/.test(n.id||"")?n.id:`${o}-${s}-${p.replace(":","")}`;t.push({id:c,title:r,type:o,date:s,time:p,minutes:Math.min(Math.max(l,15),720),seats:i,cents:u,price:void 0,location:String(n.location||"").trim().slice(0,200),notes:String(n.notes||"").trim().slice(0,500),show:n.show!==!1})}let a=new Set;for(let n of t)a.has(n.id)&&(n.id+="-"+a.size),a.add(n.id);return t.map(({price:n,...o})=>o)}async function de(e){let[t,a]=await Promise.all([ee(e),te(e)]),n=gn();return t.filter(o=>o.show!==!1&&o.date>=n).sort((o,r)=>(o.date+o.time).localeCompare(r.date+r.time)).map(o=>({id:o.id,title:o.title,type:o.type,date:o.date,time:o.time,minutes:o.minutes,cents:o.cents,location:o.location,notes:o.notes,left:Math.max(0,o.seats-Qe(a,o.id))}))}async function Ne(e){let[t,a]=await Promise.all([ee(e),te(e)]);return t.map(n=>({...n,price:(n.cents/100).toFixed(2),booked:Qe(a,n.id)}))}async function ft(e,t,a,n){let o;try{o=await e.json()}catch{return n.json({error:"Invalid request"},400,a.headers)}let r=parseInt(o&&o.seats,10);if(!(r>=1&&r<=10))return n.json({error:"Please choose 1 to 10 seats"},400,a.headers);let s=(await de(t)).find(l=>l.id===(o&&o.classId));if(!s)return n.json({error:"That class is no longer open for booking"},400,a.headers);if(r>s.left)return n.json({error:s.left?`Only ${s.left} seat(s) left`:"That class is full"},400,a.headers);let p=t.SITE_URL||"https://queenesheirr.com",i=new URLSearchParams;i.set("mode","payment"),i.set("success_url",`${p}/order-confirmed/?class=1&session_id={CHECKOUT_SESSION_ID}`),i.set("cancel_url",`${p}/classes/`),i.set("expires_at",String(Math.floor(Date.now()/1e3)+1860)),i.set("phone_number_collection[enabled]","true"),i.set("line_items[0][quantity]",String(r)),i.set("line_items[0][price_data][currency]","usd"),i.set("line_items[0][price_data][unit_amount]",String(s.cents)),i.set("line_items[0][price_data][product_data][name]",`${s.title} - ${s.date} ${s.time}`.slice(0,120)),i.set("line_items[0][price_data][product_data][description]",`Per person. Seats: ${r}.${s.location?" "+s.location:""}`.slice(0,300)),i.set("metadata[kind]","class"),i.set("metadata[classId]",s.id),i.set("metadata[seats]",String(r)),i.set("payment_intent_data[metadata][kind]","class"),t.CLASS_TAX_ENABLED==="true"&&(i.set("automatic_tax[enabled]","true"),i.set("billing_address_collection","required"),i.set("line_items[0][price_data][tax_behavior]","exclusive"));try{let l=await n.stripePost(t,"/checkout/sessions",i);return n.json({url:l.url},200,a.headers)}catch(l){return console.log("class checkout error",String(l)),n.json({error:"Could not start checkout"},502,a.headers)}}async function At(e,t){let a=t.metadata||{};if(a.kind!=="class"||!e.ADMIN_KV)return;let n=await te(e);if(n.some(p=>p.sid===t.id))return;let o=(await ee(e)).find(p=>p.id===a.classId),r=t.customer_details||{},s={sid:t.id,classId:a.classId||"",name:String(r.name||"").slice(0,100),email:String(r.email||"").slice(0,200),phone:String(r.phone||"").slice(0,40),seats:parseInt(a.seats,10)||1,cents:t.amount_total||0,ts:Date.now()};if(n.push(s),await e.ADMIN_KV.put("bookings",JSON.stringify(n.slice(-1500))),e.MAIL_URL&&e.MAIL_SECRET&&o)try{await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"booking_notice",secret:e.MAIL_SECRET,booking:s,cls:{id:o.id,title:o.title,date:o.date,time:o.time,minutes:o.minutes,location:o.location,notes:o.notes,seats:o.seats,booked:Qe(n,o.id)}})})}catch(p){console.log("booking notice failed",String(p))}}async function wt(e){let[t,a]=await Promise.all([ee(e),te(e)]),n=Object.fromEntries(t.map(o=>[o.id,o]));return a.slice().reverse().map(o=>({...o,cls:n[o.classId]?{title:n[o.classId].title,date:n[o.classId].date,time:n[o.classId].time}:null}))}var V="#1b3b22",be="#d4af37",Me="#fcfaf7",fn="#0e2012",bt="#e5dbd1",Re="Georgia,'Times New Roman',serif",ye="Helvetica,Arial,sans-serif",pe=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,yt=/^https:\/\/[^\s"'<>]{4,500}$/;var An=[["jam","Jams & pickled goods"],["leadership","Leadership materials"],["professional","Professionals"],["education","Schools & organizations"],["general","General news"]],ne=e=>{let t=[];return(Array.isArray(e)?e:String(e||"").split(/[,;]+/)).forEach(a=>{a=String(a||"").trim().toLowerCase(),An.some(n=>n[0]===a)&&!t.includes(a)&&t.push(a)}),t},wn={Jams:"jam","Pickled goods":"jam",Books:"leadership","Curriculum & Resources":"leadership"};function xt(e){let t=[];return(e.line_items&&e.line_items.data||[]).forEach(a=>{let n=a.price&&a.price.product&&typeof a.price.product=="object"?a.price.product:{},o=wn[(n.metadata||{}).category];o&&!t.includes(o)&&t.push(o)}),t.length?t:["general"]}async function kt(e,t,a){let n=t.customer_details||{},o=String(n.email||"").trim().toLowerCase();return pe.test(o)?R(e,"sub_add",{email:o,name:K(n.name,100),tags:xt(t),resubscribe:a===!0}):{skipped:!0}}var M=e=>String(e??"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),K=(e,t)=>String(e??"").replace(/[\r\n]+/g," ").trim().slice(0,t);function bn(e){e=e&&typeof e=="object"?e:{};let t={subject:K(e.subject,150),preheader:K(e.preheader,150),headline:K(e.headline,120),body:String(e.body||"").replace(/\r/g,"").slice(0,8e3).trim(),imageUrl:yt.test(String(e.imageUrl||"").trim())?String(e.imageUrl).trim():"",buttonLabel:K(e.buttonLabel,40),buttonUrl:yt.test(String(e.buttonUrl||"").trim())?String(e.buttonUrl).trim():"",greet:e.greet!==!1,includeEvents:e.includeEvents===!0,includeClasses:e.includeClasses===!0};if(!t.subject)throw new Error("Add a subject line.");if(!t.body&&!t.headline)throw new Error("Add a headline or a message.");if(t.buttonLabel&&!t.buttonUrl)throw new Error("The button needs a link that starts with https://");return t.buttonLabel||(t.buttonUrl=""),t}var Le=e=>new Date(e+"T12:00:00Z").toLocaleDateString("en-US",{timeZone:"UTC",weekday:"short",month:"short",day:"numeric"}),yn=e=>{let[t,a]=String(e||"").split(":").map(Number);return Number.isFinite(t)?`${t%12||12}:${String(a||0).padStart(2,"0")} ${t>=12?"PM":"AM"}`:""},vn=e=>e.replace(/https:\/\/[^\s<&]+(?:&amp;[^\s<&]+)*/g,t=>`<a href="${t}" style="color:${V};font-weight:600">${t}</a>`);function xn(e,t){let a=t.site||"https://queenesheirr.com",n=e.body?e.body.split(/\n{2,}/).map(c=>c.trim()).filter(Boolean):[],o=[],r="",s=c=>`<p style="font:16px/1.65 ${ye};color:${fn};margin:0 0 16px">${c}</p>`,p=c=>`<h3 style="font:700 18px/1.3 ${Re};color:${V};margin:26px 0 8px;border-top:1px solid ${bt};padding-top:20px">${M(c)}</h3>`;e.greet&&(r+=s("{{HI}}"),o.push("{{HI}}","")),n.forEach(c=>{r+=s(vn(M(c)).replace(/\n/g,"<br>")),o.push(c,"")}),e.includeEvents&&t.events&&t.events.length&&(r+=p("Where to find us"),o.push("WHERE TO FIND US"),t.events.slice(0,6).forEach(c=>{r+=s(`<strong>${M(Le(c.date))}</strong> &middot; ${M(c.name)}${c.location?`<br><span style="color:#5c6b5a">${M(c.location)}</span>`:""}`),o.push(`- ${Le(c.date)}: ${c.name}${c.location?" ("+c.location+")":""}`)}),o.push("")),e.includeClasses&&t.classes&&t.classes.length&&(r+=p("Upcoming classes"),o.push("UPCOMING CLASSES"),t.classes.slice(0,6).forEach(c=>{let h=`${Le(c.date)}${c.time?" at "+yn(c.time):""}`,w=c.cents?` &middot; $${(c.cents/100).toFixed(2)}`:"";r+=s(`<strong>${M(c.title)}</strong><br><span style="color:#5c6b5a">${M(h)}${w}</span>`),o.push(`- ${c.title}: ${h}${c.cents?", $"+(c.cents/100).toFixed(2):""}`)}),r+=s(`<a href="${a}/classes/" style="color:${V};font-weight:600">See all classes and book a seat</a>`),o.push(`See all classes: ${a}/classes/`,"")),e.buttonLabel&&e.buttonUrl&&(r+=`<table role="presentation" cellspacing="0" cellpadding="0" style="margin:8px 0 8px"><tr><td style="background:${V};border:2px solid ${be};border-radius:999px"><a href="${M(e.buttonUrl)}" style="display:inline-block;padding:13px 30px;font:700 14px ${ye};letter-spacing:.06em;text-transform:uppercase;color:#fff;text-decoration:none">${M(e.buttonLabel)}</a></td></tr></table>`,o.push(`${e.buttonLabel}: ${e.buttonUrl}`,""));let i=M(t.address||"").replace(/\n/g,"<br>"),l=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${M(e.subject)}</title></head><body style="margin:0;background:${Me}">`+(e.preheader?`<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${Me}">${M(e.preheader)}</div>`:"")+`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${Me}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${bt};border-radius:18px;overflow:hidden"><tr><td align="center" style="background:${V};padding:24px"><a href="${a}" style="font:700 26px ${Re};color:#fff;text-decoration:none">Queen E's Heirr</a><div style="font:11px ${ye};letter-spacing:.2em;text-transform:uppercase;color:${be};margin-top:6px">Curating Culture &amp; Confections</div></td></tr><tr><td style="height:5px;background:${be};line-height:5px;font-size:0">&nbsp;</td></tr>`+(e.imageUrl?`<tr><td><img src="${M(e.imageUrl)}" alt="" width="600" style="display:block;width:100%;height:auto;border:0"></td></tr>`:"")+'<tr><td style="padding:30px 28px 22px">'+(e.headline?`<h1 style="font:700 28px/1.2 ${Re};color:${V};margin:0 0 18px">${M(e.headline)}</h1>`:"")+r+`</td></tr><tr><td align="center" style="background:${V};padding:18px 24px;font:12px/1.7 ${ye};color:#cfd8cd">You are receiving this because you joined the Queen E's Heirr mailing list at queenesheirr.com.<br>`+(i?i+"<br>":"")+`<a href="{{UNSUB}}" style="color:${be}">Unsubscribe</a></td></tr></table></td></tr></table></body></html>`,u=[e.headline?e.headline.toUpperCase():"",e.headline?"":null,...o,"--","Queen E's Heirr | "+a,t.address||"","Unsubscribe: {{UNSUB}}"].filter(c=>c!==null).join(`
`);return{html:l,text:u}}async function R(e,t,a){if(!e.MAIL_URL||!e.MAIL_SECRET)throw new Error("Email is not set up");let n=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"mkt",op:t,secret:e.MAIL_SECRET,...a})}),o=await n.json().catch(()=>null);if(!n.ok||!o||o.ok!==!0)throw new Error(o&&o.error||"The mailing list did not answer. Make sure the newest Google Apps Script version is deployed.");return o}async function vt(e){try{return JSON.parse(await e.ADMIN_KV.get("marketing")||"{}")}catch{return{}}}async function kn(e,t,a,n){let o={site:e.SITE_URL||"https://queenesheirr.com",address:n.address||"",events:[],classes:[]};return a.includeEvents&&(o.events=t.upcoming(await t.readEvents(e))),a.includeClasses&&(o.classes=await t.publicClasses(e)),o}async function Ct(e,t,a,n,o,r,s){if(!/^(subscribers|subscriber|subscribers-import|subscribers-from-stripe|marketing-settings|campaign-[a-z]+|campaigns)$/.test(e))return null;try{if(e==="marketing-settings"&&t==="GET")return s({address:(await vt(n)).address||""});if(e==="marketing-settings"&&t==="POST"){let i=String(a.address||"").replace(/\r/g,"").split(`
`).map(l=>l.trim()).filter(Boolean).slice(0,4).join(`
`).slice(0,300);return await n.ADMIN_KV.put("marketing",JSON.stringify({address:i})),s({ok:!0,address:i})}if(e==="subscribers"&&t==="GET"){let i=await R(n,"sub_list",{});return s({subscribers:i.subscribers,quota:i.quota})}if(e==="subscriber"&&t==="POST"){let i=String(a.email||"").trim().toLowerCase();if(!pe.test(i))return s({error:"That email address does not look right."},400);let l=a.op;return l==="add"?s(await R(n,"sub_add",{email:i,name:K(a.name,100),tags:ne(a.tags),resubscribe:a.resubscribe===!0})):l==="tags"?s(await R(n,"sub_tags",{email:i,tags:ne(a.tags)})):l==="set"?s(await R(n,"sub_set",{email:i,status:a.status==="unsubscribed"?"unsubscribed":"subscribed"})):l==="name"?s(await R(n,"sub_name",{email:i,name:K(a.name,100)})):l==="delete"?s(await R(n,"sub_delete",{email:i})):s({error:"Unknown action"},400)}if(e==="subscribers-import"&&t==="POST"){if(a.consent!==!0)return s({error:"Please confirm these people asked to hear from you."},400);let i=(Array.isArray(a.rows)?a.rows:[]).slice(0,500).map(l=>({name:K(l&&l.name,100),email:String(l&&l.email||"").trim().toLowerCase()}));return s(await R(n,"sub_import",{rows:i,tags:ne(a.tags)}))}if(e==="subscribers-from-stripe"&&t==="POST"){let i=[],l="",u=0;for(let h=0;h<3;h++){let w=await r.stripeGet(n,`/checkout/sessions?limit=100&expand[]=data.line_items.data.price.product${l?"&starting_after="+l:""}`);for(let x of w.data){if(u++,x.payment_status!=="paid"||!x.metadata||x.metadata.optin!=="1")continue;let d=String(x.customer_details&&x.customer_details.email||"").trim().toLowerCase();pe.test(d)&&i.push({email:d,name:K(x.customer_details.name,100),tags:xt(x)})}if(!w.has_more||!w.data.length)break;l=w.data[w.data.length-1].id}if(!i.length)return s({ok:!0,found:0,seen:u,added:0,already:0,unsubscribed:0,tagged:0});let c=await R(n,"sub_import",{rows:i.slice(0,500)});return s({ok:!0,found:i.length,seen:u,added:c.added,already:c.already,unsubscribed:c.unsubscribed,tagged:c.tagged})}if(e==="campaigns"&&t==="GET")return s({campaigns:(await R(n,"camp_list",{})).campaigns});if(e.startsWith("campaign-")&&t==="POST"){let i=bn(a.fields),l=await vt(n),u=await kn(n,r,i,l),c=xn(i,u);if(e==="campaign-preview")return s({html:c.html.split("{{UNSUB}}").join("#").split("{{HI}}").join("Hi Jane,"),missingAddress:!l.address});if(e==="campaign-test"){let h=await R(n,"camp_send",{subject:i.subject,html:c.html,text:c.text,emails:[o.e],test:!0});return s({ok:!0,sent:h.sent,to:o.e})}if(!l.address)return s({error:"Add your mailing address first (it goes in the footer of every email, which the law requires)."},400);if(e==="campaign-start"){let h=await R(n,"sub_list",{}),w=ne(a.audience),x=h.subscribers.filter(b=>b.status==="subscribed"&&pe.test(b.email)&&(!w.length||(b.tags||["general"]).some(f=>w.includes(f)))).map(b=>b.email);if(!x.length)return s({error:w.length?"Nobody is subscribed in that group yet.":"There is nobody subscribed yet."},400);if(x.length>h.quota)return s({error:`Your daily sending limit has ${h.quota} emails left and this list has ${x.length} people. Try again tomorrow.`},400);let d=new Uint8Array(6);return crypto.getRandomValues(d),s({id:Array.from(d).map(b=>b.toString(16).padStart(2,"0")).join(""),audience:w,total:x.length,quota:h.quota,emails:x,chunk:40})}if(e==="campaign-chunk"){let h=(Array.isArray(a.emails)?a.emails:[]).map(x=>String(x).trim().toLowerCase()).filter(x=>pe.test(x)).slice(0,40),w=await R(n,"camp_send",{subject:i.subject,html:c.html,text:c.text,emails:h});return s({ok:!0,sent:w.sent,failed:w.failed,skipped:w.skipped})}if(e==="campaign-done")return await R(n,"camp_log",{id:K(a.id,40),subject:i.subject+(ne(a.audience).length?" ["+ne(a.audience).join("+")+"]":""),total:Number(a.total)||0,sent:Number(a.sent)||0,failed:Number(a.failed)||0}),s({ok:!0})}return s({error:"Not found"},404)}catch(i){return s({error:i.message||"Something went wrong"},400)}}var Cn="https://api.goshippo.com",W="#1b3b22",ze="#d4af37",Ge="#fcfaf7",Je="#0e2012",Fe="#e5dbd1",he="Georgia,'Times New Roman',serif",me="Helvetica,Arial,sans-serif",Ce=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,Ue=/^\d{4}-\d{2}-\d{2}$/,He=/^cs_[A-Za-z0-9_]+$/,je={Jams:14,"Pickled goods":24,Books:12,"Curriculum & Resources":4},Ye={USPS_FlatRateEnvelope:"Flat Rate Envelope",USPS_FlatRateLegalEnvelope:"Legal Flat Rate Envelope",USPS_FlatRatePaddedEnvelope:"Padded Flat Rate Envelope",USPS_SmallFlatRateBox:"Small Flat Rate Box",USPS_FlatRateMediumBox1:"Medium Flat Rate Box (top loading)",USPS_FlatRateMediumBox2:"Medium Flat Rate Box (side loading)",USPS_LargeFlatRateBox:"Large Flat Rate Box"};var Sn=["PRE_TRANSIT","TRANSIT","DELIVERED","RETURNED","FAILURE","UNKNOWN"],En=["Front Door","Back Door","Side Door","Knock on Door or Ring Bell","Mail Room","Office","Reception","In/At Mailbox","Other"],N=e=>String(e??"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),P=(e,t)=>String(e??"").replace(/[\r\n]+/g," ").trim().slice(0,t),z=(e,t,a)=>{if(e===""||e==null)return null;let n=Number(e);return Number.isFinite(n)&&n>=t&&n<=a?n:null},ae={from:{name:"",company:"Queen E's Heirr",street1:"",street2:"",city:"",state:"",zip:"",phone:"",email:"info@queenesheirr.com"},presets:[{id:"small",name:"Small box (1-2 jars)",length:8,width:6,height:4,maxOz:32},{id:"medium",name:"Medium box (3-4 jars)",length:10,width:8,height:6,maxOz:64},{id:"large",name:"Large box (6+ jars)",length:12,width:10,height:8,maxOz:160},{id:"book",name:"Book mailer",length:10,width:7,height:1.5},{id:"flat-s",name:"USPS Small Flat Rate Box",template:"USPS_SmallFlatRateBox",length:0,width:0,height:0},{id:"flat-m",name:"USPS Medium Flat Rate Box",template:"USPS_FlatRateMediumBox1",length:0,width:0,height:0},{id:"flat-l",name:"USPS Large Flat Rate Box",template:"USPS_LargeFlatRateBox",length:0,width:0,height:0}],packagingOz:6,markupCents:0,weights:je,emailShipped:!0,emailDelivered:!0};function Bn(e){e=e&&typeof e=="object"?e:{};let t={name:P(e.name,60),company:P(e.company,60),street1:P(e.street1,80),street2:P(e.street2,60),city:P(e.city,50),state:P(e.state,20).toUpperCase(),zip:P(e.zip,10),phone:P(e.phone,20),email:Ce.test(e.email||"")?String(e.email).trim():""};if(t.state&&!/^[A-Z]{2}$/.test(t.state))throw new Error("Use the 2-letter state, like TX.");if(t.zip&&!/^\d{5}(-\d{4})?$/.test(t.zip))throw new Error("The ZIP code should look like 75001.");return t}async function ge(e){let t={};try{t=JSON.parse(await e.ADMIN_KV.get("shipping")||"{}")}catch{t={}}return Array.isArray(t.presets)&&(t.presets=t.presets.map(a=>a.maxOz==null&&!a.template?{...a,maxOz:(ae.presets.find(n=>n.id===a.id)||{}).maxOz||0}:a)),Array.isArray(t.presets)&&!t.presets.some(a=>a.template)&&(t.presets=t.presets.concat(ae.presets.filter(a=>a.template))),{...ae,ret:{...ae.ret||{}},...t,from:{...ae.from,...t.from||{}},weights:{...je,...t.weights||{}}}}function In(e){e=e&&typeof e=="object"?e:{};let t=e.from||{},a={name:P(t.name,60),company:P(t.company,60),street1:P(t.street1,80),street2:P(t.street2,60),city:P(t.city,50),state:P(t.state,20).toUpperCase(),zip:P(t.zip,10),phone:P(t.phone,20),email:Ce.test(t.email||"")?String(t.email).trim():""};if(a.state&&!/^[A-Z]{2}$/.test(a.state))throw new Error("Use the 2-letter state, like TX.");if(a.zip&&!/^\d{5}(-\d{4})?$/.test(a.zip))throw new Error("The ZIP code should look like 75001.");let n=(Array.isArray(e.presets)?e.presets:[]).slice(0,10).map((s,p)=>{if(s.template&&Ye[s.template])return{id:/^[a-z0-9-]{2,20}$/.test(s.id||"")?s.id:"flat"+(p+1),name:P(s.name,40)||Ye[s.template],template:s.template,length:0,width:0,height:0};let i=z(s.length,1,60),l=z(s.width,1,60),u=z(s.height,.1,60),c=P(s.name,40);if(!c||i==null||l==null||u==null)throw new Error("Each box needs a name and its length, width and height in inches.");return{id:/^[a-z0-9-]{2,20}$/.test(s.id||"")?s.id:"box"+(p+1),name:c,length:i,width:l,height:u,maxOz:z(s.maxOz,0,1120)||0}});if(!n.length)throw new Error("Keep at least one box size.");let o={};for(let[s,p]of Object.entries(je)){let i=z((e.weights||{})[s],0,1600);o[s]=i??p}let r=Bn(e.ret);if(r.street1&&!(r.city&&r.state&&r.zip))throw new Error("The return address needs a city, state and ZIP.");return{from:a,ret:r,presets:n,packagingOz:z(e.packagingOz,0,400)??6,markupCents:Math.round((z(e.markup,0,50)??(e.markupCents/100||0))*100)||0,weights:o,emailShipped:e.emailShipped!==!1,emailDelivered:e.emailDelivered!==!1}}async function re(e,t,a,n){if(!e.SHIPPO_API_KEY)throw new Error("Shippo is not connected yet. Add your Shippo key in Cloudflare (a secret named SHIPPO_API_KEY).");let o=await fetch(Cn+a,{method:t,headers:{Authorization:"ShippoToken "+e.SHIPPO_API_KEY,"Content-Type":"application/json"},body:n?JSON.stringify(n):void 0}),r=await o.json().catch(()=>null);if(!o.ok){let s=r&&(r.detail||Array.isArray(r)&&r[0]&&(r[0].text||r[0])||Object.values(r||{}).flat().map(p=>p&&p.text||p).filter(p=>typeof p=="string")[0]);throw new Error("Shippo said: "+(typeof s=="string"?s:"that request did not work")+".")}return r}var ue=e=>e.SHIPPO_API_KEY?/^shippo_test_/.test(e.SHIPPO_API_KEY)?"test":"live":"none";async function It(e,t){let a=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC",a,new TextEncoder().encode(t)))).map(n=>n.toString(16).padStart(2,"0")).join("")}var Dt=async e=>(await It(e.SESSION_SECRET||"x","shippo-webhook")).slice(0,32),ve=e=>({name:e.name||e.company,company:e.company,street1:e.street1,street2:e.street2,city:e.city,state:e.state,zip:e.zip,country:"US",phone:e.phone,email:e.email});async function se(e,t,a){if(!He.test(a||""))throw new Error("Order not found.");let n=await t.stripeGet(e,`/checkout/sessions/${a}?expand[]=line_items.data.price.product`);if(n.payment_status!=="paid")throw new Error("That order is not paid.");let o=n.shipping_details||n.collected_information&&n.collected_information.shipping_details||null,r=o&&o.address,s=await ge(e),p=(n.line_items&&n.line_items.data||[]).map(i=>{let u=(i.price&&i.price.product&&typeof i.price.product=="object"?i.price.product:{}).metadata||{},c=z(u.weight_oz,0,1600)??s.weights[u.category]??12;return{name:i.description,qty:i.quantity,weightOz:c,digital:u.digital==="true"}});return{id:n.id,created:n.created*1e3,total:n.amount_total,fulfillment:n.metadata&&n.metadata.fulfillment||"ship",shippingPaid:n.total_details&&n.total_details.amount_shipping||n.shipping_cost&&n.shipping_cost.amount_total||0,name:o&&o.name||n.customer_details&&n.customer_details.name||"",email:n.customer_details&&n.customer_details.email||"",phone:n.customer_details&&n.customer_details.phone||"",address:r?{street1:r.line1||"",street2:r.line2||"",city:r.city||"",state:r.state||"",zip:r.postal_code||"",country:r.country||"US"}:null,items:p,quotedZip:n.metadata&&n.metadata.ship_zip||"",shipService:n.metadata&&n.metadata.ship_service||""}}var Dn=e=>({name:e.name,street1:e.address.street1,street2:e.address.street2,city:e.address.city,state:e.address.state,zip:e.address.zip,country:e.address.country,phone:e.phone,email:e.email}),Pn=(e,t)=>Math.round(e.items.filter(a=>!a.digital).reduce((a,n)=>a+n.weightOz*n.qty,0)+t.packagingOz);async function j(e,t){try{return JSON.parse(await e.ADMIN_KV.get("ship:"+t)||"null")}catch{return null}}async function J(e,t){await e.ADMIN_KV.put("ship:"+t.id,JSON.stringify(t));let a=[];try{a=JSON.parse(await e.ADMIN_KV.get("shiplist")||"[]")}catch{a=[]}a.includes(t.id)||(a.unshift(t.id),await e.ADMIN_KV.put("shiplist",JSON.stringify(a.slice(0,300))))}async function Ke(e,t,a){let n={};try{n=JSON.parse(await e.ADMIN_KV.get("orderstatus")||"{}")}catch{n={}}n[t]=a;let o=Object.keys(n);o.length>400&&delete n[o[0]],await e.ADMIN_KV.put("orderstatus",JSON.stringify(n))}var St=e=>new Date(e+"T12:00:00Z").toLocaleDateString("en-US",{timeZone:"UTC",weekday:"long",month:"long",day:"numeric"});function xe(e,t,a,n){let o=n.site||"https://queenesheirr.com",r=String(t.name||"").trim().split(/\s+/)[0]||"",s=e==="delivered"?"Your order was delivered":e==="note"?"An update on your order":e==="shipdate"?"Your order ships soon":"Your order is on the way",p=e==="delivered"?"Your Queen E's Heirr order shows as delivered. We hope you love it!":e==="shipdate"?`Your order is packed and planned to go out on ${a.plannedDate?St(a.plannedDate):"our next shipping day"}. We will email your tracking number as soon as it ships.`:e==="note"?"":"Good news! Your Queen E's Heirr order is packed and has been handed to "+(a.carrier||"USPS")+".",i=(t.items||[]).map(f=>`${f.qty} x ${f.name}`),l=a.trackingNumber?`${a.carrier||"USPS"} tracking number: ${a.trackingNumber}`:"",u=e==="shipped"&&a.plannedDate?`Expected to ship: ${St(a.plannedDate)}.`:"",c=f=>`<p style="font:16px/1.65 ${me};color:${Je};margin:0 0 14px">${f}</p>`,h=t.address,w=h?[h.street1,h.street2,`${h.city}, ${h.state} ${h.zip}`].filter(Boolean):[],x=c(`Hi ${N(r||"there")},`);p&&(x+=c(N(p))),a.note&&(x+=c(N(a.note).replace(/\n/g,"<br>"))),u&&(x+=c(N(u))),e!=="delivered"&&e!=="shipdate"&&a.trackingNumber&&(x+=c(`${N(l)}`),a.trackingUrl&&(x+=`<table role="presentation" cellspacing="0" cellpadding="0" style="margin:6px 0 18px"><tr><td style="background:${W};border:2px solid ${ze};border-radius:999px"><a href="${N(a.trackingUrl)}" style="display:inline-block;padding:13px 30px;font:700 14px ${me};letter-spacing:.06em;text-transform:uppercase;color:#fff;text-decoration:none">Track My Package</a></td></tr></table>`)),i.length&&(x+=`<h3 style="font:700 17px ${he};color:${W};margin:22px 0 6px;border-top:1px solid ${Fe};padding-top:18px">In this package</h3>`+c(i.map(N).join("<br>"))),w.length&&e!=="delivered"&&(x+=`<h3 style="font:700 17px ${he};color:${W};margin:18px 0 6px">Shipping to</h3>`+c(N(t.name)+"<br>"+w.map(N).join("<br>"))),x+=c("Questions? Just reply to this email and we will help.");let d=`<!doctype html><html><body style="margin:0;background:${Ge}"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${Ge}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${Fe};border-radius:18px;overflow:hidden"><tr><td align="center" style="background:${W};padding:24px"><a href="${o}" style="font:700 26px ${he};color:#fff;text-decoration:none">Queen E's Heirr</a></td></tr><tr><td style="height:5px;background:${ze};line-height:5px;font-size:0">&nbsp;</td></tr><tr><td style="padding:30px 28px 18px"><h1 style="font:700 26px/1.2 ${he};color:${W};margin:0 0 18px">${N(s)}</h1>${x}</td></tr><tr><td align="center" style="background:${W};padding:16px 24px;font:12px/1.7 ${me};color:#cfd8cd">Queen E's Heirr &middot; <a href="${o}" style="color:${ze}">queenesheirr.com</a></td></tr></table></td></tr></table></body></html>`,b=[`${s}`,"",`Hi ${r||"there"},`,"",p,a.note||"",u,l,a.trackingUrl?"Track it: "+a.trackingUrl:"","",i.length?`In this package:
`+i.join(`
`):"","","Questions? Reply to this email.","","Queen E's Heirr | "+o].filter((f,k,A)=>f!==""||A[k-1]!=="").join(`
`);return{subject:s+" - Queen E's Heirr",html:d,text:b}}function Tn(e,t){let a="QR code to print at USPS",n=`<!doctype html><html><body style="margin:0;background:${Ge};font:16px/1.6 ${me};color:${Je}"><div style="max-width:520px;margin:0 auto;padding:24px"><h2 style="font-family:${he};color:${W}">${a}</h2><p>Order for <strong>${N(e.name)}</strong> (${N(t.service||"USPS")}, tracking ${N(t.trackingNumber)}).</p><p>Seal the package, then show this code on your phone at a participating Post Office. The clerk scans it and prints the label for you. Do not need a printer.</p><p style="text-align:center"><img src="${N(t.qrUrl)}" alt="QR code" width="260" height="260" style="border:1px solid ${Fe};padding:10px;background:#fff"></p><p><a href="${N(t.qrUrl)}">Open the QR code</a></p></div></body></html>`;return{subject:"QR code for "+(e.name||"order")+" - Queen E's Heirr",html:n,text:`${a}
Order for ${e.name}. Tracking ${t.trackingNumber}.
Show this at a participating Post Office: ${t.qrUrl}`}}async function ie(e,t,a){if(!e.MAIL_URL||!e.MAIL_SECRET)throw new Error("Email is not set up");if(!Ce.test(t||""))throw new Error("This order has no email address to send to.");let n=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"send_html",secret:e.MAIL_SECRET,to:t,subject:a.subject,html:a.html,text:a.text})}),o=await n.json().catch(()=>null);if(!n.ok||!o||o.ok!==!0)throw new Error("The email did not send. Make sure the newest Google Apps Script version is deployed.")}function Et(e,t){let[a,n,o]=e.split("-").map(Number),[r,s]=t.split(":").map(Number),p=Date.UTC(a,n-1,o,r,s),i=new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).formatToParts(new Date(p)),l=c=>Number(i.find(h=>h.type===c).value),u=Date.UTC(l("year"),l("month")-1,l("day"),l("hour"),l("minute"));return new Date(p-(u-p)).toISOString()}var Bt=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date);async function Pt(e,t,a,n,o,r,s,p){if(!/^(ship-[a-z-]+)$/.test(e))return null;try{let i=await ge(n);if(e==="ship-settings"&&t==="GET")return s({settings:i,mode:ue(n),webhookUrl:`${p}/shippo-webhook?k=${await Dt(n)}`,lastQuote:await(async()=>{try{return JSON.parse(await n.ADMIN_KV.get("shipquote")||"null")}catch{return null}})(),lastWebhook:await(async()=>{try{return JSON.parse(await n.ADMIN_KV.get("shipwebhook")||"null")}catch{return null}})(),ready:!!(i.from.street1&&i.from.city&&i.from.state&&i.from.zip&&i.from.phone)});if(e==="ship-settings"&&t==="POST"){let l=In(a.settings);return await n.ADMIN_KV.put("shipping",JSON.stringify(l)),s({ok:!0,settings:{...ae,...l}})}if(e==="ship-queue"&&t==="GET"){let l=await r.stripeGet(n,"/checkout/sessions?limit=60&expand[]=data.line_items"),u=[];for(let c of l.data){if(c.payment_status!=="paid"||c.metadata&&c.metadata.kind==="class"||(c.metadata&&c.metadata.fulfillment||"ship")!=="ship")continue;let w=await j(n,c.id);if(w&&!w.voided)continue;let x=c.shipping_details||c.collected_information&&c.collected_information.shipping_details||null,d=x&&x.address;u.push({id:c.id,created:c.created*1e3,name:x&&x.name||c.customer_details&&c.customer_details.name||"",email:c.customer_details&&c.customer_details.email||"",address:d?[d.line1,d.line2,`${d.city}, ${d.state} ${d.postal_code}`].filter(Boolean).join(", "):"",hasAddress:!!d,country:d?d.country:"",shippingPaid:c.total_details&&c.total_details.amount_shipping||0,items:(c.line_items&&c.line_items.data||[]).map(b=>({name:b.description,qty:b.quantity})),voidedLabel:!!(w&&w.voided)})}return s({orders:u,ready:!!(i.from.street1&&i.from.zip&&i.from.phone),mode:ue(n)})}if(e==="ship-shipped"&&t==="GET"){let l=[];try{l=JSON.parse(await n.ADMIN_KV.get("shiplist")||"[]")}catch{l=[]}let u=[];for(let c of l.slice(0,80)){let h=await j(n,c);h&&!h.voided&&u.push(h)}return s({shipments:u})}if(e==="ship-prepare"&&t==="POST"){let l=await se(n,r,a.id);return s({order:{id:l.id,name:l.name,email:l.email,phone:l.phone,address:l.address,items:l.items,shippingPaid:l.shippingPaid,shipService:l.shipService,zipChanged:!!(l.quotedZip&&l.address&&l.address.zip&&l.address.zip.slice(0,5)!==l.quotedZip)},weightOz:Pn(l,i),presets:i.presets,mode:ue(n),ready:!!(i.from.street1&&i.from.zip&&i.from.phone)})}if(e==="ship-rates"&&t==="POST"){if(!(i.from.street1&&i.from.city&&i.from.state&&i.from.zip&&i.from.phone))return s({error:"Add your ship-from address and phone in Shipping Setup first."},400);let l=await se(n,r,a.id);if(!l.address||!l.address.street1)return s({error:"This order has no shipping address."},400);if(l.address.country&&l.address.country!=="US")return s({error:"International orders need customs forms. Please make that label in Shippo directly."},400);let u=a.parcel||{},c=z(u.weight,.1,1120),h;if(u.template){if(!Ye[u.template]||c==null)return s({error:"Pick a flat rate box and enter the weight (ounces)."},400);h={template:u.template,weight:String(c),mass_unit:"oz"}}else{let f=z(u.length,.5,60),k=z(u.width,.5,60),A=z(u.height,.1,60);if(f==null||k==null||A==null||c==null)return s({error:"Enter the box size (inches) and the weight (ounces)."},400);h={length:String(f),width:String(k),height:String(A),distance_unit:"in",weight:String(c),mass_unit:"oz"}}let w={address_from:ve(i.from),address_to:Dn(l),parcels:[h],async:!1};i.ret&&i.ret.street1&&i.ret.city&&i.ret.state&&i.ret.zip&&(w.address_return=ve({...i.ret,name:i.ret.name||i.ret.company||i.from.company||i.from.name,company:i.ret.company||i.from.company,phone:i.ret.phone||i.from.phone,email:i.ret.email||i.from.email})),a.qr===!0&&(w.extra={qr_code_requested:!0});let x=await re(n,"POST","/shipments/",w),d=(x.rates||[]).filter(f=>String(f.provider).toUpperCase()==="USPS").map(f=>({id:f.object_id,service:f.servicelevel&&f.servicelevel.name,token:f.servicelevel&&f.servicelevel.token,amount:Number(f.amount),currency:f.currency,days:f.estimated_days,terms:f.duration_terms||""})).sort((f,k)=>f.amount-k.amount),b=(x.messages||[]).map(f=>f.text).filter(Boolean).slice(0,3);return d.length?s({rates:d,warnings:b,shipmentId:x.object_id}):s({error:b[0]?"Shippo said: "+b[0]:"No USPS prices came back. Check the address and weight.",warnings:b},400)}if(e==="ship-buy"&&t==="POST"){let l=await se(n,r,a.id),u=await j(n,l.id);if(u&&!u.voided)return s({error:"This order already has a label."},400);if(!/^[A-Za-z0-9]{10,60}$/.test(a.rateId||""))return s({error:"Pick a shipping price first."},400);let c=Ue.test(a.shipDate||"")?a.shipDate:"",h=a.qr===!0,w=await re(n,"POST","/transactions/",{rate:a.rateId,label_file_type:h?"PNG":"PDF_4x6",async:!1,metadata:("Order "+l.id.slice(-10)).slice(0,100)});if(w.status!=="SUCCESS"){let B=(w.messages||[]).map(m=>m.text).filter(Boolean)[0];return s({error:B?"USPS said: "+B:"The label could not be made yet. Wait a moment and try again.",status:w.status},400)}let x=a.rateInfo||{},d={id:l.id,name:l.name,email:l.email,transactionId:w.object_id,trackingNumber:w.tracking_number,trackingUrl:w.tracking_url_provider||"",labelUrl:w.label_url,qrUrl:h&&w.qr_code_url||"",carrier:"USPS",service:P(x.service,60),serviceToken:P(x.token,60),cost:Number(x.amount)||null,boughtAt:Date.now(),plannedDate:c,status:"PRE_TRANSIT",statusDetail:"Label created",notified:{},voided:!1,mode:ue(n)};await J(n,d),d.trackingNumber&&await n.ADMIN_KV.put("shiptrack:"+d.trackingNumber,l.id),await Ke(n,l.id,"ready");let b=!1,f="";if(a.notify!==!1&&i.emailShipped&&l.email)try{await ie(n,l.email,xe("shipped",l,d,{site:n.SITE_URL})),d.notified.shipped=Date.now(),await J(n,d),b=!0}catch(B){f=B.message}let k=!1,A="";if(h)if(!d.qrUrl)A="USPS did not give a QR code for this service. Use the label instead.";else try{await ie(n,i.from.email||o.e,Tn(l,d)),k=!0}catch(B){A=B.message}return s({ok:!0,shipment:d,emailed:b,emailError:f,qrEmailed:k,qrError:A})}if(e==="ship-notify"&&t==="POST"){let l=await j(n,a.id);if(!l||l.voided)return s({error:"There is no label for that order yet."},400);let u=["shipped","delivered","note","shipdate"].includes(a.kind)?a.kind:"note",c=await se(n,r,a.id),h={...l,note:u==="note"?P(a.note,800).replace(/ {2,}/g," "):""};return u==="note"&&!h.note?s({error:"Write a short message to send."},400):(await ie(n,c.email,xe(u,c,h,{site:n.SITE_URL})),l.notified={...l.notified,[u]:Date.now()},await J(n,l),s({ok:!0}))}if(e==="ship-void"&&t==="POST"){let l=await j(n,a.id);if(!l||l.voided)return s({error:"There is no label to refund."},400);if(l.status==="TRANSIT"||l.status==="DELIVERED")return s({error:"This package is already moving, so USPS will not refund the label."},400);let u=await re(n,"POST","/refunds/",{transaction:l.transactionId,async:!1});return l.voided=!0,l.refund=u.status||"QUEUED",l.voidedAt=Date.now(),await J(n,l),await Ke(n,l.id,"new"),s({ok:!0,refund:l.refund})}if(e==="ship-dropoff"&&t==="POST"){let l=(Array.isArray(a.ids)?a.ids:[]).filter(h=>He.test(h)).slice(0,40);if(!l.length||!Ue.test(a.date||""))return s({error:"Pick the orders and a date."},400);if(a.date<Bt())return s({error:"Pick today or a later date."},400);let u=0,c=0;for(let h of l){let w=await j(n,h);if(!(!w||w.voided)&&(w.plannedDate=a.date,w.plan="dropoff",await J(n,w),u++,a.notify===!0&&w.email))try{await ie(n,w.email,xe("shipdate",await se(n,r,h),w,{site:n.SITE_URL})),c++}catch{}}return s({ok:!0,updated:u,emailed:c})}if(e==="ship-pickup"&&t==="POST"){let l=(Array.isArray(a.ids)?a.ids:[]).filter(A=>He.test(A)).slice(0,40),u=a.date,c=/^\d{2}:\d{2}$/.test(a.start||"")?a.start:"09:00",h=/^\d{2}:\d{2}$/.test(a.end||"")?a.end:"17:00";if(!l.length||!Ue.test(u||""))return s({error:"Pick the packages and a pickup date."},400);if(u<Bt())return s({error:"Pick today or a later date."},400);if(h<=c)return s({error:"The pickup window needs to end after it starts."},400);let w=[];for(let A of l){let B=await j(n,A);B&&!B.voided&&w.push(B)}if(!w.length)return s({error:"None of those packages have labels."},400);let x=w.filter(A=>!/priority/i.test(A.serviceToken||A.service||""));if(x.length)return s({error:`USPS only picks up Priority Mail and Priority Mail Express. ${x.map(A=>A.name||A.id.slice(-6)).slice(0,3).join(", ")} ${x.length===1?"has":"have"} a different service. Take those to the post office or leave them with your carrier.`},400);if(!(i.from.street1&&i.from.zip&&i.from.phone))return s({error:"Add your ship-from address and phone in Shipping Setup first."},400);let d=await re(n,"GET","/carrier_accounts?carrier=usps&service_levels=false"),b=(d.results||[]).find(A=>A.active!==!1)||(d.results||[])[0];if(!b)return s({error:"No USPS account was found in Shippo."},400);let f=En.includes(a.locationType)?a.locationType:"Front Door",k=await re(n,"POST","/pickups/",{carrier_account:b.object_id,transactions:w.map(A=>A.transactionId),is_test:ue(n)!=="live",requested_start_time:Et(u,c),requested_end_time:Et(u,h),location:{building_location_type:f,instructions:P(a.instructions,200),address:ve(i.from)}});if(String(k.status||"").toUpperCase()!=="CONFIRMED")return s({error:(k.messages||[]).map(A=>A.text).filter(Boolean)[0]||"USPS did not confirm that pickup. Try a different day.",status:k.status},400);for(let A of w)A.plannedDate=u,A.plan="pickup",A.pickup={date:u,start:c,end:h,confirmation:k.confirmation_code||"",cancelBy:k.cancel_by_time||""},await J(n,A);return s({ok:!0,confirmation:k.confirmation_code||"",count:w.length,cancelBy:k.cancel_by_time||""})}return s({error:"Not found"},404)}catch(i){return s({error:i.message||"Something went wrong"},400)}}async function Tt(e,t,a,n){let o=new URL(e.url),r=(c,h=200)=>new Response(JSON.stringify(c),{status:h,headers:{"Content-Type":"application/json"}});if(!t.ADMIN_KV||!t.SESSION_SECRET)return r({error:"off"},503);if(o.searchParams.get("k")!==await Dt(t))return r({error:"no"},403);let s;try{s=await e.json()}catch{return r({error:"bad"},400)}try{await t.ADMIN_KV.put("shipwebhook",JSON.stringify({at:Date.now(),event:P(s&&s.event,40),matched:!1}))}catch{}if(!s||s.event!=="track_updated"||!s.data||!s.data.tracking_number)return r({ok:!0});let p=await t.ADMIN_KV.get("shiptrack:"+s.data.tracking_number);if(!p)return r({ok:!0,ignored:!0});let i=await j(t,p);if(!i||i.voided)return r({ok:!0});try{await t.ADMIN_KV.put("shipwebhook",JSON.stringify({at:Date.now(),event:"track_updated",matched:!0}))}catch{}let l=s.data.tracking_status||{},u=Sn.includes(l.status)?l.status:"UNKNOWN";return i.status=u,i.statusDetail=P(l.status_details,200),i.statusDate=P(l.status_date,40),i.eta=P(s.data.eta,40),i.location=l.location?P([l.location.city,l.location.state].filter(Boolean).join(", "),80):"",await J(t,i),a.waitUntil((async()=>{try{if(u==="DELIVERED"&&(await Ke(t,p,"fulfilled"),(await ge(t)).emailDelivered&&!(i.notified&&i.notified.delivered)&&i.email&&(await ie(t,i.email,xe("delivered",await se(t,n,p),i,{site:t.SITE_URL})),i.notified={...i.notified,delivered:Date.now()},await J(t,i))),(u==="FAILURE"||u==="RETURNED")&&!(i.notified&&i.notified["alert_"+u])){let c=String(t.ADMIN_EMAILS||"").split(",").map(d=>d.trim()).filter(d=>Ce.test(d)).slice(0,5),h=u==="RETURNED"?"is being returned to sender":"has a delivery problem",w=`The package for ${i.name||"an order"} ${h}.

USPS says: ${i.statusDetail||"no details"}
Tracking: ${i.trackingNumber}${i.trackingUrl?`
`+i.trackingUrl:""}

Open Shipping > Shipped in the admin app to email the customer or sort it out.`,x=`<p style="font:16px/1.6 ${me};color:${Je}">${N(w).replace(/\n/g,"<br>")}</p>`;for(let d of c)try{await ie(t,d,{subject:`Shipping problem: ${i.name||i.trackingNumber}`,html:x,text:w})}catch{}i.notified={...i.notified,["alert_"+u]:Date.now()},await J(t,i)}}catch(c){console.log("shippo webhook follow-up failed",String(c))}})()),r({ok:!0})}var ke={usps_ground_advantage:"USPS Ground Advantage",usps_priority:"USPS Priority Mail",usps_priority_express:"USPS Priority Mail Express",flat:"Flat-rate shipping"},On=1800*1e3,Ot=(e,t)=>It(e.SESSION_SECRET||"x","quote|"+t).then(a=>a.slice(0,32));function Qt(e,t,a){let n=0,o=!1;for(let r of t){let s=e.find(p=>p.id===(r&&r.id));!s||s.digital||(o=!0,n+=(z(s.weightOz,0,1600)??a.weights[s.category]??12)*(r.qty||1))}return o?Math.max(1,Math.round(n+a.packagingOz)):0}async function Qn(e,t){let a="zip:"+t;try{let n=await e.ADMIN_KV.get(a);if(n)return JSON.parse(n)}catch{}try{let n=await fetch("https://api.zippopotam.us/us/"+t,{signal:AbortSignal.timeout(2500)});if(!n.ok)return null;let o=await n.json(),r=o.places&&o.places[0];if(!r)return null;let s={city:r["place name"],state:r["state abbreviation"]};return await e.ADMIN_KV.put(a,JSON.stringify(s),{expirationTtl:3600*24*30}),s}catch{return null}}async function Nt(e,t,a,n,o){let r=await ge(e),s=Qt(t,a,r);if(!s)return{error:"Nothing in your bag needs shipping."};if(!/^\d{5}$/.test(n||""))return{error:"Please enter a 5-digit ZIP code."};let p=Date.now()+On,i=async(c,h,w)=>({token:c,service:ke[c]||c,cents:h,days:w||null,exp:p,sig:await Ot(e,`${n}|${s}|${c}|${h}|${p}`)}),l=async c=>{try{await e.ADMIN_KV.put("shipquote",JSON.stringify({at:Date.now(),ok:!1,why:String(c||"").slice(0,300)}))}catch{}return{zip:n,weightOz:s,fallback:!0,options:[await i("flat",o,null)]}};if(!(e.SHIPPO_API_KEY&&r.from.street1&&r.from.city&&r.from.state&&r.from.zip&&r.from.phone)||s>1100)return l(e.SHIPPO_API_KEY?s>1100?"The bag is too heavy for one parcel.":"Shipping Setup is missing part of the ship-from address or phone: "+["street1","city","state","zip","phone"].filter(c=>!r.from[c]).join(", ")+".":"No SHIPPO_API_KEY secret was found on the worker.");try{let c=await Qn(e,n);if(!c)return{error:"We could not find that ZIP code. Please check it."};let h=r.presets.filter(k=>!k.template&&k.maxOz>0).sort((k,A)=>k.maxOz-A.maxOz),w=h.find(k=>s<=k.maxOz)||h[h.length-1]||r.presets.find(k=>!k.template),x=await re(e,"POST","/shipments/",{address_from:ve(r.from),async:!1,address_to:{name:"Customer",street1:"100 Main St",city:c.city,state:c.state,zip:n,country:"US"},parcels:[{length:String(w.length),width:String(w.width),height:String(w.height),distance_unit:"in",weight:String(s),mass_unit:"oz"}]}),d=(x.rates||[]).filter(k=>String(k.provider).toUpperCase()==="USPS"&&ke[k.servicelevel&&k.servicelevel.token]&&k.servicelevel.token!=="flat"),b={};for(let k of d){let A=k.servicelevel.token,B=Math.ceil(Number(k.amount)*100);B>0&&(!b[A]||B<b[A].c)&&(b[A]={c:B,d:k.estimated_days})}let f=["usps_ground_advantage","usps_priority","usps_priority_express"].filter(k=>b[k]);if(!f.length)return l("Shippo returned no USPS prices ("+(x.rates||[]).length+" rates in all). "+(x.messages||[]).map(k=>k.text||k.code).filter(Boolean).slice(0,2).join(" "));try{await e.ADMIN_KV.put("shipquote",JSON.stringify({at:Date.now(),ok:!0,why:""}))}catch{}return{zip:n,weightOz:s,city:c.city,state:c.state,options:await Promise.all(f.map(k=>i(k,b[k].c+r.markupCents,b[k].d)))}}catch(c){return console.log("quote failed",String(c)),l(c.message||String(c))}}async function Mt(e,t,a,n,o){if(!n||typeof n!="object"||!ke[n.token])return null;let r=await ge(e),s=Qt(t,a,r),p=Number(n.cents),i=Number(n.exp);return!s||!Number.isInteger(p)||p<0||p>1e5||!(i>Date.now())?{stale:!0}:n.sig!==await Ot(e,`${o}|${s}|${n.token}|${p}|${i}`)?{stale:!0}:{token:n.token,service:ke[n.token],cents:p}}var oe="https://queenesheirr.com";var Rt=/^[a-f0-9]{12}$/,Nn=/^[a-z0-9]+(-[a-z0-9]+)*$/,Mn=/^\d{4}-\d{2}-\d{2}$/,O=e=>String(e??"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),fe=(e,t)=>String(e??"").replace(/[\r\n]+/g," ").trim().slice(0,t),Rn=e=>String(e).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/,""),qe=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date),Ve=(e,t)=>typeof e=="string"&&(/^https:\/\/(files\.stripe\.com|queenesheirr\.com)\/[^\s"'<>]+$/.test(e)||typeof t=="string"&&e.startsWith(t+"/img/")&&/^\/img\/[a-f0-9]{16,32}\.jpg$/.test(e.slice(t.length))),Ln=e=>/^(https:\/\/|mailto:)[^\s"'<>]{3,500}$/.test(e),Lt=[{id:"a1b2c3d4e5f6",slug:"where-the-jars-come-from",title:"Where the Jars Come From",category:"Family",author:"Queen E's Heirr",date:"2026-10-01",status:"published",image:oe+"/images/family.png",excerpt:"LyKinda cooks from family tradition: fresh fruit, careful batches, and ingredients sourced close to home whenever she can.",body:"LyKinda cooks from family tradition: fresh fruit, careful batches, and ingredients sourced close to home whenever she can. The same care shows up at the table, in class, and in how she hosts."},{id:"f6e5d4c3b2a1",slug:"a-spoon-a-board-a-story",title:"A Spoon, a Board, a Story",category:"Hosting",author:"Queen E's Heirr",date:"2026-10-02",status:"published",image:oe+"/images/tasting.jpg",excerpt:"Pair blueberry or strawberry jam with something creamy and something sharp.",body:"Pair blueberry or strawberry jam with something creamy and something sharp. Add pickled vegetables when you want the bite that makes people stay a little longer."}];async function X(e){let t=await e.ADMIN_KV.get("blog");if(t==null)return await e.ADMIN_KV.put("blog",JSON.stringify(Lt)),Lt.map(a=>({...a}));try{let a=JSON.parse(t);return Array.isArray(a)?a:[]}catch{return[]}}var zt=(e,t)=>e.ADMIN_KV.put("blog",JSON.stringify(t));function Se(e){let t=O(e);return t=t.replace(/\[([^\]\n]{1,200})\]\(([^)\s]{4,500})\)/g,(a,n,o)=>{let r=o.replace(/&amp;/g,"&");return Ln(r)?`<a href="${O(r)}" rel="noopener noreferrer"${r.startsWith("https://queenesheirr.com")||r.startsWith("mailto:")?"":' target="_blank"'}>${n}</a>`:n}),t=t.replace(/\*\*([^*\n]{1,300})\*\*/g,"<strong>$1</strong>").replace(/(^|[\s(])\*([^*\n]{1,300})\*(?=$|[\s).,!?;:])/g,"$1<em>$2</em>"),t}function Gt(e,t){let a=String(e||"").replace(/\r/g,"").split(`
`),n=[],o=[],r=null,s=()=>{o.length&&(n.push("<p>"+o.map(Se).join("<br>")+"</p>"),o=[])},p=()=>{r&&(n.push(`<${r.t}>`+r.items.map(i=>"<li>"+Se(i)+"</li>").join("")+`</${r.t}>`),r=null)};for(let i of a){let l=i.trimEnd(),u;if(!l.trim()){s(),p();continue}if(u=l.match(/^(#{2,3})\s+(.{1,200})$/)){s(),p(),n.push(`<h${u[1].length}>${Se(u[2])}</h${u[1].length}>`);continue}if(/^-{3,}$/.test(l.trim())){s(),p(),n.push("<hr>");continue}if(u=l.match(/^>\s?(.{1,600})$/)){s(),p(),n.push(`<blockquote>${Se(u[1])}</blockquote>`);continue}if(u=l.match(/^!\[([^\]\n]{0,200})\]\((\S{4,500})\)$/)){s(),p();let c=u[2].replace(/&amp;/g,"&");Ve(c,t)&&n.push(`<figure><img src="${O(c)}" alt="${O(u[1])}" loading="lazy">${u[1]?`<figcaption>${O(u[1])}</figcaption>`:""}</figure>`);continue}if(u=l.match(/^[-*]\s+(.{1,600})$/)){s(),(!r||r.t!=="ul")&&(p(),r={t:"ul",items:[]}),r.items.push(u[1]);continue}if(u=l.match(/^\d+[.)]\s+(.{1,600})$/)){s(),(!r||r.t!=="ol")&&(p(),r={t:"ol",items:[]}),r.items.push(u[1]);continue}p(),o.push(l)}return s(),p(),n.join(`
`)}var zn=e=>String(e||"").replace(/!\[[^\]]*\]\([^)]*\)/g,"").replace(/\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/[#>*_`-]+/g," ").replace(/\s+/g," ").trim();function Un(e,t,a,n){e=e&&typeof e=="object"?e:{};let o=fe(e.title,120);if(!o)throw new Error("Give the post a title.");let r=String(e.body||"").replace(/\r/g,"").slice(0,3e4).trim();if(!r)throw new Error("Write something in the post.");let s=Rn(fe(e.slug,80)||o);Nn.test(s)||(s="post");let p=c=>n.some(h=>h.slug===c&&(!a||h.id!==a.id));if(p(s)){if(e.slug&&a&&a.slug!==s)throw new Error("Another post already uses that web address. Change it a little.");let c=2;for(;p(s+"-"+c);)c++;s=s+"-"+c}let i=e.status==="published"?"published":"draft",l=Mn.test(e.date||"")?e.date:a&&a.date||qe(),u=String(e.image||"").trim();if(u&&!Ve(u,t))throw new Error("That cover photo is not allowed. Upload it with the photo button.");return{id:a?a.id:"",slug:s,title:o,category:fe(e.category,30),author:fe(e.author,60)||"Queen E's Heirr",date:l,status:i,image:u,excerpt:fe(e.excerpt,300)||zn(r).slice(0,180).replace(/\s\S*$/,"")+"...",body:r,updated:Date.now()}}var le=e=>e.status==="published"&&e.date<=qe(),Ut=e=>({slug:e.slug,title:e.title,category:e.category||"",author:e.author,date:e.date,image:e.image||"",excerpt:e.excerpt});async function Ft(e,t,a,n,o,r,s){if(!/^blog-[a-z]+$/.test(e))return null;try{if(e==="blog-posts"&&t==="GET"){let p=(await X(n)).slice().sort((i,l)=>(l.date+l.updated).localeCompare(i.date+i.updated));return r({posts:p.map(i=>({...i,live:le(i)})),today:qe()})}if(e==="blog-preview"&&t==="POST")return r({html:Gt(a.body,s)});if(e==="blog-save"&&t==="POST"){let p=await X(n),i=a.id&&Rt.test(a.id)?p.find(u=>u.id===a.id):null;if(a.id&&!i)return r({error:"That post no longer exists."},404);if(!i&&p.length>=200)return r({error:"You have reached the limit of 200 posts. Delete some old ones first."},400);let l=Un(a,s,i,p);if(i)Object.assign(i,l);else{let u=new Uint8Array(6);crypto.getRandomValues(u),l.id=Array.from(u).map(c=>c.toString(16).padStart(2,"0")).join(""),p.push(l)}return await zt(n,p),r({ok:!0,post:{...i||l,live:le(i||l)}})}if(e==="blog-delete"&&t==="POST"){let p=await X(n);return!Rt.test(a.id||"")||!p.some(i=>i.id===a.id)?r({error:"That post no longer exists."},404):(await zt(n,p.filter(i=>i.id!==a.id)),r({ok:!0}))}return r({error:"Not found"},404)}catch(p){return r({error:p.message||"Something went wrong"},400)}}async function Ht(e,t,a,n){let o=e.pathname,r={...a,"Cache-Control":"public, max-age=60"};if(o==="/blog"){let p=(await X(t)).filter(le).sort((i,l)=>l.date.localeCompare(i.date));return n({posts:p.map(Ut)},200,r)}if(o==="/blog/sitemap.xml"){let i=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`+(await X(t)).filter(le).map(l=>`  <url><loc>${oe}/stories/post/?s=${O(l.slug)}</loc><lastmod>${O(l.date)}</lastmod></url>`).join(`
`)+`
</urlset>
`;return new Response(i,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=300"}})}let s=o.match(/^\/blog\/share\/([a-z0-9-]{1,80})$/);if(s){let p=(await X(t)).filter(le).find(c=>c.slug===s[1]);if(!p)return Response.redirect(oe+"/stories/",302);let i=`${oe}/stories/post/?s=${p.slug}`,l=p.image&&Ve(p.image,e.origin)?p.image:oe+"/images/og.jpg",u=`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${O(p.title)} | Queen E's Heirr</title><meta name="description" content="${O(p.excerpt)}"><link rel="canonical" href="${O(i)}"><meta property="og:type" content="article"><meta property="og:site_name" content="Queen E's Heirr"><meta property="og:title" content="${O(p.title)}"><meta property="og:description" content="${O(p.excerpt)}"><meta property="og:url" content="${O(i)}"><meta property="og:image" content="${O(l)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${O(p.title)}"><meta name="twitter:description" content="${O(p.excerpt)}"><meta name="twitter:image" content="${O(l)}"><meta http-equiv="refresh" content="0;url=${O(i)}"></head><body><p><a href="${O(i)}">${O(p.title)}</a></p></body></html>`;return new Response(u,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=300"}})}if(s=o.match(/^\/blog\/([a-z0-9-]{1,80})$/),s){let p=(await X(t)).filter(le).find(i=>i.slug===s[1]);return p?n({post:{...Ut(p),html:Gt(p.body,e.origin),share:`${e.origin}/blog/share/${p.slug}`}},200,r):n({error:"Not found"},404,a)}return null}var Ae="#1b3b22",Yt="#d4af37",Xe="#fcfaf7",Kt="#0e2012",Jt="#e5dbd1",Ze="Georgia,'Times New Roman',serif",_e="Helvetica,Arial,sans-serif",$e=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,Gn=/^cs_[A-Za-z0-9_]+$/,Fn=/^[a-z0-9-]{3,60}$/,We="info@queenesheirr.com",L=e=>String(e??"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);var Hn=e=>new Date(e+"T12:00:00Z").toLocaleDateString("en-US",{timeZone:"UTC",weekday:"long",month:"long",day:"numeric"}),Yn=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date),Kn=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date(Date.now()+864e5));async function Ee(e){try{return JSON.parse(await e.ADMIN_KV.get("events")||"[]")}catch{return[]}}async function et(e){try{return JSON.parse(await e.ADMIN_KV.get("evnotes")||"{}")}catch{return{}}}async function tt(e,t,a){let n=await et(e);n[t]={...n[t]||{},[a]:Date.now()};let o=Object.keys(n);o.length>500&&delete n[o[0]],await e.ADMIN_KV.put("evnotes",JSON.stringify(n))}async function Jn(e){try{return JSON.parse(await e.ADMIN_KV.get("orderstatus")||"{}")}catch{return{}}}var jn=e=>String(e.ADMIN_EMAILS||"").split(",").map(t=>t.trim()).filter(t=>$e.test(t)).slice(0,5);function nt(e,t){let a=t.metadata||{};if(a.event_id){let n=e.find(o=>o.id===a.event_id);if(n)return n}return e.find(n=>a.event&&a.event===`${n.name} (${n.date})`)||null}var at=e=>e.payment_status==="paid"&&e.metadata&&e.metadata.fulfillment==="event";function rt(e,t,a){return{id:e.id,created:e.created*1e3,name:e.customer_details&&e.customer_details.name||"",email:e.customer_details&&e.customer_details.email||"",phone:e.customer_details&&e.customer_details.phone||"",total:e.amount_total,pickedUp:t[e.id]==="fulfilled",items:(e.line_items&&e.line_items.data||[]).map(n=>({name:n.description,qty:n.quantity})),notified:a[e.id]||{}}}function qn(e,t,a){return`<!doctype html><html><body style="margin:0;background:${Xe}"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${Xe}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid ${Jt};border-radius:18px;overflow:hidden"><tr><td align="center" style="background:${Ae};padding:24px"><a href="${a}" style="font:700 26px ${Ze};color:#fff;text-decoration:none">Queen E's Heirr</a></td></tr><tr><td style="height:5px;background:${Yt};line-height:5px;font-size:0">&nbsp;</td></tr><tr><td style="padding:30px 28px 18px"><h1 style="font:700 26px/1.2 ${Ze};color:${Ae};margin:0 0 18px">${L(e)}</h1>${t}</td></tr><tr><td align="center" style="background:${Ae};padding:16px 24px;font:12px/1.7 ${_e};color:#cfd8cd">Queen E's Heirr &middot; <a href="${a}" style="color:${Yt}">queenesheirr.com</a></td></tr></table></td></tr></table></body></html>`}var H=e=>`<p style="font:16px/1.65 ${_e};color:${Kt};margin:0 0 14px">${e}</p>`;function Be(e,t,a,n){let o=n&&n.site||"https://queenesheirr.com",r=String(t.name||"").trim().split(/\s+/)[0]||"",s=a?Hn(a.date):"",p=a?[a.name,a.location].filter(Boolean).join(" - "):"our event",i=a&&a.time?a.time:"",l=(t.items||[]).map(f=>`${f.qty} x ${f.name}`),u=f=>`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${Xe};border:1px solid ${Jt};border-radius:12px;margin:0 0 18px"><tr><td style="padding:14px 16px;font:15px/1.7 ${_e};color:${Kt}">${f.filter(Boolean).join("<br>")}</td></tr></table>`,c=u([`<strong>Where:</strong> ${L(p)}`,s&&`<strong>When:</strong> ${L(s)}${i?", "+L(i):""}`]),h=l.length?`<h3 style="font:700 17px ${Ze};color:${Ae};margin:18px 0 6px">Your order</h3>`+H(l.map(L).join("<br>")):"",w,x,d,b;return e==="confirm"?(w="Your order will be waiting for you",x=`Your order for ${a?a.name:"our event"} - Queen E's Heirr`,d=H(`Hi ${L(r||"there")},`)+H("Thank you for your order! It will be packed and waiting for you to pick up at our event.")+c+h+H("We will send you a quick reminder the day before. If you can't make it, just reply to this email and we'll work something out."),b=`Hi ${r||"there"},

Thank you for your order! It will be waiting for you at:
${p}
${s}${i?", "+i:""}

Your order:
${l.join(`
`)}

We will send a reminder the day before. If you can't make it, reply to this email and we'll work something out.

Queen E's Heirr | ${o}`):e==="reminder"?(w="See you tomorrow!",x="Reminder: pick up your order tomorrow - Queen E's Heirr",d=H(`Hi ${L(r||"there")},`)+H("Just a friendly reminder that your order will be waiting for you tomorrow.")+c+h+H("Can't make it? Reply to this email and we'll arrange another way to get it to you."),b=`Hi ${r||"there"},

Reminder: your order will be waiting for you tomorrow.
${p}
${s}${i?", "+i:""}

Your order:
${l.join(`
`)}

Can't make it? Reply to this email and we'll arrange another way to get it to you.

Queen E's Heirr | ${o}`):e==="missed"?(w="Sorry we missed you",x="Sorry we missed you - Queen E's Heirr",d=H(`Hi ${L(r||"there")},`)+H(`We're sorry we missed you at ${L(a?a.name:"our event")}. Your order is safe with us!`)+h+H(`Please reply to this email or write us at <a href="mailto:${We}" style="color:${Ae}">${We}</a> so we can coordinate your pickup, and we'll find a time and place that works for you.`),b=`Hi ${r||"there"},

We're sorry we missed you at ${a?a.name:"our event"}. Your order is safe with us!

Your order:
${l.join(`
`)}

Please reply to this email or write us at ${We} so we can coordinate your pickup.

Queen E's Heirr | ${o}`):(w="New event order",x=`New event order: ${t.name||t.email||"customer"} for ${a?a.name:"an event"}`,d=H(`<strong>${L(t.name||"A customer")}</strong> ordered for pickup at <strong>${L(a?a.name:"an event")}</strong>${s?" on "+L(s):""}.`)+u([t.email&&`Email: ${L(t.email)}`,t.phone&&`Phone: ${L(t.phone)}`,`Paid: $${((t.total||0)/100).toFixed(2)}`])+h,b=`${t.name||"A customer"} ordered for pickup at ${a?a.name:"an event"}${s?" on "+s:""}.
${t.email||""} ${t.phone||""}
Paid: $${((t.total||0)/100).toFixed(2)}

${l.join(`
`)}`),{subject:x,html:qn(w,d,o),text:b}}async function Ie(e,t,a){if(!e.MAIL_URL||!e.MAIL_SECRET)throw new Error("Email is not set up");if(!$e.test(t||""))throw new Error("This order has no email address.");let n=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"send_html",secret:e.MAIL_SECRET,to:t,subject:a.subject,html:a.html,text:a.text})}),o=await n.json().catch(()=>null);if(!n.ok||!o||o.ok!==!0)throw new Error("The email did not send. Make sure the newest Google Apps Script version is deployed.")}async function jt(e,t,a){let n=await t(e,`/checkout/sessions/${a}?expand[]=line_items`);if(!at(n))return{skipped:!0};let o=await et(e);if(o[n.id]&&o[n.id].confirm)return{duplicate:!0};let r=await Ee(e),s=nt(r,n),p=rt(n,{},{}),i={site:e.SITE_URL},l={customer:!1,owner:!1};if(p.email)try{await Ie(e,p.email,Be("confirm",p,s,i)),l.customer=!0}catch(u){console.log("event confirm failed",String(u))}for(let u of jn(e))try{await Ie(e,u,Be("owner",p,s,i)),l.owner=!0}catch(c){console.log("event owner notice failed",String(c))}return l.customer&&await tt(e,n.id,"confirm"),l}async function qt(e,t){if(Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",hour:"numeric",hour12:!1}).format(new Date))%24!==7)return"not 7 AM";let n=(await Ee(e)).filter(r=>r.name&&r.date===Kn()).slice(0,3),o=0;for(let r of n){let s=await Wt(e,t,r,"reminder",40);o+=s.sent}return n.length?`reminders sent: ${o}`:"none due"}async function Vt(e,t,a){let n=await t(e,"/checkout/sessions?limit=100&expand[]=data.line_items"),[o,r]=await Promise.all([Jn(e),et(e)]);return n.data.filter(s=>at(s)&&nt([a],s)).map(s=>rt(s,o,r))}async function Wt(e,t,a,n,o){let r=(await Vt(e,t,a)).filter(i=>!i.pickedUp&&$e.test(i.email)&&!(i.notified&&i.notified[n])),s=0,p=0;for(let i of r.slice(0,o))try{await Ie(e,i.email,Be(n,i,a,{site:e.SITE_URL})),await tt(e,i.id,n),s++}catch{p++}return{sent:s,failed:p,remaining:Math.max(0,r.length-o)}}async function Xt(e,t,a,n,o,r,s){if(!/^ev-[a-z-]+$/.test(e))return null;try{if(e==="ev-events"&&t==="GET"){let l=Yn(),u=new Date(Date.now()-45*864e5).toISOString().slice(0,10),c=(await Ee(n)).filter(h=>h.name&&h.date>=u).sort((h,w)=>w.date.localeCompare(h.date)).map(h=>({id:h.id,name:h.name,date:h.date,location:h.location||"",time:h.time||"",past:h.date<l}));return s({events:c})}let i=(await Ee(n)).find(l=>l.id===a.eventId&&Fn.test(a.eventId||""));if(!i)return s({error:"Pick an event first."},400);if(e==="ev-orders"&&t==="POST"){let l=(await Vt(n,r.stripeGet,i)).sort((c,h)=>(c.name||"").localeCompare(h.name||"")),u={};for(let c of l)if(!c.pickedUp)for(let h of c.items)u[h.name]=(u[h.name]||0)+h.qty;return s({event:{id:i.id,name:i.name,date:i.date,location:i.location||"",time:i.time||""},orders:l,tally:Object.entries(u).sort((c,h)=>h[1]-c[1]).map(([c,h])=>({name:c,qty:h}))})}if(e==="ev-notify"&&t==="POST"){let l=["confirm","reminder","missed"].includes(a.kind)?a.kind:null;if(!l||!Gn.test(a.id||""))return s({error:"Bad request"},400);let u=await r.stripeGet(n,`/checkout/sessions/${a.id}?expand[]=line_items`);if(!at(u)||!nt([i],u))return s({error:"That order is not for this event."},400);let c=rt(u,{},{});return await Ie(n,c.email,Be(l,c,i,{site:n.SITE_URL})),await tt(n,u.id,l),s({ok:!0})}if(e==="ev-bulk"&&t==="POST"){let l=["reminder","missed"].includes(a.kind)?a.kind:null;return l?s({ok:!0,...await Wt(n,r.stripeGet,i,l,30)}):s({error:"Bad request"},400)}return s({error:"Not found"},404)}catch(p){return s({error:p.message||"Something went wrong"},400)}}var Zt="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",_t="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";var lt=new TextEncoder,Vn=["new","in_production","ready","fulfilled"],Wn={cash:"Cash",cashapp:"Cash App",venmo:"Venmo",tap:"Tap to Pay"},nn=720*3600*1e3,v=(e,t=200,a={})=>new Response(JSON.stringify(e),{status:t,headers:{"Content-Type":"application/json","Cache-Control":"no-store",...a}});function an(e){return btoa(String.fromCharCode(...new Uint8Array(e))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function rn(e){return an(lt.encode(e))}function Xn(e){return atob(e.replace(/-/g,"+").replace(/_/g,"/"))}async function we(e,t){let a=await crypto.subtle.importKey("raw",lt.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return an(await crypto.subtle.sign("HMAC",a,lt.encode(t)))}function sn(e,t){if(e.length!==t.length)return!1;let a=0;for(let n=0;n<e.length;n++)a|=e.charCodeAt(n)^t.charCodeAt(n);return a===0}var Pe=e=>(e.ADMIN_EMAILS||"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);function Zn(){return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date)}async function ce(e){if(!e.ADMIN_KV)return[];try{return JSON.parse(await e.ADMIN_KV.get("events")||"[]")}catch{return[]}}function Te(e){let t=Zn();return e.filter(a=>a.show!==!1&&a.date>=t&&(!a.orderBy||a.orderBy>=t)).sort((a,n)=>a.date.localeCompare(n.date)).map(a=>({id:a.id,name:a.name,date:a.date,location:a.location||""}))}async function _n(e,t){let a=e.headers.get("Authorization")||"";if(!a.startsWith("Bearer ")||!t.SESSION_SECRET)return null;let[n,o]=a.slice(7).split(".");if(!n||!o||!sn(o,await we(t.SESSION_SECRET,n)))return null;try{let r=JSON.parse(Xn(n));return r.exp<Date.now()||!Pe(t).includes(r.e)?null:r}catch{return null}}async function $n(e,t,a){let n=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"send_code",secret:e.MAIL_SECRET,to:t,code:a})});if(!n.ok)throw new Error("mail "+n.status)}async function ea(e,t){if(!t.ADMIN_KV||!t.SESSION_SECRET||!t.MAIL_URL||!t.MAIL_SECRET)return v({error:"Admin is not set up yet"},503);let a;try{a=await e.json()}catch{return v({error:"Bad request"},400)}let n=String(a.email||"").trim().toLowerCase().slice(0,200);if(Pe(t).includes(n)){let o=parseInt(await t.ADMIN_KV.get("rl:"+n)||"0",10);if(o<5){await t.ADMIN_KV.put("rl:"+n,String(o+1),{expirationTtl:3600});let r=new Uint32Array(1);crypto.getRandomValues(r);let s=String(r[0]%1e6).padStart(6,"0");await t.ADMIN_KV.put("otp:"+n,JSON.stringify({h:await we(t.SESSION_SECRET,s+n),tries:0}),{expirationTtl:600});try{await $n(t,n,s)}catch(p){console.log("send code failed",String(p))}}}return v({ok:!0})}async function ta(e,t){let a;try{a=await e.json()}catch{return v({error:"Bad request"},400)}let n=String(a.email||"").trim().toLowerCase(),o=String(a.code||"").replace(/\D/g,"").slice(0,6),r=t.ADMIN_KV&&await t.ADMIN_KV.get("otp:"+n),s=()=>v({error:"That code did not work. Request a new one."},401);if(!r||!Pe(t).includes(n)||o.length!==6)return s();let p=JSON.parse(r);if(p.tries>=5)return await t.ADMIN_KV.delete("otp:"+n),s();if(!sn(p.h,await we(t.SESSION_SECRET,o+n)))return p.tries+=1,await t.ADMIN_KV.put("otp:"+n,JSON.stringify(p),{expirationTtl:600}),s();await t.ADMIN_KV.delete("otp:"+n);let i=rn(JSON.stringify({e:n,exp:Date.now()+nn}));return v({token:`${i}.${await we(t.SESSION_SECRET,i)}`,email:n})}var st=(e,t)=>typeof e=="string"&&(/^https:\/\/(files\.stripe\.com|queenesheirr\.com)\/[^\s]+$/.test(e)||typeof t=="string"&&e.startsWith(t+"/img/")&&/^\/img\/[a-f0-9]{16,32}\.jpg$/.test(e.slice(t.length))),$t=e=>e.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60),it=e=>{let t=Math.round(parseFloat(e)*100);return Number.isFinite(t)&&t>=50&&t<=1e6?t:null},De=e=>e===null||e===""||e===void 0?null:Number.isInteger(+e)&&+e>=0&&+e<=1e5?+e:NaN;function en(e){return!!(e&&e.metadata&&/^queenesheirr\.com (class|wholesale) request/.test(String(e.metadata.source||"")))}async function on(e,t,a,n){let o=Math.floor(Date.parse(a+"T00:00:00Z")/1e3)-86400,r=Math.floor(Date.parse(n+"T00:00:00Z")/1e3)+2*86400,s=f=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date(f)),p=[],i=await e.ADMIN_KV.get("orderstatus"),l=i?JSON.parse(i):{},u="",c=!1;for(let f=0;f<5;f++){let k=await t(e,`/checkout/sessions?limit=100&created[gte]=${o}&created[lte]=${r}&expand[]=data.line_items${u?"&starting_after="+u:""}`);for(let A of k.data){if(A.payment_status!=="paid"||A.metadata&&A.metadata.kind==="class")continue;let B=A.metadata&&A.metadata.fulfillment||"ship",m=A.created*1e3,g=A.customer_details||{};p.push({ts:m,id:A.id,channel:B==="inperson"?"In person - Card":B==="event"?"Online - Event pickup":B==="pickup"?"Online - Pickup":B==="digital"?"Online - Digital":"Online - Ship",customer:g.name||"",email:g.email||"",location:A.metadata&&A.metadata.event||"",status:l[A.id]||(B==="inperson"?"fulfilled":"new"),items:(A.line_items&&A.line_items.data||[]).map(y=>`${y.quantity} x ${y.description}`).join("; "),subtotal:A.amount_subtotal||0,shipping:A.total_details&&A.total_details.amount_shipping||0,tax:A.total_details&&A.total_details.amount_tax||0,total:A.amount_total||0})}if(!k.has_more)break;u=k.data[k.data.length-1].id,f===4&&(c=!0)}let h=[];try{h=JSON.parse(await e.ADMIN_KV.get("cashsales")||"[]")}catch{h=[]}for(let f of h)p.push({ts:f.ts,id:f.id,channel:`In person - ${Wn[f.method]||"Cash"}`,customer:f.name||"",email:f.email||"",location:f.location||"",status:f.voided?"voided":"fulfilled",items:f.items.map(k=>`${k.qty} x ${k.name} (${k.size})`).join("; "),subtotal:f.subtotal,shipping:0,tax:f.tax,total:f.total});let w=await ee(e),x=await te(e),d=Object.fromEntries(w.map(f=>[f.id,f]));for(let f of x){let k=d[f.classId];p.push({ts:f.ts,id:f.sid,channel:"Class booking",customer:f.name,email:f.email,location:k?`${k.title} (${k.date})`:"",status:"paid",items:`${f.seats} seat(s)`,subtotal:f.cents,shipping:0,tax:0,total:f.cents})}return{rows:p.map(f=>({...f,date:s(f.ts)})).filter(f=>f.date>=a&&f.date<=n).sort((f,k)=>k.ts-f.ts),truncated:c}}var na=e=>(e=e==null?"":String(e),/^[=+\-@\t\r]/.test(e)&&(e="'"+e),/[",\n\r]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e),ot=(e,t)=>"\uFEFF"+[e,...t].map(a=>a.map(na).join(",")).join(`\r
`),Y=e=>((e||0)/100).toFixed(2),tn=e=>new Date(e).toLocaleTimeString("en-US",{timeZone:"America/Chicago",hour:"numeric",minute:"2-digit"});async function ct(e,t,a,n,o,r={}){if(!e.MAIL_URL||!e.MAIL_SECRET)throw new Error("Email is not set up");let s=Pe(e);if(!s.length)throw new Error("No admin emails are set");let p=await on(e,t,a,n),i=r.filter?p.rows.filter(r.filter):p.rows,l=p.truncated,u=i.filter(A=>A.status!=="voided"),c=A=>{let B={};for(let m of u){let g=m[A]||"(none)",y=B[g]||(B[g]={n:0,total:0});y.n++,y.total+=m.total}return Object.entries(B).sort((m,g)=>g[1].total-m[1].total)},h=u.reduce((A,B)=>A+B.total,0),w=[r.heading||`Sales report for ${o} (${a} to ${n})`,"",`Transactions: ${u.length}`,`Total sales: $${Y(h)}`,"","By type:",...c("channel").map(([A,B])=>`  ${A}: ${B.n} sale(s), $${Y(B.total)}`),"","By location / event:",...c("location").map(([A,B])=>`  ${A}: ${B.n} sale(s), $${Y(B.total)}`),"",...(r.extra||(()=>[]))(u),"Refunds are not subtracted. Check Stripe for refunds.",l?"This range was very large, so older orders may be missing.":""],x=ot(["Date","Time","Type","Location","Customer","Email","Items","Subtotal","Shipping","Tax","Total","Status","Reference"],i.map(A=>[A.date,tn(A.ts),A.channel,A.location,A.customer,A.email,A.items,Y(A.subtotal),Y(A.shipping),Y(A.tax),Y(A.total),A.status,A.id])),d=ot(["Date","Time","Location","Customer","Email","Items","Subtotal","Tax","Total","Status"],i.filter(A=>A.channel==="In person - Cash").map(A=>[A.date,tn(A.ts),A.location,A.customer,A.email,A.items,Y(A.subtotal),Y(A.tax),Y(A.total),A.status])),b=ot(["Booked","Class","Customer","Email","Spots","Paid"],i.filter(A=>A.channel==="Class booking").map(A=>[A.date,A.location,A.customer,A.email,A.items,Y(A.total)])),f=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"report_email",secret:e.MAIL_SECRET,to:s,subject:r.subject||`Queen E's Heirr sales report: ${o}`,text:w.join(`
`),files:[{name:`sales-${a}_to_${n}.csv`,text:x},{name:`cash-sales-${a}_to_${n}.csv`,text:d},{name:`class-bookings-${a}_to_${n}.csv`,text:b}]})}),k=await f.json().catch(()=>null);if(!f.ok||!k||k.ok!==!0)throw new Error("The email did not send. Check that the Apps Script has the latest version deployed.");return{sent:s.length,rows:u.length}}async function ln(e,t){if(!e.ADMIN_KV)return"no storage";let a=new Date;if(Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",hour:"numeric",hour12:!1}).format(a))%24!==7)return"not 7 AM";let r=(i=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(i))(new Date(a.getTime()-864e5)),s=[];try{s=JSON.parse(await e.ADMIN_KV.get("eventreports")||"[]")}catch{s=[]}let p=[];for(let i of(await ce(e)).filter(l=>l.name&&l.date===r).slice(0,3)){let l=`${i.name}|${i.date}`;if(s.includes(l))continue;let u=new Date(i.date+"T00:00:00Z"),c=new Date(u.getTime()-60*864e5).toISOString().slice(0,10);await ct(e,t,c,i.date,`${i.name} (${i.date})`,{filter:h=>h.location===i.name,subject:`Event wrap-up: ${i.name}`,heading:`Event wrap-up for ${i.name}${i.location?" at "+i.location:""} on ${i.date}. Includes online pickup orders, card and cash sales that used this event name.`,extra:h=>{let w={};for(let d of h)for(let b of String(d.items||"").split("; ")){let f=b.match(/^(\d+) x (.+)$/);f&&(w[f[2]]=(w[f[2]]||0)+Number(f[1]))}let x=Object.entries(w).sort((d,b)=>b[1]-d[1]);return["Units sold:",...x.length?x.map(([d,b])=>`  ${b} x ${d}`):["  none recorded"],""]}}),s.push(l),p.push(l)}return await e.ADMIN_KV.put("eventreports",JSON.stringify(s.slice(-200))),p.length?"sent "+p.join(", "):"none due"}async function cn(e,t){let a=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago"}).format(new Date),[n,o]=a.split("-").map(Number),r=o===1?12:o-1,s=o===1?n-1:n,p=`${s}-${String(r).padStart(2,"0")}`;if(e.ADMIN_KV&&await e.ADMIN_KV.get("lastreport")===p)return"already sent";let i=`${p}-01`,l=new Date(Date.UTC(s,r,0)).toISOString().slice(0,10),u=new Date(Date.UTC(s,r-1,1)).toLocaleDateString("en-US",{timeZone:"UTC",month:"long",year:"numeric"});return await ct(e,t,i,l,u),e.ADMIN_KV&&await e.ADMIN_KV.put("lastreport",p),"sent "+p}async function dn(e,t,a,n){let{stripeGet:o,stripePost:r,stockOf:s,loadCatalog:p,posCheckout:i,posCash:l,sendCashReceipt:u}=n,c=a.pathname;if(c==="/admin"||c==="/admin/")return new Response(ht,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer","Content-Security-Policy":"default-src 'none'; manifest-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"}});if(c==="/admin/thanks"){let b=a.searchParams.get("cancelled")==="1",f=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${b?"Payment cancelled":"Thank you"}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fcfaf7;color:#0e2012;font:400 18px/1.5 Georgia,serif;text-align:center;padding:24px}main{max-width:460px}img{width:96px;height:96px;border-radius:50%}h1{color:#1b3b22;font-size:2.2rem;margin:.6em 0 .2em}p{color:#5c6b5a}a{display:inline-block;margin-top:18px;padding:14px 26px;border-radius:99px;background:#1b3b22;color:#f7f1d8;text-decoration:none;font:600 14px/1 sans-serif;letter-spacing:.1em;text-transform:uppercase}</style></head>
<body><main><img src="/admin/icon-192.png" alt=""><h1>${b?"No payment was taken":"Thank you!"}</h1><p>${b?"Nothing was charged. You can close this window and try again.":"Your payment went through and a receipt is on its way to your email. Enjoy your jars!"}</p><p>If this is a window on top of the sales screen, tap <b>Done</b> to go back.</p><a href="/admin">Back to the sale</a></main></body></html>`;return new Response(f,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"}})}if(c==="/admin/manifest.webmanifest")return new Response(JSON.stringify({name:"Queen E's Heirr Shop Admin Portal",short_name:"QE Admin",start_url:"/admin",scope:"/admin",display:"standalone",background_color:"#fcfaf7",theme_color:"#1b3b22",icons:[{src:"/admin/icon-192.png",sizes:"192x192",type:"image/png"},{src:"/admin/icon-512.png",sizes:"512x512",type:"image/png"}]}),{headers:{"Content-Type":"application/manifest+json","Cache-Control":"public, max-age=3600"}});if(c==="/admin/icon-192.png"||c==="/admin/icon-512.png"){let b=Uint8Array.from(atob(c.includes("192")?Zt:_t),f=>f.charCodeAt(0));return new Response(b,{headers:{"Content-Type":"image/png","Cache-Control":"public, max-age=86400"}})}if(!c.startsWith("/admin/api/"))return null;let h=c.slice(11);if(e.method==="POST"&&h==="login")return ea(e,t);if(e.method==="POST"&&h==="verify")return ta(e,t);let w=await _n(e,t);if(!w)return v({error:"Please sign in"},401);let x=b=>b&&b.image&&!st(b.image,a.origin),d=e.method==="POST"||e.method==="PUT"?await e.json().catch(()=>({})):{};try{let b=await Ct(h,e.method,d,t,w,{upcoming:Te,readEvents:ce,publicClasses:de,stripeGet:o},v);if(b)return b;let f=await Pt(h,e.method,d,t,w,{stripeGet:o},v,a.origin);if(f)return f;let k=await Ft(h,e.method,d,t,w,v,a.origin);if(k)return k;let A=await Xt(h,e.method,d,t,w,{stripeGet:o},v);if(A)return A;if(h==="products"&&e.method==="GET"){let[m,g,y]=await Promise.all([o(t,"/products?active=true&limit=100"),o(t,"/products?active=false&limit=100"),o(t,"/prices?active=true&limit=100&type=one_time")]),C={};for(let E of y.data)(C[typeof E.product=="string"?E.product:E.product.id]||=[]).push(E);let D=(E,T)=>({id:E.id,name:E.name,image:E.images&&E.images[0]||"",active:T,category:$.includes(E.metadata&&E.metadata.category)?E.metadata.category:"Jams",description:E.description||"",digital:(E.metadata&&E.metadata.digital)==="true",buyUrl:E.metadata&&E.metadata.buy_url||"",weightOz:E.metadata&&E.metadata.weight_oz||"",sort:Number(E.metadata&&E.metadata.sort||1e3),featured:(E.metadata&&E.metadata.featured)==="true",restocked:Number(E.metadata&&E.metadata.restocked||0),sizes:(C[E.id]||[]).map(G=>({priceId:G.id,label:F(E.metadata&&E.metadata.category||"Jams",G.nickname),cents:G.unit_amount,stock:s(G),soldOut:(G.metadata&&G.metadata.sold_out)==="true"})).sort((G,hn)=>G.cents-hn.cents)}),S=E=>!(E.metadata&&E.metadata.kind==="class");return v({products:m.data.filter(S).map(E=>D(E,!0)).sort((E,T)=>E.sort-T.sort||E.name.localeCompare(T.name)),hidden:g.data.filter(S).map(E=>D(E,!1))})}let B;if(x(d))return v({error:"Photo addresses must come from Stripe (files.stripe.com) or queenesheirr.com"},400);if((B=h.match(/^price\/(price_[A-Za-z0-9]+)$/))&&e.method==="POST"){let m=new URLSearchParams;if("stock"in d){let y=De(d.stock);if(Number.isNaN(y))return v({error:"Stock must be a whole number"},400);m.set("metadata[stock]",y===null?"":String(y))}if("soldOut"in d&&m.set("metadata[sold_out]",d.soldOut?"true":"false"),typeof d.label=="string"){let y=d.label.trim().slice(0,40);if(!y)return v({error:"Give the option a name, like Paperback"},400);let C="Jams";try{let D=await o(t,`/prices/${B[1]}`),S=await o(t,`/products/${typeof D.product=="string"?D.product:D.product.id}`);C=S.metadata&&S.metadata.category||"Jams"}catch{}m.set("nickname",F(C,y))}if(![...m.keys()].length)return v({error:"Nothing to change"},400);let g=null;try{g=await o(t,`/prices/${B[1]}`)}catch{}if(await r(t,`/prices/${B[1]}`,m),g){let y=s(g),C=(g.metadata&&g.metadata.sold_out)==="true",D="stock"in d?De(d.stock):y,S="soldOut"in d?!!d.soldOut:C;if(typeof D=="number"&&D>0&&typeof y=="number"&&D>y||C&&!S)try{await r(t,`/products/${typeof g.product=="string"?g.product:g.product.id}`,new URLSearchParams({"metadata[restocked]":String(Date.now())}))}catch{}}return v({ok:!0})}if((B=h.match(/^price-remove\/(price_[A-Za-z0-9]+)$/))&&e.method==="POST"){let m=await o(t,`/prices/${B[1]}`),g=typeof m.product=="string"?m.product:m.product.id;return(await o(t,`/prices?active=true&limit=100&type=one_time&product=${g}`)).data.length<=1?v({error:"A product needs at least one size. Use \u201CHide from shop\u201D to take the whole product off the site."},400):(await r(t,`/prices/${m.id}`,new URLSearchParams({active:"false"})),v({ok:!0}))}if((B=h.match(/^price-change\/(price_[A-Za-z0-9]+)$/))&&e.method==="POST"){let m=it(d.price);if(m===null)return v({error:"Enter a price like 7.00"},400);let g=await o(t,`/prices/${B[1]}`),y=new URLSearchParams({product:typeof g.product=="string"?g.product:g.product.id,currency:"usd",unit_amount:String(m)});g.nickname&&y.set("nickname",g.nickname);for(let[C,D]of Object.entries(g.metadata||{}))(C==="stock"||C==="sold_out")&&y.set(`metadata[${C}]`,D);return await r(t,"/prices",y),await r(t,`/prices/${g.id}`,new URLSearchParams({active:"false"})),v({ok:!0})}if((B=h.match(/^size\/([A-Za-z0-9_-]+)$/))&&e.method==="POST"){let m=it(d.price),g=De(d.stock),y="Jams";try{let S=await o(t,`/products/${B[1]}`);y=S.metadata&&S.metadata.category||"Jams"}catch{}let C=F(y,String(d.label||"").trim().slice(0,40));if(m===null||!String(d.label||"").trim()||Number.isNaN(g))return v({error:"Give the size a name and a price like 7.00"},400);let D=new URLSearchParams({product:B[1],currency:"usd",unit_amount:String(m),nickname:C});return g!==null&&D.set("metadata[stock]",String(g)),await r(t,"/prices",D),v({ok:!0})}if((B=h.match(/^product\/([A-Za-z0-9_-]+)$/))&&e.method==="POST"){let m=new URLSearchParams;if(typeof d.name=="string"&&d.name.trim()&&m.set("name",d.name.trim().slice(0,100)),typeof d.description=="string"&&m.set("description",d.description.slice(0,1e3)),$.includes(d.category)&&m.set("metadata[category]",d.category),typeof d.digital=="boolean"&&m.set("metadata[digital]",String(d.digital)),typeof d.buyUrl=="string"){let g=d.buyUrl.trim();if(g&&!/^https:\/\/[^\s]{4,480}$/.test(g))return v({error:"The buy link must start with https://"},400);m.set("metadata[buy_url]",g)}if(d.weightOz!==void 0){let g=String(d.weightOz).trim();if(g&&!(Number(g)>0&&Number(g)<=1600))return v({error:"Weight is in ounces, like 14."},400);m.set("metadata[weight_oz]",g)}return typeof d.active=="boolean"&&m.set("active",String(d.active)),typeof d.featured=="boolean"&&m.set("metadata[featured]",String(d.featured)),st(d.image,a.origin)&&m.set("images[0]",d.image),[...m.keys()].length?(await r(t,`/products/${B[1]}`,m),v({ok:!0})):v({error:"Nothing to change"},400)}if(h==="renew"&&e.method==="GET"){let m=rn(JSON.stringify({e:w.e,exp:Date.now()+nn}));return v({token:`${m}.${await we(t.SESSION_SECRET,m)}`})}if(h==="products/order"&&e.method==="POST"){let m=Array.isArray(d.ids)?d.ids.filter(g=>typeof g=="string"&&/^[A-Za-z0-9_-]+$/.test(g)).slice(0,100):[];if(!m.length)return v({error:"Nothing to reorder"},400);for(let g=0;g<m.length;g+=5)await Promise.all(m.slice(g,g+5).map((y,C)=>r(t,`/products/${y}`,new URLSearchParams({"metadata[sort]":String((g+C+1)*10)}))));return v({ok:!0})}if(h==="product"&&e.method==="POST"){let m=String(d.name||"").trim().slice(0,100),g=$t(m),y=Array.isArray(d.sizes)?d.sizes.slice(0,6):[];if(!g||!y.length)return v({error:"A name and at least one size are needed"},400);let C=$.includes(d.category)?d.category:"Jams",D=y.map(T=>({label:String(T.label||"").trim()?F(C,String(T.label).trim().slice(0,40)):"",c:it(T.price),s:De(T.stock)}));if(D.some(T=>!T.label||T.c===null||Number.isNaN(T.s)))return v({error:"Each size needs a name and a price like 7.00"},400);let S=!0;try{await o(t,`/products/${g}`)}catch{S=!1}if(S)return v({error:"A product with that name already exists"},409);let E=new URLSearchParams({id:g,name:m,description:String(d.description||"").slice(0,1e3),"metadata[category]":C,"metadata[sort]":"900"});d.digital===!0&&E.set("metadata[digital]","true"),typeof d.buyUrl=="string"&&/^https:\/\/[^\s]{4,480}$/.test(d.buyUrl.trim())&&E.set("metadata[buy_url]",d.buyUrl.trim()),st(d.image,a.origin)&&E.set("images[0]",d.image),await r(t,"/products",E);for(let T of D){let G=new URLSearchParams({product:g,currency:"usd",unit_amount:String(T.c),nickname:T.label});T.s!==null&&G.set("metadata[stock]",String(T.s)),await r(t,"/prices",G)}return v({ok:!0,id:g})}if(h==="image"&&e.method==="POST"){let m=String(d.data||"");if(!/^[A-Za-z0-9+/=]+$/.test(m)||m.length>9e5)return v({error:"That photo is too large. Try a smaller one."},400);let g=Uint8Array.from(atob(m),D=>D.charCodeAt(0));if(g.length<1e3||g[0]!==255||g[1]!==216||g[2]!==255)return v({error:"Please choose a JPG or PNG photo"},400);let y=new Uint8Array(12);crypto.getRandomValues(y);let C=Array.from(y).map(D=>D.toString(16).padStart(2,"0")).join("");return await t.ADMIN_KV.put("img:"+C,g),v({ok:!0,url:`${a.origin}/img/${C}.jpg`})}if(h==="events"&&e.method==="GET")return v({events:await ce(t)});if(h==="events"&&e.method==="PUT"){let m=(Array.isArray(d.events)?d.events:[]).slice(0,100),g=[];for(let y of m){let C=String(y.name||"").trim().slice(0,100),D=String(y.date||""),S=String(y.orderBy||"");if(!C||!/^\d{4}-\d{2}-\d{2}$/.test(D)||S&&!/^\d{4}-\d{2}-\d{2}$/.test(S))return v({error:"Each event needs a name and a date"},400);g.push({id:/^[a-z0-9-]{3,40}$/.test(y.id||"")?y.id:$t(C).slice(0,30)+"-"+D,name:C,date:D,location:String(y.location||"").trim().slice(0,200),time:String(y.time||"").trim().slice(0,40),orderBy:S,show:y.show!==!1})}return await t.ADMIN_KV.put("events",JSON.stringify(g)),v({ok:!0,events:g})}if(h==="classes"&&e.method==="GET")return v({classes:await Ne(t)});if(h==="classes"&&e.method==="PUT"){let m;try{m=gt(d.classes)}catch(g){return v({error:g.message},400)}return await t.ADMIN_KV.put("classes",JSON.stringify(m)),v({ok:!0,classes:await Ne(t)})}if(h==="bookings"&&e.method==="GET")return v({bookings:await wt(t)});if(h==="requests"&&e.method==="GET"){let m=await o(t,"/quotes?limit=40&expand[]=data.customer"),g=/^(sk|rk)_test_/.test(t.STRIPE_SECRET_KEY||""),y=m.data.filter(en).map(C=>({id:C.id,status:C.status,created:C.created*1e3,total:C.amount_total||0,name:C.customer&&C.customer.name||"",email:C.customer&&C.customer.email||"",cls:C.metadata&&C.metadata.class||C.description||"",date:C.metadata&&C.metadata.requested_date||"",attendees:C.metadata&&C.metadata.attendees||"",notes:C.metadata&&C.metadata.notes||"",phone:C.metadata&&C.metadata.phone||"",wholesale:/wholesale/.test(String(C.metadata&&C.metadata.source||"")),business:C.metadata&&C.metadata.business||"",taxId:C.metadata&&C.metadata.tax_id||"",url:`https://dashboard.stripe.com/${g?"test/":""}quotes/${C.id}`}));return v({requests:y})}if(h==="request-action"&&e.method==="POST"){if(!/^qt_[A-Za-z0-9]+$/.test(d.id||"")||!["approve","decline"].includes(d.action))return v({error:"Bad request"},400);let m=await o(t,`/quotes/${d.id}`);if(!en(m))return v({error:"Not found"},404);if(m.status!=="draft")return v({error:"That request was already handled"},409);let g=await r(t,`/quotes/${d.id}/${d.action==="approve"?"finalize":"cancel"}`,new URLSearchParams);return v({ok:!0,status:g.status})}if(h==="pos-products"&&e.method==="GET")return v({products:await p(t)});if(h==="pos-checkout"&&e.method==="POST")try{return v(await i(t,a.origin,d.items,d.location))}catch(m){return v({error:String(m.message||"Could not start the payment").slice(0,160)},400)}if(h==="pos-cancel"&&e.method==="POST"){if(!/^cs_[A-Za-z0-9_]+$/.test(d.id||""))return v({error:"Bad request"},400);let m=await o(t,`/checkout/sessions/${d.id}`);return!m.metadata||m.metadata.fulfillment!=="inperson"?v({error:"Not found"},404):(m.status==="open"&&await r(t,`/checkout/sessions/${d.id}/expire`,new URLSearchParams),v({ok:!0}))}if(h==="pos-cash"&&e.method==="POST")try{return v(await l(t,d.items,d.email,d.taxPct,d.key,d.name,d.location,d.method,d.paymentId))}catch(m){return v({error:String(m.message||"Could not record the sale").slice(0,160)},400)}if(h==="pos-session"&&e.method==="GET"){let m=a.searchParams.get("id")||"";if(!/^cs_[A-Za-z0-9_]+$/.test(m))return v({error:"Bad request"},400);let g=await o(t,`/checkout/sessions/${m}`);return!g.metadata||g.metadata.fulfillment!=="inperson"?v({error:"Not found"},404):v({paid:g.payment_status==="paid",status:g.status})}if(h==="pay-links"&&e.method==="GET"){let m={};try{m=JSON.parse(await t.ADMIN_KV.get("paylinks")||"{}")}catch{m={}}return v({cashapp:m.cashapp||"",venmo:m.venmo||""})}if(h==="pay-links"&&e.method==="POST"){let m=String(d.cashapp||"").trim().replace(/^https?:\/\/cash\.app\//i,"").replace(/^\$/,"").replace(/\/+$/,""),g=String(d.venmo||"").trim().replace(/^https?:\/\/(account\.)?venmo\.com\/(u\/)?/i,"").replace(/^@/,"").replace(/[/?].*$/,"");return m&&!/^[A-Za-z0-9_]{1,24}$/.test(m)?v({error:"That Cash App name does not look right. It looks like $QueenEsHeirr."},400):g&&!/^[A-Za-z0-9_-]{1,40}$/.test(g)?v({error:"That Venmo username does not look right. It looks like @QueenEs-Heirr."},400):(await t.ADMIN_KV.put("paylinks",JSON.stringify({cashapp:m,venmo:g})),v({ok:!0,cashapp:m,venmo:g}))}if(h==="cash-ledger"&&e.method==="GET"){let m=[];try{m=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{m=[]}return v({sales:m.slice().reverse().map(g=>({id:g.id,ts:g.ts,name:g.name||"",location:g.location||"",email:g.email||"",subtotal:g.subtotal,tax:g.tax,total:g.total,rate:g.rate||0,method:g.method||"cash",paymentId:g.paymentId||"",voided:!!g.voided,items:g.items.map(y=>({name:y.name,size:y.size,qty:y.qty,cents:y.cents}))}))})}if(h==="cash-receipt"&&e.method==="POST"){let m=String(d.email||"").trim().slice(0,200);if(!/^cash_[a-f0-9]+$/.test(d.id||"")||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m))return v({error:"Enter a valid email address"},400);let g=[];try{g=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{g=[]}let y=g.find(D=>D.id===d.id);if(!y)return v({error:"Not found"},404);if(y.voided)return v({error:"That sale was voided"},409);y.email=m,await t.ADMIN_KV.put("cashsales",JSON.stringify(g));let C=await u(t,y);return v({ok:!0,emailed:C,email:m})}if(h==="cash-void"&&e.method==="POST"){if(!/^cash_[a-f0-9]+$/.test(d.id||""))return v({error:"Bad request"},400);let m=[];try{m=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{m=[]}let g=m.find(y=>y.id===d.id);if(!g)return v({error:"Not found"},404);if(g.voided)return v({error:"That sale is already voided"},409);for(let y of g.items){if(!y.priceId)continue;let C=await o(t,`/prices/${y.priceId}`),D=s(C);D!==null&&await r(t,`/prices/${y.priceId}`,new URLSearchParams({"metadata[stock]":String(D+y.qty)}))}return g.voided=!0,g.voidedAt=Date.now(),await t.ADMIN_KV.put("cashsales",JSON.stringify(m)),v({ok:!0})}if(h==="report"&&e.method==="GET"){let m=a.searchParams.get("from")||"",g=a.searchParams.get("to")||"";return!/^\d{4}-\d{2}-\d{2}$/.test(m)||!/^\d{4}-\d{2}-\d{2}$/.test(g)||m>g?v({error:"Choose a start and end date"},400):v(await on(t,o,m,g))}if(h==="report-email"&&e.method==="POST"){let m=String(d.from||""),g=String(d.to||"");if(!/^\d{4}-\d{2}-\d{2}$/.test(m)||!/^\d{4}-\d{2}-\d{2}$/.test(g)||m>g)return v({error:"Choose a start and end date"},400);try{return v({ok:!0,...await ct(t,o,m,g,`${m} to ${g}`)})}catch(y){return v({error:String(y.message||"Could not send").slice(0,200)},502)}}if(h==="orders"&&e.method==="GET"){let[m,g]=await Promise.all([o(t,"/checkout/sessions?limit=60&expand[]=data.line_items"),t.ADMIN_KV.get("orderstatus")]),y=g?JSON.parse(g):{},C=m.data.filter(S=>S.payment_status==="paid"&&!(S.metadata&&S.metadata.kind==="class")).map(S=>{let E=S.shipping_details||S.collected_information&&S.collected_information.shipping_details||null;return{id:S.id,created:S.created*1e3,total:S.amount_total,status:y[S.id]||((S.metadata&&S.metadata.fulfillment)==="inperson"?"fulfilled":"new"),name:S.customer_details&&S.customer_details.name||"",email:S.customer_details&&S.customer_details.email||"",phone:S.customer_details&&S.customer_details.phone||"",refundUrl:typeof S.payment_intent=="string"&&S.payment_intent?`https://dashboard.stripe.com/${/^(sk|rk)_test_/.test(t.STRIPE_SECRET_KEY||"")?"test/":""}payments/${S.payment_intent}`:"",fulfillment:S.metadata&&S.metadata.fulfillment||"ship",event:S.metadata&&S.metadata.event||"",address:E&&E.address?[E.address.line1,E.address.line2,E.address.city,E.address.state,E.address.postal_code].filter(Boolean).join(", "):"",items:(S.line_items&&S.line_items.data||[]).map(T=>({name:T.description,qty:T.quantity}))}}),D=[];try{D=JSON.parse(await t.ADMIN_KV.get("cashsales")||"[]")}catch{D=[]}for(let S of D.slice(-80))S.voided||C.push({id:S.id,created:S.ts,total:S.total,status:y[S.id]||"fulfilled",name:S.name||"Cash sale",email:S.email||"",phone:"",fulfillment:"inperson",cash:!0,method:S.method||"cash",event:S.location||"",address:"",items:S.items.map(E=>({name:`${E.name} (${E.size})`,qty:E.qty}))});return C.sort((S,E)=>E.created-S.created),v({orders:C})}if(h==="order-status"&&e.method==="POST"){if(!/^(cs|cash)_[A-Za-z0-9_]+$/.test(d.id||"")||!Vn.includes(d.status))return v({error:"Bad request"},400);let m=JSON.parse(await t.ADMIN_KV.get("orderstatus")||"{}");m[d.id]=d.status;let g=Object.keys(m);return g.length>400&&delete m[g[0]],await t.ADMIN_KV.put("orderstatus",JSON.stringify(m)),v({ok:!0})}}catch(b){return console.log("admin error",h,String(b)),v({error:"That did not save. Please try again."},502)}return v({error:"Not found"},404)}async function pn(e,t){if(!e.ADMIN_KV||!/^[a-f0-9]{16,32}$/.test(t))return new Response("Not found",{status:404});let a=await e.ADMIN_KV.get("img:"+t,"arrayBuffer");return a?new Response(a,{headers:{"Content-Type":"image/jpeg","Cache-Control":"public, max-age=31536000, immutable","X-Content-Type-Options":"nosniff"}}):new Response("Not found",{status:404})}var dt="https://api.stripe.com/v1",pt=40,Oe=20;function aa(e,t){let a=(e.ALLOWED_ORIGINS||"").split(",").map(o=>o.trim()).filter(Boolean),n=a.includes(t);return{ok:n,headers:{"Access-Control-Allow-Origin":n?t:a[0]||"","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization","Access-Control-Max-Age":"86400",Vary:"Origin"}}}function I(e,t,a){return new Response(JSON.stringify(e),{status:t,headers:{"Content-Type":"application/json",...a}})}async function Q(e,t){let a=await fetch(dt+t,{headers:{Authorization:`Bearer ${e.STRIPE_SECRET_KEY}`}});if(!a.ok)throw new Error(`Stripe ${a.status}`);return a.json()}function q(e){let t=e&&e.metadata&&e.metadata.stock;if(t==null||String(t).trim()==="")return null;let a=parseInt(t,10);return Number.isInteger(a)?Math.max(0,a):null}async function Z(e){let[t,a]=await Promise.all([Q(e,"/products?active=true&limit=100"),Q(e,"/prices?active=true&limit=100&type=one_time")]),n=new Map;for(let r of a.data){if(r.currency!=="usd"||typeof r.unit_amount!="number")continue;let s=typeof r.product=="string"?r.product:r.product&&r.product.id;n.has(s)||n.set(s,[]),n.get(s).push(r)}let o=[];for(let r of t.data){let s=n.get(r.id);if(!s||!s.length)continue;let p=(r.metadata&&r.metadata.sold_out)==="true",i=$.includes(r.metadata&&r.metadata.category)?r.metadata.category:"Jams",l=s.map(u=>({label:F(i,u.nickname),priceId:u.id,cents:u.unit_amount,stock:q(u),soldOut:p||(u.metadata&&u.metadata.sold_out)==="true"||q(u)!==null&&q(u)<=0})).sort((u,c)=>u.cents-c.cents||u.label.localeCompare(c.label));o.push({id:r.id,name:r.name,category:i,description:r.description||"",image:r.images&&r.images[0]||"",featured:(r.metadata&&r.metadata.featured)==="true",digital:(r.metadata&&r.metadata.digital)==="true",weightOz:r.metadata&&r.metadata.weight_oz||"",buyUrl:/^https:\/\/[^\s]+$/.test(r.metadata&&r.metadata.buy_url||"")?r.metadata.buy_url:"",restocked:Number(r.metadata&&r.metadata.restocked||0),sort:Number(r.metadata&&r.metadata.sort||1e3),sizes:l})}return o.sort((r,s)=>r.sort-s.sort||r.name.localeCompare(s.name)),o}async function ra(e,t,a,n){let o=caches.default,r=new Request(new URL("/products",e.url).toString()),s=await o.match(r),p;if(s)p=await s.text();else{try{p=JSON.stringify(await Z(t))}catch(l){return console.log("catalog error",String(l)),I({error:"Catalog unavailable"},502,a.headers)}let i=new Response(p,{headers:{"Content-Type":"application/json","Cache-Control":"public, max-age=60"}});n.waitUntil(o.put(r,i))}return new Response(p,{status:200,headers:{"Content-Type":"application/json",...a.headers}})}async function sa(e,t,a){let n;try{n=await e.json()}catch{return I({error:"Invalid request"},400,a.headers)}let o=n&&n.items;if(!Array.isArray(o)||!o.length||o.length>pt)return I({error:"Your bag is empty"},400,a.headers);try{let i=e.headers.get("CF-Connecting-IP")||"x",l=`rl:shipq:${i}:${Math.floor(Date.now()/36e5)}`,u=parseInt(await t.ADMIN_KV.get(l)||"0",10);if(u>=40)return I({error:"Too many price checks. Please try again in a little while."},429,a.headers);await t.ADMIN_KV.put(l,String(u+1),{expirationTtl:3700})}catch{}let r=await Z(t),s=o.map(i=>({id:i&&i.id,qty:Number.isInteger(i&&i.qty)&&i.qty>0&&i.qty<=Oe?i.qty:1})).filter(i=>r.some(l=>l.id===i.id));if(!s.length)return I({error:"An item in your bag is no longer available"},400,a.headers);let p=await Nt(t,r,s,String(n.zip||"").trim(),parseInt(t.SHIPPING_CENTS||"1000",10));return I(p,p.error?400:200,a.headers)}async function ia(e,t,a){let n;try{n=await e.json()}catch{return I({error:"Invalid request"},400,a.headers)}let o=n&&n.items;if(!Array.isArray(o)||o.length===0||o.length>pt)return I({error:"Your bag is empty or too large"},400,a.headers);let r;try{r=await Z(t)}catch(d){return console.log("catalog error",String(d)),I({error:"Could not start checkout"},502,a.headers)}r.length||(r=Object.keys(_).map(d=>({id:d,name:_[d].name,sizes:Object.keys(_[d].sizes).map(b=>({label:b,cents:_[d].sizes[b],soldOut:_[d].soldOut.includes(b)}))})));let s=new URLSearchParams,p=new Map,i=0;for(let d of o){let b=r.find(m=>m.id===(d&&d.id)),f=b&&b.sizes.find(m=>m.label===F(b.category,d.size)),k=d&&d.qty;if(!f||!Number.isInteger(k)||k<1||k>Oe)return I({error:"An item in your bag is no longer available"},400,a.headers);if(b.buyUrl)return I({error:`${b.name} is sold on Amazon. Please use the Buy on Amazon button.`},400,a.headers);if(f.soldOut)return I({error:`${b.name} (${f.label}) is sold out`},400,a.headers);let A=`${b.id}|${f.label}`,B=(p.get(A)||0)+k;if(p.set(A,B),typeof f.stock=="number"&&B>f.stock)return I({error:`Only ${f.stock} left of ${b.name} (${f.label})`},400,a.headers);f.priceId?s.set(`line_items[${i}][price]`,f.priceId):(s.set(`line_items[${i}][price_data][currency]`,"usd"),s.set(`line_items[${i}][price_data][unit_amount]`,String(f.cents)),t.TAX_ENABLED==="true"&&s.set(`line_items[${i}][price_data][tax_behavior]`,"exclusive"),s.set(`line_items[${i}][price_data][product_data][name]`,`${b.name} (${f.label})`)),s.set(`line_items[${i}][quantity]`,String(k)),i++}let l=o.length>0&&o.every(d=>{let b=r.find(f=>f.id===(d&&d.id));return b&&b.digital}),u=!l&&(n.fulfillment==="pickup"||n.fulfillment==="event"),c=null;if(!l&&n.fulfillment==="event"&&(c=Te(await ce(t)).find(d=>d.id===n.eventId),!c))return I({error:"That event is no longer taking orders"},400,a.headers);let h=t.SITE_URL||"https://queenesheirr.com";if(s.set("mode","payment"),s.set("success_url",`${h}/order-confirmed/?session_id={CHECKOUT_SESSION_ID}`),s.set("cancel_url",`${h}/shop/`),s.set("phone_number_collection[enabled]","true"),s.set("metadata[fulfillment]",l?"digital":c?"event":u?"pickup":"ship"),c&&(s.set("metadata[event]",`${c.name} (${c.date})`.slice(0,200)),s.set("metadata[event_id]",String(c.id).slice(0,60))),n.optin===!0&&s.set("metadata[optin]","1"),l)s.set("billing_address_collection","required"),s.set("custom_text[submit][message]","Digital item: nothing ships. We will email your download or access details to the address you enter here.");else if(u)s.set("billing_address_collection","required"),s.set("custom_text[submit][message]",c?`Pickup at ${c.name} on ${c.date}${c.location?" ("+c.location+")":""}. We will email you the details.`:"Local pickup: we will email you to arrange a pickup time and place.");else{let d=null;if(n.ship&&typeof n.ship=="object"&&(d=await Mt(t,r,o,n.ship,String(n.shipZip||"")),d&&d.stale))return I({error:"Your bag or shipping prices changed. Please choose your shipping option again."},400,a.headers);s.set("shipping_address_collection[allowed_countries][0]","US"),s.set("custom_text[shipping_address][message]","Orders are made in small batches and take about 5 business days to prepare before they ship. USPS delivery time is in addition."),s.set("shipping_options[0][shipping_rate_data][type]","fixed_amount"),s.set("shipping_options[0][shipping_rate_data][display_name]",d?d.service:"Flat-rate shipping"),s.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]",String(d?d.cents:parseInt(t.SHIPPING_CENTS||"1000",10))),d&&d.token!=="flat"&&(s.set("metadata[ship_service]",d.service),s.set("metadata[ship_zip]",String(n.shipZip).slice(0,5))),s.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]","usd"),t.TAX_ENABLED==="true"&&s.set("shipping_options[0][shipping_rate_data][tax_behavior]","exclusive")}t.TAX_ENABLED==="true"&&s.set("automatic_tax[enabled]","true");let w=await fetch(`${dt}/checkout/sessions`,{method:"POST",headers:{Authorization:`Bearer ${t.STRIPE_SECRET_KEY}`,"Content-Type":"application/x-www-form-urlencoded"},body:s}),x=await w.json();return!w.ok||!x.url?(console.log("Stripe error",w.status,JSON.stringify(x.error||{})),I({error:"Could not start checkout"},502,a.headers)):I({url:x.url},200,a.headers)}async function oa(e,t){let a=n=>new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Queen E's Heirr</title><body style="font:18px Georgia,serif;text-align:center;padding:48px 24px;background:#fcfaf7;color:#1b3b22"><h1>Queen E's Heirr</h1><p>${n}</p>`,{status:410,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}});try{let n=await Q(e,`/checkout/sessions/${t}`);return!n.metadata||n.metadata.fulfillment!=="inperson"?a("This payment link is not valid."):n.status!=="open"||!n.url?a(n.payment_status==="paid"?"This order is already paid. Thank you!":"This payment link has expired. Please ask for a new one."):new Response(null,{status:302,headers:{Location:n.url,"Cache-Control":"no-store","Referrer-Policy":"no-referrer"}})}catch{return a("This payment link is not valid.")}}var la=["cash","cashapp","venmo","tap"];async function ca(e,t,a,n,o,r,s,p,i){if(p=la.includes(p)?p:"cash",i=/^(ch|py)_[A-Za-z0-9]+$/.test(i||"")?i:"",!e.ADMIN_KV)throw new Error("Storage is not set up");if(!Array.isArray(t)||t.length===0||t.length>20)throw new Error("The bag is empty");if(a=String(a||"").trim().slice(0,200),r=String(r||"").trim().slice(0,100),s=String(s||"").trim().slice(0,120),a&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a))throw new Error("That email address does not look right");let l=Math.min(Math.max(parseFloat(n)||0,0),15);o=/^[A-Za-z0-9_-]{8,64}$/.test(o||"")?o:"";let u=[];try{u=JSON.parse(await e.ADMIN_KV.get("cashsales")||"[]")}catch{u=[]}if(o){let m=u.find(g=>g.key===o);if(m)return{ok:!0,id:m.id,total:m.total,emailed:!!m.email,duplicate:!0}}let c=await Z(e),h=new Map,w=[],x=0;for(let m of t){let g=c.find(E=>E.id===(m&&m.id)),y=g&&g.sizes.find(E=>E.label===F(g.category,m.size)),C=m&&m.qty;if(!y||!Number.isInteger(C)||C<1||C>Oe)throw new Error("An item in the bag is no longer available");if(y.soldOut)throw new Error(`${g.name} (${y.label}) is sold out`);let D=`${g.id}|${y.label}`,S=(h.get(D)||0)+C;if(h.set(D,S),typeof y.stock=="number"&&S>y.stock)throw new Error(`Only ${y.stock} left of ${g.name} (${y.label})`);w.push({name:g.name,size:y.label,qty:C,cents:y.cents,priceId:y.priceId,id:g.id}),x+=y.cents*C}let d=Math.round(x*l/100),b=x+d;for(let m of w){if(!m.priceId)continue;let g=await Q(e,`/prices/${m.priceId}`),y=q(g);y!==null&&await U(e,`/prices/${m.priceId}`,new URLSearchParams({"metadata[stock]":String(Math.max(0,y-m.qty))}))}let f=new Uint8Array(6);crypto.getRandomValues(f);let k="cash_"+Array.from(f).map(m=>m.toString(16).padStart(2,"0")).join(""),A={id:k,key:o,method:p,paymentId:i,ts:Date.now(),name:r,location:s,email:a,subtotal:x,tax:d,total:b,rate:l,items:w.map(m=>({name:m.name,size:m.size,qty:m.qty,cents:m.cents,priceId:m.priceId}))};u.push(A),await e.ADMIN_KV.put("cashsales",JSON.stringify(u.slice(-1e3)));let B=a?await un(e,A):!1;return{ok:!0,id:k,total:b,emailed:B}}async function un(e,t){if(!t.email||!e.MAIL_URL||!e.MAIL_SECRET)return!1;try{let a=await fetch(e.MAIL_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"cash_receipt",secret:e.MAIL_SECRET,sale:t})});if(!a.ok)return!1;let n=await a.json().catch(()=>null);return!!(n&&n.ok===!0)}catch(a){return console.log("cash receipt failed",String(a)),!1}}async function da(e,t,a,n){if(!Array.isArray(a)||a.length===0||a.length>pt)throw new Error("The bag is empty");let o=await Z(e),r=new URLSearchParams,s=new Map,p=0;for(let l of a){let u=o.find(d=>d.id===(l&&l.id)),c=u&&u.sizes.find(d=>d.label===F(u.category,l.size)),h=l&&l.qty;if(!c||!c.priceId||!Number.isInteger(h)||h<1||h>Oe)throw new Error("An item in the bag is no longer available");if(c.soldOut)throw new Error(`${u.name} (${c.label}) is sold out`);let w=`${u.id}|${c.label}`,x=(s.get(w)||0)+h;if(s.set(w,x),typeof c.stock=="number"&&x>c.stock)throw new Error(`Only ${c.stock} left of ${u.name} (${c.label})`);r.set(`line_items[${p}][price]`,c.priceId),r.set(`line_items[${p}][quantity]`,String(h)),p++}r.set("mode","payment"),r.set("success_url",`${t}/admin/thanks`),r.set("cancel_url",`${t}/admin/thanks?cancelled=1`),r.set("expires_at",String(Math.floor(Date.now()/1e3)+1860)),r.set("metadata[fulfillment]","inperson"),r.set("metadata[event]",String(n||"").trim().slice(0,120)||"In-person sale"),e.TAX_ENABLED==="true"&&(r.set("automatic_tax[enabled]","true"),r.set("billing_address_collection","required"));let i=await U(e,"/checkout/sessions",r);return{url:i.url,id:i.id,pay:`${t}/pay/${i.id}`}}var pa={"Standalone Jam Making & STEM Lab":{id:"class-jam-stem-lab",cents:5500},"Jam Making & Etiquette Combined Class":{id:"class-jam-etiquette",cents:8500},"Private group or event (custom quote)":{id:"class-private-event",cents:8500}};async function U(e,t,a){let n=await fetch(dt+t,{method:"POST",headers:{Authorization:`Bearer ${e.STRIPE_SECRET_KEY}`,"Content-Type":"application/x-www-form-urlencoded"},body:a}),o=await n.json();if(!n.ok)throw new Error(`Stripe ${n.status} ${o.error&&o.error.message}`);return o}async function ua(e,t,a){try{return await Q(e,`/products/${t.id}`)}catch{}let n=new URLSearchParams({id:t.id,name:a,"metadata[kind]":"class"});return U(e,"/products",n)}async function ha(e,t,a){let n;try{n=await e.json()}catch{return I({error:"Invalid request"},400,a.headers)}let o=String(n&&n.name||"").trim().slice(0,100),r=String(n&&n.email||"").trim().slice(0,200),s=pa[n&&n.class],p=parseInt(n&&n.attendees,10),i=String(n&&n.date||"").slice(0,10),l=String(n&&n.notes||"").slice(0,1e3);if(n&&n.website||!o||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r)||!s||!(p>=1&&p<=30)||!/^\d{4}-\d{2}-\d{2}$/.test(i))return I({error:"Invalid request"},400,a.headers);try{await ua(t,s,n.class);let c=(await Q(t,`/customers?email=${encodeURIComponent(r)}&limit=1`)).data[0]||await U(t,"/customers",new URLSearchParams({name:o,email:r})),h=new URLSearchParams({customer:c.id,description:`${n.class} - requested date ${i}, ${p} attendee(s).`,"metadata[requested_date]":i,"metadata[attendees]":String(p),"metadata[notes]":l.slice(0,480),"metadata[source]":"queenesheirr.com class request","metadata[class]":String(n.class).slice(0,100),"metadata[phone]":String(n&&n.phone||"").slice(0,40),"line_items[0][price_data][currency]":"usd","line_items[0][price_data][product]":s.id,"line_items[0][price_data][unit_amount]":String(s.cents),"line_items[0][quantity]":String(p)}),w=await U(t,"/quotes",h);return I({ok:!0,quote:w.id},200,a.headers)}catch(u){return console.log("quote error",String(u)),I({error:"Could not create quote"},502,a.headers)}}var ma=200;async function ga(e,t,a){let n;try{n=await e.json()}catch{return I({error:"Invalid request"},400,a.headers)}let o=String(n&&n.business||"").trim().slice(0,100),r=String(n&&n.contact||"").trim().slice(0,100),s=String(n&&n.email||"").trim().slice(0,200);if(n&&n.website||!o||!r||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)||!Array.isArray(n.items)||!n.items.length||n.items.length>40)return I({error:"Invalid request"},400,a.headers);try{let p=await Z(t),i=[];for(let d of n.items){let b=parseInt(d&&d.qty,10),f=p.find(A=>A.id===(d&&d.id)),k=f&&f.sizes.find(A=>A.label===F(f.category,d.size));if(!k||!(b>=1&&b<=500))return I({error:"Invalid request"},400,a.headers);i.push({product:f,size:k,qty:b,cents:Math.max(100,k.cents-ma)})}let u=(await Q(t,`/customers?email=${encodeURIComponent(s)}&limit=1`)).data[0]||await U(t,"/customers",new URLSearchParams({name:o,email:s})),c=i.map(d=>`${d.qty} x ${d.product.name} (${d.size.label})`).join("; "),h=i.reduce((d,b)=>d+b.qty,0),w=new URLSearchParams({customer:u.id,description:`Wholesale order - ${o}, ${h} jar(s) at retail less $2.00 each.`.slice(0,500),"metadata[source]":"queenesheirr.com wholesale request","metadata[class]":"Wholesale order","metadata[business]":o,"metadata[contact]":r,"metadata[tax_id]":String(n&&n.tax_id||"").slice(0,60),"metadata[phone]":String(n&&n.phone||"").slice(0,40),"metadata[attendees]":String(h),"metadata[notes]":(String(n&&n.notes||"").slice(0,200)+" | "+c).slice(0,490)});i.forEach((d,b)=>{w.set(`line_items[${b}][price_data][currency]`,"usd"),w.set(`line_items[${b}][price_data][product]`,d.product.id),w.set(`line_items[${b}][price_data][unit_amount]`,String(d.cents)),w.set(`line_items[${b}][quantity]`,String(d.qty))});let x=await U(t,"/quotes",w);return I({ok:!0,quote:x.id},200,a.headers)}catch(p){return console.log("wholesale quote error",String(p)),I({error:"Could not create quote"},502,a.headers)}}async function fa(e,t,a){let n=e.headers.get("Authorization")||"";if(!t.ADMIN_TOKEN||n!==`Bearer ${t.ADMIN_TOKEN}`)return I({error:"Not found"},404,a.headers);let o={created:[],skipped:[],errors:[]};for(let r of ut)try{let s=!0;try{await Q(t,`/products/${r.id}`)}catch{s=!1}s||await U(t,"/products",new URLSearchParams({id:r.id,name:r.name,description:r.description||"","metadata[category]":r.category,"metadata[sort]":String(r.sort)}));let p=await Q(t,`/prices?product=${encodeURIComponent(r.id)}&active=true&limit=20`),i=new Set(p.data.map(l=>l.nickname));for(let l of r.sizes){if(i.has(l.label)){o.skipped.push(`${r.id} ${l.label}`);continue}let u=new URLSearchParams({product:r.id,currency:"usd",unit_amount:String(l.cents),nickname:l.label});l.soldOut&&u.set("metadata[sold_out]","true"),await U(t,"/prices",u),o.created.push(`${r.id} ${l.label}`)}}catch(s){o.errors.push(`${r.id}: ${String(s)}`)}return I(o,o.errors.length?502:200,a.headers)}async function Aa(e,t,a){if(!e||!t)return!1;let o=Object.fromEntries(t.split(",").map(l=>l.split("=").map(u=>u.trim())).filter(l=>l.length===2)).t,r=t.split(",").map(l=>l.trim()).filter(l=>l.startsWith("v1=")).map(l=>l.slice(3));if(!o||!r.length||Math.abs(Date.now()/1e3-Number(o))>300)return!1;let s=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),p=new Uint8Array(await crypto.subtle.sign("HMAC",s,new TextEncoder().encode(`${o}.${a}`))),i=Array.from(p).map(l=>l.toString(16).padStart(2,"0")).join("");return r.some(l=>l.length===i.length&&l.split("").reduce((u,c,h)=>u|c.charCodeAt(0)^i.charCodeAt(h),0)===0)}async function wa(e,t){let a=await e.text();if(!await Aa(t.STRIPE_WEBHOOK_SECRET,e.headers.get("Stripe-Signature"),a))return new Response("bad signature",{status:400});let n;try{n=JSON.parse(a)}catch{return new Response("bad json",{status:400})}if(n.type!=="checkout.session.completed"&&n.type!=="checkout.session.async_payment_succeeded")return new Response("ignored",{status:200});let o=n.data&&n.data.object;if(!o||o.payment_status!=="paid")return new Response("not paid",{status:200});if(o.metadata&&o.metadata.kind==="class"){try{await At(t,o)}catch(r){return console.log("booking error",String(r)),new Response("error",{status:500})}return new Response("ok",{status:200})}try{let r=await Q(t,`/checkout/sessions/${o.id}/line_items?limit=100`);for(let s of r.data){let p=s.price&&s.price.id;if(!p)continue;let i=await Q(t,`/prices/${p}`),l=q(i);if(l===null)continue;let u=String(i.metadata&&i.metadata.applied||"").split(",").filter(Boolean);if(u.includes(o.id))continue;u.push(o.id);let c=new URLSearchParams({"metadata[stock]":String(Math.max(0,l-(s.quantity||0))),"metadata[applied]":u.slice(-5).join(",")});await U(t,`/prices/${p}`,c)}}catch(r){return console.log("webhook error",String(r)),new Response("error",{status:500})}if(o.metadata&&o.metadata.fulfillment==="event")try{await jt(t,Q,o.id)}catch(r){console.log("event order email failed",String(r))}if(o.metadata&&o.metadata.optin==="1")try{let r=await Q(t,`/checkout/sessions/${o.id}?expand[]=line_items.data.price.product`);await kt(t,r,!0)}catch(r){console.log("opt-in failed",String(r))}return new Response("ok",{status:200})}async function ba(e,t,a,n){let o=e.headers.get("Authorization")||"";if(!t.ADMIN_TOKEN||o!==`Bearer ${t.ADMIN_TOKEN}`)return I({error:"Not found"},404,a.headers);let r=parseInt(n.searchParams.get("n"),10);if(!Number.isInteger(r)||r<0||r>1e5)return I({error:"Bad n"},400,a.headers);let s={set:[],kept:[],soldOutLeftAlone:[],errors:[]},p=await Q(t,"/prices?active=true&limit=100&type=one_time");for(let i of p.data){let l=`${typeof i.product=="string"?i.product:i.product.id} ${i.nickname||"Regular"}`;if(i.metadata&&i.metadata.sold_out==="true"){s.soldOutLeftAlone.push(l);continue}if(q(i)!==null){s.kept.push(`${l} (${q(i)})`);continue}try{await U(t,`/prices/${i.id}`,new URLSearchParams({"metadata[stock]":String(r)})),s.set.push(l)}catch(u){s.errors.push(`${l}: ${String(u)}`)}}return I(s,s.errors.length?502:200,a.headers)}var Va={async scheduled(e,t,a){let n=Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",day:"numeric"}).format(new Date)),o=Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",hour:"numeric",hour12:!1}).format(new Date))%24;a.waitUntil((async()=>{try{console.log("event reminders",await qt(t,Q))}catch(r){console.log("event reminders failed",String(r))}try{console.log("event reports",await ln(t,Q))}catch(r){console.log("event reports failed",String(r))}if(n===1&&o===7)try{console.log("monthly report",await cn(t,Q))}catch(r){console.log("monthly report failed",String(r))}})())},async fetch(e,t,a){let n={ALLOWED_ORIGINS:"https://queenesheirr.com,https://www.queenesheirr.com",SITE_URL:"https://queenesheirr.com",SHIPPING_CENTS:"1000",...t},o=new URL(e.url),r=aa(n,e.headers.get("Origin")||"");if(e.method==="OPTIONS")return new Response(null,{status:204,headers:r.headers});if(n.ADMIN_HOST&&o.hostname===n.ADMIN_HOST&&o.pathname==="/")return Response.redirect(`https://${n.ADMIN_HOST}/admin`,302);if(!n.STRIPE_SECRET_KEY)return I({error:"Not configured"},500,r.headers);if(o.pathname==="/admin"||o.pathname.startsWith("/admin/")){let i=await dn(e,n,o,{stripeGet:Q,stripePost:U,stockOf:q,loadCatalog:Z,posCheckout:da,posCash:ca,sendCashReceipt:un});if(i)return i}let s=o.pathname.match(/^\/img\/([a-f0-9]+)\.jpg$/);if(s&&e.method==="GET")return pn(n,s[1]);let p=o.pathname.match(/^\/pay\/(cs_[A-Za-z0-9_]+)$/);if(p&&e.method==="GET")return oa(n,p[1]);if((o.pathname==="/blog"||o.pathname.startsWith("/blog/"))&&e.method==="GET"){let i=await Ht(o,n,r.headers,I);if(i)return i}return o.pathname==="/events"&&e.method==="GET"?I(Te(await ce(n)),200,{...r.headers,"Cache-Control":"public, max-age=60"}):o.pathname==="/classes"&&e.method==="GET"?I(await de(n),200,{...r.headers,"Cache-Control":"public, max-age=30"}):o.pathname==="/class-checkout"&&e.method==="POST"?r.ok?ft(e,n,r,{json:I,stripePost:U}):I({error:"Origin not allowed"},403,r.headers):o.pathname==="/products"&&e.method==="GET"?ra(e,n,r,a):o.pathname==="/checkout"&&e.method==="POST"?r.ok?ia(e,n,r):I({error:"Origin not allowed"},403,r.headers):o.pathname==="/class-request"&&e.method==="POST"?r.ok?ha(e,n,r):I({error:"Origin not allowed"},403,r.headers):o.pathname==="/ship-quote"&&e.method==="POST"?r.ok?sa(e,n,r):I({error:"Origin not allowed"},403,r.headers):o.pathname==="/wholesale-request"&&e.method==="POST"?r.ok?ga(e,n,r):I({error:"Origin not allowed"},403,r.headers):o.pathname==="/shippo-webhook"&&e.method==="POST"?Tt(e,n,a,{stripeGet:Q}):o.pathname==="/stripe-webhook"&&e.method==="POST"?wa(e,n):o.pathname==="/admin/set-stock"&&e.method==="POST"?ba(e,n,r,o):o.pathname==="/admin/seed"&&e.method==="POST"?fa(e,n,r):I({error:"Not found"},404,r.headers)}};export{Va as default};
