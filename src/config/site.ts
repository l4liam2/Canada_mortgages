/**
 * Single source of truth for Chad's details.
 * Everything marked TODO must be filled in before launch.
 */
export type NavItem = {
  label: string;
  href: string;
  /** Pages shown as a submenu under this item (dropdown on desktop, indented in the mobile menu). */
  children?: readonly NavItem[];
};

export const site = {
  name: "Chad Denie",
  legalName: "Chad Denie, Mortgage Agent Level 2",
  title: "Mortgage Agent Level 2",
  tagline: "Mortgages explained clearly. Decisions made confidently.",
  description:
    "Chad Denie is a Toronto mortgage agent helping first-time buyers, homeowners renewing or refinancing, and real estate investors across Ontario and Canada find the right mortgage with clear, honest advice.",
  // Live URL, with no trailing slash. next.config.ts derives basePath from its path, so this is
  // the only line to change for the custom domain. TODO: switch to https://www.chaddenie.com
  // (Chad owns it) once DNS points here; see README "Custom domain".
  url: "https://l4liam2.github.io/Canada_mortgages",
  // Founded/experience helpers
  yearsExperience: 5,
  locale: "en_CA",

  // Chad confirmed "access to over 55 lenders across Canada" (email, 2026-09-23). The marquee
  // shows only the 27 named in src/content/lenders.ts, a sample of the lenders he actively uses.
  lenderNetworkCount: 55,

  // Chad's Google Business rating, shown as a badge on the home and testimonials pages.
  // Read off his profile on 2026-09-30. Update the count as new reviews come in.
  googleRating: { rating: 5, count: 24 },

  contact: {
    phone: "647-529-5680",
    phoneHref: "tel:+16475295680",
    // Chad's cell, which receives texts. Set to "" to hide the Text buttons.
    smsHref: "sms:+16475295680",
    email: "chad@mortgageville.ca",
    hours: "Mon to Fri, 8am to 8pm. Sat, 10am to 2pm",
    serviceArea: "Ontario and interprovincial Canada",
  },

  offices: [
    {
      label: "Office",
      street: "1024 Kennedy Rd",
      city: "Toronto",
      province: "ON",
      postal: "M1P 2K6",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=1024+Kennedy+Rd+Toronto+ON+M1P+2K6",
    },
  ],

  brokerage: {
    name: "Mortgageville Inc.",
    shortName: "Mortgageville",
    url: "https://mortgageville.ca",
    licence: "13693",
  },

  agentLicence: "M17000660",

  links: {
    linkedin: "https://www.linkedin.com/in/chad-denie/",
    instagram: "https://www.instagram.com/mortgagewithchad",
    facebook: "https://www.facebook.com/MortgageWithChad",
    brokerageLinkedin: "https://www.linkedin.com/company/mortgageville",
    // Chad's own application portal, so applications are credited to him
    apply:
      "https://mortgageville-chad-denie.mtg-app.com/signup?brokerId=ebc5be59-b0a7-401c-81d2-47e00cddc52c",
    // Zoho Bookings page for the free 20-minute intro call
    booking: "https://chaddenie.zohobookings.com/#/Mortgageville",
    // Where clients leave reviews (his Google Business profile).
    // TODO: swap for the direct "write a review" link from Google Business Profile > Ask for reviews.
    googleReviews: "https://www.google.com/search?q=chad+denie",
  },

  // TODO: create a free form at https://formspree.io that delivers to chad@mortgageville.ca,
  // and paste the form ID (looks like "xabcdefg").
  // Used by the contact form, the Get Started wizard, and the review form.
  formspreeId: "",
  // Optional: a second Formspree form for newsletter signups. Leave empty to hide the signup box.
  newsletterFormspreeId: "",
  // Optional: privacy-friendly analytics. Set to the site domain registered at plausible.io to enable.
  analytics: { plausibleDomain: "" },

  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    {
      label: "Resources",
      href: "/resources",
      children: [
        { label: "Calculators", href: "/calculator" },
        { label: "Guides and tools", href: "/resources#guides" },
        { label: "Checklists", href: "/resources#checklists" },
      ],
    },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] as readonly NavItem[],
  // Secondary links shown in the footer
  footerLinks: [
    { label: "Get pre-qualified", href: "/get-started" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Book a call", href: "/book" },
    { label: "FAQ", href: "/faq" },
    { label: "Glossary", href: "/glossary" },
    { label: "Renewal reminder", href: "/renewal-reminder" },
    { label: "Leave a review", href: "/review" },
    { label: "Privacy policy", href: "/privacy" },
  ],
} as const;

export type Site = typeof site;
