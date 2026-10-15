<div align="center">

# Kostiantyn Zaitsev · Portfolio

**Projects, experience, and the work behind them.**

A multilingual personal website with accessible themes, detailed project pages, and a downloadable CV.

[Explore the site](https://gh0st3r0k.github.io/my-website/) · [Getting started](#getting-started) · [Content guide](#content-guide) · [Deployment](#deployment)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Hosting](https://img.shields.io/badge/GitHub_Pages-static-222222?logo=github&logoColor=white)

English · Slovenčina · Русский · Українська

</div>

---

## Overview

A personal portfolio built with **Next.js App Router, React, and TypeScript**, exported as static HTML. Content is shared across overview and detail pages, with translated copy in four dictionaries and no backend required for hosting.

| Page                   | What you will find                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| Home & About           | Introduction, selected work, background, and personal photos.                              |
| Projects               | Project summaries and individual detail pages, with optional case studies and screenshots. |
| Experience & Education | Overview cards and dedicated pages for work and study records.                             |
| Now                    | Current activities with an explicit content update date.                                   |
| Contact & CV           | Contact links, a localized web CV, and the original PDF to view or download.               |

### Built for everyday browsing

- **Four languages:** localized URLs, translated content, and language selection that remembers your choice.
- **Flexible appearance:** system, light, dark, and high-contrast modes with saved preferences.
- **Accessible interaction:** keyboard navigation, a Settings dialog, and reduced-motion support.
- **Static hosting:** directory-based routes, localized metadata, canonical URLs, hreflang, and a sitemap.
- **Local assets:** bundled fonts, project illustrations, personal photos, and the original CV.

The header illustration is separate from the real portrait gallery. All appearance modes share the same layout and typography.

## Getting started

Use **Node.js 24 LTS**, matching the deployment workflow.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The root selects a saved locale cookie, then a supported browser language, then English. Without JavaScript, it offers language links. A localized URL always determines the page language.

### Preview the static export

```sh
npm run build
npm run start
```

The preview server serves `out/` using file and directory lookup. Missing routes return a 404, so the preview can expose missing exports before deployment.

To reproduce the GitHub Pages project path:

```sh
NEXT_PUBLIC_BASE_PATH=/my-website NEXT_PUBLIC_SITE_URL=https://gh0st3r0k.github.io npm run build
NEXT_PUBLIC_BASE_PATH=/my-website npm run start
```

Open [localhost:3000/my-website/](http://localhost:3000/my-website/). The preview's base path must match the build. See [`.env.example`](.env.example) for build-time configuration.

If the sandbox npm cache is not writable, use `npm --cache /tmp/npm-cache ci`.

## Content guide

Most updates belong in content and configuration files:

| File or directory                                        | Edit here to…                                                                     |
| -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`src/config/site.ts`](src/config/site.ts)               | Update identity, contact links, header artwork, PDF location, and URL helpers.    |
| [`src/content/portfolio.ts`](src/content/portfolio.ts)   | Edit projects, experience, education, skills, About, and current activities.      |
| [`src/content/photos.ts`](src/content/photos.ts)         | Register personal photos, dimensions, translated alt text, and optional captions. |
| [`src/i18n/`](src/i18n/)                                 | Update English, Slovak, Russian, and Ukrainian copy with matching typed keys.     |
| [`src/content/routes.ts`](src/content/routes.ts)         | Maintain the shared paths used by static generation and the sitemap.              |
| [`src/styles/tokens.css`](src/styles/tokens.css)         | Adjust shared dimensions, typography, and motion constants.                       |
| [`src/styles/themes/`](src/styles/themes/)               | Change semantic colors for light, dark, and high-contrast themes.                 |
| [`src/styles/animations.css`](src/styles/animations.css) | Tune animations and reduced-motion overrides.                                     |
| [`public/cv.pdf`](public/cv.pdf)                         | Replace the original downloadable CV.                                             |

### Photos and project images

```text
public/images/
├── general/                  # Site illustrations and header artwork
├── personal/                 # Portraits and visitor-facing personal photos
└── projects/<project-slug>/   # Project screenshots
```

Add a personal photo file first, then register it in `src/content/photos.ts` using its public path without the deployment prefix:

```ts
{
  src: "/images/personal/portrait.webp",
  width: 1200,
  height: 1600,
  alt: {
    en: "Portrait of Kostiantyn Zaitsev",
    sk: "Portrét Kostiantyna Zaitseva",
    ru: "Портрет Kostiantyn Zaitsev",
    uk: "Портрет Kostiantyn Zaitsev",
  },
}
```

Use the actual image dimensions and meaningful descriptions in every language. The first photo becomes the main portrait; additional photos form a responsive grid on About. Images preserve their aspect ratio and open at full size. An empty list hides the gallery. No React component changes are needed.

Register project screenshots on the corresponding project record. The deployment prefix is added automatically. Everything under `public/`, including photos and contact information in the PDF, is public after deployment.

### Detail pages and content conventions

Education and experience records provide both overview cards and detail pages, including `/education/bachelor/`, `/education/master/`, `/experience/ynet/`, and `/experience/pafuplex/`. Edit record slugs and section keys in `src/content/portfolio.ts`, then update the four dictionaries. [`background-detail.tsx`](src/components/background-detail.tsx) renders both detail types.

Keep personal claims grounded in the supplied CV and content brief. Omit unfilled case-study sections, uncertain roles, and deferred links until confirmed. `nowUpdated` records the content date; Now is maintained manually.

The catalogue includes Automatons Simulator, trinitypeer, Switch, Router, D&D Player, two SPAASM systems programming assignments, and this portfolio. [Project content sources](docs/project-sources.md) records the repository review and selection criteria.

Automatons Simulator focuses on finite automata; its pushdown automaton and Turing machine editors are experimental extensions. Network project descriptions distinguish source inspection from real-hardware validation. Practical skills and academic use are described separately, without proficiency ratings. Internal infrastructure, credentials, user data, and nonpublic work details do not belong in public content.

## Development

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the development server.            |
| `npm run build`        | Generate the static export in `out/`.    |
| `npm run start`        | Serve the generated export.              |
| `npm run lint`         | Run ESLint.                              |
| `npm run format:check` | Check repository formatting.             |
| `npm run typecheck`    | Check TypeScript without emitting files. |
| `npm run test:e2e`     | Run the Playwright browser suite.        |

### Verification

```sh
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Install Chromium with `npx playwright install chromium` if needed. On the cloud machine, use the preinstalled browser:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
```

Playwright starts the static server when needed. For a prefixed export, set `NEXT_PUBLIC_BASE_PATH=/my-website` for both the build and browser tests. The suite covers localized routes, locale selection, theme persistence, responsive layouts, keyboard navigation, reduced motion, the original PDF, 404 responses, and automated accessibility checks.

### How routing and preferences fit together

- [`src/app/(entry)/page.tsx`](<src/app/(entry)/page.tsx>) selects a language in the browser because static hosting has no server-side middleware.
- [`src/app/[locale]/[[...path]]/page.tsx`](src/app/%5Blocale%5D/%5B%5B...path%5D%5D/page.tsx) resolves localized pages and generates SEO metadata.
- [`src/components/preferences.tsx`](src/components/preferences.tsx) manages appearance and language controls. Switching languages loads the destination document so its saved appearance can be restored before paint.
- [`scripts/serve-static.mjs`](scripts/serve-static.mjs) previews exported files with directory redirects and real 404 responses.

## Deployment

The repository includes a [GitHub Actions workflow](.github/workflows/pages.yml) for GitHub Pages.

1. Push the project to `main` in `Gh0st3r0k/my-website`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source before running the workflow.
3. Open **Actions → Deploy portfolio to GitHub Pages** and run it, or push to `main` to trigger it automatically.
4. Approve the `github-pages` environment if repository protection rules require it.

Configured destination: **https://gh0st3r0k.github.io/my-website/**. Deployment availability depends on the workflow completing successfully.

The workflow uses `actions/configure-pages` to obtain the origin and base path, runs lint and type checks, builds the site, and uploads only `out/`. Project paths, user sites, and configured custom domains use the same URL helpers. Trailing-slash routes export as directory `index.html` files, allowing direct visits and refreshes without a Node.js server.
