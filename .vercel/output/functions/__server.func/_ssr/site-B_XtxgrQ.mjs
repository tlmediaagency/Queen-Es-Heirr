import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BfUWx-da.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatUsd(cents) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	}).format(cents / 100);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-semibold uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			default: "bg-forest text-gold-light hover:bg-forest-deep",
			gold: "bg-gold text-ink hover:bg-gold-dark",
			outline: "border border-linen bg-transparent text-forest hover:bg-cream-deep",
			ghost: "text-forest hover:bg-cream-deep"
		},
		size: {
			default: "h-11 px-6",
			sm: "h-9 px-4",
			lg: "h-12 px-8",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/site-B_XtxgrQ.js
var SITE = {
	name: "Queen E's Heirr",
	tagline: "Curating Culture & Confections",
	email: "hello@queenesheirr.com",
	phone: "",
	social: {
		facebook: "https://www.facebook.com/QueenEJams",
		instagram: "https://www.instagram.com/queenejams",
		linkedin: "https://www.linkedin.com/in/queenesheirr"
	},
	location: {
		name: "Bayou Stuf",
		address: "28178 U.S. Hwy 190, Lacombe, LA",
		note: "Featured retail stockist — local pickup available."
	},
	shippingCents: 500
};
var PRODUCTS = [
	{
		id: "jam-strawberry-champagne",
		slug: "strawberry-champagne-jam",
		name: "Strawberry Champagne Jam",
		priceCents: 1400,
		badge: "Bestseller",
		image: "/images/strawberry-champagne.jpg",
		blurb: "Sun-ripened strawberries kissed with fine champagne. Perfect for croissants or charcuterie.",
		description: "Small-batch strawberry jam finished with champagne. Bright, floral, and made for morning toast, cheese boards, and gifting."
	},
	{
		id: "jam-bourbon-peach",
		slug: "bourbon-peach-preserve",
		name: "Bourbon Peach Preserve",
		priceCents: 1600,
		badge: "Limited Batch",
		image: "/images/bourbon-peach.jpg",
		blurb: "Southern peaches infused with Kentucky bourbon and Madagascar vanilla.",
		description: "Ripe peaches slow-cooked with bourbon and vanilla. Deep, warm, and limited by the harvest."
	},
	{
		id: "pickle-okra",
		slug: "signature-pickled-okra",
		name: "Signature Pickled Okra & Veggies",
		priceCents: 1500,
		image: "/images/pickled-okra.jpg",
		blurb: "Crisp farm vegetables packed with garlic, dill, and a subtle spice kick.",
		description: "Crunchy pickled okra and mixed vegetables with garlic and dill. A pantry staple for po'boys, boards, and bayou tables."
	}
];
var PROGRAMS = [
	{
		id: "stem-lab",
		name: "Standalone Jam Making & STEM Lab",
		priceLabel: "$55",
		audience: "class",
		blurb: "Fruit acids, pectin, and precise temperatures — the science of a perfect gel.",
		points: ["Hands-on fruit biochemistry & heat science", "Take home two custom artisan jam jars"]
	},
	{
		id: "combined-class",
		name: "Jam Making & Etiquette Combined Class",
		priceLabel: "$85",
		audience: "class",
		blurb: "Jam crafting plus formal tea service, table manners, and gracious hosting.",
		points: ["Afternoon tea pairing & dining etiquette", "Gracious hosting and social poise"]
	},
	{
		id: "youth-dining",
		name: "Youth Dining & Social Graces",
		priceLabel: "$125",
		audience: "student",
		blurb: "Table manners, first impressions, and polite conversation for ages 8–17."
	},
	{
		id: "student-leadership",
		name: "Student Leadership Academy",
		priceLabel: "$250",
		audience: "student",
		blurb: "Public speaking, emotional intelligence, and foundational leadership."
	},
	{
		id: "cotillion",
		name: "Cotillion & Debutante Prep",
		priceLabel: "Inquire",
		audience: "student",
		blurb: "Poise, formal deportment, posture, and presentation for milestone events."
	},
	{
		id: "executive-presence",
		name: "Executive Presence & Dining",
		priceLabel: "$350",
		audience: "professional",
		blurb: "Business dining, networking poise, and polished non-verbal communication."
	},
	{
		id: "corporate-coaching",
		name: "Corporate Leadership Coaching",
		priceLabel: "Custom",
		audience: "professional",
		blurb: "Training for emerging managers, teams, conflict, and cross-cultural etiquette."
	},
	{
		id: "keynote",
		name: "Keynote Speaking & Workshops",
		priceLabel: "Inquire",
		audience: "professional",
		blurb: "Presentations on confidence, professional branding, and the power of poise."
	}
];
var STORIES = [{
	slug: "charcuterie-jam-pairing",
	title: "The Art of the Charcuterie & Jam Pairing",
	category: "Hosting & Recipes",
	image: "/images/collection.jpg",
	excerpt: "Pair Strawberry Champagne and Bourbon Peach with artisan cheeses and savory crackers.",
	body: [
		"A well-set board is hospitality in miniature. Start with contrast: something sharp, something creamy, something crunchy, and a preserve that ties the table together.",
		"Strawberry Champagne jam loves brie, goat cheese, and toasted almonds. A spoonful beside a flute of sparkling wine is enough of a welcome.",
		"Bourbon Peach preserve leans into aged cheddar, smoked ham, and dark bread. The vanilla and whiskey notes make it a winter gift as easily as a summer picnic.",
		"Finish with pickled okra for acidity. The palate resets, and guests stay at the table a little longer — which is the whole point."
	]
}, {
	slug: "first-impressions",
	title: "First Impressions in the Digital & In-Person Era",
	category: "Etiquette & Poise",
	image: "/images/afternoon-tea.jpg",
	excerpt: "Posture, eye contact, and gracious communication remain a competitive advantage.",
	body: [
		"Screens taught us speed. Rooms still reward presence. The handshake, the pause before speaking, and the way you sit at a table still telegraph more than a profile ever will.",
		"For students, this is not old-fashioned dress-up. It is the skill of being taken seriously in interviews, internships, and first jobs.",
		"For professionals, executive presence is simply consistency: what you write, how you enter a room, and how you host a meal for a client.",
		"Queen E's training treats etiquette as leadership — a practice of attention, not performance."
	]
}];
var FAQS = [
	{
		q: "Are your jams and confections made in small batches?",
		a: "Yes. Every jar is crafted in small batches with vine-ripened fruit and traditional family recipes."
	},
	{
		q: "How do the jam-making & STEM etiquette classes work?",
		a: "We offer standalone jam-making STEM labs and combined classes that pair the science session with formal tea service and etiquette training."
	},
	{
		q: "Can I book private etiquette or leadership coaching for my team?",
		a: "Yes. We design corporate leadership training, youth cotillion prep, and private workshops around your organization."
	},
	{
		q: "What is the shelf life of your artisanal jams once opened?",
		a: "Unopened jars keep in a cool, dark place for up to 18 months. Once opened, refrigerate and enjoy within 4 to 6 weeks."
	},
	{
		q: "How can retail stores stock Queen E's products?",
		a: "Apply through the Wholesale Portal. We review reseller details and send case pricing and catalog information."
	},
	{
		q: "Do you ship orders nationwide?",
		a: "Yes. We ship gourmet preserves and pickled goods across the United States. Local pickup is available at Bayou Stuf in Lacombe, LA."
	},
	{
		q: "What should I bring to a jam-making STEM lab?",
		a: "Equipment, aprons, science materials, and ingredients are provided. Bring curiosity."
	},
	{
		q: "Can I request a custom flavor or gift basket?",
		a: "Yes — for weddings, corporate gifting, or private events. Use the contact form to describe the occasion."
	}
];
//#endregion
export { STORIES as a, formatUsd as c, SITE as i, PRODUCTS as n, Button as o, PROGRAMS as r, cn as s, FAQS as t };
