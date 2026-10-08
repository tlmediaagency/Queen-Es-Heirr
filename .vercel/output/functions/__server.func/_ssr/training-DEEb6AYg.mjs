import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Button, r as PROGRAMS, s as cn } from "./site-B_XtxgrQ.mjs";
import { i as PageIntro } from "./router-ByqkDZoN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-DEEb6AYg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Training() {
	const [tab, setTab] = (0, import_react.useState)("student");
	const navigate = useNavigate();
	const items = PROGRAMS.filter((p) => p.audience === tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Professional development & poise",
				title: "Etiquette & leadership training",
				lede: "Confidence, communication, and social intelligence for students and professionals."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-12 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex rounded-full bg-cream-deep p-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("student"),
						className: cn("rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider", tab === "student" ? "bg-forest text-gold-light" : "text-forest-deep"),
						children: "Students & youth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("professional"),
						className: cn("rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider", tab === "professional" ? "bg-forest text-gold-light" : "text-forest-deep"),
						children: "Professionals"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 md:grid-cols-3",
				children: items.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col justify-between rounded-2xl border border-linen bg-surface p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-12 items-center justify-center rounded-xl bg-forest font-serif text-lg font-bold text-gold",
								children: String(i + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-xl font-bold text-forest",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted",
								children: p.blurb
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex justify-between text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-forest",
								children: p.priceLabel
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full rounded-xl",
							onClick: () => navigate({
								to: "/contact",
								search: { program: p.name }
							}),
							children: "Inquire"
						})]
					})]
				}, p.id))
			})
		]
	});
}
//#endregion
export { Training as component };
