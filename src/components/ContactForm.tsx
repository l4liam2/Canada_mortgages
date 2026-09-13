"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-sand bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-terracotta focus:ring-4 focus:ring-terracotta/15";

const interests = [
  "Buying my first home",
  "Buying my next home",
  "Renewing my mortgage",
  "Refinancing",
  "Investment property",
  "Self-employed mortgage",
  "Something else",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const configured = site.formspreeId.trim().length > 0;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans don't
    if (String(data.get("company") ?? "").length > 0) {
      setStatus("success");
      return;
    }

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "");

    if (!configured) {
      // Fallback: open the visitor's email client with the message pre-filled
      const subject = encodeURIComponent(`Mortgage inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterested in: ${interest}\n\n${message}`,
      );
      window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, phone, interest, message, _subject: `Mortgage inquiry from ${name}` }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sand bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-10 w-10 text-sage" aria-hidden="true" />
        <h3 className="mt-4 text-2xl text-ink">Thanks, your message is on its way</h3>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          Chad replies to every inquiry personally, usually within one business day. If it&apos;s
          urgent, call{" "}
          <a href={site.contact.phoneHref} className="font-medium text-terracotta">
            {site.contact.phone}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Full name</span>
          <input name="name" type="text" required autoComplete="name" className={inputCls} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
          <input name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={inputCls} placeholder="416-555-0123" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">I&apos;m interested in</span>
          <select name="interest" className={inputCls} defaultValue={interests[0]}>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">How can Chad help?</span>
        <textarea
          name="message"
          rows={5}
          required
          className={inputCls}
          placeholder="Tell me a little about your situation and timeline."
        />
      </label>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-terracotta/30 bg-terracotta-tint/60 px-4 py-3 text-sm text-terracotta-dark">
          The message couldn&apos;t be sent ({error}). Please try again or email{" "}
          <a href={`mailto:${site.contact.email}`} className="underline">
            {site.contact.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted">
          Your details are used only to respond to your inquiry. See the{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"} className="sm:shrink-0">
          {status === "submitting" ? (
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-5 w-5" aria-hidden="true" />
          )}
          {status === "submitting" ? "Sending" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
