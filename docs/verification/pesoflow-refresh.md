# Current PesoFlow UI and multi-screen preview

2026-10-27. Owner requested the PesoFlow “Inside the interface” preview follow four supplied compositions and reflect the actual updated app. No framework, route, portfolio palette, functionality or production-domain change. No push or deployment.

The references inform three rounded phone-sized surfaces, quiet background, staggered heights, room between screens and restrained depth. Their people, financial numbers, payment/card details, product screenshots and UI are not portfolio assets. The new desktop spread shows actual Home/light, Budgets/light and Analytics/dark together. At <=768px one selected phone stays readable, with existing thumbnails/arrows/swipe rather than three tiny columns. Selecting a card updates the caption, pressed state, URL and zoom target. Existing keyboard, modal/Escape/focus return and no-JS full-image links remain.

One shared editorial observer coordinates the three screen entrances: 620ms with 70ms stagger, shortened to 380ms on compact viewports. It runs once and respects existing fast-scroll, keyboard, reduced-motion and visibility cleanup. No timer, autoplay, new observer, dependency or animation library. Phone hover feedback is 180ms and fine-pointer only. Images retain natural 390:844 viewport geometry; no layout-affecting motion.

## Verified source and fresh captures

Read-only local inspection found PesoFlow at `/Users/jameskierdoliguez/projects/PesoFlow`, clean HEAD `db29c0aa0f19a8a9dc619d810dd3ccc5fab15c5b`. Connected GitHub's current public commit matched. Read the app theme, existing production golden harness/font loader and `docs/verification/ui-reference-refresh-20261026.md`; visually reviewed its charcoal/light/dark goldens.

An ignored isolated copy received only capture-harness changes: viewport height set to 844 for the three selected routes, then `RenderRepaintBoundary.toImage(pixelRatio: 2)` exported actual 780×1688 PNGs. Original UI/business code, fixture and font loader were retained. `stitchV7Fixture` supplies synthetic financial data, the repository/platform adapters are fake and the clock is fixed. No original app source, local database, real financial record, camera or production backend was modified.

`flutter test --no-pub test/production_app_test.dart --name '^(home light|budgets light|analytics dark) production golden$'`: **3/3 PASS** for the final 2× exports. A first 1× viewport capture also passed 3/3 before the Retina export. Flutter 3.47.5 / Dart 3.13.4 and installed packages were reused; no dependency installation. This is actual Flutter rendering, not HTML reconstruction, image generation or a crop that moves the bottom navigation.

`scripts/import-pesoflow-media.mjs` imports three reviewed renders as 780/390/195px WebP. [Capture provenance and hashes](pesoflow-media-evidence.json) retain the source revision, capture command/state, original PNG hashes and all nine output hashes/geometries. Full sources are 71,628 / 75,338 / 62,686 bytes; responsive 390px variants are 31,158 / 32,388 / 27,430 bytes. Captions explicitly say demo data and identify Light/Dark.

Updated images appear in the case-study spread, full-size modal, featured Home/index/hero artwork and regenerated PesoFlow social card. Featured artwork keeps 195/390px derivatives and can reuse full 780px sources at high density. Its old 390×860 top crop is replaced with the whole real phone viewport; [artwork evidence](project-artwork-evidence.json) records the new exact source and dimensions. The case study still has **three distinct actual pages**; derivatives do not inflate the count. All other projects retain their real gallery content.

## Browser review and verification

Reviewed actual Chromium screenshots at 1440/768/390/320, all with zero captured page/console errors and no horizontal page overflow. [Desktop composition](motion/pesoflow-refresh/gallery-1440.png), [mobile selected phone](motion/pesoflow-refresh/gallery-390.png), [dark selection](motion/pesoflow-refresh/gallery-dark-selected.png), [full-size detail](motion/pesoflow-refresh/dialog-desktop.png). QA helper explicitly loads hidden lazy images before static inspection; this does not change product loading behavior.

Focused existing gallery/case-study tests: **17/17 PASS**. New Retina three-screen/selection/accessibility and native touch-swipe/vertical-scroll checks: **2/2 PASS**. Nine home/index/PesoFlow exact visual baselines updated after responsive review; no tolerance or accessibility rule relaxed.

`npm run verify`: **104 browser tests and four unit tests PASS**, plus formatting, lint, TypeScript, production build, SEO and media integrity. Checks cover nine routes at eleven widths in both motion modes, nine exact visuals, axe, native 200% zoom, keyboard, no-JS and real touch gestures. 23 distinct genuine gallery screens remain; 3 current PesoFlow screens and their nine variants are independently hash checked.

Final JS is 303.16 kB / 91.55 kB gzip; CSS is 55.55 kB / 11.73 kB gzip. `node scripts/measure.mjs pesoflow-refresh` uses the same Lighthouse 13.5.0 simulated settings as the preceding update: mobile 412×823 at 4× CPU / 150ms RTT, desktop 1350×940 at 1× CPU / 40ms RTT. [Complete settings and results](pesoflow-refresh-summary.json).

| Production page | Performance | Accessibility / Best Practices / SEO |   LCP | TBT | CLS |
| --------------- | ----------: | ------------------------------------ | ----: | --: | --: |
| Home mobile     |          96 | 100 / 100 / 100                      | 2.66s | 0ms |   0 |
| Home desktop    |         100 | 100 / 100 / 100                      | 0.52s | 0ms |   0 |
| PesoFlow mobile |          98 | 100 / 100 / 100                      | 2.25s | 0ms |   0 |
| Projects mobile |          95 | 100 / 100 / 100                      | 2.86s | 0ms |   0 |

Default-motion recordings: [desktop 1440×1000, 4.72s](motion/pesoflow-refresh/desktop.webm), [mobile 390×844, 4.76s](motion/pesoflow-refresh/mobile.webm). Both have zero captured page/console errors. Actual VP9 frames were decoded and reviewed: [desktop timeline](motion/pesoflow-refresh/desktop-timeline.webp), [mobile timeline](motion/pesoflow-refresh/mobile-timeline.webp). [Home featured card](motion/pesoflow-refresh/home-updated-feature.png) and [project-index card](motion/pesoflow-refresh/index-updated-feature.png) were reviewed too.

Lab scores vary; home/index mobile LCP remains above 2.5s under simulated throttle. Local QA sources/config/snapshots, isolated app copy, raw PNGs, videos and raw reports remain ignored as previously requested; compact provenance and audit remain tracked. Chromium/emulated touch does not certify native Safari/Firefox or physical-phone behavior. Prior native app verification belongs to the app's own report, not this portfolio run.

A fresh staged-source export also passed `npm run build`, `npm run check:media` and `npm run check:seo` without tests, Playwright config, `.local/`, the PesoFlow checkout or raw captures. Existing installed dependencies were reused; no installation. Normal portfolio builds require only committed source/assets and compact provenance.

Checkpoint: local commit introducing this record. No push, deployment or original PesoFlow project mutation.
