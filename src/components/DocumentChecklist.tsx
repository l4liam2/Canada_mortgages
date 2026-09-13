"use client";

import { useEffect, useState } from "react";
import { Printer, RotateCcw } from "lucide-react";
import type { Checklist } from "@/content/checklists";

const STORAGE_KEY = "chad-denie-checklist";

export function DocumentChecklist({ lists }: { lists: Checklist[] }) {
  const [active, setActive] = useState(lists[0].key);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Read persisted progress after mount (deferred so server and first client render match)
    const id = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
      } catch {
        /* storage unavailable: run without persistence */
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, hydrated]);

  const list = lists.find((l) => l.key === active) ?? lists[0];
  const items = list.groups.flatMap((g) => g.items.map((i) => `${list.key}:${i}`));
  const done = items.filter((k) => checked[k]).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div role="tablist" aria-label="Checklist type" className="flex flex-wrap gap-2">
          {lists.map((l) => (
            <button
              key={l.key}
              role="tab"
              type="button"
              aria-selected={l.key === active}
              onClick={() => setActive(l.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                l.key === active ? "border-terracotta bg-terracotta text-white" : "border-sand bg-white text-ink-soft hover:border-terracotta hover:text-terracotta-dark"
              }`}
            >
              {l.title}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChecked((c) => Object.fromEntries(Object.entries(c).filter(([k]) => !k.startsWith(`${list.key}:`))))}
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink-soft hover:border-ink/30"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink-soft hover:border-ink/30"
          >
            <Printer className="h-4 w-4" aria-hidden="true" /> Print
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8 print:border-0 print:p-0 print:shadow-none">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl text-ink">{list.title}: documents to gather</h2>
            <p className="mt-1 text-sm text-ink-soft">{list.intro}</p>
          </div>
          <p className="text-sm font-medium text-terracotta-dark print:hidden">
            {done} of {items.length} ready
          </p>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sand print:hidden">
          <div className="h-full rounded-full bg-terracotta transition-all" style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} />
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {list.groups.map((g) => (
            <section key={g.heading}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">{g.heading}</h3>
              <ul className="mt-3 space-y-2.5">
                {g.items.map((item) => {
                  const k = `${list.key}:${item}`;
                  return (
                    <li key={item}>
                      <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-ink-soft">
                        <input
                          type="checkbox"
                          checked={Boolean(checked[k])}
                          onChange={(e) => setChecked((c) => ({ ...c, [k]: e.target.checked }))}
                          className="mt-1 h-4 w-4 shrink-0 accent-terracotta"
                        />
                        <span className={checked[k] ? "line-through decoration-sand" : ""}>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted">
          Your progress is saved in this browser only. Lenders may ask for additional documents depending on your file.
        </p>
      </div>
    </div>
  );
}
