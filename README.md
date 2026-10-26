# Jameskier Doliguez — Portfolio

An editorial software-engineering portfolio built with the existing React 19, TypeScript, Vite 8, Tailwind 3 and npm stack. Six pages are prerendered to static HTML and hydrated for navigation, project filters, galleries and clipboard feedback. Production needs no Node server, database, contact backend or analytics service.

The source was copied with Git history from the owner-confirmed `/Users/jameskierdoliguez/projects/portfolio` into this workspace. That original checkout was not edited. Fourteen local milestone commits implement the redesign and cinematic motion upgrade (09–14); nothing was pushed or deployed.

## Run locally

Use Node **22.x** (verification used 22.22.3).

```sh
npm ci
npm run dev
```

For the actual static production output and correct HTTP 404 behavior:

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173. Vite's development fallback is not the production HTTP router. The build creates the SSR bundle, regenerates brand assets, builds the client, prerenders six routes and 404, writes crawl files and removes the temporary SSR bundle. `dist/` is the deployable artifact.

## Routes and real content

| Route | Content |
| --- | --- |
| `/` | Identity, selected work, capabilities, tools, about and email contact |
| `/projects` | Four-project index; All/Mobile/Web/AI filters reflected in the URL |
| `/projects/peso-flow` | Local-first Flutter finance app, in development; three actual test captures |
| `/projects/pokechamp` | Team builder, usage snapshots and sharing; actual local interface capture |
| `/projects/pixeltools` | Static Next.js browser image utilities; retained actual directory capture |
| `/projects/guest-reco` | Limited project note from original portfolio, with repository link |

The three featured studies include verified architecture and constraints. GuestReco does not claim deployment, accuracy or detailed implementation proof. All original section/project fragment IDs remain. Unknown paths return the custom **HTTP 404**, not a home-page rewrite. No hollow about/contact routes were added.

Native links support opening in new tabs. The mobile menu handles Escape/focus/section navigation; galleries support arrows, numbered selection, URL reload and native zoom dialog with focus return. Contact opens a mail draft; Copy email reports actual success or failure. Without JavaScript, static content, links, native capability disclosures, navigation and full-size media remain available. No email was sent during QA.

## Edit content and design

- `src/config/site.ts`: owner identity, verified bio/education, socials, tools/capabilities, contact, optional resume/current availability. Undefined optional values stay hidden.
- `src/content/projects.ts`: typed, source-verified project records and media. Keep stable slugs. Missing URLs stay absent. `validation.ts` rejects unstable/duplicate slugs, unsafe protocols and incomplete media.
- `src/config/seo.json`: production origin, home metadata and fallback share image. If the origin changes, update the HTTPS destination in `vercel.json` and canonical tests as well.
- `src/styles-tokens.css`: exact five-color palette and derived tints, typography, spacing and motion. One self-hosted OFL Archivo variable font, light mode primary, no mode switch or animation library.
- `public/projects/`: owned media with explicit dimensions/responsive derivatives. `public/og/`: generated 1200×630 JPEG project cards. `npm run assets:brand` regenerates cards/icons; the full build always does this too.

See [design system](docs/design/design-system.md), [reference interpretation](docs/design/reference-analysis.md), [motion budget](docs/design/motion-spec.md), [media provenance](docs/design/media-provenance.md) and [owner media checklist](docs/design/media-checklist.md). Private reference media never enters public output.

## Verify

Install the pinned Playwright Chromium browser once:

```sh
npx playwright install chromium
npm run verify
```

`verify` runs formatting, Oxlint, typecheck, four content unit tests, production build, static SEO validation, and the full Playwright suite. Final results: **70/70 browser tests**, including nine pixel comparisons at 390/768/1440; all six routes at 320/360/375/390/430/768/1024/1280/1440/1920 in both default/reduced motion; axe; real clipboard states; no-JS; landscape/coarse pointer; keyboard/dialog; redirects; enlarged text and genuine native Chromium 200% browser zoom. Console/page errors and broken images fail the route matrix.

Snapshots in `tests/visual.spec.ts-snapshots/` were captured on macOS ARM / Chromium 156, reduced motion, fonts/media settled, exact pixel comparison. Other OS/browser versions require deliberately reviewed baselines; Linux/iOS/Safari equivalence is not claimed. Playwright HTML reports/traces are generated locally and ignored. Milestone screenshots and measured reports are committed under `docs/verification/`.

```sh
npm run measure
npm run profile:motion
npm audit
```

`measure` builds first, uses an isolated gzip static server and the installed Chromium, and saves four Lighthouse HTML/JSON reports plus `lighthouse-final-summary.json`. `profile:motion` samples default-motion interactions at 390×844 with 4× CPU and constrained mobile networking; build first. These are lab measurements, not field INP/60fps certification. See [motion release record](docs/verification/milestone-14.md) and [original release record](docs/verification/milestone-08.md), [M7 measurement conditions](docs/verification/milestone-07.md), [tool availability](docs/verification/tool-discovery.md) and [external link check](docs/verification/external-links.md).

