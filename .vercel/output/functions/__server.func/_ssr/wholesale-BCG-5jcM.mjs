import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Button } from "./site-B_XtxgrQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as PageIntro } from "./router-ByqkDZoN.mjs";
import { n as Label, t as Input } from "./label-CGBlch_r.mjs";
import { n as openClientEmail, r as saveInquiry, t as Textarea } from "./mail-De0P5p3g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wholesale-BCG-5jcM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Wholesale() {
	const [sent, setSent] = (0, import_react.useState)(false);
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const payload = Object.fromEntries(fd.entries());
		saveInquiry("wholesale", payload);
		openClientEmail(`Wholesale inquiry — ${payload.business}`, `Business: ${payload.business}\nContact: ${payload.contact}\nEmail: ${payload.email}\nTax ID: ${payload.tax}\n\nOrder notes:\n${payload.notes}`);
		toast.success("Wholesale request saved. Your email client is opening.");
		setSent(true);
		e.currentTarget.reset();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "B2B stockist ordering",
			title: "Wholesale ordering portal",
			lede: "Stock your shelves with Queen E's preserves. Submit the form and we will email case pricing."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-6 rounded-3xl border border-linen bg-surface p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "business",
							label: "Business / store name",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "contact",
							label: "Contact person",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "email",
							label: "Business email",
							type: "email",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "tax",
							label: "Reseller / tax ID",
							required: true
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "notes",
					children: "Estimated order / case quantities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "notes",
					name: "notes",
					required: true,
					placeholder: "Case quantities for each SKU…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full rounded-xl",
					children: "Submit wholesale request"
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm text-sage",
					children: "If email did not open, write us at hello@queenesheirr.com."
				}) : null
			]
		})]
	});
}
function Field({ name, label, type = "text", required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		htmlFor: name,
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		id: name,
		name,
		type,
		required
	})] });
}
//#endregion
export { Wholesale as component };
