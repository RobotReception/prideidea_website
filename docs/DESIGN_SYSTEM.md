# Design system

## Tokens

All visual decisions live in [`src/styles/tokens.css`](../src/styles/tokens.css), in two layers:

1. **Primitives** — the raw palette (`--brand-500`, `--neutral-200`…). Never used in components.
2. **Semantic tokens** — describe intent and switch per theme:

| Token                                 | Use                                   |
| ------------------------------------- | ------------------------------------- |
| `background` / `foreground`           | Page background and main text         |
| `surface` / `surface-foreground`      | Alternate section background          |
| `muted` / `muted-foreground`          | Subtle fills, secondary text          |
| `border`, `ring`                      | Borders, focus rings                  |
| `primary` (`-hover`, `-foreground`)   | Main brand actions                    |
| `secondary` (`-hover`, `-foreground`) | Soft brand fills (badges, icon tiles) |
| `accent`, `danger`, `success`         | Highlights and status                 |

`globals.css` maps them to Tailwind, so use utilities like `bg-primary`,
`text-muted-foreground`, `border-border`, `rounded-lg`, `shadow-soft`.
**Never use raw colors** (`bg-violet-600`, hex values) in components.

To rebrand, change the `--brand-*` and `--accent-*` primitives and every component follows.

## Theming

- Light/dark is driven by the `.dark` class on `<html>` (`ThemeProvider` + `useTheme()`).
- An inline script in `index.html` applies the saved theme before first paint (no flash).

## Components (`@/shared/ui`)

| Component                                     | Notes                                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| `Button`, `ButtonLink`                        | `variant`: primary, secondary, outline, ghost, link · `size`: sm, md, lg, icon |
| `Heading`                                     | `as` (semantic tag) is separate from `size` (display, h1–h4)                   |
| `Text`                                        | `size`: sm, md, lg · `tone`: default, muted                                    |
| `Container`                                   | Max width + responsive gutters                                                 |
| `Section`, `SectionHeader`                    | Vertical rhythm (`spacing`) + `tone="surface"`                                 |
| `Card`, `CardTitle`, `CardDescription`        |                                                                                |
| `Badge`, `Input`, `Textarea`, `Label`, `Logo` |                                                                                |

Variants are built with `cva`; always merge external classes with `cn()` so callers can
override styles safely.

## RTL & bidirectional layout

Arabic is the default language. `<html dir>` updates automatically when the language changes.

- Use **logical** utilities: `ms-*`/`me-*`, `ps-*`/`pe-*`, `start-*`/`end-*`, `text-start`.
  Avoid `ml-*`, `mr-*`, `left-*`, `right-*`, `text-left`.
- Flip directional icons (arrows) with `i18n.dir()`, or use the `rtl:` variant.
- Wrap Latin-only content (emails, phone numbers, the brand name) in `dir="ltr"`.

## Accessibility

- Visible `:focus-visible` ring from tokens; skip-to-content link in the layout.
- Icon-only buttons need an `aria-label`; decorative icons get `aria-hidden`.
- `prefers-reduced-motion` disables animations globally.
