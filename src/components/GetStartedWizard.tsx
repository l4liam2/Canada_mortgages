"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { inputCls } from "@/components/calculators/shared";

const goals = [
  { key: "first-home", label: "Buy my first home" },
  { key: "next-home", label: "Buy my next home" },
  { key: "renewal", label: "Renew my mortgage" },
  { key: "refinance", label: "Refinance or access equity" },
  { key: "investment", label: "Buy an investment property" },
  { key: "not-sure", label: "Not sure yet, just exploring" },
];
const timelines = ["As soon as possible", "Within 3 months", "3 to 6 months", "6 to 12 months", "More than a year away"];
const employment = ["Salaried or hourly", "Self-employed or business owner", "Commission or contract", "Retired or other"];
const incomes = ["Prefer not to say", "Under $75,000", "$75,000 to $125,000", "$125,000 to $200,000", "Over $200,000"];
const downPayments = ["Prefer not to say", "Under 5%", "5% to 10%", "10% to 20%", "20% or more", "Not applicable"];
const contactPrefs = ["Phone call", "Text message", "Email"];

type Data = {
  goal: string;
  timeline: string;
  price: string;
  employment: string;
  income: string;
  downPayment: string;
  name: string;
  email: string;
  phone: string;
  contactPref: string;
  notes: string;
};

const initial: Data = {
  goal: "",
  timeline: timelines[0],
  price: "",
  employment: employment[0],
  income: incomes[0],
  downPayment: downPayments[0],
  name: "",
  email: "",
  phone: "",
  contactPref: contactPrefs[0],
  notes: "",
};

const steps = ["Your goal", "Timeline", "Your situation", "Contact"];

export function GetStartedWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const set = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));
  const configured = site.formspreeId.trim().length > 0;

  const canContinue = step === 0 ? data.goal !== "" : true;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const hp = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value;
    if (hp) {
      setStatus("done");
      return;
    }
    const goalLabel = goals.find((g) => g.key === data.goal)?.label ?? data.goal;
    const summary = `Goal: ${goalLabel}\nTimeline: ${data.timeline}\nPrice / property value: ${data.price || "not given"}\nEmployment: ${data.employment}\nIncome: ${data.income}\nDown payment: ${data.downPayment}\nPreferred contact: ${data.contactPref}\nNotes: ${data.notes || "none"}`;

    if (!configured) {
      const subject = encodeURIComponent(`Pre-qualification request from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\n${summary}`);
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
        body: JSON.stringify({ ...data, goal: goalLabel, _subject: `Pre-qualification request from ${data.name}`, summary }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-sand bg-white p-8 text-center shadow-soft sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-sage" aria-hidden="true" />
        <h2 className="mt-5 text-3xl text-ink">You&apos;re on the list, {data.name.split(" ")[0] || "thanks"}</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Chad will review your details and reach out by {data.contactPref.toLowerCase()} within one business day.
          Want to skip the wait? Pick a time now.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/book" size="lg">
            Book a call
          </Button>
          <Button href="/resources" variant="secondary" size="lg">
            See what documents you&apos;ll need
          </Button>
        </div>
      </div>
    );
  }

  const choice = (selected: boolean) =>
    `rounded-xl border px-4 py-3 text-left text-[0.95rem] font-medium transition ${
      selected ? "border-terracotta bg-terracotta-tint text-terracotta-dark" : "border-sand bg-white text-ink hover:border-ink/30"
    }`;

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-10" noValidate>
      {/* Progress */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className="text-center">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-terracotta" : "bg-sand"}`} />
            <span className={`mt-2 hidden text-xs font-medium sm:block ${i === step ? "text-ink" : "text-muted"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
        Step {step + 1} of {steps.length}
      </p>

      {step === 0 && (
        <fieldset className="mt-3">
          <legend className="text-2xl text-ink">What are you looking to do?</legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {goals.map((g) => (
              <button key={g.key} type="button" onClick={() => set({ goal: g.key })} className={choice(data.goal === g.key)} aria-pressed={data.goal === g.key}>
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="mt-3 space-y-6">
          <fieldset>
            <legend className="text-2xl text-ink">When are you hoping to make a move?</legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {timelines.map((t) => (
                <button key={t} type="button" onClick={() => set({ timeline: t })} className={choice(data.timeline === t)} aria-pressed={data.timeline === t}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">
              {data.goal === "renewal" || data.goal === "refinance" ? "Approximate property value (optional)" : "Price range you have in mind (optional)"}
            </span>
            <input type="text" value={data.price} onChange={(e) => set({ price: e.target.value })} className={inputCls} placeholder="e.g. $700,000 to $850,000" />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="mt-3 space-y-5">
          <h2 className="text-2xl text-ink">A little about your situation</h2>
          <p className="text-sm text-ink-soft">All optional, but the more Chad knows the more useful the first call is.</p>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Employment</span>
            <select value={data.employment} onChange={(e) => set({ employment: e.target.value })} className={inputCls}>
              {employment.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Household income</span>
              <select value={data.income} onChange={(e) => set({ income: e.target.value })} className={inputCls}>
                {incomes.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Down payment saved</span>
              <select value={data.downPayment} onChange={(e) => set({ downPayment: e.target.value })} className={inputCls}>
                {downPayments.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-3 space-y-5">
          <h2 className="text-2xl text-ink">Where should Chad reach you?</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Full name</span>
              <input type="text" required autoComplete="name" value={data.name} onChange={(e) => set({ name: e.target.value })} className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
              <input type="email" required autoComplete="email" value={data.email} onChange={(e) => set({ email: e.target.value })} className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Phone</span>
              <input type="tel" autoComplete="tel" value={data.phone} onChange={(e) => set({ phone: e.target.value })} className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Preferred contact</span>
              <select value={data.contactPref} onChange={(e) => set({ contactPref: e.target.value })} className={inputCls}>
                {contactPrefs.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Anything else Chad should know? (optional)</span>
            <textarea rows={3} value={data.notes} onChange={(e) => set({ notes: e.target.value })} className={inputCls} />
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
          <p className="text-xs text-muted">
            No credit check and no obligation. Your details are used only to respond to you. See the{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-sand pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink ${step === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
            Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" disabled={status === "submitting" || !data.name || !data.email}>
            {status === "submitting" ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
            {status === "submitting" ? "Sending" : "Send to Chad"}
          </Button>
        )}
      </div>
    </form>
  );
}
