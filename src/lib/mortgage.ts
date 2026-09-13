/**
 * Shared Canadian mortgage math. Rule-based constants live here so every
 * calculator stays consistent. Update the constants if regulations change.
 */

/** OSFI minimum qualifying rate floor (%) and buffer above the contract rate (points). */
export const STRESS_TEST_FLOOR = 5.25;
export const STRESS_TEST_BUFFER = 2;

/** Purchase price cap for default-insured mortgages. */
export const INSURED_PRICE_CAP = 1_500_000;

/** Default insurance premium tiers by loan-to-value (CMHC / Sagen / Canada Guaranty). */
export const INSURANCE_TIERS: { maxLtv: number; rate: number }[] = [
  { maxLtv: 0.8, rate: 0 },
  { maxLtv: 0.85, rate: 0.028 },
  { maxLtv: 0.9, rate: 0.031 },
  { maxLtv: 0.95, rate: 0.04 },
];

/** Ontario charges PST on the insurance premium, payable at closing. */
export const PREMIUM_PST_RATE = 0.08;

/** Gross and total debt service ratio limits used to qualify. */
export const GDS_LIMIT = 0.39;
export const TDS_LIMIT = 0.44;

export const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const cad2 = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 2 });

export function minimumDownPayment(price: number) {
  if (price <= 500_000) return price * 0.05;
  if (price <= INSURED_PRICE_CAP) return 500_000 * 0.05 + (price - 500_000) * 0.1;
  return price * 0.2;
}

/** Per-payment rate with semi-annual compounding (Canadian fixed-rate standard). */
export function periodicRate(annualPct: number, perYear: number) {
  const semi = annualPct / 100 / 2;
  return Math.pow(1 + semi, 2 / perYear) - 1;
}

export function paymentFor(principal: number, r: number, n: number) {
  if (principal <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** Loan amount that a given payment supports. */
export function presentValue(payment: number, r: number, n: number) {
  if (payment <= 0) return 0;
  if (r === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + r, -n))) / r;
}

export function periodsToPayoff(principal: number, r: number, pmt: number) {
  if (r === 0) return principal / pmt;
  const x = 1 - (principal * r) / pmt;
  if (x <= 0) return Infinity;
  return -Math.log(x) / Math.log(1 + r);
}

/** Premium rate for a loan-to-value, or null when default insurance isn't available. */
export function insurancePremiumRate(ltv: number, price: number): number | null {
  if (ltv <= 0.8) return 0;
  if (price > INSURED_PRICE_CAP) return null;
  const tier = INSURANCE_TIERS.find((t) => ltv <= t.maxLtv + 1e-9);
  return tier ? tier.rate : null;
}

export function qualifyingRate(contractPct: number) {
  return Math.max(contractPct + STRESS_TEST_BUFFER, STRESS_TEST_FLOOR);
}

/* ---------- Land transfer tax (Ontario and City of Toronto) ---------- */

type Bracket = { upTo: number; rate: number };

const ONTARIO_LTT: Bracket[] = [
  { upTo: 55_000, rate: 0.005 },
  { upTo: 250_000, rate: 0.01 },
  { upTo: 400_000, rate: 0.015 },
  { upTo: 2_000_000, rate: 0.02 },
  { upTo: Infinity, rate: 0.025 },
];

const TORONTO_MLTT: Bracket[] = [
  { upTo: 55_000, rate: 0.005 },
  { upTo: 250_000, rate: 0.01 },
  { upTo: 400_000, rate: 0.015 },
  { upTo: 2_000_000, rate: 0.02 },
  { upTo: 3_000_000, rate: 0.025 },
  { upTo: 4_000_000, rate: 0.035 },
  { upTo: 5_000_000, rate: 0.045 },
  { upTo: 10_000_000, rate: 0.055 },
  { upTo: 20_000_000, rate: 0.065 },
  { upTo: Infinity, rate: 0.075 },
];

function bracketTax(amount: number, brackets: Bracket[]) {
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    if (amount <= lower) break;
    const taxable = Math.min(amount, b.upTo) - lower;
    tax += taxable * b.rate;
    lower = b.upTo;
  }
  return tax;
}

/** Maximum first-time buyer rebates. */
export const ONTARIO_FTB_REBATE_MAX = 4_000;
export const TORONTO_FTB_REBATE_MAX = 4_475;

export function ontarioLandTransferTax(price: number) {
  return bracketTax(price, ONTARIO_LTT);
}

export function torontoLandTransferTax(price: number) {
  return bracketTax(price, TORONTO_MLTT);
}

export function yearsAndMonths(totalMonths: number) {
  const m = Math.max(0, Math.round(totalMonths));
  const years = Math.floor(m / 12);
  const months = m % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months || !years) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  return parts.join(" ");
}
