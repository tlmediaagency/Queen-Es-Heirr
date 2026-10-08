import { S as useNavigate, X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Button, r as PROGRAMS } from "./site-B_XtxgrQ.mjs";
import { i as PageIntro } from "./router-ByqkDZoN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/classes-CPqdlnRK.js
var import_jsx_runtime = require_jsx_runtime();
function Classes() {
	const navigate = useNavigate();
	const classes = PROGRAMS.filter((p) => p.audience === "class");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Science & social mastery",
				title: "Jam making & STEM etiquette classes",
				lede: "Explore pectin, sugar bonds, and thermodynamics — standalone or paired with gracious hosting."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/jam-lab.jpg",
				alt: "Jam-making STEM lab",
				className: "mb-12 h-64 w-full rounded-3xl object-cover md:h-80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 md:grid-cols-2",
				children: classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col justify-between rounded-3xl border border-linen bg-surface p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-2xl font-bold text-forest",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted",
								children: c.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm text-forest-deep",
								children: c.points?.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", pt] }, pt))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-between border-t border-cream-deep pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-bold text-forest",
							children: c.priceLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => navigate({
								to: "/contact",
								search: { program: c.name }
							}),
							children: "Reserve a spot"
						})]
					})]
				}, c.id))
			})
		]
	});
}
//#endregion
export { Classes as component };
