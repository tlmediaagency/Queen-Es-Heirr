import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SITE, o as Button } from "./site-B_XtxgrQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as PageIntro, r as Route$7 } from "./router-ByqkDZoN.mjs";
import { n as Label, t as Input } from "./label-CGBlch_r.mjs";
import { n as openClientEmail, r as saveInquiry, t as Textarea } from "./mail-De0P5p3g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CHSTl2-Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const { program } = Route$7.useSearch();
	const [sent, setSent] = (0, import_react.useState)(false);
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const payload = Object.fromEntries(fd.entries());
		saveInquiry(program ? "booking" : "contact", payload);
		openClientEmail(payload.subject || "Inquiry from Queen E's website", `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "—"}\n\n${payload.message}`);
		toast.success("Message saved. Your email client is opening so you can send it.");
		setSent(true);
	}
	function onMailing(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get("listEmail") || "");
		saveInquiry("mailing", { email });
		toast.success("Welcome to the royal mailing list.");
		e.currentTarget.reset();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Write to the studio",
				title: "Email Queen E",
				lede: "Class reservations, custom gifts, press, and client notes. Submitting opens your email client addressed to the studio — and keeps a copy on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-5 rounded-3xl border border-linen bg-surface p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Your name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							name: "name",
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
						htmlFor: "phone",
						children: "Phone (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "phone",
						name: "phone",
						type: "tel"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "subject",
						children: "Subject"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "subject",
						name: "subject",
						defaultValue: program ? `Reservation: ${program}` : "",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "message",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "message",
						name: "message",
						required: true,
						defaultValue: program ? `I would like to reserve a place in ${program}. Preferred date:` : ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full rounded-xl",
						children: ["Open email to ", SITE.email]
					}),
					sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-sage",
						children: "Nothing sent from the server — your mail app completes the send."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: onMailing,
				className: "mt-10 space-y-3 rounded-3xl border border-linen bg-cream-deep p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl font-bold text-forest",
						children: "Royal mailing list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Releases, lab dates, and etiquette notes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "listEmail",
							type: "email",
							required: true,
							placeholder: "you@email.com",
							className: "flex-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Join"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Contact as component };
