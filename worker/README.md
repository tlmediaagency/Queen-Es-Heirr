# Checkout Worker (Stripe)

Reads products/prices/availability from Stripe and creates Checkout Sessions. Prices are never taken from the browser.

1. `cd worker && npx wrangler login`
2. `npx wrangler secret put STRIPE_SECRET_KEY`  (paste a **test** key `sk_test_...` first)
3. `npx wrangler deploy`  -> prints `https://queenes-checkout.<you>.workers.dev`
4. Put `https://queenes-checkout.<you>.workers.dev/checkout` in `js/config.js` as `CHECKOUT_URL`.
5. Test with card 4242 4242 4242 4242. Then swap the secret to the live `sk_live_...` key and redeploy.

Manage products in Stripe: product id = site slug (e.g. `peach`), metadata `category`, one active price per size with the size as the price nickname. Mark sold out with metadata `sold_out=true` on the product or on one price. `js/products.js` is only a fallback.
Never commit a Stripe secret key.
