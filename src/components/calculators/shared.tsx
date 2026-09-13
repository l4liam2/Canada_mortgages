import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-xl border border-sand bg-white px-4 py-3 text-ink shadow-[inset_0_1px_2px_rgba(42,33,28,0.04)] outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/15";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function MoneyInput({
  value,
  onChange,
  step = 1000,
  min = 0,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${inputCls} pl-8`}
      />
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sand bg-white px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-terracotta"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint && <span className="block text-xs text-muted">{hint}</span>}
      </span>
    </label>
  );
}

export function ResultPanel({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl bg-espresso p-6 text-cream shadow-lift sm:p-8">{children}</div>;
}

export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl bg-cream/[0.07] p-4">
      <p className="text-xs text-cream/60">{label}</p>
      <p className="mt-1 font-display text-2xl text-cream">{value}</p>
      {sub && <p className="mt-1 text-xs text-cream/55">{sub}</p>}
    </div>
  );
}

export function Warning({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-terracotta/30 bg-terracotta-tint/60 px-4 py-3 text-sm text-terracotta-dark">
      {children}
    </p>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-xs leading-relaxed text-muted">{children}</p>;
}
