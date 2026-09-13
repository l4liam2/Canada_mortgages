/** Slow, continuous strip of items. Pure CSS; pauses on hover and wraps statically when motion is reduced. */
export function Marquee({ items, durationSeconds = 70 }: { items: string[]; durationSeconds?: number }) {
  const row = (ariaHidden: boolean) => (
    <ul aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={`${ariaHidden ? "b" : "a"}-${item}`} className="flex items-center whitespace-nowrap px-5 text-sm font-medium text-ink-soft sm:px-7">
          <span aria-hidden="true" className="mr-5 h-1.5 w-1.5 rounded-full bg-terracotta/60 sm:mr-7" />
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
