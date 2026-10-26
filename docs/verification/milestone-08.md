# Milestone 08 — final release verification and polish

Completed all eight milestones in the owner-confirmed isolated checkout. Original `/Users/jameskierdoliguez/projects/portfolio` remains untouched; no push/deployment/domain or account-side change occurred. Final implementation retains React/TypeScript/Vite/Tailwind 3/npm and the existing real identity, content, links and hashes. Six crawlable pages plus actual 404, three substantive featured studies, GuestReco note, real filters/media/contact, approved palette and coordinated accessible motion are delivered.

## Final changes

Formatted all application/scripts/tests/build config. Simplified projects from legacy-plus-overrides into one explicit typed record per project, with media as the single image metadata owner. Removed unused config copy (unsupported response/status/availability claims), Icon/FluidBackground, old surrogate assets, old fonts and unused styles. Retained optional verified resume/current availability, hidden when absent; footer identity/location come from config. Tablet visual review found caption overlapping app text; resolved with opaque derived-rose strip, reviewed and regenerated affected baselines. Added nine final full-page snapshot comparisons, explicit Vercel cleanUrls, .vercelignore, Node 22 engine, reproducible verify/measure commands and detailed README/run/release/rollback/Search Console instructions. No runtime dependency added.

Source owners: src/config/{site.ts,seo.json}, src/content/{projects,validation}.ts, src/App.tsx and components/portfolio, foundation/hero/work/case-study/life CSS, hooks. Output owners: scripts/{generate-brand-assets,prerender,seo,check-seo,preview,measure,profile-motion}.mjs, public/{projects,fonts,og}, vercel.json. Final exact diff is this milestone commit (mostly formatting plus the cleanup above).

## Executed validation

- Fresh `npm ci`: PASS, 227 installed packages; Node 22.22.3 / npm 10.9.8. A transitive OpenTelemetry package prints a deprecation notice; no runtime use by the website. `npm audit --json`: zero vulnerabilities, dependency-audit.json.
- `npm run verify`: PASS after fresh install. Includes Prettier check, Oxlint, tsc, 4/4 meaningful content tests, production build, six-page static SEO checks and **48/48 Playwright tests**.
- Browser coverage: all six routes × ten widths 320/360/375/390/430/768/1024/1280/1440/1920; one H1, actual images, canonical, no horizontal overflow, console/page errors. Landscape phone 844×390 coarse pointer and tablet 1024×768, desktop fine pointer, no-JS/static core, keyboard menu/gallery/Escape/focus, real clipboard success/denial, URL filters/back/reload, media bounds, redirect and actual 404 recovery.
- Accessibility: zero axe violations in header/hero/home/index/four study/dialog scans. Lighthouse 100 accessibility. Native 200% Chromium page zoom verified by doubled DPR/halved CSS viewport (not pinch), all routes fit, menu/contact operate; enlarged-text test also passes. This is not full assistive-technology certification.
- Visual: nine reviewed macOS ARM/Chromium 156 reduced-motion full-page baselines at 390/768/1440 for home/index/PesoFlow; initial captures then **subsequent exact pixel comparison**, all pass. Final tablet index reviewed after caption fix. Earlier mobile/desktop hero/work/study/home captures and native zoom reviewed. Pixel diffs disabled nowhere (maxDiffPixels: 0). Snapshot updates are explicit development operations, not automatic acceptance in verify.
- `npm run measure`: PASS on the final cleaned build, isolated gzip production server, four raw HTML/JSON reports plus lighthouse-final-summary.json. No concurrent browser/test workload.
- `npm run profile:motion`: PASS scripted default-motion mobile profiling; exact Event Timing/long-task/heap/idle data in motion-profile.json. Final sampled event durations 16–72ms, one 52ms long task during startup/interactions, zero idle animations and CLS 0 in that run. A local lab proxy, not field INP or measured 60fps.
- `git diff --check`: PASS. Final SEO check and content/provenance review complete. Milestone records 01–08 exist; eight distinct commits carry the checkpoints. The introducing commit identifies M8; final response reports its exact SHA after commit creation.

## Final Lighthouse measurements

Lighthouse 13.5.0 / Chromium 156. Mobile preset 412×823, simulated 4× CPU, 150ms RTT and 1.6384Mbps download; desktop preset 1350×940. Local gzip static production output, one run per page/device. Scores may vary on deployed infrastructure and hardware.

| Page / device | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home mobile | 99 | 100 | 100 | 100 | 2.1s | 0ms | 0 |
| Home desktop | 100 | 100 | 100 | 100 | 0.5s | 0ms | 0 |
| PesoFlow mobile | 98 | 100 | 100 | 100 | 2.3s | 0ms | 0 |
| Index mobile | 98 | 100 | 100 | 100 | 2.4s | 0ms | .032 |

Final build: JavaScript 258.59 kB / 80.08 kB gzip; CSS 34.90 / 7.77 kB. Baseline 287.49 / 85.46 kB JS, 25.37 / 6.02 kB CSS. Added UI/route styles increase CSS while the shipped JS decreases; no claim of a measured baseline Lighthouse improvement.

## Tools and review evidence

Actual installed tool/skill and source-reviewed/manual fallback status is in tool-discovery.md. Apple Design guidance, source-reviewed UI-UX Pro Max, Hallmark, shadcn, Emil and refreshed web-interface rules applied. Headless/Graphify/Ponytail exact plugins unavailable: actual Playwright Chromium, rg/static import map and documented simplicity review used. No fabricated plugin invocation/CLI generator or independent agent. Final guideline, originality, Graphify impact and Ponytail fallback findings are recorded in design-audit.md. Remote project/demo/source URLs returned 200; LinkedIn restricts automation (999), external-links.md.

## Screenshots and release limits

Final snapshot artifacts: tests/visual.spec.ts-snapshots/{home,index,study}-{390,768,1440}-darwin.png. Milestone evidence: docs/verification/screenshots/, including native zoom and throttled contact. Lighthouse HTML reports include actual device captures. Reference media remain analysis-only and excluded from public output/CLI uploads.

No known blocking application issue remains in executed checks. Remaining owner/manual actions: optional higher-resolution portrait, verified resume/current availability, additional tool-in-use media, GuestReco evidence; physical iOS/Android and screen-reader pass; live CDN/deployment routing/social preview checks and real visitor INP/Core Web Vitals after an authorized production release. Search Console verification/indexing requires the owner's account. Direct preview promotion is inappropriate because noindex is embedded at build time; create a fresh production-context deployment per README. The independent legacy domain is still live and unchanged. No production deployment is claimed.

Commit: introducing commit of this record.
