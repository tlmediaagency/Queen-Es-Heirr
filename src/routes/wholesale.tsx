import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { openClientEmail, saveInquiry } from "@/lib/mail";

export const Route = createFileRoute("/wholesale")({ component: Wholesale });

function Wholesale() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    saveInquiry("wholesale", payload);
    openClientEmail(
      `Wholesale inquiry — ${payload.business}`,
      `Business: ${payload.business}\nContact: ${payload.contact}\nEmail: ${payload.email}\nTax ID: ${payload.tax}\n\nOrder notes:\n${payload.notes}`,
    );
    toast.success("Wholesale request saved. Your email client is opening.");
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageIntro
        kicker="B2B stockist ordering"
        title="Wholesale ordering portal"
        lede="Stock your shelves with Queen E's preserves. Submit the form and we will email case pricing."
      />
      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-3xl border border-linen bg-surface p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="business" label="Business / store name" required />
          <Field name="contact" label="Contact person" required />
          <Field name="email" label="Business email" type="email" required />
          <Field name="tax" label="Reseller / tax ID" required />
        </div>
        <div>
          <Label htmlFor="notes">Estimated order / case quantities</Label>
          <Textarea
            id="notes"
            name="notes"
            required
            placeholder="Case quantities for each SKU…"
          />
        </div>
        <Button type="submit" className="w-full rounded-xl">
          Submit wholesale request
        </Button>
        {sent ? (
          <p className="text-center text-sm text-sage">
            If email did not open, write us at info@queenesheirr.com.
          </p>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
