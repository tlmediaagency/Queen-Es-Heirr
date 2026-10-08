import { X as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-ByqkDZoN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories._slug-zavcMuoS.js
var import_jsx_runtime = require_jsx_runtime();
function StoryPage() {
	const story = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-gold-dark",
				children: story.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-serif text-4xl font-bold text-forest",
				children: story.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: story.image,
				alt: "",
				className: "my-8 h-72 w-full rounded-3xl object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5 text-base leading-relaxed text-forest-deep",
				children: story.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 24)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/stories",
				className: "mt-10 inline-block text-sm font-semibold text-forest",
				children: "← All stories"
			})
		]
	});
}
//#endregion
export { StoryPage as component };
