"use client";

import { useState, type FormEvent } from "react";
import { Download, FileText, LoaderCircle } from "lucide-react";
import { site } from "@/config/site";
import { assetPath } from "@/lib/paths";
import { inputCls } from "@/components/calculators/shared";

const PDF_PATH = "/downloads/mortgage-document-checklist.pdf";

/**
 * Email-gated download of the document checklist PDF.
 * With a Formspree ID configured, the email is captured before the download is revealed.
 * Without one, the download is offered directly so visitors are never blocked.
 */
export function LeadMagnet({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const configured = site.formspreeId.trim().length > 0;
  const pdfUrl = assetPath(PDF_PATH);

  function startDownload() {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "mortgage-document-checklist.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("company") ?? "")) {
      setStatus("done");
      return;
    }
    const email = String(fd.get("email") ?? "");
    const name = String(fd.get("name") ?? "");
    if (!configured) {
      setStatus("done");
      startDownload();
      return;
    }
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, name, _subject: `Checklist download: ${email}`, download: "mortgage-document-checklist" }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("done");
      startDownload();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const compact = variant === "compact";

  return (
    <div
      id="download"
      className={`scroll-mt-28 rounded-2xl border border-sand bg-white shadow-soft ${compact ? "p-6" : "p-8 sm:p-10"}`}
    >
      <div className={`grid gap-8 ${compact ? "" : "lg:grid-cols-12 lg:items-center"}`}>
        <div className={compact ? "" : "lg:col-span-7"}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">Free download</p>
          <h2 className={`mt-2 text-ink ${compact ? "text-2xl" : "text-3xl"}`}>The mortgage document checklist</h2>
          <p className={`mt-3 text-ink-soft ${compact ? "text-[0.95rem]" : "text-lg"}`}>
            Every document lenders ask for, organized for buying, renewing or refinancing, and self-employed
            borrowers. Print it, tick it off, and walk into your application ready.
          </p>
          {!compact && (
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-terracotta" aria-hidden="true" /> 3 checklists, one PDF
              </li>
              <li className="flex items-center gap-2">
                <Download className="h-4 w-4 text-terracotta" aria-hidden="true" /> Instant download
              </li>
            </ul>
          )}
        </div>
        <div className={compact ? "" : "lg:col-span-5"}>
          {status === "done" ? (
            <div className="rounded-xl bg-cream p-5 text-center">
              <p className="font-medium text-ink">Your checklist is on its way.</p>
              <p className="mt-1 text-sm text-ink-soft">If the download didn&apos;t start, use the button below.</p>
              <a
                href={pdfUrl}
                download="mortgage-document-checklist.pdf"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white hover:bg-terracotta-dark"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> Download the PDF
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3" noValidate>
              {!compact && (
                <label className="block">
                  <span className="sr-only">First name</span>
                  <input name="name" type="text" autoComplete="given-name" placeholder="First name (optional)" className={inputCls} />
                </label>
              )}
              <label className="block">
                <span className="sr-only">Email address</span>
                <input name="email" type="email" required autoComplete="email" placeholder="Email address" className={inputCls} />
              </label>
              <div className="hidden" aria-hidden="true">
                <label>
                  Company
                  <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {status === "error" && (
                <p role="alert" className="rounded-xl border border-terracotta/30 bg-terracotta-tint/60 px-4 py-3 text-sm text-terracotta-dark">
                  Couldn&apos;t send ({error}).{" "}
                  <a href={pdfUrl} download className="underline">
                    Download the PDF directly
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-terracotta-dark disabled:opacity-60"
              >
                {status === "submitting" ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
                {status === "submitting" ? "Sending" : "Send me the checklist"}
              </button>
              <p className="text-xs leading-relaxed text-muted">
                You&apos;ll get the PDF right away and an occasional note from Chad. No spam, unsubscribe any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
