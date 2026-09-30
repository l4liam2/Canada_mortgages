import {
  Home,
  RefreshCw,
  KeyRound,
  TrendingUp,
  Building2,
  Briefcase,
  Landmark,
  Percent,
  ArrowRightLeft,
  Handshake,
  Sunset,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  featured: boolean;
};

export const services: Service[] = [
  {
    slug: "first-time-buyers",
    title: "First-time home buyers",
    short: "From pre-approval to keys in hand, with every step explained.",
    description:
      "Buying your first home is exciting and overwhelming in equal measure. Chad walks you through what you can afford, how much you need for a down payment and closing costs, which incentives you qualify for, and how to make a confident offer.",
    bullets: [
      "Pre-approval so you can shop with certainty",
      "Down payment planning, including FHSA and RRSP Home Buyers' Plan",
      "First-time buyer incentives and land transfer tax rebates",
      "Plain-language review of every document before you sign",
    ],
    icon: Home,
    featured: true,
  },
  {
    slug: "refinance",
    title: "Refinancing",
    short: "Unlock equity, consolidate debt, or restructure your mortgage.",
    description:
      "Refinancing can lower your overall borrowing cost, fund a renovation, or free up cash flow. Chad models the numbers honestly, including any penalty to break your current term, so you know whether it actually makes sense.",
    bullets: [
      "Debt consolidation at mortgage rates",
      "Access equity for renovations, investments, or education",
      "Break-even analysis on penalties versus savings",
      "Access to bank, monoline, and credit union lenders",
    ],
    icon: RefreshCw,
    featured: true,
  },
  {
    slug: "renewal",
    title: "Renewals and switches",
    short: "Don't just sign the renewal letter. Make your lender compete.",
    description:
      "Your renewal is the easiest moment to save money on your mortgage. Chad shops your renewal across dozens of lenders and negotiates a better rate or terms, often with the switch costs covered by the new lender.",
    bullets: [
      "Start reviewing options 120 days before maturity",
      "Compare your lender's offer against the whole market",
      "Straight switches with legal and appraisal fees often covered",
      "Adjust amortization or payment frequency to fit your life",
    ],
    icon: KeyRound,
    featured: true,
  },
  {
    slug: "investment-properties",
    title: "Investment properties",
    short: "Build a rental portfolio with financing structured to scale.",
    description:
      "Whether it's your first rental condo or your fifth property, the financing strategy matters as much as the property. Chad builds tailored scenarios that show how each purchase affects your borrowing power for the next one.",
    bullets: [
      "Rental income treatment across different lenders",
      "Down payment and equity strategies for growth",
      "Portfolio planning for multiple properties",
      "Honest guidance on cash flow and risk",
    ],
    icon: TrendingUp,
    featured: true,
  },
  {
    slug: "self-employed",
    title: "Self-employed borrowers",
    short: "Lenders who understand business income, not just T4s.",
    description:
      "If you own a business or freelance, traditional bank qualifying can undervalue what you actually earn. Chad works with lenders that look at the full picture, including stated income and alternative documentation programs.",
    bullets: [
      "Programs for incorporated and sole-proprietor borrowers",
      "Alternative income documentation options",
      "Guidance on structuring your finances before you apply",
    ],
    icon: Briefcase,
    featured: false,
  },
  {
    slug: "heloc",
    title: "Home equity lines of credit",
    short: "Flexible, low-cost access to the equity you've built.",
    description:
      "A HELOC gives you a revolving line of credit secured by your home, ideal for renovations, investments, or a financial cushion. Chad helps you compare standalone and combined mortgage-plus-HELOC products.",
    bullets: [
      "Standalone or readvanceable options",
      "Interest-only flexibility on what you use",
      "Understand the qualifying rules before you apply",
    ],
    icon: Landmark,
    featured: false,
  },
  {
    slug: "new-to-canada",
    title: "New to Canada",
    short: "Programs designed for newcomers with limited Canadian credit.",
    description:
      "Several lenders offer dedicated programs for permanent residents and work-permit holders who have recently arrived. Chad knows which lenders are the best fit and what documentation makes your file strong.",
    bullets: [
      "Programs for permanent residents and work-permit holders",
      "Alternative credit history options",
      "Guidance on down payment sources and documentation",
    ],
    icon: Building2,
    featured: false,
  },
  {
    slug: "pre-approval",
    title: "Pre-approvals and rate holds",
    short: "Lock a rate for up to 120 days while you shop.",
    description:
      "A proper pre-approval is more than a number. It reviews your full file, holds a rate against increases, and gives you a clear budget so you can make offers with confidence.",
    bullets: [
      "Rate holds of up to 120 days",
      "Full document review up front, not at the last minute",
      "A clear purchase budget including closing costs",
    ],
    icon: Percent,
    featured: false,
  },
  // Added at Chad's request (email, 2026-09-23) to round out the package.
  // TODO: have Chad review the wording of these four before launch.
  {
    slug: "bridge-loans",
    title: "Bridge loans",
    short: "Buy your next home before the sale of your current one closes.",
    description:
      "When your purchase closes before your sale does, a bridge loan covers the gap so you can use the equity in your current home toward the down payment on the next one. Chad lines it up alongside your new mortgage so both closings stay on schedule.",
    bullets: [
      "Short-term financing between two closing dates",
      "Unlocks the equity in the home you're selling",
      "Arranged together with the mortgage on your new home",
    ],
    icon: ArrowRightLeft,
    featured: false,
  },
  {
    slug: "private-lending",
    title: "Private lending",
    short: "A short-term solution when the banks say not yet.",
    description:
      "Private and alternative lenders look at the property and your plan, not only your credit score or income documents. It costs more than a bank mortgage, so Chad uses it as a bridge: a clear term, a clear exit, and a path back to conventional financing.",
    bullets: [
      "Options for bruised credit, complex income, or tight timelines",
      "Short terms with a defined plan to move to a traditional lender",
      "All fees disclosed in writing before you commit",
    ],
    icon: Handshake,
    featured: false,
  },
  {
    slug: "reverse-mortgages",
    title: "Reverse mortgages",
    short: "Turn home equity into income, without selling or moving.",
    description:
      "For homeowners 55 and older, a reverse mortgage lets you draw on the value of your home with no regular mortgage payments required. Chad explains how the balance grows over time and how it compares with a HELOC or downsizing, so you and your family can decide with the full picture.",
    bullets: [
      "For homeowners aged 55 and older",
      "No regular mortgage payments required while you live in the home",
      "You keep ownership of your home",
      "Side-by-side comparison with other ways to access equity",
    ],
    icon: Sunset,
    featured: false,
  },
  {
    slug: "debt-consolidation",
    title: "Debt consolidation",
    short: "Roll high-interest debt into one lower monthly payment.",
    description:
      "Credit cards, car loans, and lines of credit add up quickly. Using the equity in your home, Chad can combine them into a single payment at a much lower rate, and show you exactly what you'll save each month before you decide.",
    bullets: [
      "Replace high-interest balances with one lower payment",
      "Monthly cash flow comparison, before and after",
      "Options through a refinance, second mortgage, or HELOC",
    ],
    icon: Layers,
    featured: false,
  },
];
