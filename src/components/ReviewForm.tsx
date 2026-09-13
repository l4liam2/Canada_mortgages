"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send, Star } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { inputCls } from "@/components/calculators/shared";

const services = ["First-time purchase", "Next home purchase", "Renewal", "Refinance", "Investment property", "Self-employed mortgage", "Other"];

export function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const configured = site.formspreeId.trim().length > 0;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("company") ?? "")) {
      setStatus("done");
      return;
    }
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      detail: String(fd.get("detail") ?? ""),
      service: String(fd.get("service") ?? ""),
      rating,
      review: String(fd.get("review") ?? ""),
      permission: fd.get("permission") === "on" ? "yes" : "no",
    };
    if (!configured) {
      const subject = encodeURIComponent(`Review from ${payload.name}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nDetail: ${payload.detail}\nService: ${payload.service}\nRating: ${payload.rating}/5\nPermission to publish: ${payload.permission}\n\n${payload.review}`,
      );
      window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
      setStatus("done");
      return;
    }
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _subject: `New review from ${payload.name} (${payload.rating}/5)` }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-sand bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-10 w-10 text-sage" aria-hidden="true" />
        <h2 className="mt-4 text-2xl text-ink">Thank you</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          Your review means a lot. If you gave permission, it may appear on the site with your first name and last
          initial once Chad has read it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8" noValidate>
      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-ink">Your rating</legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-pressed={rating === n}
              className="rounded-full p-1 transition hover:scale-110"
            >
              <Star className={`h-8 w-8 ${n <= (hover || rating) ? "fill-terracotta text-terracotta" : "text-sand"}`} aria-hidden="true" />
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Your name</span>
          <input name="name" type="text" required autoComplete="name" className={inputCls} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Email (not published)</span>
          <input name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">A little context (optional)</span>
          <input name="detail" type="text" className={inputCls} placeholder="e.g. First-time buyers, Scarborough" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">What did Chad help with?</span>
          <select name="service" className={inputCls} defaultValue={services[0]}>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">Your review</span>
        <textarea name="review" rows={5} required className={inputCls} placeholder="What was the experience like? What would you tell a friend?" />
      </label>
      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input name="permission" type="checkbox" className="mt-1 h-4 w-4 accent-terracotta" />
        <span>I give permission to publish this review on this website using my first name and last initial.</span>
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-terracotta/30 bg-terracotta-tint/60 px-4 py-3 text-sm text-terracotta-dark">
          Couldn&apos;t send ({error}). Try again or email {site.contact.email}.
        </p>
      )}
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
          {status === "submitting" ? "Sending" : "Submit review"}
        </Button>
      </div>
    </form>
  );
}
