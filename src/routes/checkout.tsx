import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRODUCTS, SITE } from "@/data/site";
import { cartTotalCents, useCart } from "@/lib/cart";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({ component: Checkout });

function Checkout() {
  const navigate = useNavigate();
  const { lines, clear } = useCart();
  const total = cartTotalCents(lines);
  const [busy, setBusy] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="mb-4 text-muted">Nothing to check out.</p>
        <Button asChild>
          <Link to="/shop">Return to shop</Link>
        </Button>
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      customer: Object.fromEntries(fd.entries()),
      lines,
      totalCents: total,
      processor: "stripe-ready-preview",
    };
    const prev = JSON.parse(localStorage.getItem("queen-e-orders") || "[]");
    localStorage.setItem("queen-e-orders", JSON.stringify([order, ...prev]));
    window.setTimeout(() => {
      clear();
      toast.success("Order recorded. Stripe live keys come next.");
      navigate({ to: "/shop" });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageIntro
        kicker="Secure checkout"
        title="Complete your order"
        lede="This flow is ready for Stripe. Until live keys are connected, placing an order stores it on this device so we can test the experience."
      />
      <div className="mb-8 space-y-2 rounded-2xl border border-linen bg-cream-deep p-6 text-sm">
        {lines.map((l) => {
          const p = PRODUCTS.find((x) => x.id === l.productId);
          if (!p) return null;
          return (
            <div key={l.productId} className="flex justify-between">
              <span>
                {p.name} × {l.qty}
              </span>
              <span className="tabular-nums">{formatUsd(p.priceCents * l.qty)}</span>
            </div>
          );
        })}
        <div className="flex justify-between border-t border-linen pt-2 font-bold">
          <span>Total (incl. shipping)</span>
          <span className="tabular-nums">{formatUsd(total)}</span>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-linen bg-surface p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Shipping address</Label>
          <Input id="address" name="address" required />
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" required />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" required />
          </div>
          <div>
            <Label htmlFor="zip">ZIP</Label>
            <Input id="zip" name="zip" required />
          </div>
        </div>
        <p className="rounded-xl bg-cream-deep px-4 py-3 text-xs text-sage">
          Questions about this order? Write {SITE.email}.
        </p>
        <Button type="submit" className="w-full rounded-xl" size="lg" disabled={busy}>
          {busy ? "Placing order…" : `Place order · ${formatUsd(total)}`}
        </Button>
      </form>
    </div>
  );
}
