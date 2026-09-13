/**
 * SAMPLE TESTIMONIALS. These are placeholders written to show the layout.
 * Replace every entry with real, permission-granted client reviews before launch.
 * Ontario advertising rules require testimonials to be genuine and verifiable.
 */
export type Testimonial = {
  name: string;
  detail: string;
  quote: string;
  rating: number;
  service: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Priya and Marcus",
    detail: "First-time buyers, Scarborough",
    quote:
      "We had no idea where to start and Chad never once made us feel that way. He explained our pre-approval, what the stress test meant for us, and what closing costs to budget for. When we found our place he moved fast and kept us calm.",
    rating: 5,
    service: "First-time purchase",
  },
  {
    name: "Daniel R.",
    detail: "Renewal, East York",
    quote:
      "My bank sent a renewal letter and I almost signed it. Chad found a better rate elsewhere and the new lender covered the switch costs. It took two emails on my part.",
    rating: 5,
    service: "Renewal",
  },
  {
    name: "Samantha L.",
    detail: "Refinance, Leslieville",
    quote:
      "I wanted to consolidate debt and finish our basement. Chad ran the numbers with the penalty included and told me exactly what I would save. Honest, direct, and quick to respond.",
    rating: 5,
    service: "Refinance",
  },
  {
    name: "Ahmed K.",
    detail: "Investor, Toronto",
    quote:
      "Chad built out three scenarios for my second rental and showed me how each one affected what I could buy next. That kind of planning is why I keep sending friends his way.",
    rating: 5,
    service: "Investment property",
  },
  {
    name: "Jenna and Tom",
    detail: "First-time buyers, Pickering",
    quote:
      "He answered every question, even the ones we asked twice. Our lawyer said it was one of the cleanest files she'd seen. We're in our first home because Chad made it feel possible.",
    rating: 5,
    service: "First-time purchase",
  },
  {
    name: "Olivia M.",
    detail: "Self-employed, Midtown",
    quote:
      "As a freelancer I was told no by my bank. Chad knew which lender would understand my income and got me approved at a rate I didn't think was possible.",
    rating: 5,
    service: "Self-employed",
  },
];
