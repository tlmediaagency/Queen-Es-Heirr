import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { PageIntro } from "@/components/site-chrome";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/locations")({ component: Locations });

function Locations() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageIntro
        kicker="In-store retail partner"
        title="Where to find Queen E's"
        lede="Bayou Stuf is a retail partner — a place to pick up Queen E's jars in person, not the studio."
      />
      <div className="space-y-4 rounded-3xl border border-linen bg-surface p-8">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-forest text-gold">
          <Store className="size-5" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          Find us in store
        </p>
        <h3 className="font-serif text-2xl font-bold text-forest">{SITE.location.name}</h3>
        <p className="font-semibold text-gold-dark">{SITE.location.address}</p>
        <p className="text-sm leading-relaxed text-muted">
          Lacombe, find Queen E's jams and pickles at Bayou Stuf. Stock the pantry,
          sweeten a po'boy, and support local — this is a stockist, not Queen E's
          studio.
        </p>
      </div>
    </div>
  );
}
