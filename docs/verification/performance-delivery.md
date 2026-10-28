# Performance delivery and search identity — 2026-10-28

## Outcome and scope

All three sequential clean-profile local Lighthouse samples meet the owner's **95+ Performance** target on home/mobile, home/desktop, PesoFlow/mobile and the project index/mobile. Accessibility, Best Practices and SEO are **100 in every final sample**. The deployed baseline is **55**, reproduced in a fresh Chrome profile, and **58** on a second attempt. Those remote scores and the local scores are different environments; this is not a claim that production has already improved from 55 to 95+. A post-deployment production audit remains required.

The owner's Search Console last-crawl timestamp, **Oct 27, 2026, 01:58:37**, predates the Oct 28 branding change. Live ordinary/crawler-user-agent requests already return Jameskier Doliguez, Toki, the correct canonical and valid icon files. The stale search result is consistent with the earlier crawl. The new source uses one stable 192px PNG favicon and ordered fallback site names; Google controls its eventual displayed result. See [branding follow-up](search-branding.md).

## What the supplied reports and production trace show

Swift PDFKit read all five pages of each supplied PDF. Both score 55, with FCP/LCP around 9.7–10 seconds, TBT 0 and CLS 0–0.001. Desktop explicitly identifies a 9.4-second initial-document delay; both report a robots fetch timeout. The owner used a normal Chrome profile without VPN.

Fresh headless Chrome reproduced 55 without extensions: FCP 12.2s, LCP 12.5s, TBT 0, CLS 0 and SEO 92 due to a robots timeout. The trace shows slow responses for stylesheet (~11.1s to headers), Archivo (~10s) and portrait (~13.6s), including cold Vercel MISS responses. JS alone was not the main blocker. Repeated production timing was variable; later crawler-style checks completed in 0.31–0.63s. These observations identify delivery latency in the measured path; they do not establish a permanent Vercel origin defect or prove verified Googlebot crawled.

Unchanged commit `7116017` scores **96 mobile / 100 desktop / 99 PesoFlow / 95 index** locally. Production and baseline evidence is retained in performance-live-baseline.json and performance-before-summary.json. Actual network/trace reports remain local and ignored.

## Implemented changes and tradeoffs

- Prerender embeds Vite's actual compiled CSS and the existing self-hosted Archivo face. There is one maintained source of styles. The external font preload is removed in production, avoiding a duplicate transfer. The embedded font uses a brief block during decoding.
- The normal 800px portrait AVIF is embedded in both static markup and client rendering, keeping hydration consistent. SHA verification confirms identical reviewed image bytes. Higher-resolution 1200/1600px AVIF and all WebP alternatives remain available. Hero sizes now reflect its actual mobile inset.
- Composition previews gain correct 320px candidates, with separate explicit sizes for primary and secondary screens. Existing PokeChamp/PixelTools covers now expose their already available responsive sources. Full-size gallery assets remain untouched. An automatic-sizing experiment produced blank previews in full-page capture; it was replaced with stable explicit sizes and the affected screenshots/tests were rerun.
- Short browser caching covers project WebPs and Toki icons (1 hour, with background revalidation), plus tech marks and robots. Project HTML is not matched by the image rule. Hashed assets retain immutable caching. Vercel's static CDN caching is already automatic; this does not promise removal of every cold network delay.
- One `rel=icon` points to the stable 192px Toki PNG, a Google-supported raster format. SVG/ICO/Apple/conventional files remain available. Preferred site name is Jameskier Doliguez, with Toki, toki. and the lowercase production hostname as ordered alternatives. Nine-route SEO checks enforce this.

The root document grows from **9,621 to 81,046 gzip bytes, because critical assets travel together. Client JS grows from 91.57 to approximately 115.3kB gzip because the portrait is shared with hydration. This is a deliberate cold-delivery tradeoff. The complete home audit's transfer weight nevertheless falls from 415,175 to 354,311 bytes as preview overfetch decreases. No dependency, framework, route, tracking service, public reference asset or replacement photograph was added.

## Matched final Lighthouse samples

Lighthouse 13.5.0; installed Google Chrome 156.0.8078.73; macOS ARM; fresh profiles; local gzip production preview; default motion. Mobile: 412×823, DPR1.75, simulated Slow4G 150ms RTT / 1,638.4Kbps, CPU4×. Desktop: 1350×940, default desktop preset. Final audit driver is Node22.23.4. Audits run sequentially with no concurrent heavy browser work.

