# Kostiantyn Zaitsev — portfolio

Next.js 16 App Router, React 19 and strict TypeScript. Four locales and four appearance modes, exported as static HTML for GitHub Pages. The Stitch archive informed the visual design; CV facts and the supplied content brief provide verified personal content.

## GitHub Pages deployment

1. Push the project files to `main` in `Gh0st3r0k/my-website`.
2. Open repository **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** (do this before the workflow runs).
3. Open **Actions → Deploy portfolio to GitHub Pages**. A push to `main` or **Run workflow** builds and deploys `out/`. Approve the `github-pages` environment if the repository has protection rules.

Expected project URL: **https://gh0st3r0k.github.io/my-website/**. This is the configured target, not a claim that deployment has already happened.

`.github/workflows/pages.yml` obtains the origin and path from `actions/configure-pages`: it supports project paths, user sites and configured custom domains without hardcoding a deploy prefix. Only static output is uploaded; no Node.js server is needed on Pages. Deep routes export as `index.html` in directories, so refreshes work. Next links and scripts receive `basePath`; PDF, image paths, canonical URLs, sitemap and hreflang use the same prefix.

The root chooses saved locale cookie → browser languages → English using a small pre-render script, because Pages has no server-side middleware. Without JavaScript it shows four language links. Locale URLs always determine language. Language and appearance controls live in a keyboard-accessible Settings dialog in the header. The language selector loads the target locale document so its head script restores the saved appearance before paint; ordinary navigation within a locale remains client-side. System appearance follows OS preference; other choices persist locally.

## Local development

Node.js 24 LTS (tested with 24.19.0).

```sh
npm ci
npm run dev
```

If the npm cache is not writable in the cloud sandbox, use `npm --cache /tmp/npm-cache ci`. The existing checkout is isolated; do not create an extra Git worktree.

Local static build and preview:

```sh
npm run build
npm run start
```

Reproduce the Pages path locally:

```sh
NEXT_PUBLIC_BASE_PATH=/my-website NEXT_PUBLIC_SITE_URL=https://gh0st3r0k.github.io npm run build
NEXT_PUBLIC_BASE_PATH=/my-website npm run start
```

Open the preview under `/my-website/`. Both variables must match the build. `npm run start` serves `out/` with ordinary file and directory lookup; it does not use an SPA fallback. This exposes missing exports instead of disguising them. `.env.example` documents build-time variables.

## Editing

- `src/config/site.ts`: verified email, GitHub, LinkedIn, PDF path, origin and path helpers.
- `public/cv.pdf`: original supplied CV, accessible for viewing and download on each locale’s CV page. The localized web CV remains a separate summary.
- `src/content/portfolio.ts`: projects, experience, education, skills, about and current activities shared by Home and detail pages. Optional case-study sections and screenshots render when supplied.
- `src/i18n/{en,sk,ru,uk}.json`: interface and descriptive translations with identical typed keys.
- `src/styles/tokens.css`: centralized dimensions, typography and motion constants.
- `src/styles/themes/`: light, dark and high-contrast semantic colors. Components share geometry across themes.
- `src/styles/animations.css`: motion and reduced-motion overrides.
- `src/app/[locale]/[[...path]]/page.tsx`: route resolution and localized SEO. `src/content/routes.ts` shares exported paths between static generation and sitemap.
- `src/app/(entry)/page.tsx`: static root language negotiation.
- `tests/portfolio.spec.ts`: browser, route and accessibility checks.

Fonts are packaged locally; project SVGs are conceptual illustrations. The original CV contains personal contact information and will be public with the site. No analytics or external contact service is required.

## Checks

```sh
npm run lint
npm run format:check
npm run typecheck
npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
```

Chromium is preinstalled in the cloud machine. Elsewhere install a Playwright browser with `npx playwright install chromium` and omit the executable variable. Playwright starts the static server if necessary. To test a prefixed export, set `NEXT_PUBLIC_BASE_PATH=/my-website` for both build and tests. Tests cover 64 localized routes, locale selection, theme persistence, all responsive layouts, keyboard navigation, reduced motion, original PDF, 404s and automated WCAG AA checks.

## Content scope

About, experience, education, skills, project details and Now are populated from the supplied brief in all four locales. Now records the content date explicitly (`nowUpdated` in `src/content/portfolio.ts`); it is not a live activity feed. Practical skills and academic use are distinguished without proficiency ratings.

Automatons Simulator covers finite automata; pushdown automata and Turing machines are described as experimental directions. The Router feature list was checked against its public server source (routing, packet forwarding, ARP, DHCP and RIPv2); this is source inspection, not a functional validation of that application.

Unfilled case-study sections, uncertain roles/statuses and deferred links are omitted. Screenshots, further confirmed project details and any future publicly approved team case studies can be added later. Internal infrastructure, addresses, credentials, user data and nonpublic partner/project details are not published. The original supplied PDF remains unchanged.

## Images and personal photos

All public images live under `public/images/`:

- `general/`: ordinary site images and illustrations.
- `projects/<project-slug>/`: project screenshots, registered in the corresponding project record.
- `personal/`: your portraits and other personal photos intended for visitors.

For example, put a portrait at `public/images/personal/portrait.webp`. Register it in `src/content/photos.ts` with its public path `/images/personal/portrait.webp`, actual pixel width/height and alt text in en/sk/ru/uk. Captions are optional. Array order determines display order: the first photo is the main portrait, followed by a static, responsive grid on About. Photos retain their full aspect ratio and open at full size on click. No carousel or automatic rotation is used. Empty lists render no section or placeholders.

WebP/JPEG are suitable for photos; use readable filenames and compressed images. There is no need to change React components when adding photos: only files and the content list. Files in `public/` are public after deployment. Do not use `personal/` as private storage. The `/my-website` deployment prefix is added automatically.

Example record (only add it after the file exists; replace dimensions and descriptions with the actual photo):

```ts
{
  src: '/images/personal/portrait.webp',
  width: 1200,
  height: 1600,
  alt: {
    en: 'Portrait of Kostiantyn Zaitsev',
    sk: 'Portrét Kostiantyna Zaitseva',
    ru: 'Портрет Kostiantyn Zaitsev',
    uk: 'Портрет Kostiantyn Zaitsev',
  },
}
```

## Study and work details

Each locale includes `/education/bachelor/`, `/education/master/`, `/experience/ynet/` and `/experience/pafuplex/`. Overview cards link to these pages, which include back navigation and use the same education/experience records as the overview and CV. Edit `slug`, description and section keys in `src/content/portfolio.ts`, and copy in the four dictionaries. `src/components/background-detail.tsx` renders both kinds of detail page.

Only supplied information is used. General academic interests are not assigned to a specific degree unless confirmed. Missing course names, grades, credits, detailed curricula and internal work information are omitted. Further confirmed learning topics can be added as sections without rewriting page components.

The illustrated header avatar is configured separately as `site.headerAvatar` in `src/config/site.ts` and stored under `public/images/general/`. It does not replace the real portrait or add fictional artwork to the personal photo gallery.
