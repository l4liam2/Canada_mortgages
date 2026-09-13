import Link from "next/link";
import { Calculator, Home, PiggyBank, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const calculatorTools: { href: string; label: string; short: string; icon: LucideIcon }[] = [
  { href: "/calculator", label: "Payment", short: "What will my payments be?", icon: Calculator },
  { href: "/calculator/affordability", label: "Affordability", short: "How much can I afford?", icon: Home },
  { href: "/calculator/closing-costs", label: "Closing costs", short: "Land transfer tax and cash to close", icon: Receipt },
  { href: "/calculator/prepayment", label: "Prepayment", short: "Pay it off faster", icon: PiggyBank },
];

export function CalculatorNav({ current }: { current: string }) {
  return (
    <nav aria-label="Calculators" className="mb-8 flex flex-wrap gap-2">
      {calculatorTools.map((t) => {
        const active = t.href === current;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? "border-terracotta bg-terracotta text-white"
                : "border-sand bg-white text-ink-soft hover:border-terracotta hover:text-terracotta-dark"
            }`}
          >
            <t.icon className="h-4 w-4" aria-hidden="true" />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
