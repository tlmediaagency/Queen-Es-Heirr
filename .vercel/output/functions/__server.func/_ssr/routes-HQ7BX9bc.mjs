import { X as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SITE, o as Button } from "./site-B_XtxgrQ.mjs";
import { d as CookingPot, f as Boxes, l as FlaskConical, p as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-HQ7BX9bc.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-linen bg-ink py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/afternoon-tea.jpg",
					alt: "Queen E's Heirr afternoon tea table",
					className: "max-h-96 w-full rounded-3xl border-4 border-gold/40 object-cover"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 text-center lg:col-span-7 lg:text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "inline-flex items-center gap-2 rounded-full border border-linen bg-cream-deep px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest",
							children: SITE.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-serif text-4xl font-bold leading-tight text-forest sm:text-5xl lg:text-6xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-sage",
								children: "Pure + Premium"
							}), "Crafted with poise & grace."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto max-w-xl text-lg font-light leading-relaxed text-muted lg:mx-0",
							children: "Welcome to Queen E's Heirr. We blend artisan gourmet preserves, STEM-based jam science, and pickled delicacies with etiquette and leadership training."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 pt-2 sm:flex-row lg:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									children: ["Shop confections ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/classes",
									children: "Jam & etiquette classes"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/queen-e-portrait.jpg",
							alt: "Queen E in the kitchen",
							className: "aspect-3/4 w-full rounded-2xl border-4 border-surface object-cover shadow-xl"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-ink/80 to-transparent p-8 text-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-gold",
								children: "From jam jar to boardroom"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-serif text-2xl font-bold",
								children: "Culture, science, and poise."
							})]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-linen bg-surface py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-14 max-w-2xl space-y-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-sage",
						children: "The Queen E experience"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-4xl font-bold",
						children: "Excellence in every detail"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
							to: "/shop",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookingPot, { className: "size-5" }),
							title: "Boutique confections",
							body: "Artisan jams and pickled delicacies in small batches with local ingredients.",
							cta: "Shop jams"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
							to: "/classes",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-5" }),
							title: "Jam making & STEM",
							body: "Pectin, thermodynamics, and biochemistry — standalone or with etiquette.",
							cta: "View classes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
							to: "/wholesale",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "size-5" }),
							title: "Wholesale ordering",
							body: "Retailers and boutique stockists: apply for case pricing and fulfillment.",
							cta: "Wholesale portal"
						})
					]
				})]
			})
		})
	] });
}
function Pillar({ to, icon, title, body, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group rounded-2xl border border-linen bg-cream p-8 transition-shadow hover:shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex size-12 items-center justify-center rounded-xl bg-forest text-gold",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 font-serif text-xl font-bold text-forest",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm leading-relaxed text-muted",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-dark",
				children: [
					cta,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })
				]
			})
		]
	});
}
//#endregion
export { Home as component };
