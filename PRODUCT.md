# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Korean-speaking athletes preparing for HYROX races. The site is Korean-first with English alongside, so it must read naturally to a Korean audience without assuming English fluency.

**Undecided — do not assume:** whether the primary buyer is a first-time racer or an experienced racer chasing a PB. Asked 2026-07-31; the user expressed no preference. Current site copy hedges (the FAQ answers "하이록스가 처음인데 시작해도 될까요?" while the offer cards address both). Whether buyers are based in Korea or are Korean speakers abroad is also unconfirmed.

## Product Purpose

Sells two coaching products:

1. **하이록스 4주 프로그램 / HYROX 4-Week Programme** — a self-guided digital training plan, 5 sessions per week over 4 weeks (20 sessions), sold as a one-off purchase.
2. **1:1 온라인 코칭 / 1:1 Online Coaching** — personalised, ongoing remote coaching with weekly programming and feedback.

Success is a purchase or a coaching application. Both products are delivered fully online.

## Positioning

The user's own words for the offer, written by them and therefore binding as claim language: *"맞춤형 근거 기반 코칭을 통해 목표를 달성하고, PB를 경신하며, 한계를 극복할 수 있도록 돕습니다."* — personalised, evidence-based coaching toward goals, PBs, and pushing past limits.

**Undecided — do not assume:** the specific mechanism that makes this evidence-based and hard for a competitor to copy. Asked 2026-07-31; no preference given. Candidates observed in the repo but **not confirmed as part of the client offer**: wearable/Garmin data integration (see Operating Context), the coach's own race experience, Korean-language specialisation. Until confirmed, "근거 기반" should not be expanded into specific claims about methodology, data sources, or systems.

## Operating Context

- Clients train in commercial gyms that may lack full HYROX equipment; the programme therefore ships substitutions for stations (SkiErg, sled, etc.).
- Enquiries and applications currently arrive by email; there is no CRM, backend, or database.

## Capabilities and Constraints

- **Stack:** plain static HTML, CSS and vanilla JS in `site/`. No build step, no framework, no package.json, no backend. Local preview via `python3 -m http.server 4173 --directory site` (see `.claude/launch.json`).
- **Forms are mailto-based.** The coaching application in `site/coaching.html` composes a pre-filled email via `script.js` rather than posting to a server. Same for programme purchase enquiries.
- **Contact address:** j15611943893@gmail.com — currently the only channel on the site.
- **Bilingual requirement:** every user-facing surface carries Korean and English. Korean leads in body content; the hero tagline is the deliberate exception (see Brand Commitments).
- **Not yet decided:** programme price (`₩99,000` currently in `site/program.html` is a placeholder written by Claude, not a real price); payment method or checkout link; social/Instagram links; whether the site will be deployed and where.

## Brand Commitments

- **Name:** HYROX KIM. Wordmark defined in `hyrox-kim-logo-final.html`; the user selected the white-background, black-and-yellow colourway.
- **Tagline, both languages, fixed wording:**
  - 훈련은 더 똑똑하게. / 레이스는 더 강하게.
  - Train Smarter. / Race Stronger.
- **Tagline hierarchy is a user instruction:** English renders larger than Korean, and both smaller than the original build. Elsewhere on the site Korean leads.
- **Hero is video-first on a dark ground**, by explicit user instruction: the training footage opens the page, blended into the background rather than boxed in a card, with no label or badge over it.
- **The footage is never cropped on mobile** (user instruction, 2026-07-31). Below 760px the hero shows the complete 16:9 frame as a band across the top — landscape, "Instagram horizontal" proportions — and the copy runs directly beneath it rather than sitting at the bottom of a tall hero. Above 760px the desktop full-bleed cover treatment stands. Source is 960×540, so the band height is exactly 56.25vw.
- **Colour:** ink `#101210`, volt yellow `#FFE100`, paper `#F7F8F3`, white background. The skewed slash from the logo is the recurring identity motif.
- **Typography — condensed-light display voice, site-wide** (user instruction, 2026-07-31, given as a reference image of a hairline condensed sans: "i want my english fonts to be like this and let the korean match… cleaner fresher"). `--font-display` is **Oswald** for Latin, falling through to **Pretendard** for Korean. Pretendard is also the body face, so the whole site runs on two families plus Anton.
  - **Anton is now used only inside the wordmark SVG.** It must stay in the font link or the logo falls back to Impact. Gothic A1 has been removed entirely.
  - Korean has no true condensed counterpart to Oswald, so it matches on **weight and airiness**, not width. Pretendard 200–300 was chosen over Gothic A1 and Noto Sans KR after rendering all three side by side — it is the narrowest and cleanest of the light Korean faces. Do not fake condensation with a horizontal scale transform.
  - **Weight ramp: 200 for the largest display, 300 for mid, 400 for small.** A hairline face needs mass back as it shrinks. Body-font headings were rebalanced down to 500–600 to sit under it.
  - History: the user rejected Black Han Sans as too blocky, then Anton + Gothic A1 900 as not fresh enough. The direction has moved decisively light — do not reintroduce heavy display faces.
