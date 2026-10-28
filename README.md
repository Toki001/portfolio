# Jameskier Doliguez — toki. portfolio

An editorial engineering portfolio continuing the existing React 19, TypeScript, Vite 8, Tailwind 3 and npm application. Nine indexable pages are prerendered to HTML and hydrated for navigation, filters, galleries and clipboard feedback. Production needs no Node server, database or contact backend.

Twenty local milestone checkpoints cover the initial redesign, cinematic motion and Phase 3 editorial upgrade (15–20). The owner-confirmed original `/Users/jameskierdoliguez/projects/portfolio` was preserved. Nothing was pushed or deployed.

## Run locally

Use Node **22.x** (verified with 22.22.3).

```sh
npm ci
npm run dev
```

To review the real static production router and HTTP 404s:

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173. Build generates brand assets, client output, nine indexable routes, custom 404, schema and crawl files. `dist/` is the deployable artifact; the temporary SSR bundle is removed. Vite's development fallback is not the production HTTP router.

## Routes and verified work

| Route                   | Evidence                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `/`                     | Editorial portrait, introduction, six featured projects, capabilities, tools, about and contact |
| `/projects`             | Seven projects; URL-backed All/Mobile/Web/AI/Systems/Tools filters                              |
| `/projects/peso-flow`   | Flutter local-first finance app; Home, Budgets, Analytics                                       |
| `/projects/pokechamp`   | Pokémon builder, Showcase and Meta Analytics                                                    |
| `/projects/pixeltools`  | Directory plus working Crop, Resize and Rotate tools                                            |
| `/projects/guest-reco`  | Limited source-verified project note; Dashboard, Camera Grid, Employees client views            |
| `/projects/resolvehub`  | Internal support workflow; Conversation, Knowledge, Review                                      |
| `/projects/reconcileiq` | Synthetic local finance workspace; Overview, Invoices, Reconciliation, Exceptions               |
| `/projects/reimagined`  | Original fixture workflows; Studio, Browser Comparisons, React Export                           |

All **23 different real views** have captions and provenance in [media manifest](docs/verification/project-media-manifest.md). Empty isolated client fixtures and historical captures are explicitly distinguished from working backends. GuestReco claims no recognition accuracy, real camera operation or deployment. Missing release/source URLs stay hidden. [Project inventory](docs/verification/project-inventory.md) records inclusion and deferral decisions. Unknown URLs return the custom HTTP 404; original section IDs and routes remain.

Galleries support named thumbnails, touch swipe, previous/next, URL reload, keyboard and native zoom with focus return. Vertical scroll/pinch stay native. Email opens a draft; Copy email reports real success/failure. No email was sent during QA. Static content, navigation, native disclosures and full-size image links remain available without JavaScript.

PesoFlow's [current UI refresh](docs/verification/pesoflow-refresh.md) uses fresh 2× renders of its actual charcoal Home/light, Budgets/light and Analytics/dark screens. Its case-study gallery presents three staggered, softly framed phones on desktop and one readable selection on compact screens. Featured cards, thumbnails and the share image use the updated app too. The app source stays untouched; captures use its existing fixture harness in a private isolated copy. `scripts/import-pesoflow-media.mjs` and `scripts/optimize-project-artwork.mjs` import reviewed captures; normal builds need only the retained public assets and compact provenance.

## Content and design

- `src/config/site.ts`: actual identity/bio, the owner-requested **toki.** wordmark with a burgundy full stop, socials, tools/capabilities, optional availability/resume. Unsupported values stay hidden.
- `src/content/projects.ts` / `additional-projects.ts`: typed, verified records and stable slugs. `validation.ts` rejects unsafe links, duplicate/unstable slugs and incomplete media.
- `src/content/project-media.ts`: generated public metadata. Owner-local capture/import scripts are optional; ordinary build uses committed images without accessing other projects. Review source/privacy first, run `scripts/import-project-media.mjs`, then `npm run check:media`; never edit output hashes to bypass verification.
- `src/config/seo.json`: real production origin and metadata. Origin changes also require redirect/canonical-test updates.
- `src/styles-tokens.css`: five-color palette, derived tints, spacing and motion. One self-hosted OFL Archivo variable font, light mode, no animation library.
- `public/projects/`: responsive owned WebP media. `npm run assets:brand` regenerates the original **tk** monogram from `src/brand/toki-symbol.svg` (fresh toki SVG/ICO/PNG/Apple paths, Safari mask and conventional favicon fallbacks), manifest and eight 1200×630 JPEG share cards. Full build does this automatically. Navbar remains **toki.** with its burgundy dot.

