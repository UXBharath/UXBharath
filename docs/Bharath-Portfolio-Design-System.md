# Bharath Portfolio — Design System

**Version 1.10 · Lead UX & Product Designer portfolio · WCAG 2.2 AA**
Extracted from the live HTML/CSS. Every value below is what the page uses today. v1.1 brings the page to WCAG 2.2 AA **without changing the colour palette**: only colour pairings, a few sizes, states and semantics were adjusted (see §2.4 and §10). v1.2 adds the case-study evidence components and the Experience timeline (§7.17 to §7.22) and the rules for hidden content (§8.5). v1.3 sets one heading hierarchy (§3.2, §3.3): on web, section and project headings are 60% of their former size; tablet and mobile are unchanged. v1.4 makes the hover fill of every pill yellow (§2.2, §8.3). v1.5 sets the footer apart from the page with the inverted strip (§7.16). v1.6 documents the project folder structure (§11.5): the site is now split into HTML, CSS, JavaScript and image files. v1.7 slims each project card to its essentials (Option B, §8.1) and requires the text to be copied word for word from the linked case study (§8.4). v1.8 makes the hero portrait a plain, static photo: the upload control, its placeholder and its script are removed (§7.15). v1.10 points the MBCS card at the final case-study prototype, so both case-study links are Figma prototype links again (§8.1). Items marked **⚠ Recommendation** are optional suggestions, not current behaviour.

---

## Contents

