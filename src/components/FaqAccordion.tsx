"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/faq";

export function FaqAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="divide-y divide-sand rounded-2xl border border-sand bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-button-${i}`;
        return (
          <div key={item.q}>
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1.05rem] font-medium text-ink transition-colors hover:text-terracotta"
              >
                <span>{item.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-sand text-ink-soft transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-terracotta-tint text-terracotta-dark" : ""
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-6 pb-6 text-[0.98rem] leading-relaxed text-ink-soft"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
