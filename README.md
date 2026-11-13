# Queen E's Heirr: queenesheirr.com

Static site for GitHub Pages (no build step). `CNAME` = queenesheirr.com.

- `js/products.js`: fallback catalog for /shop/. The live catalog comes from Stripe via the Worker (`PRODUCTS_URL` in `js/config.js`).
- `apps-script/`: Google Apps Script that emails form requests to info@queenesheirr.com.
- `worker/`: Cloudflare Worker that creates Stripe Checkout sessions. See `worker/README.md`.
- `js/config.js`: `CHECKOUT_URL` (the Worker) and `FORM_ENDPOINT` (form service).
- Never commit Stripe secret keys.

## Site search
The header search box (magnifier, or press `/`) searches the live product catalog, Queen Talk posts, and a built index of the site's pages and FAQs. After adding or editing pages or FAQ entries, refresh the index: `node scripts/build-search-index.mjs` and commit `js/search-index.js`.
