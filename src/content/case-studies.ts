/**
 * ILLUSTRATIVE CASE STUDIES.
 * These are composite scenarios built from situations Chad handles regularly. No client is
 * identified and the figures are rounded and representative. Replace or refine them with real,
 * anonymized files once you have each client's written permission. Keep the disclaimer on the page.
 */
export type CaseStudy = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  situation: string;
  challenge: string;
  approach: string[];
  outcome: string;
  numbers: { label: string; value: string }[];
  takeaway: string;
  relatedTool: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "first-home-five-percent-down",
    tag: "First-time buyers",
    title: "A first condo with 5% down, six months sooner than they expected",
    summary:
      "A couple renting in Scarborough assumed they needed 20% down. Combining an FHSA, a family gift, and first-time buyer rebates put keys in their hands with a fraction of that.",
    situation:
      "Two salaried professionals in their late twenties, renting and saving steadily, with a combined household income in the mid $100,000s and about $30,000 set aside. They had been told by friends that buying in Toronto meant waiting until they had 20% down, which felt years away.",
    challenge:
      "Their savings covered a 5% down payment on a one-bedroom condo priced just under $500,000, but only if closing costs didn't eat into it. They also worried the stress test would price them out entirely.",
    approach: [
      "Ran their numbers at the qualifying rate first, so the pre-approval ceiling was realistic rather than optimistic.",
      "Moved the bulk of their savings into a First Home Savings Account before the purchase for the tax deduction, and documented a modest gift from a parent with a simple gift letter.",
      "Mapped closing costs in advance: the Ontario and Toronto first-time buyer rebates covered most of the land transfer tax, leaving legal fees, title insurance, and adjustments.",
      "Held a rate for 120 days so they could shop without watching the market every morning.",
    ],
    outcome:
      "Firm offer accepted on a condo within their budget, insured mortgage approved in three business days, and closing costs came in under what they had budgeted. They kept a small emergency fund intact rather than draining every account to get in.",
    numbers: [
      { label: "Down payment", value: "5%" },
      { label: "Land transfer tax after rebates", value: "Under $4,500" },
      { label: "Time from first call to keys", value: "About 4 months" },
    ],
    takeaway:
      "You don't need 20% down. You need the right plan for the down payment you have, and a clear picture of the cash you'll need on closing day.",
    relatedTool: { label: "Estimate your closing costs", href: "/calculator/closing-costs" },
  },
  {
    slug: "self-employed-after-bank-said-no",
    tag: "Self-employed",
    title: "Approved after the bank said no: a freelancer with strong revenue and a lean tax return",
    summary:
      "A sole-proprietor designer had years of steady contracts but wrote off enough expenses that her bank saw a thin income line. The answer was a lender that looks at the business, not just line 15000.",
    situation:
      "A graphic designer running her own business for four years, with consistent contracts, a healthy business account, and a 20% down payment saved. Her bank pre-qualified her for far less than she needed, then declined the application outright once the purchase agreement came in.",
    challenge:
      "Traditional qualifying uses the net income on her tax returns. After legitimate business expenses, that figure was less than half of what actually flowed through her account each year, and it made the debt-service ratios fail.",
    approach: [
      "Reviewed twelve months of business bank statements and her contracts to establish the real, recurring revenue of the business.",
      "Placed the file with a lender whose business-for-self program qualifies on documented business cash flow and reasonable stated income, supported by her tax filings and proof that no taxes were owing.",
      "Structured a two-year term rather than five, with a plan to move to a mainstream lender at renewal once two years of stronger filed income were on record.",
      "Explained the trade-off up front: a rate roughly half a point above a bank's best offer, in exchange for an approval that actually closed.",
    ],
    outcome:
      "Approved within a week of the bank's decline, closed on schedule, and set up with a clear path to a lower rate at renewal.",
    numbers: [
      { label: "Down payment", value: "20%" },
      { label: "Rate premium versus the bank", value: "About 0.5 points" },
      { label: "Term", value: "2 years, then reassess" },
    ],
    takeaway:
      "A bank's no is one lender's opinion. Self-employed income needs a lender that reads business statements, and a strategy that gets you back to the cheapest money over time.",
    relatedTool: { label: "See the self-employed document checklist", href: "/resources#checklists" },
  },
  {
    slug: "renewal-that-beat-the-letter",
    tag: "Renewals",
    title: "The renewal letter said one thing. The market said another.",
    summary:
      "A homeowner in East York almost signed the renewal offer that arrived in the mail. A ten-minute comparison found a better rate, and the new lender paid the switch costs.",
    situation:
      "A homeowner with roughly $420,000 remaining on a mortgage and nineteen years of amortization left. The renewal offer from the current lender arrived about a month before maturity, with a five-year fixed rate and a sign-here form.",
    challenge:
      "The offer wasn't terrible, which is exactly why most people sign it. It was simply higher than what several other lenders were offering for the same borrower and the same property.",
    approach: [
      "Compared the offer against the market the day it arrived, then went back to the current lender to see if it would match. It improved slightly but not enough.",
      "Arranged a straight switch to a monoline lender at a rate 0.45 percentage points lower, with the legal and appraisal costs covered by the new lender.",
      "Because the amount and amortization stayed the same, the switch did not require re-qualifying at the stress test.",
      "Set the new mortgage to accelerated bi-weekly payments, which the homeowner's budget could absorb, to shorten the remaining amortization.",
    ],
    outcome:
      "Lower rate, no out-of-pocket switch costs, and a payment schedule that will finish the mortgage roughly two years sooner. Total effort on the homeowner's side: two emails and one signing appointment.",
    numbers: [
      { label: "Rate improvement", value: "0.45 points" },
      { label: "Interest saved over the term", value: "Roughly $9,000" },
      { label: "Switch costs paid by client", value: "$0" },
    ],
    takeaway:
      "Renewal is the cheapest moment to improve your mortgage. Start 120 days before maturity and make your lender compete.",
    relatedTool: { label: "Set a renewal reminder", href: "/renewal-reminder" },
  },
];
