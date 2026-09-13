/**
 * Lenders shown in the home page marquee. Taken from the brokerage's published lender list.
 * TODO: confirm the current list with Mortgageville before launch and trim any that don't apply.
 *
 * Adding a real logo
 * ------------------
 * Drop the artwork into `public/images/lenders/` and set `logo` to the file name
 * (e.g. `logo: "td.svg"`). The marquee then shows the logo instead of the monogram,
 * with no other code change. Guidelines for the file:
 *   - SVG preferred (PNG with transparency also works); it is scaled to fit a 96x28px box.
 *   - Trim the artwork to the mark itself — built-in padding makes the logo look small.
 *   - Use the lender's own file. Only publish logos the brokerage is licensed to display.
 * Lenders without a `logo` fall back to a monogram plate in the site's palette.
 */
export type Lender = {
  /** Full name, used as the visible label and the logo's alt text. */
  name: string;
  /** 1-4 characters shown in the monogram plate until a logo file is added. */
  abbr: string;
  /** File name inside `public/images/lenders/`, if the real logo is available. */
  logo?: string;
};

export const lenders: Lender[] = [
  { name: "TD", abbr: "TD" },
  { name: "Scotiabank", abbr: "S" },
  { name: "BMO", abbr: "BMO" },
  { name: "National Bank", abbr: "NB" },
  { name: "CWB", abbr: "CWB" },
  { name: "Desjardins", abbr: "D" },
  { name: "Meridian", abbr: "M" },
  { name: "DUCA", abbr: "DUCA" },
  { name: "First National", abbr: "FN" },
  { name: "MCAP", abbr: "MCAP" },
  { name: "CMLS", abbr: "CMLS" },
  { name: "RFA", abbr: "RFA" },
  { name: "MERIX", abbr: "MX" },
  { name: "Lendwise", abbr: "LW" },
  { name: "Strive", abbr: "ST" },
  { name: "Radius Financial", abbr: "RF" },
  { name: "Equitable Bank", abbr: "EB" },
  { name: "Home Trust", abbr: "HT" },
  { name: "Haventree Bank", abbr: "HB" },
  { name: "Community Trust", abbr: "CT" },
  { name: "Effort Trust", abbr: "ET" },
  { name: "IC Savings", abbr: "IC" },
  { name: "B2B Bank", abbr: "B2B" },
  { name: "Manulife", abbr: "ML" },
  { name: "Bridgewater Bank", abbr: "BB" },
  { name: "Wealth One", abbr: "WO" },
  { name: "Vault", abbr: "V" },
];
