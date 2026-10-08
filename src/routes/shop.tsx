import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { PRODUCTS, type Product } from "@/data/site";
import { useCart } from "@/lib/cart";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/shop")({ component: Shop });

function Shop() {
  const add = useCart((s) => s.add);
  const jars = PRODUCTS.filter((p) => p.category === "confection");
  const curriculum = PRODUCTS.filter((p) => p.category === "curriculum");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <PageIntro
        kicker="Pure + Premium"
        title="Jams, pickles & J.U.D.A.H."
        lede="Small-batch preserves from family recipes and local fruit, and the J.U.D.A.H. leadership curriculum for students, professionals, and stages."
      />
      <Section title="Signature jams & pickled goods">
        {jars.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={add} />
        ))}
      </Section>
      <Section title="J.U.D.A.H. curriculum">
        {curriculum.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={add} />
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 font-serif text-2xl font-bold text-forest">{title}</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

function ProductCard({
  product: p,
  onAdd,
}: {
  product: Product;
  onAdd: (id: string) => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-linen bg-surface shadow-sm">
      <div className="relative aspect-4/3 overflow-hidden bg-cream-deep">
        <img src={p.image} alt={p.name} className="size-full object-cover" />
        {p.badge ? (
          <span className="absolute right-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            {p.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-bold text-forest">{p.name}</h3>
          <span className="text-lg font-bold tabular-nums text-forest">
            {formatUsd(p.priceCents)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted">{p.blurb}</p>
        <Button
          className="mt-auto w-full rounded-xl"
          onClick={() => {
            onAdd(p.id);
            toast.success(`${p.name} added to bag`);
          }}
        >
          <ShoppingBag className="size-4" />
          Add to bag
        </Button>
      </div>
    </article>
  );
}
