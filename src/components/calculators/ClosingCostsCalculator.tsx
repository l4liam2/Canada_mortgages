"use client";

import { useMemo, useState } from "react";
import {
  ONTARIO_FTB_REBATE_MAX,
  PREMIUM_PST_RATE,
  TORONTO_FTB_REBATE_MAX,
  cad,
  insurancePremiumRate,
  minimumDownPayment,
  ontarioLandTransferTax,
  torontoLandTransferTax,
} from "@/lib/mortgage";
import { CalculatorNav } from "./CalculatorNav";
import { Disclaimer, Field, MoneyInput, ResultPanel, StatNumber, Toggle, Warning } from "./shared";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

export function ClosingCostsCalculator() {
  const [price, setPrice] = useState(850_000);
  const [down, setDown] = useState(85_000);
  const [firstTime, setFirstTime] = useState(true);
  const [inToronto, setInToronto] = useState(true);
  const [legal, setLegal] = useState(2_200);
  const [title, setTitle] = useState(400);
  const [inspection, setInspection] = useState(500);
  const [appraisal, setAppraisal] = useState(0);
  const [adjustments, setAdjustments] = useState(500);
  const [moving, setMoving] = useState(1_500);

  const r = useMemo(() => {
    const safePrice = Math.max(0, price);
    const safeDown = Math.min(Math.max(0, down), safePrice);
    const belowMinimum = safePrice > 0 && safeDown < minimumDownPayment(safePrice) - 0.5;
    const ontTax = ontarioLandTransferTax(safePrice);
    const ontRebate = firstTime ? Math.min(ontTax, ONTARIO_FTB_REBATE_MAX) : 0;
    const torTax = inToronto ? torontoLandTransferTax(safePrice) : 0;
    const torRebate = inToronto && firstTime ? Math.min(torTax, TORONTO_FTB_REBATE_MAX) : 0;
    const base = safePrice - safeDown;
    const premRate = safePrice > 0 ? insurancePremiumRate(base / safePrice, safePrice) : 0;
    const premium = premRate ? base * premRate : 0;
    const premiumPst = premium * PREMIUM_PST_RATE;
    const fees = legal + title + inspection + appraisal + adjustments + moving;
    const landTransfer = ontTax - ontRebate + torTax - torRebate;
    const closing = landTransfer + premiumPst + fees;
    const cashToClose = safeDown + closing;
    return { belowMinimum, ontTax, ontRebate, torTax, torRebate, premium, premiumPst, fees, landTransfer, closing, cashToClose, safeDown };
  }, [price, down, firstTime, inToronto, legal, title, inspection, appraisal, adjustments, moving]);

  const rows: { label: string; value: number; note?: string }[] = [
    { label: "Ontario land transfer tax", value: r.ontTax },
    ...(r.ontRebate > 0 ? [{ label: "Ontario first-time buyer rebate", value: -r.ontRebate }] : []),
    ...(inToronto ? [{ label: "Toronto municipal land transfer tax", value: r.torTax }] : []),
    ...(r.torRebate > 0 ? [{ label: "Toronto first-time buyer rebate", value: -r.torRebate }] : []),
    ...(r.premiumPst > 0
      ? [{ label: "PST on default insurance premium", value: r.premiumPst, note: `8% of the ${cad.format(r.premium)} premium; the premium itself is added to the mortgage` }]
      : []),
    { label: "Legal fees and disbursements", value: legal },
    { label: "Title insurance", value: title },
    { label: "Home inspection", value: inspection },
    { label: "Appraisal", value: appraisal, note: appraisal === 0 ? "often covered by the lender" : undefined },
    { label: "Adjustments (prepaid taxes, utilities)", value: adjustments },
    { label: "Moving and setup", value: moving },
  ];

  return (
    <div>
      <CalculatorNav current="/calculator/closing-costs" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-soft lg:col-span-5 sm:p-8">
          <Field label="Purchase price">
            <MoneyInput value={price} onChange={setPrice} step={5000} />
          </Field>
          <Field label="Down payment">
            <MoneyInput value={down} onChange={setDown} step={1000} />
          </Field>
          <div className="grid gap-3">
            <Toggle
              checked={firstTime}
              onChange={setFirstTime}
              label="I'm a first-time home buyer"
              hint="Never owned a home anywhere, 18 or older, and will live in the property within 9 months"
            />
            <Toggle checked={inToronto} onChange={setInToronto} label="The property is in the City of Toronto" hint="Toronto charges a second land transfer tax on top of Ontario's" />
          </div>
          {r.belowMinimum && (
            <Warning>This down payment is below the minimum a lender would accept for this price.</Warning>
          )}
          <details className="rounded-xl border border-sand bg-cream p-4">
            <summary className="cursor-pointer text-sm font-medium text-ink">Adjust fee estimates</summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Legal fees">
                <MoneyInput value={legal} onChange={setLegal} step={100} />
              </Field>
              <Field label="Title insurance">
                <MoneyInput value={title} onChange={setTitle} step={50} />
              </Field>
              <Field label="Home inspection">
                <MoneyInput value={inspection} onChange={setInspection} step={50} />
              </Field>
              <Field label="Appraisal">
                <MoneyInput value={appraisal} onChange={setAppraisal} step={50} />
              </Field>
              <Field label="Adjustments">
                <MoneyInput value={adjustments} onChange={setAdjustments} step={100} />
              </Field>
              <Field label="Moving">
                <MoneyInput value={moving} onChange={setMoving} step={100} />
              </Field>
            </div>
          </details>
        </div>

        <div className="lg:col-span-7">
          <ResultPanel>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">Estimated cash needed on closing day</p>
            <p className="mt-2 font-display text-5xl leading-none text-cream sm:text-6xl">
              <AnimatedNumber value={r.cashToClose} format={cad.format} />
            </p>
            <p className="mt-3 text-sm text-cream/65">
              {cad.format(r.safeDown)} down payment plus {cad.format(r.closing)} in closing costs.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatNumber label="Land transfer tax (net)" value={r.landTransfer} format={cad.format} />
              <StatNumber label="PST on insurance" value={r.premiumPst} format={cad.format} />
              <StatNumber label="Fees and adjustments" value={r.fees} format={cad.format} />
            </div>
          </ResultPanel>

          <div className="mt-5 overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
            <table className="w-full text-sm">
              <caption className="sr-only">Closing cost breakdown</caption>
              <tbody className="divide-y divide-sand">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td className="px-5 py-3 text-ink-soft">
                      {row.label}
                      {row.note && <span className="block text-xs text-muted">{row.note}</span>}
                    </td>
                    <td className={`px-5 py-3 text-right font-medium tabular-nums ${row.value < 0 ? "text-sage" : "text-ink"}`}>
                      {row.value < 0 ? `-${cad.format(-row.value)}` : cad.format(row.value)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-cream-deep">
                  <td className="px-5 py-3 font-semibold text-ink">Total closing costs</td>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums text-ink">{cad.format(r.closing)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Disclaimer>
            Estimates only. Land transfer tax uses the Ontario and City of Toronto brackets for residential
            property with the first-time buyer rebates capped at {cad.format(ONTARIO_FTB_REBATE_MAX)} and{" "}
            {cad.format(TORONTO_FTB_REBATE_MAX)}. Non-residents may owe additional speculation tax. Fee estimates are
            typical ranges; your lawyer will provide exact figures. Rates and rebates change; verify before closing.
          </Disclaimer>
        </div>
      </div>
    </div>
  );
}
