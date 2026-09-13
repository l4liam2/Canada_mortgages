"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/config/site";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  if (!site.newsletterFormspreeId) return null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${site.newsletterFormspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "Newsletter signup" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-cream/10 bg-cream/[0.04] p-5">
      <p className="text-sm font-semibold text-cream">Rate updates and tips, once a month</p>
      <p className="mt-1 text-xs text-cream/60">No spam, unsubscribe any time.</p>
      {status === "done" ? (
        <p className="mt-3 text-sm text-terracotta-tint">You&apos;re subscribed. Thanks!</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-3 flex gap-2">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-full border border-cream/15 bg-espresso-deep px-4 py-2 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-terracotta"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-white transition hover:bg-terracotta-dark disabled:opacity-60"
          >
            {status === "submitting" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && <p className="mt-2 text-xs text-terracotta-tint">Something went wrong. Please try again.</p>}
    </div>
  );
}
