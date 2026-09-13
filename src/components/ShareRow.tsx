"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const btn = "inline-flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-terracotta hover:text-terracotta-dark";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted">Share</span>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={btn}>
        <LinkedInIcon className="h-4 w-4" /> LinkedIn
      </a>
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${url}`)}`} className={btn}>
        <Mail className="h-4 w-4" aria-hidden="true" /> Email
      </a>
      <button type="button" onClick={copy} className={btn}>
        {copied ? <Check className="h-4 w-4 text-sage" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
