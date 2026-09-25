# PrideIdea Website

Marketing website for **PrideIdea**, built on a scalable, standards-based React architecture.

## Tech stack

| Area       | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | React 19 + TypeScript (strict)                             |
| Build tool | Vite                                                       |
| Styling    | Tailwind CSS v4 + design tokens (CSS variables)            |
| Components | Custom design system (`cva` variants, `tailwind-merge`)    |
| Routing    | React Router (data router, lazy-loaded routes)             |
| i18n       | i18next — Arabic (RTL, default) & English (LTR), type-safe |
| Icons      | lucide-react                                               |
| Quality    | oxlint, Prettier (+ Tailwind class sorting), Vitest + RTL  |

## Getting started

```bash
nvm use            # Node 22+
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Type-check and build for production (`dist`) |
| `npm run preview`   | Preview the production build                 |
| `npm run typecheck` | TypeScript check                             |
| `npm run lint`      | Lint with oxlint                             |
| `npm run format`    | Format with Prettier                         |
| `npm run test`      | Run unit tests once (`test:watch` to watch)  |
| `npm run check`     | Everything CI should run                     |

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — folder structure, layers and import rules
- [Design system](docs/DESIGN_SYSTEM.md) — tokens, theming, components and RTL rules
