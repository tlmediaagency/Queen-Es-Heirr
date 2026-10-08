import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SITE } from "./site-B_XtxgrQ.mjs";
import { i as Store } from "../_libs/lucide-react.mjs";
import { i as PageIntro } from "./router-ByqkDZoN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locations-fKgGMyJK.js
var import_jsx_runtime = require_jsx_runtime();
function Locations() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "Physical retail stockist",
			title: "Where to find Queen E's",
			lede: "Visit our featured local partner in Lacombe, Louisiana."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 rounded-3xl border border-linen bg-surface p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-12 items-center justify-center rounded-2xl bg-forest text-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-forest",
					children: "Featured stockist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-2xl font-bold text-forest",
					children: SITE.location.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-gold-dark",
					children: SITE.location.address
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: "Sweeten your bayou life with Queen E's jams and pickles at Bayou Stuf. Elevate po'boys, stock the pantry, and support local — all under one roof."
				})
			]
		})]
	});
}
//#endregion
export { Locations as component };