1. [Design principles](#1-design-principles)
2. [Color](#2-color)
3. [Typography](#3-typography)
4. [Layout, spacing and shape](#4-layout-spacing-and-shape)
5. [Elevation and borders](#5-elevation-and-borders)
6. [Motion](#6-motion)
7. [Components](#7-components)
8. [Patterns](#8-patterns)
9. [Responsive behaviour](#9-responsive-behaviour)
10. [Accessibility](#10-accessibility)
11. [Implementation](#11-implementation)

---

## 1. Design principles

The visual language is a warm, editorial, **neo-brutalist** system: flat colour, thick ink outlines, hard offset shadows and oversized condensed type. It is playful on the surface but organised underneath.

| Principle | What it means in the UI |
|---|---|
| **Ink-led** | One dark "ink" colour carries all text, borders and shadows. It flips to cream in dark mode, so the system works with one set of rules. |
| **Flat and hard-edged** | No blurred shadows. Depth comes from outlines and solid offset shadows (`6px 6px 0`). |
| **Loud type, quiet body** | Uppercase Kanit headlines at large sizes; Poppins at normal weights for reading. |
| **Accent with intent** | Coral marks emphasis and interaction. Yellow marks highlights, badges and callouts. |
| **Motion rewards attention** | Hover, scroll and open states animate. Ambient loops are slow and low-amplitude. All motion switches off for users who prefer reduced motion. |
| **Problem before screen** | Content is structured as decisions: Problem → What I did → Decisions → Trade-offs → Edge cases → Outcome. |

---

## 2. Color

### 2.1 Core tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#FAF5EA` | `#0E1633` | Page background |
| `--ink` | `#14204A` | `#F6EFE0` | Text, borders, hard shadows, inverted surfaces |
| `--card` | `#FFFDF7` | `#17214A` | Raised card surface (skill, project) |
| `--lav` | `#E4D8EA` | `#2A2F5C` | Secondary surface (info boxes, photo frame) |
| `--muted` | `#4A5378` | `#B9BFDB` | Secondary text, labels, footer |
| `--coral` | `#F0524F` | `#F0524F` | Primary accent: emphasis, hover, active, markers |
| `--yellow` | `#F6C550` | `#F6C550` | Highlight: primary button, eyebrow, callouts, ticker dots |
| `--red` | `#E0403C` | `#E0403C` | Decorative only (hero block) |
| `--teal` | `#256F6A` | `#256F6A` | Decorative only (hero block) |

Notes
- Coral, yellow, red and teal do **not** change between themes. Only the five neutrals (`bg`, `ink`, `card`, `lav`, `muted`) switch.
- Text placed on yellow is always fixed `#14204A`, in both themes, so the badge stays legible when `--ink` becomes cream.
- Text placed on coral is fixed ink `#14204A` (4.51:1), never white (white on coral is only 3.49:1).

### 2.2 Semantic usage

| Purpose | Colour |
|---|---|
| Body text | `--ink` |
| Secondary text, captions, tags, stat labels | `--muted` |
| Headline emphasis (`<em>`, hero accent word, section numbers) | `--coral` |
| Primary CTA fill | `--yellow` with `#14204A` text |
| Secondary CTA | transparent, `2px solid --ink` |
| **Pill hover fill** | `--yellow` with ink `#14204A` text. Every pill follows this: contact pills, step chips, Theme toggle, pause button, screenshot CTA |
| Hover accent (borders, underlines, icon and text colour) | `--coral` |
| Info panel | `--lav` with `6px` coral left border |
| Callout / key takeaway | `--yellow` with `#14204A` text |
| Inverted strip (ticker, step chips, footer) | `--ink` background, `--bg` text |
| Scroll progress | gradient `--coral → --yellow` |
| Cursor glow | `rgba(246,197,80,.28)` radial, i.e. yellow at 28% |

### 2.3 Theme behaviour

1. Default follows the system (`prefers-color-scheme`).
2. The **Theme** button sets `data-theme="light|dark"` on `<html>`, which overrides the system choice for the session.
3. The choice is held in memory only; it resets on reload.
4. The Theme button exposes the state with `aria-pressed` (true = dark). Role token `--box-title` switches with the theme: ink in light, coral in dark.

### 2.4 Contrast rules (WCAG 2.2 AA, verified)

Normal text needs 4.5:1; large text (≥24px, or ≥18.66px bold) needs 3:1; icons and UI boundaries need 3:1. The palette is unchanged; these rules govern which colour may sit on which.

| Rule | Why |
|---|---|
| **Coral text only at large size** (≥18.66px bold), and only on `--bg` or `--card` | Coral on cream is 3.21:1, on card 3.43:1 (light); 5.10 / 4.45 (dark) |
| **Box titles use `--box-title`**: ink in light theme, coral in dark | Coral on lavender is 2.54:1 in light, which fails at any size; it is 3.63:1 in dark, which passes for large text |
| **Text on a coral fill is always ink `#14204A`, never white** | Ink on coral is 4.51:1; white on coral was 3.49:1 |
| **Text on a yellow fill is always ink `#14204A`** | 9.75:1 in both themes |
| **Never use yellow as text on cream** | 1.48:1 |
| **Coral is fine for icons, underlines and borders** | Graphics only need 3:1 |

Verified pairs:

| Pair | Ratio | Used for |
|---|---|---|
| Ink on bg (light) | 14.46 | Body text |
| Muted on bg (light) | 6.90 | Secondary text |
| Ink on lav (light) | 11.47 | Box text and box titles |
| Ink on yellow | 9.75 | Buttons, eyebrows, callouts, pill hover fills |
| **Ink on coral** | **4.51** | Screenshot CTA at rest, open expand button |
| Bg on ink | 14.46 (light), 15.53 (dark) | Ticker, step chips, footer |
| Coral on bg (light) | 3.21 | Large text only: h1 accent, h2 em, stats, role subtitle, contact link |
| Coral on card (light) | 3.43 | Large text only: skill titles, decision numbers, metric values, experience dates (all 20px bold or larger) |
| Ink on bg (dark) | 15.53 | Body text |
| Muted on bg (dark) | 9.77 | Secondary text |
| Coral on bg (dark) | 5.10 | All coral text |
| Coral on card (dark) | 4.45 | Large text only: skill titles |
| Coral on lav (dark) | 3.63 | Large text only: box titles |

**Margin warning:** ink on coral clears 4.5:1 by only 0.01. Do not lighten the coral, change the ink, or set coral-filled labels below 13px bold without re-checking.

---

## 3. Typography

### 3.1 Typefaces

| Role | Family | Weights | Fallback |
|---|---|---|---|
| Display / headings | **Kanit** | 800 | `Poppins, Impact, sans-serif` |
| Body / UI | **Poppins** | 400, 500, 600, 700 | `system-ui, sans-serif` |

Loaded from Google Fonts with `display=swap`. Only the weights in the table are loaded.

Every component takes its family from one of two tokens, never from a stack typed by hand:

| Token | Value |
|---|---|
| `--font-display` | `'Kanit', 'Poppins', Impact, sans-serif` |
| `--font-body` | `'Poppins', system-ui, sans-serif` |

### 3.2 Rules

- `h1`, `h2`, `h3` are **uppercase**, **Kanit 800** (the weight is explicit, never the browser's default bold), `line-height: 1`, `margin: 0`.
- **Hierarchy:** only the hero `h1` is hero-scale. On web (above 820px) section titles are 38px at most, and project and card titles are 20px. Every card-level title is the same size and weight.
- Body `line-height: 1.6`, base size 16px (browser default).
- Display text is Kanit 800 unless noted. Nothing in the system is lighter than Poppins 400.
- Negative tracking on large display text only (`-2px` on h1, `-1px` on h2, `-.5px` on menu links).

### 3.3 Type scale

| Style | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero title (h1) | Kanit | `min(128px, 100cqw / 7.5)` | 800 | **One line**: "Hi, I'm Bharath" is 7.3em wide in Kanit 800 caps, so the size is tied to the width of its column (container query units). Fallback without container queries: `clamp(34px, 6.2vw, 84px)`, or `11vw` at ≤820px. Tracking `-.02em`; accent word in coral; letters animate in individually |
| Section title (h2) | Kanit | **Web (>820px):** `clamp(21.6px, 3.6vw, 38.4px)` (60% of the former size). **Tablet and mobile (≤820px):** `clamp(36px, 6vw, 64px)` | 800 | Tracking `-1px`; `<em>` in coral; animated underline |
| Quote / callout | Kanit | `clamp(24px, 4vw, 40px)` / 1.15 | 800 | Uppercase |
| Project title (h3, card header) | Kanit | **Web:** 20px. **Tablet and mobile:** `clamp(22px, 3.4vw, 34px)` | 800 | Applies to the header only; titles inside a case study are card titles |
| Project number | Kanit | **Web:** 34px (the stat-number size). **Tablet and mobile:** 38px | 800 | Coral |
| Mobile menu link | Kanit | `clamp(34px, 10.5vw, 46px)` / 1.1 | 800 | Uppercase, tracking `-.5px` |
| Stat number | Kanit | 34px (26px mobile) | 800 | Coral |
| Ticker | Kanit | 22px | 800 | Uppercase |
| Logo | Kanit | 22px | 800 | Dot in coral |
| **Card title** (info box, skill card, decision, experience role) | Kanit | 20px at every width | 800 | Uppercase. One size everywhere, including inside case studies. Colour: `--box-title` for info boxes, coral for skill cards, ink for decision and experience titles; decision numbers are coral. At 20px bold all of these count as large text |
| Metric value | Kanit | 26px / 1.15 | 800 | Coral on `--card` (large text) |
| Experience dates | Kanit | 26px | 800 | Coral on `--card` (large text); never wraps |
| Fact label, tile label, "Why / Rejected" label | Poppins | 12px | 700 | Uppercase, `--muted`; no letter-spacing, like every other uppercase label |
| Fact value | Poppins | 14px / 1.6 | 600 | Same size as the contact row |
| Company name | Poppins | 16px | 600 | `--muted` |
| Role subtitle | Poppins | `clamp(19px, 2vw, 20px)` | 700 | Uppercase, coral; 19px minimum keeps it "large bold text" |
| Lead paragraph | Poppins | 17px (15px mobile) | 500 | `--muted`, max-width 520px |
| Body | Poppins | 16px / 1.6 | 400 | |
| Nav link | Poppins | 14px | 600 | |
| Contact row | Poppins | 14px | 600 | |
| Step chip | Poppins | 13px | 600 | |
| Footer | Poppins | 13px | 400 | `--muted` |
| Eyebrow, tag, stat label, button label (small) | Poppins | 12px | 600–700 | Uppercase for eyebrow, tag, stat label |

Headings use `overflow-wrap: anywhere`, so long words wrap instead of overflowing at 320px or under user text-spacing overrides.

---

## 4. Layout, spacing and shape

### 4.1 Page structure

| Property | Value |
|---|---|
| Max content width | `1200px`, centred |
| Section padding | `80px 5vw` (mobile: `48px 5vw`) |
| Hero | 2 columns, `1.15fr / .85fr`, gap `40px`, min-height `82vh` |
| Navigation | Sticky, `padding: 14px 5vw` (mobile: `10px 5vw`) |
| Safe areas | `env(safe-area-inset-top/bottom)` applied on `:root` and the sticky nav |

### 4.2 Grids

| Grid | Columns | Gap | Collapses to 1 column at |
|---|---|---|---|
| About | 2 equal | 34px | ≤820px |
| Skills (`.grid3`) | 3 equal | 18px | ≤820px |
| Collaboration | 2 equal | 20px | ≤820px |
| Case-study body (`.in`) | 2 equal | 16px | ≤820px |

### 4.3 Spacing values in use

There is no formal spacing scale in the CSS. These are the values it uses, grouped:

| Step | Values | Typical use |
|---|---|---|
| XS | 4, 6, 8px | Chip padding, list item gaps, icon gaps |
| S | 12, 13, 14, 16px | Button gaps, button vertical padding, grid gaps |
| M | 18, 20, 22, 24px | Card padding, accordion padding, stacking margin |
| L | 26, 28, 34px | Button horizontal padding, stat gaps, quote padding |
| XL | 40, 48, 80px | Hero gap, mobile section padding, desktop section padding |

**⚠ Recommendation:** consolidate to a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 80) when this moves into a token file.

### 4.4 Border radius

| Token (suggested) | Value | Used by |
|---|---|---|
| `radius-xs` | 2–3px | Accent bars, underlines |
| `radius-sm` | 6px | Hero decorative blocks |
| `radius-md` | 8px | Thumbnails |
| `radius-lg` | 12px | Buttons |
| `radius-xl` | 14px | Photo frame, screenshots |
| `radius-2xl` | 16px | Info boxes, skill cards |
| `radius-3xl` | 20px | Project cards, quote callout, eyebrow and chips (pill) |
| `radius-pill` | 30–50px | Screenshot CTA, icon CTA, theme toggle |
| `radius-full` | 50% | Expand button, floating circle |

### 4.5 Z-index

| Layer | Z |
|---|---|
| Cursor glow | 1 |
| Photo frame | 2 |
| Hero decorative blocks (circle, square) | 3 |
| Mobile menu overlay | 19 |
| Sticky nav (sits above the overlay so the X stays tappable) | 20 |
| Scroll progress bar | 50 |

---

## 5. Elevation and borders

The system uses **outlines and hard shadows** instead of soft blur.

### 5.1 Border widths

| Width | Used by |
|---|---|
| 2px solid `--ink` | Skill card, icon CTA, secondary button, theme toggle, thumbnails |
| 3px solid `--ink` | Project card, screenshot |
| 5–6px solid `--coral` (left edge only) | Info box accent (`6px` standard, `5px` inside case studies) |
| 6px solid `--ink` | Hero photo frame |

### 5.2 Shadows

| Context | Value |
|---|---|
| Info box hover | `6px 6px 0 var(--ink)` |
| Photo frame hover | `12px 12px 0 var(--coral)` |
| Button hover | `0 2.5px 0 -.5px var(--coral)` |

There are no blurred drop shadows. The only blur in the system is `backdrop-filter` on the nav (`blur(8px)`) and the mobile menu (`blur(24px) saturate(180%)`).

---

## 6. Motion

### 6.1 Durations

| Duration | Used for |
|---|---|
| 200ms | Project card transform, hero letter hover, menu item exit |
| 250ms | Buttons, step chips, icon CTA, parallax blocks |
| 300ms | Skill card, info box, nav underline, screenshot CTA, cursor glow, nav background |
| 350ms | Expand icon, thumbnail, mobile menu fade |
| 450ms | Accordion open (grid-rows) |
| 500ms | Screenshot zoom, hamburger → X, menu items fade in |
| 600ms | Photo zoom, ripple, case-study children, menu items slide in |
| 700ms | Scroll reveal, hero letter entrance |
| 800–900ms | Screenshot image zoom, shine sweep, section underline |

### 6.2 Easing

| Curve | Used for |
|---|---|
| `ease`, `ease-out` | Default hover and reveal transitions |
| `cubic-bezier(.2, .9, .3, 1.3)` | Hero letters (slight overshoot, playful) |
| `cubic-bezier(.32, .08, .24, 1)` | Hamburger ↔ X (Apple-style) |
| `cubic-bezier(.2, .8, .2, 1)` | Mobile menu item slide-in |
| `linear` | Ticker marquee |

### 6.3 Ambient loops

| Animation | Spec |
|---|---|
| Ticker marquee | 26s linear, infinite, `translateX(-50%)` |
| Floating hero blocks | 5s / 6s / 7.5s / 8s, ease-in-out, alternate; ±8–10px vertical, −3° to 4° rotation |

### 6.4 Staggering

| Where | Stagger |
|---|---|
| Case-study body children | 0.1s, 0.18s, 0.26s, 0.34s, 0.42s, 0.5s |
| Skill cards and stats | 0.1s per item |
| Mobile menu links | `0.1s + 0.05s × index` |
| Hero letters | `0.35s × word + 0.05s × letter` |

### 6.5 Scripted interactions

| Behaviour | Spec |
|---|---|
| Scroll reveal | `IntersectionObserver`, threshold `0.08`; element fades up `34px` over `0.7s`, then stops observing |
| Count-up stats | Counts to `data-n` over about 900ms |
| Magnetic buttons | Button shifts toward the cursor by `3.75%` horizontally and `6.25%` vertically of the offset from centre |
| Click ripple | White 35%, 60px circle, scales to 2× and fades over 600ms |
| Project card tilt | Mouse only; `perspective(900px)` with ±0.3° rotation (30% of the original ±1°) |
| Photo 3D tilt | Mouse only; `perspective(700px)`, ±5° Y rotation |
| Hero parallax | Decorative blocks move with the pointer by their `data-d` amount (px) |
| Cursor glow | 340px radial yellow, follows the mouse; hidden on touch and ≤820px |
| Scroll progress | 4px bar at the top of the viewport; width tracks scroll percentage |

### 6.6 Reduced motion

`@media (prefers-reduced-motion: reduce)` disables **all** animations and transitions and forces scroll-reveal elements to be visible. Any new motion must respect this.

### 6.7 Pause control

The ticker and floating hero blocks loop for longer than 5 seconds, so the nav has a **Pause animations** button (WCAG 2.2.2). It sets `data-motion="paused"` on `<html>`, which pauses both (`animation-play-state: paused`) and switches the icon and label to "Play animations". Any new looping animation must be added to that selector.

### 6.8 Motion intensity levels

Interaction intensity is set per component family, as a share of the original effect. New effects in a family must stay within its level.

| Family | Level | Examples |
|---|---|---|
| Project cards | **30%** | Tilt ±0.3°; thumbnail 1.045 / −0.9°; number wobble 1.075; entrance 7px / 0.6°; cover zoom 1.015; CTA slide 2.4px |
| CTA buttons | **50%** | Lift 1px; tilt 0.25°; shadow 2.5px; magnetic pull 3.75% / 6.25% |
| Everything else | 100% | Skill cards, info boxes, step chips, icon CTAs, photo frame |

Durations and easing (§6.1, §6.2) are unchanged at every level. The expand button's 45° turn is a state indicator, not decoration, so it stays at full size.

---

## 7. Components

### 7.1 Navigation (desktop)

| Part | Spec |
|---|---|
| Container | Sticky; `--bg` at 88% opacity with `blur(8px)` |
| Logo | Kanit 800, 22px; "BHARATH" + coral full stop |
| Links | Projects · Experience · About · Approach · Collaboration · Contact. Poppins 600, 14px, gap 26px; 2px coral underline grows from 0 → 100% width in 0.3s on hover |
| Theme toggle | Pill, `2px solid --ink`, `padding: 4px 12px`, Poppins 600 12px. `aria-pressed` reflects dark mode; accessible name "Dark theme". Hover: yellow fill, ink text |
| Pause animations | 32px circle, `2px solid --ink`, pause/play icon. Stops the ticker and floating blocks (WCAG 2.2.2). Sits beside the Theme toggle in `.nav-tools`. Hover: yellow fill, ink icon |
| Skip link | First tab stop; hidden off-screen until focused, then ink pill at top-left |

### 7.2 Navigation (mobile ≤820px) — Apple-style menu

| Part | Spec |
|---|---|
| Bar | Logo left; Theme button and hamburger right |
| Hamburger | 44×44px target, two 18×2px lines 7px apart; rotate ±45° into an X over 0.5s |
| Overlay | Full screen, `--bg` at 96% with `blur(24px) saturate(180%)`; fades in over 0.35s |
| Links | Kanit 800, `clamp(34px, 10.5vw, 46px)`, uppercase; stagger in from −12px, ending at 0 |
| Scroll | Page scroll is locked while open; overlay scrolls independently |
| Close | Tap X, tap a link, press Esc, or resize past 820px |
| A11y | Button label toggles "Open menu" / "Close menu"; `aria-expanded` and `aria-controls` set; overlay is `role="navigation"` labelled "Mobile" and `visibility: hidden` when closed. While open, `<main>`, footer and ticker are `inert`; focus moves to the first link, returns to the button on Esc, and lands on the target section after a link tap |

### 7.3 Buttons

| Variant | Class | Spec |
|---|---|---|
| Primary | `.btn.y` | Yellow fill, `#14204A` text |
| Secondary | `.btn.o` | Transparent, `2px solid --ink` |
| Base | `.btn` | `padding: 13px 26px`, radius 12px, Poppins 700, `overflow: hidden` for ripple |
| Hover | | `translateY(-1px) rotate(-.25deg)`, shadow `0 2.5px 0 -.5px coral`, plus magnetic pull. Keyboard focus shows a 3px ink outline |
| Click | | White ripple from the click point |

### 7.4 Icon CTA (contact pills)

Card-colour pill, `2px solid --ink`, radius 50px, `padding: 12px 22px`, 22px icon, Poppins 700.
Hover and keyboard focus: **yellow fill**, ink text, `translateY(-4px) scale(1.04)`.

### 7.5 Screenshot CTA ("View full case study ↗")

Coral pill pinned bottom-right of a screenshot (`14px` inset); Poppins 700, 13px, **ink text** (4.51:1), radius 30px.
On mouse devices it is hidden until hover or keyboard focus (`opacity: 0`, `translateY(2.4px)`). On touch devices (`hover: none`) it is always visible. Hovering the pill itself turns it yellow (ink text). The image zooms to `1.015` and a diagonal "shine" (white at 10.5%) sweeps across (0.9s).

### 7.6 Eyebrow label

Yellow pill, `#14204A` text, Poppins 700 12px uppercase, `padding: 4px 12px`, radius 20px. Sits above every section title.

### 7.7 Section heading

h2 with a coral `<em>` for the emphasised phrase (sizes in §3.3: 21.6–38.4px on web, 36–64px at ≤820px), and a 5px coral underline bar that animates from 0 to 90px (0.9s, 0.3s delay) when the section enters view.

### 7.8 Info box

| Property | Value |
|---|---|
| Background | `--lav` |
| Padding / radius | 24px / 16px |
| Accent | 6px coral left border |
| Title | Kanit 20px coral |
| Hover | `translateY(-4px)` and `6px 6px 0 --ink` shadow |
| Wide variant (`.wide`) | Spans full width, yellow fill, ink title |

### 7.9 Skill card

`--card` background, `2px solid --ink`, radius 16px, padding 20px, Kanit 20px coral title (the card-title size, §3.3).
Hover: `translateY(-6px) rotate(-1deg)`.

### 7.10 Project accordion

| Part | Spec |
|---|---|
| Container | `--card`, `3px solid --ink`, radius 20px, 22px stacking margin |
| Header | Flex row, 24px padding: number (Kanit 34px coral on web, 38px at ≤820px) · title + tag · thumbnail (hidden ≤820px) · expand button |
| Expand button | A real `<button>` (42px yellow circle, "+"). `aria-expanded` and `aria-controls` are set; Enter/Space work. Rotates 45° and turns coral with ink "×" when open. Clicking anywhere on the header also toggles |
| Header hover | Number wobbles (scale 1.075 → 0.985, rotation −1.8° → 0.9°); thumbnail scales to 1.045 and tilts −0.9° |
| Body | Animated via `grid-template-rows: 0fr → 1fr` over 0.45s. Collapsed panels are `visibility: hidden`, so their links cannot be tabbed to or read |
| Content order | Screenshot → Problem → What I did → Design decisions → Trade-offs → Edge cases → Outcome & learning (wide, yellow) → CTA |
| Child entrance | Each child fades up 7px with a 0.6° rotation, staggered |

### 7.11 Step chips

Ink pill, `--bg` text, Poppins 600 13px, padding `6px 14px`. Used for process flows (Discover → Explore → Reject → Trade-off → Learn). Hover: `translateY(-4px) scale(1.08)`, **yellow fill**, ink text.

### 7.12 Quote / callout

Yellow block, radius 20px, padding 34px, Kanit 800 uppercase, size `clamp(24px, 4vw, 40px)`. Text colour fixed `#14204A`.

### 7.13 Stats

Row of numbers (Kanit 34px coral) over 12px uppercase muted labels; 28px gap (18px mobile); numbers count up on load.

### 7.14 Ticker

Full-bleed ink strip, `padding: 14px 0`, Kanit 22px uppercase in `--bg`; yellow "●" separators with 22px margins. `aria-hidden="true"` because it duplicates page content.

### 7.15 Hero photo frame

4:5 aspect, max-width 440px. Lavender fill, 6px ink border, radius 14px. Image zooms to 1.06 on hover and the frame gains a `12px 12px 0 coral` shadow. Four floating decorative blocks (red, ink, yellow circle, teal) orbit it. The portrait is a **static photo**: a plain `<div>` with an `<img>` that has descriptive `alt` text. It is not a control, so there is no upload, no placeholder and no pointer cursor; visitors never add or change the picture. To change the portrait, replace `assets/img/bharath-portrait.jpg`.

### 7.16 Footer

Full-bleed **inverted strip**, the same treatment as the ticker (§7.14), so the page ends on a clearly separate band: `--ink` background, `--bg` text, centred, 30px padding, Poppins 13px. On notched phones the strip extends under the bottom safe area (the safe-area inset is added to its bottom padding).

### 7.17 Case-study header (`.case-top`)

Two columns inside the case-study grid: the **cover** on the left (1.1fr) and the **Project facts** card on the right (1fr), 16px gap. At ≤820px they stack.

| Part | Spec |
|---|---|
| Cover | Existing screenshot component (`.shot`: 3px ink border, 14px radius). In this header it is shown **uncropped**: `object-fit: contain`, `max-height: 560px`. Hover zooms to 1.015, the project-card level (§6.8) |
| Cover CTA | The "View full case study ↗" pill (§7.5) |
| Alt text | Describes the cover and what it shows, not just the project name |

### 7.18 Project facts (`.facts`)

A card of label/value rows that answers the recruiter's first questions: role, duration, platform, industry, team, goal, tools, status.

| Part | Spec |
|---|---|
| Container | `--card`, `2px solid --ink`, radius 16px, padding `6px 20px` |
| Row | 2 columns (`96px` label, 1fr value; `84px` at ≤820px), gap 12px, padding `12px 0`; rows are divided by `2px solid --lav` |
| Label (`dt`) | Poppins 700 12px uppercase, `--muted` |
| Value (`dd`) | Poppins 600 14px / 1.6, `--ink` |
| Source | **Labels and values are copied word for word from the case study's own header or Project Brief.** Labels can therefore differ between projects (for example "Duration" and "Timeline") |
| Empty rows | A row whose value is empty is hidden (`:has(dd:empty)`). Use this for facts still to be confirmed (for example **Status**), so nothing reads "TBD" on a live page |

### 7.19 Decision list (`.dec`)

The page shows **one key decision per project**, as a numbered card. The remaining decisions live in the full case study.

| Part | Spec |
|---|---|
| Container | Inside a full-width info box (`.box.full`) titled "Key decision" |
| Item | `--card`, `2px solid --ink`, radius 14px, padding `14px 16px` |
| Title | Kanit 800 20px / 1.2 uppercase, ink; the number is a coral `::before` (`01`). `.dec.nonum` removes the number |
| Rows | Body text (16px), each with a small label (§3.3) |
| Source | **The title, the labels and the text are copied word for word from the case study.** The labels are the case study's own section names, for example "Why it mattered", "The decision" and "Result" (MBCS) or "Context" and "The solution" (Goibibo) |

### 7.20 Metric tiles (`.metrics`, `.tile`)

A full-width info box holding 3 or 4 tiles in a responsive grid (`repeat(auto-fit, minmax(150px, 1fr))`, gap 12px).

| Part | Spec |
|---|---|
| Box title | **"Design targets"** when the numbers are targets, or **"Usability test results"** when they were measured. Never just "Results" |
| Note | Poppins 14px, `--muted`, directly under the title; **required**. It is the case study's own sentence about the numbers (for example "Before the board vs the targets it was built to hit." or "Test with 3 users, 2 scenarios each.") |
| Tile | `--card`, `2px solid --ink`, radius 14px, padding `12px 14px` |
| Label | 12px uppercase, `--muted`; the case study's own label |
| Value | Kanit 800 26px, coral. Units are written out ("42 min → 12 min"), never prime marks, so the same numbers read clearly in any font |

### 7.21 Experience timeline (`.timeline`, `.exp`)

Employers, titles and dates, newest first. A recruiter must be able to verify seniority without leaving the page.

| Part | Spec |
|---|---|
| Section | Eyebrow "Experience" + h2 "Where I've *worked*" (§7.6, §7.7). Sits after Projects and before About |
| Rail | A 2px solid `--ink` vertical line, 6px from the left edge of the list (list padding-left 28px) |
| Marker | 14px circle, coral fill, `2px solid --ink`, vertically centred on its card |
| Card (`.exp`) | `--card`, `2px solid --ink`, radius 16px, padding 20px; same surface as the skill card (§7.9) but **static**, with no hover lift, because it is not clickable (§8.3) |
| Role | `h3`, Kanit 800 20px uppercase |
| Company | Poppins 600 16px, `--muted`, 6px below the role |
| Dates | Kanit 800 26px coral, no wrap: `2015 → 2025`. The arrow is `aria-hidden`; a visually hidden "From … to …" and `<time>` elements carry the meaning |
| Note (`.exp-note`) | Optional one-line scope under the company. Hidden while empty |
| Layout | Role/company on the left, dates on the right; at narrow widths the dates wrap below |

### 7.22 Collaboration section

The section holds one **Collaboration** box (full width: step chips plus principle) and the **In practice** box (full width): a `.dec.nonum` list with one real example per row. The **Leadership** box is currently commented out in the source (§8.5); the section heading reads "How I *collaborate*" while it is hidden.

---

## 8. Patterns

### 8.1 Case-study structure

Every project card follows the same short order, so recruiters can scan it in seconds. The deeper material (all decisions, trade-offs, edge cases, research) stays in the full case study.

1. **Header**: cover plus Project facts (§7.17, §7.18)
2. **Problem**: the case study's problem statement
3. **What I did**: the case study's approach, in its own words
4. **Key decision**: one decision, as a card (§7.19)
5. **Targets or results**: metric tiles with the case study's note (§7.20)
6. **Outcome & learning**: yellow callout, taken from the case study's reflection or closing
7. **CTA**: "View full case study ↗" opens the case study in Figma in a new tab (`target="_blank" rel="noopener"`). The image link and the button always point to the same URL. Both case studies link to a Figma **prototype**. A Figma link only works for visitors if the file's sharing is set to "anyone with the link can view"

### 8.2 Content tone

- Short declarative sentences.
- Trade-offs written as "X vs Y".
- Outcome ends with a transferable lesson, not a metric dump.

### 8.3 Interaction vocabulary

| Intent | Treatment |
|---|---|
| "This is clickable" | Lift (`translateY`), slight rotation, coral highlight (borders, underlines) |
| "A pill reacts" | Yellow fill with ink text, plus the lift where the component has one |
| "This is expandable" | Yellow "+" circle that rotates to "×" |
| "Look here" | Yellow fill or yellow underline |
| "You're here" | Coral underline growing from the left |

### 8.4 Evidence rules

1. **Word for word.** The project facts, Problem, What I did, the key decision, the targets or results, and the Outcome are copied exactly from the linked case study. The only edits allowed are punctuation spacing, writing units out, and splitting a sentence across lines.
2. **The case study wins.** If the page and the case study ever differ, the page is wrong. Change the page in the same commit as the case study.
3. **Fix conflicts at the source.** If the case study disagrees with itself (for example a duration, or two different percentages for the same result), correct the case study first, then the page. Until then the page uses the figure that appears in the most prominent place and the conflict is logged.
4. **Targets are not results.** A number the design was built to hit is labelled "Design targets". Only numbers measured in a test or in production are labelled "results".
5. **Always state the sample.** A result from a small test says how many participants and scenarios, using the case study's own words.
6. **Employer, title and dates** appear in the Experience timeline and must match LinkedIn and the resume.

### 8.5 Hidden content

| Pattern | How it works |
|---|---|
| Empty slot | A component with an empty value hides itself (`.fact:has(dd:empty)`, `.exp-note:empty`). Fill the text to show it |
| Commented block | A whole block that is not ready, or that was moved to the full case study, is wrapped in an HTML comment that starts with `HIDDEN:` and says how to restore it. The original text is kept inside the comment. Currently hidden: the **Deep HR** project, the **Leadership** box, and for each project the earlier three-decision list, **Trade-offs** and **Edge cases**. Anything hidden must not be referenced elsewhere (stats, headings, nav) |

---

## 9. Responsive behaviour

The system has **one breakpoint**: `820px`.

| Aspect | Desktop (>820px) | Mobile (≤820px) |
|---|---|---|
| Navigation | Inline links | Hamburger → full-screen menu |
| Section padding | 80px | 48px |
| Hero | 2 columns, photo right | 1 column, photo first (max 210px, left-aligned) |
| Section order | Source order | Projects → Experience → About → Approach → Collaboration → Contact (set with `order` on each section) |
| Grids | 2–3 columns | 1 column |
| Project thumbnail | Visible | Hidden |
| Case-study header | Cover and facts side by side | Stacked; fact labels narrow to 84px |
| Experience cards | Role left, dates right | Dates wrap below the role |
| Project header | 24px padding | 16px padding; number 38px |
| Stats | 34px numbers | 26px numbers, 18px gap |
| Cursor glow | Visible (mouse only) | Hidden |
| Lead text | 17px | 15px |
| Section titles (h2) | 21.6–38.4px | 36–64px |
| Project titles | 20px | 22–34px |
| Project numbers | 34px | 38px |
| Card titles (inside boxes, skills, decisions, experience) | 20px | 20px |

Also: `@media (hover: none)` hides the cursor glow on any touch device, regardless of width. Mouse-only effects (card tilt, photo tilt, glow) check `pointerType === 'mouse'`.

**⚠ Recommendation:** add a tablet step (≈1024px) if the 3-column skills grid or 2-column hero feels cramped at that width.

---

## 10. Accessibility: WCAG 2.2 AA

### 10.1 Test results

| Check | Result |
|---|---|
| axe-core 4.x, tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`: desktop and mobile × light and dark | **0 violations** (before: contrast failures in all four) |
| Same scan with the mobile menu open | **0 violations** |
| Interactive tests in headless Chrome (keyboard, accordion, theme, pause, mobile menu, reflow, hover contrast, target size, text spacing) | **32 / 32 pass** |
| Items axe marked "incomplete" | Only the decorative `●` separators and the empty hamburger bars, which contain no text |

### 10.2 What was changed (palette untouched)

| Success criterion | Fix |
|---|---|
| 1.4.3 Contrast (Minimum) | Coral text restricted to large sizes; box titles use ink in light theme; text on coral is ink; role subtitle raised to 19px and card titles set to 20px so they count as large text; hover colours corrected |
| 1.4.11 Non-text contrast | Focus ring is 3px solid ink (≥14:1 on every surface); coral icons are ≥3.2:1 |
| 2.1.1 Keyboard | Accordion header is now operable through a real `<button>` |
| 2.4.1 Bypass blocks | "Skip to main content" link; `<main>` is a focus target |
| 2.4.3 / 2.4.7 / 2.4.11 Focus | Visible focus style; collapsed panels excluded from tab order; `scroll-margin-top` keeps focused controls clear of the sticky nav; menu content behind the overlay is `inert` |
| 4.1.2 Name, Role, Value | `aria-expanded` and `aria-controls` on the menu and accordions; `aria-pressed` on the theme toggle; navigation landmarks labelled |
| 2.5.3 Label in Name | Case-study links now read "View full case study: …", matching their visible text |
| 2.2.2 Pause, Stop, Hide | Pause/play control for the ticker and floating blocks |
| 1.3.1 / 4.1.2 Hero heading | Letter-by-letter animation is `aria-hidden`; the h1 has one clean accessible name |
| 2.3.3 / user preference | Count-up respects `prefers-reduced-motion`; stats hold their real values in the HTML |
| 1.4.10 Reflow, 1.4.12 Text spacing | No horizontal scroll at 320px; long headings and menu words wrap |
| 2.5.8 Target size | Every visible control is at least 24×24px |
| Touch parity | Screenshot CTA is always visible on touch devices |
| 3.2.5 / good practice | `tel:` and `mailto:` links no longer open blank tabs; external links announce "(opens in new tab)" |

### 10.3 Already in place
`lang="en"`, descriptive `<title>`, zoomable viewport, `prefers-reduced-motion` and `prefers-color-scheme` support, 44px menu button, `rel="noopener"` on external links, decorative images with empty `alt`, safe-area insets.

### 10.4 Limits of this verification
- Automated tools find roughly a third of accessibility issues. This page passes every automated and scripted test above, but **a conformance claim also needs manual testing**: VoiceOver (iOS/macOS), NVDA or JAWS, TalkBack, and keyboard-only use on real devices.
- Google Fonts could not load in the test environment, so fallback fonts were measured. Colours and contrast are unaffected; text widths may differ slightly.
- The linked Figma case studies are third-party pages and outside this document's scope.
- The scripted tests use Chrome only. Check Safari for the `inert` attribute (Safari 15.5+) and `:focus-visible`.

### 10.5 Rules for new components
1. Every control must be reachable and operable by keyboard, with the global focus ring left intact.
2. Anything shown on hover must also appear on focus and on touch.
3. Check each new colour pairing against §2.4 before shipping.
4. Moving content longer than 5 seconds must respond to the pause control.
5. Accessible names must contain the visible label.
6. Collapsed or off-screen content must be `visibility: hidden` or `inert`.

---

## 11. Implementation

### 11.1 CSS custom properties

```css
:root {
  /* Colour */
  --bg: #FAF5EA;
  --ink: #14204A;
  --card: #FFFDF7;
  --lav: #E4D8EA;
  --muted: #4A5378;
  --coral: #F0524F;
  --yellow: #F6C550;
  --red: #E0403C;
  --teal: #256F6A;
  /* Type */
  --font-display: 'Kanit', 'Poppins', Impact, sans-serif;
  --font-body: 'Poppins', system-ui, sans-serif;
  /* Role token: ink on light, coral on dark (keeps box titles AA) */
  --box-title: var(--ink);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0E1633; --ink: #F6EFE0; --card: #17214A;
    --lav: #2A2F5C; --muted: #B9BFDB; --box-title: var(--coral);
  }
}
:root[data-theme="dark"] {
  --bg: #0E1633; --ink: #F6EFE0; --card: #17214A;
  --lav: #2A2F5C; --muted: #B9BFDB; --box-title: var(--coral);
}
```

### 11.2 Tailwind mapping (for React + TypeScript + Tailwind projects)

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        card: 'var(--card)',
        lav: 'var(--lav)',
        muted: 'var(--muted)',
        coral: { DEFAULT: '#F0524F' },
        'box-title': 'var(--box-title)',
        yellow: { DEFAULT: '#F6C550' },
      },
      fontFamily: {
        display: ['Kanit', 'Poppins', 'Impact', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl: '14px', '2xl': '16px', '3xl': '20px' },
      boxShadow: {
        hard: '6px 6px 0 var(--ink)',
        'hard-lg': '12px 12px 0 #F0524F',
        press: '0 2.5px 0 -0.5px #F0524F',
      },
      transitionTimingFunction: {
        overshoot: 'cubic-bezier(.2,.9,.3,1.3)',
        apple: 'cubic-bezier(.32,.08,.24,1)',
        glide: 'cubic-bezier(.2,.8,.2,1)',
      },
      screens: { md: '821px' }, // single breakpoint at 820px
    },
  },
};
```

### 11.3 Naming conventions in the source

| Class | Meaning |
|---|---|
| `.btn .y / .o` | Button, yellow / outline |
| `.box`, `.wide` | Info panel, full-width variant |
| `.proj`, `.det`, `.in` | Project card, collapsible detail, inner grid |
| `.rv`, `.on` | Reveal-on-scroll, revealed state |
| `.eye` | Eyebrow label |
| `.case-top`, `.facts`, `.fact` | Case-study header, project-facts card, one fact row (hidden when its `dd` is empty) |
| `.box.full`, `.dec`, `.dec.nonum`, `.lb` | Full-width info box, decision list (numbered or not), "Why / Rejected" label |
| `.metrics`, `.tiles`, `.tile`, `.tl`, `.mnote` | Metric box, tile grid, one tile, tile label, required note |
| `.timeline`, `.exp`, `.co`, `.exp-date`, `.exp-note` | Experience list, one job card, company, dates, optional note |
| `.blk` | Floating decorative block (`data-d` sets parallax amount) |
| `.shot`, `.shot-link`, `.shot-cta`, `.shine`, `.wide2` | Screenshot, its link wrapper, its CTA pill, the diagonal shine sweep, and the full-width modifier |
| `.mnav`, `.menu-btn`, `html.menu-open` | Mobile menu overlay, hamburger, open state |
| `.nav-tools`, `.mo`, `html[data-motion="paused"]` | Theme, pause and menu buttons; pause button; paused-motion state |
| `.sr`, `.skip` | Visually hidden text/inputs; skip link |

### 11.4 Rules for extending the system

1. Use tokens, never raw hex, for the five theme-aware neutrals.
2. Any new surface needs a defined text colour in **both** themes.
3. New hover states follow section 8.3: lift, optional tilt, coral highlight; any pill fills yellow with ink text.
4. Shadows are solid offsets, never blurred.
5. Every new animation must be covered by the reduced-motion rule.
6. New headings use Kanit 800 uppercase; new body copy uses Poppins.
7. Check every new colour pairing against §2.4 before using it for text.

---

### 11.5 Project structure

The site is a folder, not a single file. The folder is the source of truth.

```
UX-Bharath/
├── index.html                  Markup only: content, structure, and the <link>/<script> tags
├── README.md                   How to run, edit and publish
├── .gitignore
├── .nojekyll                   Tells GitHub Pages to serve the files as they are
├── assets/
│   ├── css/                    11 files, loaded in numbered order (table below)
│   ├── js/                     5 classic scripts, loaded in order at the end of <body>
│   └── img/                    Images and the favicon
├── tools/
│   └── build-single-file.py    Bundles the folder into one HTML file (Python 3, standard library only)
└── docs/
    └── Bharath-Portfolio-Design-System.md   This document
```

**CSS files.** They load in this order and later files intentionally override earlier ones, so never reorder them.

| File | Contents |
|---|---|
| `01-tokens.css` | Colour tokens and the dark theme (§2, §2.3) |
| `02-base.css` | Reset, html/body, headings, links, navigation, main, section (§3, §7.1) |
| `03-components.css` | Hero, photo frame, ticker, section headings, boxes, skills, project cards, step chips, contact pills (§7) |
| `04-responsive.css` | Footer, scroll reveal, the 820px breakpoint, `prefers-reduced-motion` (§6.6, §9) |
| `05-effects.css` | Scroll progress, cursor glow, hero letters, floating blocks, ripples, screenshots, hover and entrance motion (§6) |
| `06-mobile-menu.css` | Apple-style mobile menu (§7.2) |
| `07-accessibility.css` | WCAG 2.2 AA layer: focus, skip link, contrast pairings, keyboard parity, pause control (§10) |
| `08-hero-title.css` | Hero name on one line (§3.3) |
| `09-case-study.css` | Case-study header, facts, decision list, metric tiles, experience timeline (§7.17 to §7.21) |
| `10-heading-scale.css` | Heading scale on web, above 820px (§3.3) |
| `11-pills.css` | Pill hover fill (§2.2) |

**JavaScript files.** Classic scripts that share globals (`$`, `$$`, `go`), loaded in this order.

| File | Contents |
|---|---|
| `core.js` | Helpers and the scroll-reveal observer |
| `interactions.js` | Project accordion, hero parallax, card tilt, theme toggle |
| `effects.js` | Hero letters, count-up, scroll progress, cursor glow, magnetic buttons, photo tilt, stagger |
| `navigation.js` | In-page link focus helper and the mobile menu |
| `accessibility.js` | Theme state for assistive tech, pause/play control |

**Images.** `assets/img/bharath-portrait.jpg`, `mbcs-case-study-cover.jpg`, `goibibo-case-study-cover.jpg`, `favicon.svg`. The project thumbnail and its cover are the same file.

**Rules for changing the project**
1. **CSS:** put a new rule in the file for its layer. If it needs a new layer, add the next number and add its `<link>` after the last one in `index.html`. Values still come from the design system (§2 to §8); do not type a colour or font stack by hand.
2. **JavaScript:** put new behaviour in the closest file. Do not turn the scripts into modules without changing how they share globals.
3. **Images:** kebab-case names in `assets/img/`. Reuse one file where a cover and its thumbnail are the same picture. Give every informative image an `alt`.
4. **Paths** are relative, with no leading slash, so the site works at a domain root and under a sub-path such as `/UX-Bharath/`.
5. **Fonts** are still loaded from Google Fonts (the `<link>` in `<head>`). Self-hosting would go in `assets/fonts/`, with the `@font-face` rules in `01-tokens.css`.
6. **Docs:** this file lives in `docs/`; update it in the same change as any component, token or structure change.
7. **Single-file copy:** `python3 tools/build-single-file.py` bundles the folder into `dist/portfolio-single-file.html` (for example for a hosted artifact). It was checked by rebuilding the published single file byte for byte. Change the folder, then rebuild the single file, never the other way round. `dist/` is git-ignored.

---

*Source of truth: the portfolio project folder (§11.5). Update this document whenever tokens, components or structure change.*