| Page | Performance, three runs | Median | Median LCP |
| --- | --- | --- | --- |
| Home / mobile | 98, 98, 97 | 98 | 2.18s |
| Home / desktop | 100, 100, 100 | 100 | 0.56s |
| PesoFlow / mobile | 98, 98, 98 | 98 | 2.25s |
| Project index / mobile | 96, 95, 96 | 96 | 2.63s |

All final samples have TBT 0ms. Home/index CLS is effectively 0. PesoFlow has CLS **0.0154**, caused by one description line rewrapping during font decoding, within the 0.1 budget; it is not reported as zero. Index LCP remains slightly above 2.5s despite the 95+ score. Lab scores do not establish field INP or real-user percentile performance.

In a separate controlled browser experiment with 4× CPU, 150ms RTT, 1.6384Mbps and **an extra 1,500ms delay per external /assets/ or /fonts/ request**, matched home LCP changes from 2.25s to 0.56s. The optimized first screen has no external CSS/font/normal portrait request. This is fault-injection evidence, not a deployed Lighthouse score.

## Verification and review

- Production build, formatting, Oxlint, TypeScript, four content unit tests, nine-route static SEO and all existing screenshot/portrait/logo integrity hashes: PASS. Node22 build compatibility verified.
- **96 browser checks pass** using installed Chrome with the missing bundled-browser zoom and old-engine pixel baselines excluded. This includes routes, all responsive widths, default/reduced motion, keyboard, touch, no-JS, axe, gallery controls, contact, hover persistence and Retina portrait density.
- After the final explicit-size correction, **20 affected browser checks pass**, including project previews, galleries, real touch, layout, favicon, delayed first paint and actual source-width descriptors. The final earlier branding-only rerun also passes four checks. Tests/config/raw QA remain ignored per owner instruction.
- The deliberately held-asset check confirms visible heading, decoded embedded portrait and loaded Archivo before external JS is released; after release, hydration and disclosure interaction work without browser errors.
- **18 actual browser screenshots**, before/after home/index/PesoFlow at 390/768/1440, in `docs/verification/screenshots/performance/`. All nine pairs preserve settled heading geometry and page height, without overflow or page errors. Full-image decoding is required. Visually reviewed the desktop hero, mobile index, desktop PesoFlow and stable 192px Toki monogram. Portrait bytes and detailed comparison conditions are in performance-browser-evidence.json.
- The standard `npm run verify` is not claimed fully green: bundled Chromium is absent; existing strict pixel baselines were made with another browser build. No tolerance or baseline was weakened. Native extension-based 200% zoom, physical devices and other engines remain explicit verification limits.
- Simplicity/motion review: runtime choreography and pointer/scroll loops are unchanged; CSS/WAAPI remain finite with existing keyboard/touch/reduced-motion paths. No animation package, idle loop, layout-on-scroll effect or framework migration. Apple Design and the existing animation standards were consulted; no external reviewer or unavailable plugin is claimed.

Logs: `/private/tmp/portfolio-performance-{final-checks,final-build,final-browser,image-recheck,review}.log` and `/private/tmp/portfolio-brand-final-browser.log`. Raw Lighthouse HTML/JSON is in the ignored `docs/verification/*.report.*`; the three compact final summaries are tracked.

## Reproduction and deployment follow-up

With the retained local QA and dependencies, use Node22, build and run one command at a time:

```sh
npm run build
npm run check:seo
npm run check:media
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/measure.mjs performance-check
npx playwright test --config .local/playwright-search.config.ts --grep-invert 'visual |200% browser zoom'
```

Publishing this combined performance/branding update requires owner approval; it has not been pushed or directly deployed in this checkpoint. After deployment, check all live canonical/name/icon/robots responses, run a clean-profile production Lighthouse audit, and compare the same presets. In Search Console, inspect the homepage, run Test live URL, confirm the corrected head, and Request indexing. Google can take days to weeks to recrawl; do not claim the displayed search name/favicon has changed until observed.

Primary guidance: [LCP optimization](https://web.dev/articles/optimize-lcp), [Vite explicit asset inlining](https://vite.dev/guide/assets#explicit-inline-handling), [Vercel static caching](https://vercel.com/docs/caching/cdn-cache), [site-name alternatives](https://developers.google.com/search/docs/appearance/site-names), [favicon eligibility](https://developers.google.com/search/docs/appearance/favicon-in-search).
