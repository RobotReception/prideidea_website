# Design system — Pride Idea

## Concept: the qamariya that sorts light

A Sana'ani qamariya takes raw sunlight and turns it into ordered, coloured
patterns — the same thing Pride Idea does with data. The qamariya appears
**once**, in full, in the home hero (`src/widgets/qamariya`). Elsewhere only
its logic is used: panes separated by mullions.

## Colour (`src/styles/tokens.css`)

| Name           | Hex       | Tailwind         | Role / contrast                                |
| -------------- | --------- | ---------------- | ---------------------------------------------- |
| Sana'a ink     | `#0E4157` | `ink`            | Headings, frames — 10.2:1 on gypsum            |
| Qamariya night | `#001322` | `night`          | Body text, dark sections — 17.5:1              |
| Gypsum         | `#F4F7F8` | `gypsum`         | Page background                                |
| Amber          | `#F39200` | `amber`          | **Actions only.** Fill; night text on it = 8:1 |
| Turquoise      | `#138A87` | `turquoise`      | Glass — graphics only on light                 |
| Ruby           | `#B4233C` | `ruby`           | Glass, form errors — 6:1                       |
| Slate / Mist   |           | `slate` / `mist` | Muted text on light (6:1) / on night (8.7:1)   |
| Mullion        |           | `mullion`        | Hairlines                                      |

Product glass: DarAI amber · PrideScreen ruby · PridePass turquoise · الدعوات الذكية clear.

## Type

- **Reem Kufi** (`font-display`) — display, h1, h2 only.
- **IBM Plex Sans Arabic** (`font-sans`) — body, UI, h3, Latin product names.
- Scale: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`
  (fluid sizes, generous Arabic line-heights). Fonts are self-hosted via `@fontsource`.

## Rules

1. **Mullions, not cards.** Group related items in one ruled grid or list. No shadows
   (shadow utilities are disabled in the theme).
2. **Colour is glass.** Flat, small fills. No gradients, no glow.
3. **Type leads.** No decorative icons for services, sectors or reasons.
4. **Pending content is visible.** Text in `[brackets]` in the content document renders
   striped via `<RichText>` / `<Pending>` until verified.
5. **One motion moment** — the qamariya on load. Otherwise motion only responds to the
   user. `prefers-reduced-motion` shows the final state.
6. No hover effects on grids of items; no arrows on buttons or links.

## Spacing

Vertical space between sections is owned by `<Section>` (`--section-y`). Components
inside a section never set outer margins — use `gap` instead.

## Components (`@/shared/ui`)

`ButtonLink`/`Button` (`amber`, `outline`, `outline-light`) · `TextLink` · `Heading`
(`as` separate from `size`) · `Section` (`tone`: gypsum, white, night, ink; `rule`;
`spacing`) · `Container` · `GlassPane` · `Pending`/`RichText` · `Logo` · `Seo`.

## RTL

The whole site is Arabic, `dir="rtl"`. Use logical utilities (`ms-`, `pe-`, `start-`,
`end-`). Wrap phone numbers, emails and Latin handles in `dir="ltr"`.
