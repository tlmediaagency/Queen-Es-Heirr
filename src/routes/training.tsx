import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/data/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/training")({ component: Training });

function Training() {
  const [tab, setTab] = useState<"student" | "professional">("student");
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const items = PROGRAMS.filter((p) => p.audience === tab);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <PageIntro
        kicker="Professional development & poise"
        title="Etiquette, leadership & J.U.D.A.H."
        lede="Confidence and communication for students and professionals — plus the J.U.D.A.H. curriculum and leadership keynote, available to purchase."
      />
      <div className="mb-12 flex justify-center">
        <div className="inline-flex rounded-full bg-cream-deep p-1.5">
          <button
            type="button"
            onClick={() => setTab("student")}
            className={cn(
              "rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider",
              tab === "student" ? "bg-forest text-gold-light" : "text-forest-deep",
            )}
          >
            Students & youth
          </button>
          <button
            type="button"
            onClick={() => setTab("professional")}
            className={cn(
              "rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider",
              tab === "professional" ? "bg-forest text-gold-light" : "text-forest-deep",
            )}
          >
            Professionals
          </button>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((p, i) => (
          <article
            key={p.id}
            className="flex flex-col justify-between rounded-2xl border border-linen bg-surface p-8"
          >
            <div className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-forest font-serif text-lg font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">{p.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.blurb}</p>
            </div>
            <div className="pt-8">
              <div className="mb-4 flex justify-between text-sm">
                <span className="font-bold text-forest">{p.priceLabel}</span>
              </div>
              {p.productId ? (
                <Button
                  className="w-full rounded-xl"
                  onClick={() => {
                    add(p.productId!);
                    toast.success(`${p.name} added to bag`);
                    navigate({ to: "/cart" });
                  }}
                >
                  <ShoppingBag className="size-4" />
                  Purchase
                </Button>
              ) : (
                <Button
                  className="w-full rounded-xl"
                  onClick={() =>
                    navigate({ to: "/contact", search: { program: p.name } })
                  }
                >
                  Inquire
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
