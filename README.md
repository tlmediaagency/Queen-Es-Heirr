# Queen E's Heirr: queenesheirr.com

Static site for GitHub Pages (no build step). `CNAME` = queenesheirr.com.

- `js/products.js`: fallback catalog for /shop/. The live catalog comes from Stripe via the Worker (`PRODUCTS_URL` in `js/config.js`).
- `apps-script/`: Google Apps Script that emails form requests to info@queenesheirr.com.
- `worker/`: Cloudflare Worker that creates Stripe Checkout sessions. See `worker/README.md`.
- `js/config.js`: `CHECKOUT_URL` (the Worker) and `FORM_ENDPOINT` (form service).
- Never commit Stripe secret keys.
