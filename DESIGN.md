---
name: HYROX KIM
description: Bilingual Korean/English HYROX coaching site — ink, paper, and one disciplined volt yellow
colors:
  ink: "#101210"
  paper: "#ffffff"
  paper-soft: "#f7f8f3"
  grey: "#43473f"
  muted: "#83887b"
  line: "#e7e9e1"
  volt: "#ffe100"
  volt-deep: "#f5d800"
typography:
  display:
    fontFamily: "Oswald, Pretendard Variable, Pretendard, Apple SD Gothic Neo, sans-serif"
    fontSize: "clamp(44px, 7.8vw, 88px)"
    fontWeight: 200
    lineHeight: 1.02
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Oswald, Pretendard Variable, Pretendard, Apple SD Gothic Neo, sans-serif"
    fontSize: "clamp(30px, 5vw, 52px)"
    fontWeight: 300
    lineHeight: 1.1
  title:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, Segoe UI, Roboto, Malgun Gothic, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.22em"
rounded:
  card: "20px"
  pill: "999px"
spacing:
  section-y: "clamp(72px, 11vw, 132px)"
  content-width: "1120px"
  narrow-width: "760px"
components:
  button-primary:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 44px"
  button-primary-hover:
    backgroundColor: "{colors.volt-deep}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 44px"
  card:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "30px 26px 34px"
---

# Design System: HYROX KIM

## Overview

**Creative North Star: "The Split"**

The system is built on one hard-edged division: ink versus paper. The cover is solid `--ink`, everything below it is `--paper`, and the seam between them is abrupt — no gradient, no grey band. That same cut reappears at the mark level as the −18° skewed slash in the wordmark, the eyebrow dash, the card number tags, and the offer badges: one consistent diagonal cut used everywhere something needs to be flagged or divided. Volt yellow is the only color allowed to cross the ink/paper boundary and mean the same thing on both sides — action, signal, the number.

The voice is restrained and technical rather than loud. Type runs light (Oswald 200 at display size, ramping up to 400 as it shrinks — a hairline face needs mass back at small sizes) so scale carries the energy instead of weight or color. Color is rationed: ink, paper, and one yellow, used with discipline rather than decoration. The one deliberate exception is the hero's primary CTA, which is lit — cast shadow, color bloom, a slow breathing glow — a single moment of warmth against an otherwise flat, quiet system, reserved for the one action the page most wants taken.

Rejected directions inform the boundary as much as what shipped: heavy display faces (Black Han Sans, Anton + Gothic A1 900) were tried and rejected as too blocky for this voice; any gradient fade between the ink cover and the paper body was rejected three times running because the grey band it produces reads as indecisive, not premium.

**Key Characteristics:**
- Two-tone base (ink/paper) with volt as the only accent, used sparingly and consistently
- Condensed-light display type (Oswald 200→400 weight ramp) paired with Pretendard for Korean parity
- The −18° skew as the one recurring geometric signature, applied to marks, tags, and badges — never to body content
- Flat surfaces everywhere except the hero's primary CTA, which is the system's one lit, breathing element
- Hard edges between color fields; no gradients, ever, between ink and paper

## Colors

Two neutrals and one accent, rationed on purpose — not a five-role Material palette.

### Primary
- **Volt** (`#ffe100`): the one accent. CTAs, the slash mark, badges, tags, focus/selection state, and the em-highlight on headline words. Used against both ink and paper; never diluted, never used decoratively.
- **Volt Deep** (`#f5d800`): the pressed/hover state for volt surfaces — same hue, pulled down in lightness, not a different color.

### Neutral
- **Ink** (`#101210`): the dark field. Hero cover, offers panel background, primary body text on paper.
- **Paper** (`#ffffff`): the base background below the cover.
- **Paper Soft** (`#f7f8f3`): off-white for card surfaces sitting on paper, so cards read as a distinct plane without a border-only trick.
- **Grey** (`#43473f`): secondary body text (card copy).
- **Muted** (`#83887b`): tertiary text — eyebrows, captions, English sub-labels.
- **Line** (`#e7e9e1`): hairline borders and dividers on the paper side.

