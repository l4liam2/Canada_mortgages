export type Checklist = {
  key: string;
  title: string;
  intro: string;
  groups: { heading: string; items: string[] }[];
};

export const checklists: Checklist[] = [
  {
    key: "purchase",
    title: "Buying a home",
    intro: "What lenders typically ask for on a purchase, whether it's your first home or your next one.",
    groups: [
      {
        heading: "Identification",
        items: ["Two pieces of government-issued ID (one with a photo)", "Social Insurance Number (for the credit check)"],
      },
      {
        heading: "Income",
        items: [
          "Letter of employment on company letterhead (position, start date, salary or hourly rate)",
          "Two most recent pay stubs",
          "T4 slips for the last two years",
          "Notices of Assessment for the last two years (if income varies or includes bonus, overtime, or commission)",
        ],
      },
      {
        heading: "Down payment",
        items: [
          "90 days of statements for every account the down payment comes from",
          "FHSA, RRSP, or TFSA statements if you're drawing from them",
          "Gift letter and proof of deposit if any part is a gift from family",
          "Sale agreement and mortgage statement for your current home, if you're selling",
        ],
      },
      {
        heading: "The property (once you have an accepted offer)",
        items: [
          "Signed purchase agreement with all schedules and amendments",
          "MLS listing",
          "Status certificate (condos) or well and septic reports (rural)",
          "Your lawyer's name and contact details",
          "Void cheque or pre-authorized debit form for payments",
        ],
      },
    ],
  },
  {
    key: "refinance",
    title: "Renewing or refinancing",
    intro: "For a switch at renewal or a refinance to access equity, the file is shorter but a few property documents are added.",
    groups: [
      {
        heading: "Identification and income",
        items: ["Two pieces of government-issued ID", "Letter of employment and two recent pay stubs", "T4s and Notices of Assessment for the last two years"],
      },
      {
        heading: "Your current mortgage and property",
        items: [
          "Most recent mortgage statement showing balance, rate, and maturity date",
          "Renewal offer from your current lender, if you've received one",
          "Most recent property tax bill",
          "Home insurance policy",
          "Condo status certificate or fee statement, if applicable",
        ],
      },
      {
        heading: "If you're consolidating debt",
        items: ["Recent statements for each debt being paid out (balance and account number)"],
      },
      {
        heading: "Closing",
        items: ["Void cheque or pre-authorized debit form", "Lawyer or title company details (often arranged by the lender for a straight switch)"],
      },
    ],
  },
  {
    key: "self-employed",
    title: "Self-employed",
    intro: "Business owners and freelancers need to show income differently. Bring what applies to how your business is set up.",
    groups: [
      {
        heading: "Personal",
        items: ["Two pieces of government-issued ID", "T1 General tax returns for the last two years", "Notices of Assessment for the last two years", "Proof that no income tax is owing (or a payment plan)"],
      },
      {
        heading: "Business",
        items: [
          "Articles of incorporation, business licence, or master business licence",
          "Financial statements for the last two years (if incorporated)",
          "6 to 12 months of business bank statements",
          "HST returns or filings, if registered",
          "Recent contracts or invoices showing ongoing work",
        ],
      },
      {
        heading: "Down payment and property",
        items: ["90 days of statements for down payment accounts", "Purchase agreement and MLS listing, or current mortgage statement for a refinance", "Void cheque or pre-authorized debit form"],
      },
    ],
  },
];
