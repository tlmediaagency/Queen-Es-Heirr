import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, X as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatUsd, i as SITE, n as PRODUCTS, o as Button } from "./site-B_XtxgrQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as PageIntro, o as cartTotalCents, s as useCart } from "./router-ByqkDZoN.mjs";
import { n as Label, t as Input } from "./label-CGBlch_r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-D3_cB4al.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkout() {
	const navigate = useNavigate();
	const { lines, clear } = useCart();
	const total = cartTotalCents(lines);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-muted",
			children: "Nothing to check out."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				children: "Return to shop"
			})
		})]
	});
	function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		const fd = new FormData(e.currentTarget);
		const order = {
			id: crypto.randomUUID(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			customer: Object.fromEntries(fd.entries()),
			lines,
			totalCents: total,
			processor: "stripe-ready-preview"
		};
		const prev = JSON.parse(localStorage.getItem("queen-e-orders") || "[]");
		localStorage.setItem("queen-e-orders", JSON.stringify([order, ...prev]));
		window.setTimeout(() => {
			clear();
			toast.success("Order recorded. Stripe live keys come next.");
			navigate({ to: "/shop" });
		}, 700);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Secure checkout",
				title: "Complete your order",
				lede: "This flow is ready for Stripe. Until live keys are connected, placing an order stores it on this device so we can test the experience."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 space-y-2 rounded-2xl border border-linen bg-cream-deep p-6 text-sm",
				children: [lines.map((l) => {
					const p = PRODUCTS.find((x) => x.id === l.productId);
					if (!p) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							p.name,
							" × ",
							l.qty
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatUsd(p.priceCents * l.qty)
						})]
					}, l.productId);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between border-t border-linen pt-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total (incl. shipping)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: formatUsd(total)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-5 rounded-3xl border border-linen bg-surface p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "fullName",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "fullName",
							name: "fullName",
							required: true
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							name: "email",
							type: "email",
							required: true
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "address",
						children: "Shipping address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "address",
						name: "address",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "city",
								children: "City"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "city",
								name: "city",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "state",
								children: "State"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "state",
								name: "state",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "zip",
								children: "ZIP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "zip",
								name: "zip",
								required: true
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-xl bg-cream-deep px-4 py-3 text-xs text-sage",
						children: ["Payment processor: Stripe (pending keys). No card is charged in this preview. Studio contact: ", SITE.email]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full rounded-xl",
						size: "lg",
						disabled: busy,
						children: busy ? "Placing order…" : `Place order · ${formatUsd(total)}`
					})
				]
			})
		]
	});
}
//#endregion
export { Checkout as component };
