# Checkout Worker (Stripe)

Creates a Stripe Checkout Session from the cart. Prices are read from `catalog.js` on the server, never from the browser.

1. `cd worker && npx wrangler login`
2. `npx wrangler secret put STRIPE_SECRET_KEY`  (paste a **test** key `sk_test_...` first)
3. `npx wrangler deploy`  -> prints `https://queenes-checkout.<you>.workers.dev`
4. Put `https://queenes-checkout.<you>.workers.dev/checkout` in `js/config.js` as `CHECKOUT_URL`.
5. Test with card 4242 4242 4242 4242. Then swap the secret to the live `sk_live_...` key and redeploy.

When prices or availability change, edit `js/products.js` AND `worker/catalog.js`.
Never commit a Stripe secret key.
