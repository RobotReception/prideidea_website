# Architecture

The codebase follows a lightweight **Feature-Sliced Design**: code is grouped into
layers, and each layer may only import from the layers **below** it.

```
src/
├── app/          # Composition root: providers, router, <App />
│   ├── providers/
│   └── router/
├── pages/        # One folder per route. Composes widgets & features.
├── widgets/      # Large, self-contained UI blocks (header, footer, services grid, layout…)
├── features/     # User interactions with business logic (contact form…)
├── shared/       # Reusable, business-agnostic code
│   ├── ui/       # Design-system primitives (Button, Card, Section, Heading…)
│   ├── lib/      # Utilities (cn…)
│   ├── hooks/    # Generic hooks (useTheme, usePageMeta…)
│   ├── config/   # Site config, route map, navigation
│   └── i18n/     # i18next setup + locales (ar, en)
├── styles/       # tokens.css (design tokens) + globals.css (Tailwind entry)
└── test/         # Test setup
```

## Import rules

```
app  →  pages  →  widgets  →  features  →  shared
```

- A layer never imports from a layer above it (e.g. `shared` never imports `widgets`).
- Slices on the same layer don't import each other (a widget doesn't import another widget;
  compose them in a page instead). `widgets/layout` is the one exception — it's the page shell.
- Each slice exposes a public API via `index.ts`. Import from `@/widgets/header`, not
  `@/widgets/header/header`.
- Always use the `@/` alias for cross-layer imports; relative imports only within a slice.

## Conventions

- **Files**: `kebab-case.tsx`. **Components**: `PascalCase`, named exports
  (pages use a `default` export so they can be lazy-loaded).
- **Routes**: declared once in `shared/config/routes.ts` (`ROUTES`), never hard-coded.
- **Text**: never hard-code user-facing strings — add keys to both `ar.json` and `en.json`.
  Keys are type-checked, and a test fails if the locales drift apart.
- **Tests**: colocated as `*.test.ts(x)` next to the code under test.

## Adding a page

1. Create `src/pages/<name>/<name>-page.tsx` with a default export.
2. Add the path to `ROUTES` (and to `NAV_ITEMS` if it belongs in the navigation).
3. Register it in `src/app/router/index.tsx` with `lazy: page(() => import(...))`.
4. Add its translations to both locale files and call `usePageMeta` for the title.
