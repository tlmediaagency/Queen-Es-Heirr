import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SITE, s as cn } from "./site-B_XtxgrQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mail-De0P5p3g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("min-h-28 w-full rounded-xl border border-linen bg-cream px-4 py-3 text-sm text-forest-deep placeholder:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
var KEY = "queen-e-inquiries";
function loadInquiries() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(KEY) || "[]");
	} catch {
		return [];
	}
}
function saveInquiry(kind, payload) {
	const inquiry = {
		id: crypto.randomUUID(),
		kind,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		payload
	};
	const next = [inquiry, ...loadInquiries()];
	localStorage.setItem(KEY, JSON.stringify(next));
	return inquiry;
}
function mailtoFor(subject, body) {
	const params = new URLSearchParams({
		subject,
		body
	});
	return `mailto:${SITE.email}?${params.toString().replace(/\+/g, "%20")}`;
}
function openClientEmail(subject, body) {
	window.location.href = mailtoFor(subject, body);
}
//#endregion
export { openClientEmail as n, saveInquiry as r, Textarea as t };
