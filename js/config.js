/* Site settings. Fill these in after deploying (see README). */
window.SITE_CONFIG = {
  // URL of the deployed Cloudflare Worker, e.g. "https://queenes-checkout.YOURNAME.workers.dev/checkout"
  // Leave empty until the Worker is live: the cart then falls back to an emailed order request.
  CHECKOUT_URL: "https://queenes-checkout.summer-paper-e090.workers.dev/checkout",
  // Live catalog from Stripe, e.g. "https://queenes-checkout.<you>.workers.dev/products". Empty = use js/products.js.
  PRODUCTS_URL: "",
  // Google Apps Script web app URL (see apps-script/README.md). Empty = visitor's email app (mailto).
  FORM_ENDPOINT: "https://script.google.com/macros/s/AKfycbwZ9vHFB-Z0HXhdsD-r_uqfkpQOOPgZVday3-SOAh8ZoJTM9DDiLTrz-VBL5K6Q-0H6/exec",
  CONTACT_EMAIL: "info@queenesheirr.com",
  SHIPPING_CENTS: 1000
};
