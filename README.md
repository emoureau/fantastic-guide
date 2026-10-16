# bookmarklet-poc

Proof of concept: a "Clip to Clippings" bookmarklet. On a news article it reads the page's metadata (Open Graph, JSON-LD, selected text) and opens `/clip` in a popup with a pre-filled form. Saved clippings go to Nitro storage (`.data/`) and are listed on `/`.

To try it: `npm run dev`, open `http://localhost:3000`, drag the button to your bookmarks bar, then click the bookmark on any article.

Built from starter-frontend:

A Nuxt 4 starter baseline: [@nuxt/ui](https://ui.nuxt.com), Tailwind CSS 4, ESLint (`@antfu/eslint-config`), TypeScript typechecking, Vitest (unit + Nuxt-environment component tests) with coverage, and Playwright e2e tests, wired into CI.

## Requirements

- Node version pinned in [.nvmrc](.nvmrc) (Node 22+)
- npm (see `package-lock.json`)

## Setup

```bash
npm install
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server at `http://localhost:3000` |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` / `lint:fix` | Lint (and autofix) with ESLint |
| `npm run typecheck` | Typecheck app code and test/config files |
| `npm run test:unit` | Run Vitest unit + Nuxt-environment tests |
| `npm run test:unit:watch` | Run Vitest in watch mode |
| `npm run test:coverage` | Run unit/Nuxt tests with coverage (`coverage/`) |
| `npm run test:e2e` | Run Playwright e2e tests (`test/e2e/`) |
| `npm run test` | Run unit + e2e tests |
| `npm run ci` | Run the full gate: lint, typecheck, coverage, e2e |

First time running e2e tests locally, install a browser binary:

```bash
npx playwright install --with-deps chromium
```

Check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) and the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