- **Hero CTAs: volt pill first, white pill second** (user instruction, 2026-07-31, superseding an earlier black/white pairing). **1:1 코칭 is the primary** — volt bubble, listed first — and 하이록스 프로그램 is the white bubble below it. The final CTA block was realigned to match, so the same action is never coloured two different ways on one page. Pills, not slabs: `--radius-pill`.
- **The CTAs are lit, not flat.** Each carries a cast shadow for depth, a colour-matched bloom for the glow, and a hairline inset on the top edge. The volt button also breathes on a 3.6s loop — the only looping animation on the site. It is gated on `.hero-dark.is-onscreen` (toggled by `script.js`) and disabled under `prefers-reduced-motion`; keep both gates.
- **The headline is all white** — no volt accent words. `h1 em` inherits colour; the accent is a **thin volt underline** on `Smarter.` / `Stronger.` instead, drawn left to right on reveal (`scaleX`, 0.62s). Chosen from a 5-way comparison (`site/_highlight.html`, still on disk) of yellow-text / underline / tilted-underline / highlighter-box / text+underline — the user picked the plain underline.
  - **The underline offset is per-line, not a single value** (`--uy` on `.hero-dark h1 .line`, 0.08em on line 1 / 0.19em on line 2). "Smarter." ends on a period with no real descender; "Stronger." ends on a 'g' with a true descender. At this line-height the two rows sit almost flush, so one blanket offset calibrated for the descender plows the mark through the row below when reused on the non-descender word. Measured against actual glyph ink (canvas `actualBoundingBoxDescent`), not eyeballed. If the headline copy ever changes, re-derive these per word.
- **The whole cover page is solid ink, and it ends on a hard edge.** Everything above the Method section — video, headline, CTAs, closing line — sits on `--ink`, then white begins abruptly at Method. The user's reason: the black "connects more natural to video", since the video's darkened foot and the ground below it are the same black and the footage reads as part of the panel rather than a picture pasted on a page.
  - Three softer treatments were built and all three rejected: a long ink→grey→white ramp, a short one, and a mid-hero turn to white with the CTAs on the light side. Any ramp from the dark hero to white travels through grey, and that grey band is what the user objected to — twice, in the same words. **Do not reintroduce a fade at the hero's foot, and do not turn the cover white before the Method section.**
  - Consequence to preserve: the black CTA pill carries a translucent white border at every width, because a black pill on black is otherwise invisible.
- **The positioning sentence sits below the CTAs**, separated by a hairline and set as a quiet caption, not as a lede above the buttons.
- **Stated aesthetic direction:** white background, black and dark-grey type, generous whitespace, minimal and premium, rounded buttons and cards, mobile-first — referenced against Nike, Apple and WHOOP.

## Evidence on Hand

**Real assets:**
- `hyrox-kim-logo-final.html` — the finished logo system with colourways and palette.
- `site/assets/training.mp4` — race footage shot at HYROX Cardiff (540p, compressed from `~/Desktop/287A1458_17.mov`).
- `~/Desktop/HYROX 4-Week Program.docx` and `.pdf` — a real, written 4-week programme. The product exists; the site currently only describes it.

**Absences that future work must not fabricate:**
- No confirmed coach credentials, certifications, qualifications or coaching history.
- No confirmed race results, finish times or placings.
- No testimonials, client results, or case studies.
- No confirmed athlete count, years of experience, or coaching volume.

⚠️ **Known integrity issue as of 2026-07-31.** The "Coach Kim" section of `site/index.html` currently contains claims Claude wrote as placeholders, not facts the user supplied: the line "선수로 뛰고, 코치로 증명합니다", the assertion of combining personal race experience with data-driven training, and a three-item stat row (`HYROX 레이스 완주 경험` / `1:1 맞춤 프로그램 설계` / `KR·EN 바이링궐 코칭`). These were asked about on 2026-07-31 and not confirmed. They must be replaced with real facts or removed before the site is published.

## Motion

**Only the English headline has its own motion.** `Train Smarter.` / `Race Stronger.` slide in from the left — `translateX(-clamp(34px, 7vw, 96px))` → `none`, transform 0.8s `cubic-bezier(0.16, 1, 0.3, 1)`, opacity 0.42s so the type reads as arriving rather than ghosting, with the two lines 60ms apart. Everything else on the site, including the Korean tagline directly beneath it, uses the ordinary fade-and-rise reveal.

**Rejected, do not revive:** a `clip-path` wipe raked to the wordmark's −18° slash, applied first to the headline and then extended to the Korean tagline with a hand-authored six-step cover sequence. The user disliked it and asked specifically for a plain left-to-right slide on the English headline alone. "Just the headline" is the operative constraint — resist re-choreographing the whole cover.

Supporting motion is limited to feedback (button glow, arrow nudge) and the single CTA glow pulse, which stays gated on `.hero-dark.is-onscreen`.

All of it must survive `prefers-reduced-motion: reduce`, and nothing may hide content when JS fails — reveal styles stay behind the `html.js` gate.

## Product Principles

1. **Korean-first, genuinely bilingual.** English supports comprehension and brand tone; it never carries information Korean readers would miss.
2. **Two doors, clearly separated.** A self-guided product and a premium 1:1 service have different buyers and must not blur into one offer.
3. **Claim only what is verified.** This is a real person's coaching business — credentials, results and methodology claims come from the user, never from inference.
4. **The race is the subject.** Design and copy draw on HYROX's actual structure (8 stations, 8×1km runs, compromised running) rather than generic fitness language.
5. **No backend until one is needed.** Static delivery and mailto flows are a deliberate constraint, not a gap to be engineered around unasked.

## Accessibility & Inclusion

No product-specific requirement has been established with the user. The existing build targets a general quality floor: keyboard focus is visible, `prefers-reduced-motion` is respected for scroll reveals and the hero video, and Korean text uses `word-break: keep-all` to avoid mid-word wrapping.
