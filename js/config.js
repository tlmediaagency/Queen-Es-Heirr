/* Site settings. Fill these in after deploying (see README). */
window.SITE_CONFIG = {
  // URL of the deployed Cloudflare Worker, e.g. "https://queenes-checkout.YOURNAME.workers.dev/checkout"
  // Leave empty until the Worker is live: the cart then falls back to an emailed order request.
  CHECKOUT_URL: "",
  // Live catalog from Stripe, e.g. "https://queenes-checkout.<you>.workers.dev/products". Empty = use js/products.js.
  PRODUCTS_URL: "",
  // Google Apps Script web app URL (see apps-script/README.md). Empty = visitor's email app (mailto).
  FORM_ENDPOINT: "",
  CONTACT_EMAIL: "info@queenesheirr.com",
  SHIPPING_CENTS: 1000
};
