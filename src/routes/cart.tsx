import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { PRODUCTS, SITE } from "@/data/site";
import { cartNeedsShipping, cartSubtotalCents, cartTotalCents, useCart } from "@/lib/cart";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/cart")({ component: Cart });

function Cart() {
  const { lines, setQty, remove } = useCart();
  const sub = cartSubtotalCents(lines);
  const total = cartTotalCents(lines);
  const ships = cartNeedsShipping(lines);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageIntro
        kicker="Your bag"
        title="Shopping bag"
        lede="Review jars, then continue to Stripe-ready checkout."
      />
      {lines.length === 0 ? (
        <div className="rounded-3xl border border-linen bg-surface p-10 text-center">
          <p className="mb-6 text-muted">The bag is empty.</p>
          <Button asChild>
            <Link to="/shop">Visit the shop</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {lines.map((line) => {
            const p = PRODUCTS.find((x) => x.id === line.productId);
            if (!p) return null;
            return (
              <div
                key={line.productId}
                className="flex gap-4 rounded-2xl border border-linen bg-surface p-4"
              >
                <img
                  src={p.image}
                  alt=""
                  className="size-24 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <h3 className="font-serif text-lg font-bold text-forest">{p.name}</h3>
                    <p className="tabular-nums font-semibold">
                      {formatUsd(p.priceCents * line.qty)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex size-11 items-center justify-center rounded-full border border-linen"
                        onClick={() => setQty(p.id, line.qty - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-6 text-center tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        className="flex size-11 items-center justify-center rounded-full border border-linen"
                        onClick={() => setQty(p.id, line.qty + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="flex size-11 items-center justify-center text-sage hover:text-forest"
                      aria-label="Remove"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="space-y-2 rounded-2xl border border-linen bg-cream-deep p-6 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatUsd(sub)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated shipping</span>
              <span className="tabular-nums">
                {ships ? formatUsd(SITE.shippingCents) : "None"}
              </span>
            </div>
            <div className="flex justify-between border-t border-linen pt-2 font-bold">
              <span>Total</span>
              <span className="tabular-nums">{formatUsd(total)}</span>
            </div>
          </div>
          <Button asChild className="w-full rounded-xl" size="lg">
            <Link to="/checkout">Continue to checkout</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
