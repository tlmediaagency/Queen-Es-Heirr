import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/data/site";
import { openClientEmail, saveInquiry } from "@/lib/mail";

type ContactSearch = { program?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): ContactSearch => ({
    program: typeof s.program === "string" ? s.program : undefined,
  }),
  component: Contact,
});

function Contact() {
  const { program } = Route.useSearch();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    saveInquiry(program ? "booking" : "contact", payload);
    openClientEmail(
      payload.subject || "Inquiry from Queen E's website",
      `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "—"}\n\n${payload.message}`,
    );
    toast.success("Message saved. Your email client is opening so you can send it.");
    setSent(true);
  }

  function onMailing(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("listEmail") || "");
    saveInquiry("mailing", { email });
    toast.success("Welcome to the royal mailing list.");
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageIntro
        kicker="Write to the studio"
        title="Email Queen E"
        lede="Class reservations, custom gifts, press, and client notes. Submitting opens your email client addressed to the studio — and keeps a copy on this device."
      />
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-3xl border border-linen bg-surface p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            defaultValue={program ? `Reservation: ${program}` : ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            defaultValue={
              program
                ? `I would like to reserve a place in ${program}. Preferred date:`
                : ""
            }
          />
        </div>
        <Button type="submit" className="w-full rounded-xl">
          Open email to {SITE.email}
        </Button>
        {sent ? (
          <p className="text-center text-sm text-sage">
            Nothing sent from the server — your mail app completes the send.
          </p>
        ) : null}
      </form>

      <form
        onSubmit={onMailing}
        className="mt-10 space-y-3 rounded-3xl border border-linen bg-cream-deep p-8"
      >
        <h2 className="font-serif text-2xl font-bold text-forest">Royal mailing list</h2>
        <p className="text-sm text-muted">
          Releases, lab dates, and etiquette notes.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            name="listEmail"
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1"
          />
          <Button type="submit">Join</Button>
        </div>
      </form>
    </div>
  );
}
