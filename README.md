# Queen E's Heirr: queenesheirr.com

Static site for GitHub Pages (no build step). `CNAME` = queenesheirr.com.

- `js/products.js`: catalog shown on /shop/ (prices in cents, `soldOut` flag per size).
- `worker/`: Cloudflare Worker that creates Stripe Checkout sessions. See `worker/README.md`. Keep `worker/catalog.js` in sync with `js/products.js`.
- `js/config.js`: `CHECKOUT_URL` (the Worker) and `FORM_ENDPOINT` (form service).
- Never commit Stripe secret keys.
