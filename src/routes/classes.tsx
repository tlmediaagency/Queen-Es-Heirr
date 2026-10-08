import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/data/site";

export const Route = createFileRoute("/classes")({ component: Classes });

function Classes() {
  const navigate = useNavigate();
  const classes = PROGRAMS.filter((p) => p.audience === "class");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <PageIntro
        kicker="Science & social mastery"
        title="Jam making & STEM etiquette classes"
        lede="Explore pectin, sugar bonds, and thermodynamics — standalone or paired with gracious hosting."
      />
      <img
        src="/images/jam-lab.jpg"
        alt="Jam-making STEM lab"
        className="mb-12 h-64 w-full rounded-3xl object-cover md:h-80"
      />
      <div className="grid gap-8 md:grid-cols-2">
        {classes.map((c) => (
          <article
            key={c.id}
            className="flex flex-col justify-between rounded-3xl border border-linen bg-surface p-8"
          >
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-forest">{c.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{c.blurb}</p>
              <ul className="space-y-2 text-sm text-forest-deep">
                {c.points?.map((pt) => (
                  <li key={pt}>• {pt}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-cream-deep pt-6">
              <span className="text-lg font-bold text-forest">{c.priceLabel}</span>
              <Button
                onClick={() =>
                  navigate({
                    to: "/contact",
                    search: { program: c.name },
                  })
                }
              >
                Reserve a spot
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
