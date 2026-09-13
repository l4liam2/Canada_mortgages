"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";

/**
 * Canadian mortgage math:
 * - Fixed-rate mortgages compound semi-annually, so the per-payment rate is
 *   (1 + annual/2)^(2/paymentsPerYear) - 1.
 * - Default insurance (CMHC/Sagen/Canada Guaranty) applies under 20% down.
 * Premium tiers and the stress-test floor are constants below. Update if rules change.
 */
const INSURANCE_TIERS: { maxLtv: number; rate: number }[] = [
  { maxLtv: 0.8, rate: 0 },
  { maxLtv: 0.85, rate: 0.028 },
  { maxLtv: 0.9, rate: 0.031 },
  { maxLtv: 0.95, rate: 0.04 },
];
const STRESS_TEST_FLOOR = 5.25; // % (OSFI minimum qualifying rate floor)
const STRESS_TEST_BUFFER = 2; // percentage points above contract rate

type Frequency = {
  key: string;
  label: string;
  perYear: number;
  accelerated?: boolean;
};

const FREQUENCIES: Frequency[] = [
  { key: "monthly", label: "Monthly", perYear: 12 },
  { key: "semi", label: "Semi-monthly", perYear: 24 },
  { key: "biweekly", label: "Bi-weekly", perYear: 26 },
  { key: "abiweekly", label: "Accelerated bi-weekly", perYear: 26, accelerated: true },
  { key: "weekly", label: "Weekly", perYear: 52 },
  { key: "aweekly", label: "Accelerated weekly", perYear: 52, accelerated: true },
];

const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
const cad2 = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 2 });

function minimumDownPayment(price: number) {
  if (price <= 500_000) return price * 0.05;
  if (price <= 1_500_000) return 500_000 * 0.05 + (price - 500_000) * 0.1;
  return price * 0.2;
}

function periodicRate(annualPct: number, perYear: number) {
  const semi = annualPct / 100 / 2;
  return Math.pow(1 + semi, 2 / perYear) - 1;
}

