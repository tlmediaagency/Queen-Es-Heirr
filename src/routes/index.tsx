import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, FlaskConical, CookingPot } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div>
      <section className="bg-cream py-6">
        <div className="mx-auto max-w-6xl px-4">
          <img
            src="/images/hero-banner.png"
            alt="Queen E's Heirr — Curating Culture & Confections"
            className="h-auto w-full rounded-3xl border border-gold/40 object-contain"
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-12">
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-linen bg-cream-deep px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest">
              {SITE.tagline}
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-forest sm:text-5xl lg:text-6xl">
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-sage">
                Pure + Premium
              </span>
              Crafted with poise & grace.
            </h1>
            <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-muted lg:mx-0">
              Welcome to Queen E's Heirr. We blend artisan gourmet preserves,
              STEM-based jam science, and pickled delicacies with etiquette and
              leadership training.
            </p>
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row lg:justify-start">
              <Button asChild size="lg">
                <Link to="/shop">
                  Shop confections <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/classes">Jam & etiquette classes</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <img
                src="/images/queen-e-portrait.jpg"
                alt="Queen E in the kitchen"
                className="aspect-3/4 w-full rounded-2xl border-4 border-surface object-cover shadow-xl"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-ink/80 to-transparent p-8 text-cream">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  From jam jar to boardroom
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold">
                  Culture, science, and poise.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-linen bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage">
              The Queen E experience
            </p>
            <h2 className="font-serif text-4xl font-bold">Excellence in every detail</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Pillar
              to="/shop"
              icon={<CookingPot className="size-5" />}
              title="Boutique confections"
              body="Artisan jams and pickled delicacies in small batches with local ingredients."
              cta="Shop jams"
            />
            <Pillar
              to="/classes"
              icon={<FlaskConical className="size-5" />}
              title="Jam making & STEM"
              body="Pectin, thermodynamics, and biochemistry — standalone or with etiquette."
              cta="View classes"
            />
            <Pillar
              to="/wholesale"
              icon={<Boxes className="size-5" />}
              title="Wholesale ordering"
              body="Retailers and boutique stockists: apply for case pricing and fulfillment."
              cta="Wholesale portal"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Pillar({
  to,
  icon,
  title,
  body,
  cta,
}: {
  to: string;
  icon: ReactNode;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-linen bg-cream p-8 transition-shadow hover:shadow-xl"
    >
      <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-forest text-gold">
        {icon}
      </div>
      <h3 className="mb-2 font-serif text-xl font-bold text-forest">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted">{body}</p>
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-dark">
        {cta} <ArrowRight className="size-3" />
      </span>
    </Link>
  );
}
