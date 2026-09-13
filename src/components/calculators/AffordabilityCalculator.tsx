"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import {
  GDS_LIMIT,
  TDS_LIMIT,
  cad,
  insurancePremiumRate,
  minimumDownPayment,
  paymentFor,
  periodicRate,
  presentValue,
  qualifyingRate,
} from "@/lib/mortgage";
import { CalculatorNav } from "./CalculatorNav";
import { Disclaimer, Field, MoneyInput, ResultPanel, Stat, inputCls } from "./shared";

/** Largest purchase price whose total loan (incl. insurance) fits within maxLoan. */
function maxPriceFor(maxLoan: number, down: number) {
  const feasible = (price: number) => {
    if (price <= down) return true;
    if (down < minimumDownPayment(price) - 0.5) return false;
    const base = price - down;
    const rate = insurancePremiumRate(base / price, price);
    if (rate === null) return false;
    return base * (1 + rate) <= maxLoan;
  };
  let lo = 0;
  let hi = 25_000_000;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (feasible(mid)) lo = mid;
    else hi = mid;
  }
  return Math.floor(lo / 1000) * 1000;
}

export function AffordabilityCalculator() {
  const [income, setIncome] = useState(140_000);
  const [debts, setDebts] = useState(500);
  const [down, setDown] = useState(100_000);
  const [rate, setRate] = useState(4.49);
  const [years, setYears] = useState(25);
  const [tax, setTax] = useState(350);
  const [heat, setHeat] = useState(125);
  const [condo, setCondo] = useState(0);

  const r = useMemo(() => {
    const gross = Math.max(0, income) / 12;
    const housing = tax + heat + condo * 0.5;
    const gdsRoom = gross * GDS_LIMIT - housing;
    const tdsRoom = gross * TDS_LIMIT - housing - debts;
    const maxPayment = Math.max(0, Math.min(gdsRoom, tdsRoom));
    const binding = gdsRoom <= tdsRoom ? "GDS" : "TDS";
    const n = years * 12;
    const qRate = qualifyingRate(rate);
    const rQ = periodicRate(qRate, 12);
    const rC = periodicRate(rate, 12);

    const maxLoan = presentValue(maxPayment, rQ, n);
    const maxPrice = maxPriceFor(maxLoan, down);
    const base = Math.max(0, maxPrice - down);
    const premRate = maxPrice > 0 ? insurancePremiumRate(base / maxPrice, maxPrice) ?? 0 : 0;
    const premium = base * premRate;
    const loan = base + premium;
    const payment = paymentFor(loan, rC, n);
    const gds = gross > 0 ? (payment + housing) / gross : 0;
    const tds = gross > 0 ? (payment + housing + debts) / gross : 0;

    const maxLoanNoStress = presentValue(maxPayment, rC, n);
    const maxPriceNoStress = maxPriceFor(maxLoanNoStress, down);

    return { maxPayment, binding, qRate, maxPrice, base, premium, loan, payment, gds, tds, maxPriceNoStress, gross };
  }, [income, debts, down, rate, years, tax, heat, condo]);

  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

  return (
    <div>
      <CalculatorNav current="/calculator/affordability" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-soft lg:col-span-5 sm:p-8">
          <Field label="Annual household income (before tax)">
            <MoneyInput value={income} onChange={setIncome} step={5000} />
          </Field>
          <Field label="Monthly debt payments" hint="Car loans, student loans, credit card minimums, support payments">
            <MoneyInput value={debts} onChange={setDebts} step={50} />
          </Field>
          <Field label="Down payment available">
            <MoneyInput value={down} onChange={setDown} step={5000} />
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
                {[20, 25, 30].map((y) => (
                  <option key={y} value={y}>
                    {y} years
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Property tax / mo">
              <MoneyInput value={tax} onChange={setTax} step={25} />
            </Field>
            <Field label="Heating / mo">
              <MoneyInput value={heat} onChange={setHeat} step={25} />
            </Field>
            <Field label="Condo fees / mo">
              <MoneyInput value={condo} onChange={setCondo} step={25} />
            </Field>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ResultPanel>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
              Estimated maximum purchase price
            </p>
            <p className="mt-2 font-display text-5xl leading-none text-cream sm:text-6xl">{cad.format(r.maxPrice)}</p>
            <p className="mt-3 text-sm text-cream/65">
              Qualified at {r.qRate.toFixed(2)}% (the stress test), limited by your {r.binding} ratio. Your actual
              payment at {rate.toFixed(2)}% would be about {cad.format(r.payment)} per month.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Stat label="Mortgage amount" value={cad.format(r.loan)} sub={r.premium > 0 ? `includes ${cad.format(r.premium)} default insurance` : "no default insurance (20%+ down)"} />
              <Stat label="Max monthly housing payment" value={cad.format(r.maxPayment)} sub="mortgage principal and interest" />
              <Stat label="GDS ratio at this price" value={pct(r.gds)} sub={`limit ${pct(GDS_LIMIT)}`} />
              <Stat label="TDS ratio at this price" value={pct(r.tds)} sub={`limit ${pct(TDS_LIMIT)}`} />
            </div>
          </ResultPanel>

          <div className="mt-5 flex gap-3 rounded-2xl border border-sand bg-white p-5 text-sm text-ink-soft shadow-soft">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
            <p>
              <strong className="text-ink">Stress test effect:</strong> without it you could qualify for roughly{" "}
              {cad.format(r.maxPriceNoStress)}, about {cad.format(Math.max(0, r.maxPriceNoStress - r.maxPrice))} more.
              Credit unions and some lenders apply different rules, which is one reason to shop the whole market.
            </p>
          </div>

          <Disclaimer>
            Estimates only. Lenders also weigh credit history, employment type, and property details, and each
            lender sets its own debt-service limits. Ratios shown use {pct(GDS_LIMIT)} GDS and {pct(TDS_LIMIT)} TDS with
            half of condo fees included. Rules change; confirm the current thresholds before relying on them.
          </Disclaimer>
        </div>
      </div>
    </div>
  );
}
