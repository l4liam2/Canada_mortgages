/**
 * Brand mark: the house-and-door tile also used for the favicon
 * (artwork: favicon/warm/source/favicon-master.svg). Drawn with the site's
 * colour tokens so it stays in step with the palette in globals.css.
 */
export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <rect width="64" height="64" rx="14" className="fill-terracotta" />
      <g className="fill-cream stroke-cream" strokeWidth="2" strokeLinejoin="round">
        <path d="M32 8L56 31H50V53H14V31H8Z" />
        <rect x="42" y="14" width="6" height="12" />
      </g>
      <path
        className="fill-espresso"
        d="M28 54V40.5A1.5 1.5 0 0 1 29.5 39H34.5A1.5 1.5 0 0 1 36 40.5V54Z"
      />
    </svg>
  );
}