[Phase 3 direction](docs/design/phase-3-motion-and-content-direction.md) maps all five video references to original composition and motion choices. The arch/window portrait was replaced with an open, softly rounded graduation portrait with inset padding beside oversized asymmetric type. Actual responsive lines reveal through masks across home/index/studies. Capabilities use a three-layer engineering diagram, exclusive hover/native disclosures, logo-and-name badges, masked titles and related-project links. The workbench illustration follows fine-pointer row hover, keyboard focus or tap/click selection and retains the last selection when the pointer leaves; the full project index now has a larger burgundy CTA. The existing short three-project depth stack leads into three differently composed project spreads.

One shared observer handles editorial entrances. Workbench selection has no scroll observer; only deliberate hover/focus/activation changes it. Layout is measured on font/resize changes. Native scrolling, fast jumps, keyboard, offscreen cleanup, reduced motion and no-JS retain full content. Fine-pointer lighting/depth is bounded and settles. Mobile has normal-flow work and touch controls. No wheel interception, global smooth-scroll wrapper or looping background.

## Verification and review artifacts

At the owner's request, `tests/`, `playwright.config.ts`, browser reports, screenshots, videos and raw Lighthouse reports are **local-only and ignored**. They remain on this machine; none were deleted by untracking. The normal `npm ci`, build and preview work without these QA files. Full `npm run verify` requires the local suite/config; a fresh checkout does not contain them. Earlier tracked QA can be recovered from `8132d7b` using `git restore --source=8132d7b --worktree -- tests playwright.config.ts`, then browser-review current visual baselines. This restores the earlier suite, not the two new local refinement checks.

The latest portrait derivatives come from the owner's 24MP original, with EXIF orientation normalized and metadata stripped. AVIF/WebP at 480/800/1200/1600px support high-density displays; only the selected format/size downloads. `scripts/prepare-portrait.mjs /path/to/original.JPG` regenerates them. Original files and machine-specific archives stay outside Git.

```sh
npx playwright install chromium
npm run verify
```

Verification runs Prettier, Oxlint, TypeScript, four content unit tests, production build, static SEO/media checks and Playwright. Coverage includes nine exact visual comparisons, all nine routes at 320/360/375/390/**414**/430/768/1024/1280/1440/1920 in default/reduced motion, axe, real clipboard outcomes, portrait failure, all featured links/filters, seven multi-screen galleries, real touch gestures, no-JS, landscape, keyboard and native Chromium 200% zoom.

The M20 baseline passed **95 browser checks and four unit tests**; the refinements add Retina, hover/exclusivity, workbench persistence, touch/keyboard and no-JS checks. See [current refinement record](docs/verification/refinement.md) for that run; [hover update](docs/verification/hover-sections.md) records the latest interaction verification. The project index reserves filter geometry before hydration to avoid layout shift; inactive no-JS controls remain hidden. M20 Lighthouse performance: home mobile 97, desktop 100, PesoFlow mobile 99, index mobile 95; Accessibility/Best Practices/SEO 100 throughout and CLS 0. Home/index LCP 2.56/2.85s remain explicit tradeoffs in the comparison record.

[Portrait, toki branding and GitHub skills audit](docs/verification/brand-skills.md) records the subsequent update. The portrait has matching rounded insets at every edge. Six capability groups and six workbench entries are grounded in the owner's public repository source, manifests and tests; [file evidence](docs/verification/github-skills-evidence.json) records exact upstream blobs. No self-assigned proficiency scores or unsupported tooling claims.

Baselines use macOS ARM / Chromium 156, reduced motion, settled font/media and exact pixel comparison. Other engines/OS need reviewed baselines. Playwright reports/traces are local and ignored. [Final verification](docs/verification/milestone-20.md), [comparison viewer](docs/verification/phase-3-comparison.html), [comparison record](docs/verification/phase-3-comparison.md), and [final design review](docs/design/phase-3-final-review.md) contain results and limits. Previous milestone evidence remains local and recoverable in Git history; compact audits/provenance remain tracked.

Reproduce evidence after building, one command at a time:

```sh
node scripts/measure.mjs phase3-after
node scripts/profile-motion.mjs phase3-after
node scripts/profile-motion.mjs phase3-after --desktop
node scripts/record-motion.mjs phase3-after
node scripts/record-catalog.mjs phase3-after-catalog
node scripts/review-motion-video.mjs phase3-after desktop
node scripts/review-motion-video.mjs phase3-after mobile
node scripts/review-motion-video.mjs phase3-after-catalog desktop
node scripts/review-motion-video.mjs phase3-after-catalog mobile
```