No new runtime dependency was added. Dev tools: Playwright/axe, Prettier and Lighthouse. The Tailwind 3 selector-parser override patches its build-time advisory; a fresh `npm ci` and audit are recorded. No high/critical/moderate advisory remains in the recorded audit.

## Cinematic motion upgrade

Four signature scenes use existing assets: masked identity/portrait curtains, bounded reactive portrait lighting, a three-project CSS depth stack, and one local pixel-edge handoff. The index uses280ms FLIP filtering; case titles/media, native zoom, navigation and real contact feedback share the same vocabulary. No new library or runtime dependency was added.

The sticky/perspective scene requires a fine pointer and at least1100×720 CSS pixels. It occupies about two desktop viewports, uses native scrolling, supports direct project selection and focus, and releases normally. Mobile/coarse/reduced/no-JS show the ordered project presentation. Pointer effects settle and stop; keyboard/Escape/focus never wait. The old global cross-document fade was removed after actual Chromium aborts; native routes and controlled case-entry motion remain.

[Motion direction and attribution](docs/design/motion-direction.md), [final review](docs/design/motion-review.md), and [performance comparison](docs/verification/motion-comparison.md) record the exact choices and limits. Before-and-after videos, decoded timelines and screenshots are in `docs/verification/motion/{before,after}/`. Milestone11–13 intermediate videos are retained too. All recordings show the actual owner site; reference videos remain private and excluded from deployment.

Reproduce the evidence after building:

```sh
node scripts/record-motion.mjs after
node scripts/review-motion-video.mjs after desktop
node scripts/review-motion-video.mjs after mobile
node scripts/measure.mjs motion-after
node scripts/profile-motion.mjs
node scripts/profile-motion.mjs --desktop
```

Recordings use default motion and Chromium; the review utility decodes actual VP9 with Playwright's bundled FFmpeg (override `FFMPEG_PATH` if needed). Lighthouse reports use separate `motion-before-*` and `motion-after-*` names. The CPU profiles write `motion-after-mobile-profile.json` and `motion-after-desktop-profile.json`; they sample Event Timing/heap, not field INP or leak/60fps certification. Physical iOS/Android and screen-reader hardware still need owner testing.

## Vercel release and rollback

**Deployment has not been performed.** Use the existing Vercel project that owns `portfolio-toki20.vercel.app`; do not assume the independent legacy `portfolio-flax-one-59` deployment is its primary alias. Account/team selection and production publication are owner actions. Current verified public-link availability does not represent this new build being live.

Settings: Vite preset, Node 22.x, install `npm ci`, build `npm run build`, output `dist`. Keep `vercel.json`: clean URLs, no trailing slash, HTTP-to-HTTPS/index redirect, security and asset/font cache headers. Do not add a catch-all SPA rewrite; it would hide real 404s. No runtime environment variables are required. `.vercelignore` excludes private references and QA material from CLI uploads.

After reviewing the final local commit, the owner can use the official Vercel CLI:

```sh
npx vercel link
npx vercel deploy
```

Choose the existing project/team. Check the preview's six routes, media, menu, mailto, galleries, unknown-route 404, headers and social cards. Preview builds have `noindex` and robots `Disallow: /`. When ready, **create a fresh production-context build**:

```sh
npx vercel deploy --prod
```

Do not directly promote a preview artifact: its build-time noindex would remain embedded. On production verify robots allows crawling, canonical/OG/schema use the target origin, all six routes return 200, an unknown URL returns 404, redirects preserve queries, fonts/images return correct types and cards are 1200×630. Recheck mobile and social previews against the real CDN. Record the deployment URL/commit in the release log; no domain/DNS/analytics changes are part of this handoff.

Before release, retain the previous known-good **production** deployment URL/commit. If necessary use the Vercel project **Deployments → previous production deployment → Rollback** flow, then verify the production alias and key routes again. Never delete the previous artifact before acceptance. CLI alternative: `npx vercel rollback <previous-production-deployment-url>`. Confirm plan/account availability in [Vercel's rollback documentation](https://vercel.com/docs/deployments/rollback-production-deployment). See [Vite deployment guidance](https://vercel.com/docs/frameworks/frontend/vite).

## Search Console and remaining owner inputs

`public/google711de76d62b8d616.html` is preserved unchanged. After production deployment, confirm the verification URL serves that exact file, use the issuing Google account to verify the URL-prefix property `https://portfolio-toki20.vercel.app/`, then submit `/sitemap.xml`. Optional HTML-tag verification uses `GOOGLE_SITE_VERIFICATION` (the exact tag content, not filename); see `.env.example`. Account verification/indexing was not performed.

Optional content: higher-resolution owned portrait, verified resume/current availability, more tool-in-use screenshots, and GuestReco source/media detail. No placeholder controls or invented substitutes ship for missing items. LinkedIn returns HTTP 999 to automation; its original URL remains. Physical iOS/Android, assistive-technology hardware and field Core Web Vitals need owner/device follow-up; no claim that emulation replaces them.
