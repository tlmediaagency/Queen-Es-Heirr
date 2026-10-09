/* Site settings. Fill these in after deploying (see README). */
window.SITE_CONFIG = {
  // URL of the deployed Cloudflare Worker, e.g. "https://queenes-checkout.YOURNAME.workers.dev/checkout"
  // Leave empty until the Worker is live: the cart then falls back to an emailed order request.
  CHECKOUT_URL: "",
  // Form service endpoint (Formspree / Web3Forms / Getform). Leave empty to use the visitor's email app (mailto).
  FORM_ENDPOINT: "",
  CONTACT_EMAIL: "info@queenesheirr.com",
  SHIPPING_CENTS: 1000
};
