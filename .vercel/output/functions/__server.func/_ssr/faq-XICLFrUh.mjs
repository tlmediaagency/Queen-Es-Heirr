import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as FAQS } from "./site-B_XtxgrQ.mjs";
import { i as PageIntro } from "./router-ByqkDZoN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-XICLFrUh.js
var import_jsx_runtime = require_jsx_runtime();
function Faq() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "Got questions?",
			title: "Frequently asked questions",
			lede: "Confections, shipping, classes, and wholesale accounts."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: FAQS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-2xl border border-linen bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-lg font-bold text-forest",
					children: f.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: f.a
				})]
			}, f.q))
		})]
	});
}
//#endregion
export { Faq as component };
