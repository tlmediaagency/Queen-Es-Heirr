import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatUsd, n as PRODUCTS, o as Button } from "./site-B_XtxgrQ.mjs";
import { a as ShoppingBag } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as PageIntro, s as useCart } from "./router-ByqkDZoN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CBzBDB5A.js
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const add = useCart((s) => s.add);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "Secure boutique",
			title: "Signature jams & pickled goods",
			lede: "Handcrafted in small batches. Add to bag now — Stripe checkout is wired next, with a complete order flow already in place."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
			children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex flex-col overflow-hidden rounded-2xl border border-linen bg-surface shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-4/3 overflow-hidden bg-cream-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: p.name,
						className: "size-full object-cover"
					}), p.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold",
						children: p.badge
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col space-y-3 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-xl font-bold text-forest",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-bold tabular-nums text-forest",
								children: formatUsd(p.priceCents)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: p.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-auto w-full rounded-xl",
							onClick: () => {
								add(p.id);
								toast.success(`${p.name} added to bag`);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), "Add to bag"]
						})
					]
				})]
			}, p.id))
		})]
	});
}
//#endregion
export { Shop as component };
