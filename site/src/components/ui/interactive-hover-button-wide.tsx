import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * White glass pill: label, subtext and arrow all sit in one static row
 * (no slide/hover-swap of duplicate content) — hover just lifts the pill
 * and fills it solid volt via an expanding dot underneath the content.
 * Lives on an outer, non-clipped wrapper since the button itself needs
 * overflow-hidden for the fill reveal.
 *
 * The wrapper's glow is a box-shadow, not filter:drop-shadow(). Safari has
 * a real compositing bug where a `filter` on an ancestor of an element using
 * `backdrop-filter` (the button's glass blur) silently fails to render —
 * box-shadow doesn't create that same conflict, so it stays visible there.
 */
interface InteractiveHoverButtonWideProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode;
  subtext?: React.ReactNode;
}

const InteractiveHoverButtonWide = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonWideProps
>(({ text, subtext, className, style, ...props }, ref) => {
  return (
    <span
      className="relative inline-block rounded-full"
      style={{
        boxShadow:
          "0 14px 28px rgba(16,18,16,0.12), 0 0 18px rgba(255,225,0,0.55)",
      }}
    >
      <button
        ref={ref}
        style={style}
        // iOS Safari only applies :active styles to elements with a touch
        // listener somewhere in the chain — without this, tapping never
        // shows the active state at all, so the button reads as inert.
        onTouchStart={() => {}}
        className={cn(
          "group relative flex min-w-[280px] cursor-pointer items-center justify-between gap-3 overflow-hidden whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-9 py-4 text-left text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl backdrop-saturate-150 transition-transform duration-300 [-webkit-tap-highlight-color:transparent] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] md:min-w-[340px] md:gap-4 md:px-12 md:py-6",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100"
          style={{ transformOrigin: "left center" }}
        />

        <span className="relative z-[1] flex flex-col transition-colors duration-300 group-hover:text-[var(--ink)] group-active:text-[var(--ink)]">
          <strong className="text-[15px] font-medium leading-tight md:text-[19px]">{text}</strong>
          {subtext && (
            <span
              className="text-[11px] font-normal uppercase tracking-wider md:text-[13px]"
              // opacity would dim the highlight chip's own background too —
              // color-mix only fades the inherited text color, so a nested
              // <Highlight> stays full-strength volt regardless
              style={{ color: "color-mix(in srgb, currentColor 70%, transparent)" }}
            >
              {subtext}
            </span>
          )}
        </span>
        <ArrowRight className="relative z-[1] h-4 w-4 shrink-0 transition-transform duration-300 transition-colors group-hover:translate-x-1 group-hover:text-[var(--ink)] group-active:translate-x-1 group-active:text-[var(--ink)] md:h-5 md:w-5" />
      </button>
    </span>
  );
});

InteractiveHoverButtonWide.displayName = "InteractiveHoverButtonWide";

export { InteractiveHoverButtonWide };
