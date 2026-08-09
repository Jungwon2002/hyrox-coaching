/*
 * Skewed volt slab behind ink text — the site's one recurring "highlight"
 * motif (same construction as the Coach heading's mark and the hero lede's
 * em). Text stays ink regardless of the parent's hover/rest color so it
 * never disappears when a button fills volt on hover.
 */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    // em-based inset (not fixed px) so the slab scales with whatever font
    // size it's dropped into instead of ballooning at small sizes like a
    // button's subtext line; the margin guarantees breathing room from
    // neighbouring words instead of relying on a literal space surviving
    // JSX whitespace collapsing
    <span className="relative inline-block mx-[0.22em]">
      <span
        aria-hidden="true"
        className="absolute z-0 -skew-x-8 bg-[var(--volt)]"
        style={{ inset: "0.08em -0.18em 0.04em -0.18em" }}
      />
      <span className="relative z-10 text-[var(--ink)]">{children}</span>
    </span>
  );
}
