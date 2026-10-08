import { X as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as STORIES } from "./site-B_XtxgrQ.mjs";
import { i as PageIntro } from "./router-ByqkDZoN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories-Dzcx_0uY.js
var import_jsx_runtime = require_jsx_runtime();
function Stories() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "Journal & insights",
			title: "Queen Talk & stories",
			lede: "Southern hospitality, recipes, gracious living, and modern leadership."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-4xl gap-8 md:grid-cols-2",
			children: STORIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/stories/$slug",
				params: { slug: s.slug },
				className: "overflow-hidden rounded-2xl border border-linen bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.image,
					alt: "",
					className: "h-44 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-gold-dark",
							children: s.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl font-bold text-forest",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: s.excerpt
						})
					]
				})]
			}, s.slug))
		})]
	});
}
//#endregion
export { Stories as component };
