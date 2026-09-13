"use client";

import { useMemo, useState } from "react";
import { cad, paymentFor, periodicRate, yearsAndMonths } from "@/lib/mortgage";
import { CalculatorNav } from "./CalculatorNav";
import { Disclaimer, Field, MoneyInput, ResultPanel, Stat, inputCls } from "./shared";

function simulate(balance: number, r: number, basePayment: number, extraMonthly: number, annualLump: number, oneTime: number) {
  let bal = Math.max(0, balance - oneTime);
  let months = 0;
  let interest = 0;
  const payment = basePayment + extraMonthly;
  while (bal > 0.005 && months < 1200) {
    const i = bal * r;
    interest += i;
    bal += i;
    bal -= Math.min(payment, bal);
    months++;
    if (annualLump > 0 && months % 12 === 0) bal -= Math.min(annualLump, bal);
  }
  return { months, interest };
}

export function PrepaymentCalculator() {
  const [balance, setBalance] = useState(600_000);
  const [rate, setRate] = useState(4.49);
  const [years, setYears] = useState(22);
  const [months, setMonths] = useState(0);
  const [extraMonthly, setExtraMonthly] = useState(200);
  const [annualLump, setAnnualLump] = useState(5_000);
  const [oneTime, setOneTime] = useState(0);

  const r = useMemo(() => {
    const rM = periodicRate(rate, 12);
    const n = Math.max(1, years * 12 + months);
    const basePayment = paymentFor(balance, rM, n);
    const baseline = simulate(balance, rM, basePayment, 0, 0, 0);
    const withExtras = simulate(balance, rM, basePayment, extraMonthly, annualLump, oneTime);
    return {
      basePayment,
      newPayment: basePayment + extraMonthly,
      baseline,
      withExtras,
      interestSaved: Math.max(0, baseline.interest - withExtras.interest),
      monthsSaved: Math.max(0, baseline.months - withExtras.months),
      extraPerYear: extraMonthly * 12 + annualLump,
    };
  }, [balance, rate, years, months, extraMonthly, annualLump, oneTime]);

  return (
    <div>
      <CalculatorNav current="/calculator/prepayment" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-soft lg:col-span-5 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">Your current mortgage</p>
          <Field label="Current balance">
            <MoneyInput value={balance} onChange={setBalance} step={5000} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
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
            <Field label="Years left">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={40}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className={inputCls}
              />
            </Field>
            <Field label="Months">
              <select value={months} onChange={(e) => setMonths(Number(e.target.value))} className={inputCls}>
                {Array.from({ length: 12 }).map((_, m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">Extra payments</p>
          <Field label="Extra amount each month" hint="Added on top of your regular payment">
            <MoneyInput value={extraMonthly} onChange={setExtraMonthly} step={50} />
          </Field>
          <Field label="Annual lump sum" hint="Applied once a year, for example from a bonus or tax refund">
            <MoneyInput value={annualLump} onChange={setAnnualLump} step={500} />
          </Field>
          <Field label="One-time lump sum today">
            <MoneyInput value={oneTime} onChange={setOneTime} step={500} />
          </Field>
        </div>

        <div className="lg:col-span-7">
          <ResultPanel>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">Interest you would save</p>
            <p className="mt-2 font-display text-5xl leading-none text-cream sm:text-6xl">{cad.format(r.interestSaved)}</p>
            <p className="mt-3 text-sm text-cream/65">
              Mortgage-free {yearsAndMonths(r.monthsSaved)} sooner: paid off in {yearsAndMonths(r.withExtras.months)} instead of{" "}
              {yearsAndMonths(r.baseline.months)}.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Stat label="Regular monthly payment" value={cad.format(r.basePayment)} />
              <Stat label="New monthly payment" value={cad.format(r.newPayment)} sub={`plus ${cad.format(annualLump)} once a year`} />
              <Stat label="Total interest, current plan" value={cad.format(r.baseline.interest)} />
              <Stat label="Total interest, with extras" value={cad.format(r.withExtras.interest)} />
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-xs text-cream/60">
                <span>With extra payments</span>
                <span>Current plan</span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-cream/15" role="img" aria-label="Payoff time comparison">
                <div
                  className="h-full rounded-full bg-terracotta transition-all duration-500"
                  style={{ width: `${r.baseline.months > 0 ? Math.round((r.withExtras.months / r.baseline.months) * 100) : 100}%` }}
                />
              </div>
            </div>
          </ResultPanel>
          <Disclaimer>
            Estimates only, assuming monthly payments, a constant rate, and semi-annual compounding. Most closed
            mortgages allow prepayments of 10% to 20% of the original principal per year without penalty; amounts
            above your lender&apos;s privilege may trigger a charge. Check your mortgage terms or ask Chad.
          </Disclaimer>
        </div>
      </div>
    </div>
  );
}
