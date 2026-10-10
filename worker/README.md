# Checkout Worker (Stripe)

Reads products/prices/availability from Stripe and creates Checkout Sessions. Prices are never taken from the browser.

1. `cd worker && npx wrangler login`
2. `npx wrangler secret put STRIPE_SECRET_KEY`  (paste a **test** key `sk_test_...` first)
3. `npx wrangler deploy`  -> prints `https://queenes-checkout.<you>.workers.dev`
4. Put `https://queenes-checkout.<you>.workers.dev/checkout` in `js/config.js` as `CHECKOUT_URL`.
5. Test with card 4242 4242 4242 4242. Then swap the secret to the live `sk_live_...` key and redeploy.

Manage products in Stripe: product id = site slug (e.g. `peach`), metadata `category`, one active price per size with the size as the price nickname. Mark sold out with metadata `sold_out=true` on the product or on one price. `js/products.js` is only a fallback.
Never commit a Stripe secret key.

## Admin app (client back office)
Served by the Worker at `/admin`. Emailed 6-digit sign-in code (sent through the Apps Script web app).
Needs: KV namespace bound as `ADMIN_KV`; secrets `SESSION_SECRET`, `MAIL_SECRET` (same value as the Apps Script property `MAIL_SECRET`); variables `ADMIN_EMAILS` (comma list) and `MAIL_URL` (Apps Script web app URL).
After editing `admin-ui.html`, run `node worker/build-ui.mjs`, then rebuild the bundle with esbuild.
Public `GET /events` lists upcoming pickup events for the cart.


## Class booking (Classes tab, Bookings tab)
- Dates live in KV key `classes`; paid bookings in `bookings`. Public: `GET /classes`, `POST /class-checkout`. Webhook branch: sessions with `metadata.kind=class`.
- Optional Worker variable `CLASS_TAX_ENABLED=true` turns on Stripe automatic tax for class checkouts only (confirm with an accountant first).
- Apps Script action `booking_notice` (guarded by MAIL_SECRET) emails the customer and the shop and adds the customer as a guest on a Google Calendar event.
  After pasting the new Code.gs: Run `authorizeCalendar` once, then Deploy > Manage deployments > edit > New version.
- `js/config.js` `BOOKING_URL`: paste the Google Calendar appointment page link (https://calendar.google.com/...) to show it on the Classes page (loads only after cookie consent).