### Named Rules
**The One Split Rule.** Only two background fields exist anywhere on the site — ink and paper — and the transition between them is always a hard edge, never a gradient. If a section needs to feel distinct without leaving ink or paper, it uses paper-soft or a bordered panel, not a third background color.

**The Volt Crossing Rule.** Volt is the only color used identically on both the ink side and the paper side of the site. Every other color is scoped to one field (grey/muted/line exist only on paper; the offers panel's off-white text exists only on ink).

## Typography

**Display Font:** Oswald (with Pretendard Variable, Apple SD Gothic Neo fallback for Korean)
**Body Font:** Pretendard Variable (with system sans fallback)
**Wordmark-only Font:** Anton — lives only inside the logo SVG, never in running type

**Character:** A hairline condensed sans carrying the Latin voice, matched on weight and airiness (not width — Korean has no true condensed counterpart) by light-weight Pretendard. The pairing reads technical and unshouty; mass returns as size drops so nothing goes illegible at small weights.

### Hierarchy
- **Display** (weight 200, `clamp(44px, 7.8vw, 88px)`, line-height 1.02): the hero headline only. Uppercase, letter-spacing near zero.
- **Headline** (weight 300, `clamp(30px, 5vw, 52px)`, line-height 1.1): section titles (Method, Offers, etc). Uppercase.
- **Title** (weight 600, 20px): card and component headings, set in the body face, not the display face.
- **Body** (weight 400, 16px, line-height 1.65): running copy. `word-break: keep-all` on Korean text to avoid mid-word wraps.
- **Label** (weight 500, 12px, letter-spacing 0.22em, uppercase): eyebrows and kickers.

### Named Rules
**The Weight Ramp Rule.** Display type gets lighter as it gets bigger: 200 at hero scale, 300 at section-headline scale, 400 and up at component scale. A hairline face needs mass back as it shrinks — never use a single static weight across all display sizes.

## Layout

Content is capped at 1120px (`--w-content`) with a 760px narrow variant for prose-heavy sections, both centered with a 40px minimum side gutter (`width: min(var(--w-content), 100% - 40px)`). Section vertical rhythm is fluid: `clamp(72px, 11vw, 132px)` top and bottom, so spacing scales with viewport rather than jumping at breakpoints.

The hero is the one layout exception: full-bleed to the viewport edge, video-first, with the full 16:9 frame shown as a band on mobile (56.25vw height) rather than cropped. Grids elsewhere are conventional and responsive — 3-column card grid above 720px, 2-column offer grid above 860px, both collapsing to a single column below.

## Elevation & Depth

Refined and restrained: the system is flat at rest almost everywhere. Cards and offer panels use a hairline border (`--line` on paper, `#2a2d26` on ink) rather than shadow to separate planes; hover states on cards/offers/buttons lift with a small `translateY` rather than growing a shadow. The one deliberate departure is the hero's primary CTA, which carries a true cast shadow plus a color-matched bloom and a slow breathing glow — treated as a rare, intentional exception that marks the single action the page wants taken, not a general style available to other elements.

### Shadow Vocabulary
- **CTA lit-surface (hero primary)** (`0 10px 26px rgba(16,18,16,0.5), 0 0 24px rgba(255,225,0,0.3), inset 0 1px 0 rgba(255,255,255,0.55)`): cast shadow + color bloom + top-edge highlight, reserved for `.hero-dark .btn--volt`.
- **CTA lit-surface (hero secondary)** (`0 10px 26px rgba(16,18,16,0.5), 0 0 20px rgba(255,255,255,0.16), inset 0 1px 0 rgba(255,255,255,0.9)`): same construction, white bloom, for `.hero-dark .btn--paper`.
- **Standard button hover** (`0 10px 28px rgba(16,18,16,0.14–0.3)`): the only shadow used outside the hero — a soft lift on hover, not present at rest.

### Named Rules
**The Flat-by-Default Rule.** Every surface is flat at rest. Shadow and glow appear only on hover (buttons, generally) or as the hero primary CTA's standing, breathing exception — never as ambient decoration on cards, panels, or nav.

## Shapes

Two radius values, used consistently by role: `--radius-pill` (999px, full pill) for every button regardless of variant, and `--radius-card` (20px) for every panel — cards, offer boxes, and similar containers. Nothing uses an in-between radius. Borders are hairline (1–2px) and low-contrast, never a design statement on their own.

The skewed slash (`skewX(-18deg)`) is the one recurring non-rectangular form: the wordmark's dividing mark, the eyebrow's leading tick, card number tags, offer badges, and list-item markers all share the same −18° cut. It never appears at a different angle.

## Components

### Buttons
- **Shape:** full pill (`border-radius: 999px`), 14px/44px padding, 2px transparent border by default.
- **Primary (`.btn--volt`):** volt background, ink text. On the ink hero specifically, carries the lit-surface treatment (shadow + bloom + inset highlight) and a 3.6s breathing glow loop, gated to only run while the hero is on screen and disabled under `prefers-reduced-motion`.
- **Secondary (`.btn--paper`):** white background, ink text; same lit treatment as the primary on the hero, without the breathing loop.
- **Ink variant (`.btn--ink`):** ink background, white text; on the dark hero gets a translucent white border since an ink pill on an ink background would otherwise be invisible.
- **Ghost (`.btn--ghost`):** transparent with an ink border, for the lowest-emphasis action.
- **Hover / Focus:** `translateY(-2px)` lift plus a soft shadow on every variant; the trailing arrow (a masked SVG using `currentColor`, shared across all variants) nudges right 3px on hover.

### Cards
- **Corner Style:** 20px radius (`--radius-card`).
- **Background:** `--paper-soft` on the paper side.
- **Border:** 1px, `--line`.
- **Internal Padding:** `30px 26px 34px`.
- **Signature detail:** a skewed number tag (`.card__num`) in volt sits above the title — the split motif at component scale.

### Offer Panels (signature component)
The two-product comparison cards on the ink offers section. Off-white body text (`#f2f4ec`) on a near-black panel (`#171913`) with a 1px `#2a2d26` border, 20px radius, 38px/32px padding. A skewed volt badge (`.offer__badge`) marks the panel; list items use a small skewed volt tick instead of a bullet, keeping the split motif consistent even inside a dense list. Hovers lift 4px and brighten the border, never add a shadow — flat-by-default holds even here.

### Navigation
Plain wordmark + inline text links + one filled CTA pill, no dropdown or mega-menu; mobile collapses secondary links behind the CTA. No distinct hover underline system — links inherit the same color-shift-on-hover pattern used across the body face.

## Do's and Don'ts

### Do:
- **Do** keep volt to a single, consistent role (action + signal) — never use it as a decorative fill or a second neutral.
- **Do** use the −18° skew for any new tag, badge, or divider mark; introducing a different angle breaks the one-signature rule.
- **Do** keep display type weight inversely proportional to size — bigger type gets lighter, not heavier.
- **Do** treat the ink/paper transition as a hard edge in any new section; if two adjacent sections are both "light," differentiate with `paper-soft` + border, not a gradient.

### Don't:
- **Don't** introduce a gradient between ink and paper anywhere — rejected three times for reading as a grey band, not craft.
- **Don't** add ambient shadow or glow to cards, panels, or nav — flat-by-default is the rule; shadow is reserved for hover states and the one hero CTA exception.
- **Don't** reach for a heavy display weight (700+) at hero or headline scale — Black Han Sans and Anton+900 Gothic A1 were both tried and rejected as too blocky for this voice.
- **Don't** fake Korean condensation with a horizontal scale transform — match Latin condensation with weight/airiness in Pretendard instead.
