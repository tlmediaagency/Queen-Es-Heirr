import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-chrome";
import { FAQS } from "@/data/site";

export const Route = createFileRoute("/faq")({ component: Faq });

function Faq() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageIntro
        kicker="Got questions?"
        title="Frequently asked questions"
        lede="Confections, shipping, classes, and wholesale accounts."
      />
      <div className="space-y-6">
        {FAQS.map((f) => (
          <div
            key={f.q}
            className="space-y-2 rounded-2xl border border-linen bg-surface p-6"
          >
            <h3 className="font-serif text-lg font-bold text-forest">{f.q}</h3>
            <p className="text-sm leading-relaxed text-muted">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
