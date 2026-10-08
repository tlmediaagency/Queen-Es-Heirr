import { Link, useRouterState } from "@tanstack/react-router";
import { Crown, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "The Shop" },
  { to: "/classes", label: "Classes" },
  { to: "/training", label: "Etiquette & Leadership" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/stories", label: "Queen Talk" },
  { to: "/locations", label: "Locations" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lines = useCart((s) => s.lines);
  const count = cartCount(lines);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-linen bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-gold bg-forest text-gold">
            <Crown className="size-4" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold tracking-wide text-forest">
              {SITE.name.toUpperCase()}
            </span>
            <span className="block text-xs font-semibold uppercase tracking-widest text-sage">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "border-b-2 pb-1 text-xs font-semibold uppercase tracking-wider transition-colors",
                  active
                    ? "border-forest text-forest"
                    : "border-transparent text-forest-deep/70 hover:text-gold-dark",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative flex size-11 items-center justify-center rounded-full text-forest hover:bg-cream-deep"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
                {count}
              </span>
            ) : null}
          </Link>
          <Button asChild className="hidden md:inline-flex" size="sm">
            <Link to="/shop">Shop Online</Link>
          </Button>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full text-forest xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="space-y-1 border-t border-linen bg-cream px-6 py-4 xl:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold uppercase tracking-wider text-forest"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-ink bg-ink py-16 text-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-gold text-ink">
              <Crown className="size-4" />
            </span>
            <span className="font-serif text-lg font-bold text-cream">
              {SITE.name.toUpperCase()}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-linen">
            Artisan gourmet jams, STEM jam science, and etiquette training.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-serif text-xs font-bold uppercase tracking-wider text-cream">
            Visit
          </h4>
          <ul className="space-y-2 text-sm text-linen">
            {NAV.slice(0, 5).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-serif text-xs font-bold uppercase tracking-wider text-cream">
            Write us
          </h4>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-block text-sm text-gold hover:text-gold-light"
          >
            {SITE.email}
          </a>
        </div>
        <div>
          <h4 className="mb-3 font-serif text-xs font-bold uppercase tracking-wider text-cream">
            Follow
          </h4>
          <div className="flex gap-3 text-sm">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
              Instagram
            </a>
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" className="hover:text-gold">
              Facebook
            </a>
            <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-gold">
              LinkedIn
            </a>
          </div>
          <p className="mt-6 text-xs text-sage">
            Nationwide shipping on jars. In-store locations on the Locations page.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-4 text-xs text-sage">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-sage">{kicker}</p>
      <h1 className="font-serif text-4xl font-bold text-forest">{title}</h1>
      <p className="text-base font-light leading-relaxed text-muted">{lede}</p>
    </div>
  );
}