function paymentFor(principal: number, r: number, n: number) {
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function periodsToPayoff(principal: number, r: number, pmt: number) {
  if (r === 0) return principal / pmt;
  const x = 1 - (principal * r) / pmt;
  if (x <= 0) return Infinity;
  return -Math.log(x) / Math.log(1 + r);
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-sand bg-white px-4 py-3 text-ink shadow-[inset_0_1px_2px_rgba(42,33,28,0.04)] outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/15";

export function MortgageCalculator() {
  const [price, setPrice] = useState(850_000);
  const [down, setDown] = useState(85_000);
  const [rate, setRate] = useState(4.49);
  const [years, setYears] = useState(25);
  const [freqKey, setFreqKey] = useState("monthly");

  const result = useMemo(() => {
    const freq = FREQUENCIES.find((f) => f.key === freqKey) ?? FREQUENCIES[0];
    const safePrice = Math.max(0, price || 0);
    const safeDown = Math.min(Math.max(0, down || 0), safePrice);
    const minDown = minimumDownPayment(safePrice);
    const belowMinimum = safePrice > 0 && safeDown < minDown - 0.5;
    const baseLoan = safePrice - safeDown;
    const ltv = safePrice > 0 ? baseLoan / safePrice : 0;
    const insurable = safePrice <= 1_500_000;
    const tier = INSURANCE_TIERS.find((t) => ltv <= t.maxLtv + 1e-9);
    const insuranceRate = ltv > 0.8 ? (insurable && tier ? tier.rate : NaN) : 0;
    const premium = Number.isNaN(insuranceRate) ? 0 : baseLoan * insuranceRate;
    const principal = baseLoan + premium;
    const insuranceUnavailable = ltv > 0.8 && (Number.isNaN(insuranceRate) || !insurable);

    // Base amortization is always computed on the monthly schedule
    const rMonthly = periodicRate(rate, 12);
    const nMonthly = years * 12;
    const monthlyPayment = paymentFor(principal, rMonthly, nMonthly);

    const r = periodicRate(rate, freq.perYear);
    let payment: number;
    if (freq.accelerated) {
      payment = monthlyPayment / (freq.perYear === 26 ? 2 : 4);
    } else {
      payment = paymentFor(principal, r, years * freq.perYear);
    }
    const periods = periodsToPayoff(principal, r, payment);
    const payoffYears = Number.isFinite(periods) ? periods / freq.perYear : years;
    const totalPaid = Number.isFinite(periods) ? payment * periods : payment * years * freq.perYear;
    const totalInterest = Math.max(0, totalPaid - principal);
    const monthlyEquivalent = (payment * freq.perYear) / 12;
    const qualifyingRate = Math.max(rate + STRESS_TEST_BUFFER, STRESS_TEST_FLOOR);
    const qualifyingPayment = paymentFor(principal, periodicRate(qualifyingRate, 12), nMonthly);

    return {
      freq,
      minDown,
      belowMinimum,
      ltv,
      premium,
      principal,
      payment,
      monthlyEquivalent,
      totalInterest,
      totalPaid,
      payoffYears,
      yearsSaved: Math.max(0, years - payoffYears),
      qualifyingRate,
      qualifyingPayment,
      insuranceUnavailable,
      interestShare: totalPaid > 0 ? totalInterest / totalPaid : 0,
    };
  }, [price, down, rate, years, freqKey]);

  const downPct = price > 0 ? (down / price) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs */}
      <div className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-soft lg:col-span-5 sm:p-8">
        <Field label="Home price">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={5000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className={`${inputCls} pl-8`}
            />
          </div>
        </Field>

        <Field
          label={`Down payment (${downPct.toFixed(1)}%)`}
          hint={`Minimum for this price: ${cad.format(result.minDown)}`}
        >
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              className={`${inputCls} pl-8`}
            />
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {[5, 10, 15, 20].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setDown(Math.round((price * p) / 100))}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  Math.abs(downPct - p) < 0.05
                    ? "border-terracotta bg-terracotta-tint text-terracotta-dark"
                    : "border-sand text-ink-soft hover:border-ink/30"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Interest rate (%)">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={25}
              step={0.01}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={inputCls}
            />
          </Field>
          <Field label="Amortization">
            <select value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls}>
              {[10, 15, 20, 25, 30].map((y) => (
                <option key={y} value={y}>
                  {y} years
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Payment frequency">
          <select value={freqKey} onChange={(e) => setFreqKey(e.target.value)} className={inputCls}>
            {FREQUENCIES.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </Field>

        {result.belowMinimum && (
          <p className="rounded-xl border border-terracotta/30 bg-terracotta-tint/60 px-4 py-3 text-sm text-terracotta-dark">
            This down payment is below the Canadian minimum for this price. The results still
            calculate, but a lender would require at least {cad.format(result.minDown)}.
          </p>
        )}
        {result.insuranceUnavailable && !result.belowMinimum && (
          <p className="rounded-xl border border-terracotta/30 bg-terracotta-tint/60 px-4 py-3 text-sm text-terracotta-dark">
            Default insurance isn&apos;t available at this price and down payment combination, so
            the calculation assumes an uninsured mortgage.
          </p>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl bg-espresso p-6 text-cream shadow-lift sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
            Estimated {result.freq.label.toLowerCase()} payment
          </p>
          <p className="mt-2 font-display text-5xl leading-none text-cream sm:text-6xl">
            {cad2.format(result.payment)}
          </p>
          <p className="mt-3 text-sm text-cream/65">
            About {cad.format(result.monthlyEquivalent)} per month. Paid off in{" "}
            {result.payoffYears.toFixed(1)} years
            {result.yearsSaved > 0.05 && (
              <span className="text-terracotta-tint">
                {" "}
                (saves {result.yearsSaved.toFixed(1)} years versus monthly)
              </span>
            )}
            .
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Mortgage amount" value={cad.format(result.principal)} />
            <Stat
              label="Default insurance premium"
              value={result.premium > 0 ? cad.format(result.premium) : "None (20%+ down)"}
            />
            <Stat label="Total interest over amortization" value={cad.format(result.totalInterest)} />
            <Stat label="Total of all payments" value={cad.format(result.totalPaid)} />
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-xs text-cream/60">
              <span>Principal {Math.round((1 - result.interestShare) * 100)}%</span>
              <span>Interest {Math.round(result.interestShare * 100)}%</span>
            </div>
            <div
              className="mt-2 h-3 w-full overflow-hidden rounded-full bg-cream/15"
              role="img"
              aria-label={`Principal ${Math.round((1 - result.interestShare) * 100)} percent, interest ${Math.round(result.interestShare * 100)} percent`}
            >
              <div
                className="h-full rounded-full bg-terracotta transition-all duration-500"
                style={{ width: `${Math.round((1 - result.interestShare) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-3 rounded-2xl border border-sand bg-white p-5 text-sm text-ink-soft shadow-soft">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
          <p>
            <strong className="text-ink">Stress test:</strong> a federally regulated lender would qualify
            you at {result.qualifyingRate.toFixed(2)}%, which is a monthly payment of about{" "}
            {cad.format(result.qualifyingPayment)}. You don&apos;t pay that amount; it limits how much
            you can borrow.
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Estimates only, using semi-annual compounding as required for Canadian fixed-rate mortgages.
          Insurance premiums, provincial sales tax on premiums, property taxes, and condo fees are not
          included in the payment. Actual rates and approvals depend on your full application.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream/[0.07] p-4">
      <p className="text-xs text-cream/60">{label}</p>
      <p className="mt-1 font-display text-2xl text-cream">{value}</p>
    </div>
  );
}
