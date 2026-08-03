import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";

import heroImage from "@/assets/smart-2-hero.jpg";
import { submitInteressent } from "@/lib/submit-interessent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Der neue smart #2 – Jetzt in die Interessentenliste eintragen" },
      {
        name: "description",
        content:
          "Der nächste smart kommt. Tragen Sie sich in die exklusive #2 Interessentenliste ein und sichern Sie sich als Erste alle Neuigkeiten und eine persönliche Probefahrt in Aachen.",
      },
      { property: "og:title", content: "Der neue smart #2 – Interessentenliste" },
      {
        property: "og:description",
        content:
          "Bereit für eine neue Generation? Jetzt entdecken und in die #2 Interessentenliste eintragen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const schema = z.object({
  first_name: z.string().trim().min(1, "Bitte Vornamen angeben").max(100),
  last_name: z.string().trim().min(1, "Bitte Nachnamen angeben").max(100),
  email: z.string().trim().email("Bitte gültige E-Mail-Adresse angeben").max(255),
  phone: z
    .string()
    .trim()
    .min(5, "Bitte Telefonnummer angeben")
    .max(30, "Telefonnummer zu lang"),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = { first_name: "", last_name: "", email: "", phone: "" };

function Index() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Bitte alle Felder prüfen");
      return;
    }
    setSubmitting(true);
    try {
      await submitInteressent(parsed.data);
      setDone(true);
      setForm(initial);
    } catch {
      toast.error("Eintrag fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              smart
              <span className="ml-1 text-accent">#2</span>
            </span>
          </div>
          <a
            href="#eintragen"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Zur Interessentenliste →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Neue Generation
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Der nächste smart kommt.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Bereit für eine neue Generation? Jetzt entdecken und eintragen lassen.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#eintragen"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Jetzt Interesse bekunden
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#info"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Mehr erfahren
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-soft)]">
              <img
                src={heroImage}
                alt="Der neue smart #2 – Frontpartie in Weiß"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info */}
      <section id="info" className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Sei unter den Ersten, die mehr erfahren
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Der neue smart #2 kommt. Sie möchten keine Neuigkeiten verpassen? Dann
              tragen Sie sich jetzt in wenigen Schritten in unsere exklusive{" "}
              <span className="font-medium text-foreground">#2 Interessentenliste</span> ein.
            </p>
            <p>
              Hinterlassen Sie Ihre Kontaktdaten und wir informieren Sie, sobald es
              Neuigkeiten zum neuen smart #2 gibt. Sobald dieser an unserem Standort in
              Aachen eingetroffen ist, haben Sie außerdem die Möglichkeit, eine
              persönliche Probefahrt mit dem Fahrzeug zu vereinbaren.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="eintragen" className="border-t border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <div className="mb-8 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              #2 Interessenten
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Jetzt Interesse bekunden
            </h2>
            <p className="mt-3 text-muted-foreground">
              Einfach das Formular ausfüllen – wir melden uns bei Ihnen.
            </p>
          </div>

          {done ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Vielen Dank!</h3>
              <p className="mt-2 text-muted-foreground">
                Sie stehen jetzt auf der #2 Interessentenliste. Wir melden uns, sobald
                es Neuigkeiten zum neuen smart #2 gibt.
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-secondary"
              >
                Weitere Person eintragen
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Vorname"
                  value={form.first_name}
                  onChange={(v) => setForm((f) => ({ ...f, first_name: v }))}
                  autoComplete="given-name"
                  required
                />
                <Field
                  label="Nachname"
                  value={form.last_name}
                  onChange={(v) => setForm((f) => ({ ...f, last_name: v }))}
                  autoComplete="family-name"
                  required
                />
              </div>
              <Field
                label="E-Mail"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                autoComplete="email"
                required
              />
              <Field
                label="Telefonnummer"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                autoComplete="tel"
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {submitting ? "Wird gesendet…" : "Auf die #2 Interessentenliste"}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Mit dem Absenden willigen Sie ein, dass wir Sie zum smart #2
                kontaktieren dürfen.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Contact / Footer */}
      <footer className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Ihr Ansprechpartner
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                Abdelhak Kilani
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                smart Standort Aachen
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="mailto:abdelhak.kilani@mercedes-benz.com"
                className="inline-flex items-center gap-3 text-sm font-medium hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                abdelhak.kilani@mercedes-benz.com
              </a>
              <a
                href="tel:+4915158632723"
                className="inline-flex items-center gap-3 text-sm font-medium hover:text-accent"
              >
                <Phone className="h-4 w-4" />
                0151 58632723
              </a>
            </div>
          </div>
          <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} smart Aachen · Alle Angaben ohne Gewähr.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}
