# Ospra Deck & Social Design System

Scope: **decks, pitch decks, and LinkedIn/social carousel posts only.** This is
not the Ospra product-app design system (no sidebar, dashboard widgets, or
form components here) — it is the visual language used across all Ospra
slide and social artifacts.

## Voice
- Direct, plain, calm. Short lines, no hype, no exclamation.
- Sentence case everywhere except the brand word **Ospra**.
- Section markers as `01.`, `02.` mono labels ("01. The handoffs").
- One italicized accent word per headline in brand blue, e.g. "No shared
  layer *between them*."
- No emoji.

## Colors
Single brand signal + a warm neutral (taupe) scale. All defined in
`tokens/colors_and_type.css`.

- **Brand blue** `--color-brand-500 #1447e6` — the only accent color. Used for
  italic headline emphasis, live-status dots, icon strokes inside brand
  containers, links, key diagram nodes. Ramp 50–950 available for tints
  (e.g. `rgba(20,71,230,0.07)` icon-box fills) and dark chart nodes
  (`--color-brand-700 #0b298f`).
- **Taupe neutral scale** (replaces gray): `#f7f6f3 → #0d0d0b`. Body copy
  sits at `taupe-700 #403e38` (secondary) and `taupe-500 #6d6a60` (tertiary);
  `taupe-400 #8e8a7e` for the most muted labels/eyebrows.
- **Canvas**: deck background `#F5F7FA`, card surface `#FFFFFF`, hairline
  border `rgba(0,0,0,0.08)`.
- **Dark card variant**: `#252525` background, white text at 82%/60%/40%
  opacity steps — used for contrast/emphasis cards inside an otherwise light
  deck.
- **Ink**: primary text `#111110` (near-black, not pure black).

## Typography
Three families, each with a fixed job — never mixed:

- **Instrument Serif** (`--font-serif`) — all display headlines and slide
  titles. Weight 400–500, tight tracking (`-0.02em` to `-0.025em`). This is
  the only serif; it carries the italic accent-word treatment.
- **Inter** (`--font-sans`) — all body copy, card titles, UI-style labels.
  **Minimum weight 500** — never render body/UI text at regular 400; use 600+
  only for emphasis (card titles, strong callouts).
- **DM Mono** (`--font-mono`) — eyebrows, section numbers, stat labels,
  contact-strip text, diagram captions. Always uppercase, wide letter-spacing
  (0.14em–0.22em).

Type scale (deck-canvas tokens, 1920×1080 base):
`display 96px · title 66px · h3 30px · body 27px · small/eyebrow 24px`.

## Spacing & shape
- Slide padding `92px` horizontal / `52px` vertical; section gaps `38px`.
- Card/section radius `20–24px`; pills and chips `radius: 999px`.
- Icon boxes `52–96px` square, `13–24px` radius.
- Borders are hairline, 1px, `rgba(0,0,0,0.08)` (or `rgba(255,255,255,0.1)` on
  dark cards) — never a heavy stroke.
- Shadows are essentially absent; separation comes from the hairline border
  and flat color blocks, not elevation.

## Components
- **Eyebrow** — mono, uppercase, wide tracking, taupe-400, sits above a title.
- **Slide title** — serif, with one brand-blue italic accent word/phrase.
- **Card** — white surface, hairline border, 20–24px radius; variants:
  `card-blue` (solid brand-500 fill, white text), `card-dark` (#252525 fill),
  `card-grey` (#EAEAEA fill, flat/neutral emphasis).
- **Card id** — mono uppercase tag inside a card (e.g. "AND A RECALL"),
  brand-blue or white depending on card variant.
- **Stat value** — serif numeral, large (64–72px), with an optional brand-blue
  italic sub-emphasis.
- **Chip / badge** — pill, mono uppercase, taupe on light fill; `chip--on`
  inverts to solid brand-blue.
- **Diagram nodes** (SVG) — circular or rounded-rect nodes, brand-blue stroke
  for active/highlighted nodes, taupe `#b8b4a9`/`#c8c5be` for neutral nodes,
  dashed connector lines in taupe, solid in brand-blue for the emphasized
  path.
- **Footer contact strip** — mono, taupe-400, three items (`ospra.co` ·
  `sales@ospra.co` · phone) separated by a 4px brand-blue dot.

## Layout patterns
- Deck canvas: 1920×1080. Social/LinkedIn canvas: 1080×1080 (square).
- Header row: logo mark (black) left, mono tag/eyebrow right.
- Body: eyebrow + serif title/statement, then supporting cards/diagram/stat
  block.
- Footer: hairline top border, centered or split contact strip.
- Icons: Lucide, outline, 1.8–2.2px stroke, brand-blue when inside an
  accent/active context, taupe when neutral.

## Package contents
- `tokens/colors_and_type.css` — the actual CSS custom properties (colors,
  fonts, spacing, radius, motion) used across every deck/LinkedIn file in
  this project. Link it directly to inherit the palette and scale.
- `specimen.dc.html` — a visual swatch/type/component reference rendered from
  the same tokens.