These run local gzip production previews and installed Chromium. Lighthouse writes four HTML/JSON reports and a summary. Profiles record scripted Event Timing/heap with 4× CPU and constrained networking; they do not measure field INP, certify 60fps or prove no memory leaks. Recordings are actual VP9 browser output; the review utility uses Playwright's bundled FFmpeg (`FFMPEG_PATH` override available). Label arguments preserve earlier evidence. Physical iOS/Android, Safari/Firefox and screen-reader speech remain owner checks.

No portfolio runtime/library dependency was added. Fresh `npm ci` reproduces the retained lockfile and reports zero vulnerabilities. [Tool discovery](docs/verification/tool-discovery.md) distinguishes installed/source-reviewed skills, actual connected GitHub use and unavailable plugin fallbacks. Reference assets and private provenance never enter the deployed output.

## Vercel release and rollback

**No deployment was performed by this agent.** The owner-confirmed production domain is `https://jameskier-doliguez-portfolio.vercel.app/`. `src/config/seo.json` supplies the origin for generated sitemap, robots, canonicals, social metadata, schema and crawl links; the HTTPS redirect in `vercel.json` must match. Account/team selection and production publication are owner actions. Public-link availability does not represent the latest local build being live.

Settings: Vite preset, Node 22.x, install `npm ci`, build `npm run build`, output `dist`. Keep `vercel.json`: clean URLs, no trailing slash, HTTP-to-HTTPS/index redirect, security and asset/font cache headers. Do not add a catch-all SPA rewrite; it would hide real 404s. No runtime environment variables are required. `.vercelignore` excludes private references and QA material from CLI uploads.

After reviewing the final local commit, the owner can use the official Vercel CLI:

```sh
npx vercel link
npx vercel deploy
```

Choose the existing project/team. Check the preview's nine routes, media, menu, mailto, galleries, unknown-route 404, headers and social cards. Preview builds have `noindex` and robots `Disallow: /`. When ready, **create a fresh production-context build**:

```sh
npx vercel deploy --prod
```

Do not directly promote a preview artifact: its build-time noindex would remain embedded. On production verify robots allows crawling, canonical/OG/schema use the target origin, all nine routes return 200, an unknown URL returns 404, redirects preserve queries, fonts/images return correct types and cards are 1200×630. Recheck mobile and social previews against the real CDN. Record the deployment URL/commit in the release log; no domain/DNS/analytics changes are part of this handoff.

Before release, retain the previous known-good **production** deployment URL/commit. If necessary use the Vercel project **Deployments → previous production deployment → Rollback** flow, then verify the production alias and key routes again. Never delete the previous artifact before acceptance. CLI alternative: `npx vercel rollback <previous-production-deployment-url>`. Confirm plan/account availability in [Vercel's rollback documentation](https://vercel.com/docs/deployments/rollback-production-deployment). See [Vite deployment guidance](https://vercel.com/docs/frameworks/frontend/vite).

## Search Console and remaining owner inputs

`public/google711de76d62b8d616.html` is preserved unchanged. After deploying the domain correction, confirm the verification URL serves that exact file, use the issuing Google account to verify the URL-prefix property `https://jameskier-doliguez-portfolio.vercel.app/`, then resubmit `https://jameskier-doliguez-portfolio.vercel.app/sitemap.xml`. Optional HTML-tag verification uses `GOOGLE_SITE_VERIFICATION` (the exact tag content, not filename); see `.env.example`. Account verification/indexing was not performed. See [domain correction](docs/verification/production-domain.md) for checks.

Optional content: higher-resolution owned portrait, verified resume/current availability, more tool-in-use screenshots, and GuestReco source/media detail. No placeholder controls or invented substitutes ship for missing items. LinkedIn returns HTTP 999 to automation; its original URL remains. Physical iOS/Android, assistive-technology hardware and field Core Web Vitals need owner/device follow-up; no claim that emulation replaces them.

### Google search site name and favicon

`src/config/seo.json` sets the preferred site name (**Jameskier Doliguez**) and alternate (**Toki**). The build emits one consistent `WebSite` entity, Open Graph site name and application name into the static HTML. The home page links the existing stable `/toki-icon-192.png` directly as a 192×192 PNG favicon alongside the browser SVG/ICO variants. `npm run check:seo` validates these signals on every indexable route.

After the updated build is deployed, inspect `https://jameskier-doliguez-portfolio.vercel.app/` in Search Console, select **Test live URL**, check the tested HTML for the site name and favicon link, then select **Request indexing** for the homepage. Google selects the displayed name and favicon automatically; a successful deployment or indexing request does not update the search result immediately. See [search branding verification](docs/verification/search-branding.md).
