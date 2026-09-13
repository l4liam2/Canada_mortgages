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
    "Chad Denie is a Toronto mortgage agent helping first-time buyers, homeowners renewing or refinancing, and real estate investors find the right mortgage with clear, honest advice.",
  // Live URL. TODO: change to the custom domain (no trailing slash) when one is set up,
  // and set basePath to "" in next.config.ts at the same time.
  url: "https://l4liam2.github.io/Canada_mortgages",
  // Founded/experience helpers
  yearsExperience: 5,
  locale: "en_CA",

  contact: {
    // TODO: confirm whether Chad wants his direct line here instead of the office line
    phone: "416-757-9957",
    phoneHref: "tel:+14167579957",
    // TODO: set to a number that receives text messages (Chad's cell). Set to "" to hide the Text buttons.
    smsHref: "sms:+14167579957",
    // TODO: replace with Chad's direct email if he has one
    email: "hello@mortgageville.ca",
    hours: "Mon to Fri, 9am to 6pm",
    serviceArea: "Toronto and the Greater Toronto Area",
  },

  offices: [
    {
      label: "Scarborough office",
      street: "1024 Kennedy Rd",
      city: "Toronto",
      province: "ON",
      postal: "M1P 2K6",
      mapUrl: "https://maps.app.goo.gl/GXSXujnrNWTeXDDW7",
    },
    {
      label: "Downtown office",
      street: "600 Sherbourne St, Suite 612",
      city: "Toronto",
      province: "ON",
      postal: "M4X 1W4",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=600+Sherbourne+St+%23612+Toronto+ON+M4X+1W4",
    },
  ],

  brokerage: {
    name: "Mortgageville Inc.",
    shortName: "Mortgageville",
    url: "https://mortgageville.ca",
    // TODO: add the FSRA brokerage licence number (required on Ontario mortgage advertising)
    licence: "#XXXXX",
  },

  // TODO: add Chad's FSRA mortgage agent licence number (format M0XXXXXXX)
  agentLicence: "M0XXXXXXX",

  links: {
    linkedin: "https://www.linkedin.com/in/chad-denie/",
    brokerageLinkedin: "https://www.linkedin.com/company/mortgageville",
    // Existing Mortgageville application portal
    apply: "https://mortgageville-inc.mtg-app.com/signup",
    // TODO: replace with Chad's Calendly (or similar) booking link
    booking: "https://calendly.com/YOUR-HANDLE/mortgage-consult",
  },

  // TODO: create a free form at https://formspree.io and paste the form ID (looks like "xabcdefg").
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
