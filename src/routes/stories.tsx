import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-chrome";
import { STORIES } from "@/data/site";

export const Route = createFileRoute("/stories")({ component: Stories });

function Stories() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <PageIntro
        kicker="Journal & insights"
        title="Queen Talk & stories"
        lede="Southern hospitality, recipes, gracious living, and modern leadership."
      />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {STORIES.map((s) => (
          <Link
            key={s.slug}
            to="/stories/$slug"
            params={{ slug: s.slug }}
            className="overflow-hidden rounded-2xl border border-linen bg-surface"
          >
            <img src={s.image} alt="" className="h-44 w-full object-cover" />
            <div className="space-y-3 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                {s.category}
              </p>
              <h3 className="font-serif text-2xl font-bold text-forest">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
