# Hover-driven technology stack and workbench

Owner-requested continuation of `8f95afc`, 2026-10-26. Existing React/Vite app, routes, palette, content and local-only QA policy retained. No push or deployment.

Applied the installed `apple-design` and `mobile-native` guidance for input-specific feedback, native controls, reduced motion and touch targets. Source discovery used the connected GitHub app's read-only `fetch_file`/`fetch` tools and official upstream documentation. Existing Playwright/Chromium, axe and Lighthouse provided browser verification; no unavailable design/review plugin is claimed. Earlier discovery remains in [tool-discovery.md](tool-discovery.md).

Technology domains now open on real fine-pointer movement, with only one expanded at a time. Native details[name] provides exclusivity and a toggle fallback handles other engines. Mouse clicks keep the hovered selection open; tap and keyboard retain native expand/collapse. Leaving the list keeps its current domain. Each panel has logo/name badges, with the name on the right in a responsive two/three-column grid. Existing related-project links remain.

Pointer coordinates are checked so layout-driven stationary events do not cascade into other domains. Hover never hides an expanded related-work link that still has keyboard focus. Per-domain scopes cancel their own finite feedback, so one panel closing does not cancel another panel's entrance.

Workbench selection follows row hover, button focus or explicit tap/click. Its previous scroll observer was removed. No leave/reset handler or timer overwrites the last selection when the cursor leaves or scrolling occurs outside the rows. Selected buttons expose aria-pressed, native keyboard behavior and visible focus. Without JS, the six readable tool headings/descriptions remain and selection buttons are disabled. Initial offscreen illustration motion was removed; user-triggered illustration changes settle in 220ms and respect keyboard/reduced motion.

Twenty-five upstream SVG marks are self-hosted; no CDN/icon-font/runtime dependency. Devicon MIT notice and official Riverpod/Hive notices/sources are in public/tech/. All SVGs parse, have no scripts/remote resources and are SHA-256 checked by check:media using tech-mark-evidence.json. Riverpod editor metadata was removed; Hive's existing symbol was cropped out of its official lockup without redrawing paths. Architecture concepts and Drift use original neutral symbols where no dedicated mark was verified. Drift's extension favicon was inspected and found to be the Flutter template, so it was not misrepresented as a Drift logo. TFLite uses the TensorFlow family mark; HTML5/CSS3 shows both marks.

Real-pointer tests verify a stable scrollY while traversing five different domains. Playwright locator.hover itself auto-positioned the target and changed the viewport; manual Chromium pointer movement confirmed no product jump. The regression and final recording use actual pointer coordinates. A full-suite keyboard check also exposed a navigation underline transition on focus; its pseudo-element now snaps for keyboard input.

`npm run verify`: PASS. Formatting, Oxlint, TypeScript, four content unit tests, production build, static SEO/media checks and **100 browser tests** all passed. Browser coverage includes exclusive real-pointer hover, stationary pointer/page-position stability, decoded logo images, persistent workbench selection, focus protection, touch, keyboard, axe, no-JS, nine exact visual comparisons and nine routes at eleven widths in default/reduced motion. Three intentional home baselines were refreshed after desktop/mobile visual inspection. No screenshot tolerance or accessibility rules were relaxed. Focused interaction checks also passed 10/10 before the full run.

The final production bundle is 302.30 kB JS / 91.61 kB gzip and 53.75 kB CSS / 11.47 kB gzip. No dependency was added. `check:media` verifies 25 passive self-hosted logo SVGs separately from 23 genuine gallery screens, eight portrait variants and four phone-art derivatives.

A separate staged-source export, with no tests, Playwright config or `.local/` folder, also passed `npm run build`, `npm run check:media` and `npm run check:seo`. Dependencies were already installed there; no new package installation was needed. All nine routes and bundled assets build independently of ignored QA files, external photo originals and local project checkouts.

`node scripts/measure.mjs hover-sections` used Lighthouse 13.5.0, simulated mobile 412×823 at 4× CPU / 150ms RTT and desktop 1350×940 at 1× CPU / 40ms RTT. Full settings and results: [hover-sections-summary.json](hover-sections-summary.json).

| Production page | Performance | Accessibility / Best Practices / SEO |   LCP | TBT | CLS |
| --------------- | ----------: | ------------------------------------ | ----: | --: | --: |
| Home mobile     |          96 | 100 / 100 / 100                      | 2.71s | 0ms |   0 |
| Home desktop    |         100 | 100 / 100 / 100                      | 0.52s | 0ms |   0 |
| PesoFlow mobile |          99 | 100 / 100 / 100                      | 2.10s | 0ms |   0 |
| Projects mobile |          95 | 100 / 100 / 100                      | 2.85s | 0ms |   0 |

Default-motion recordings from actual production-preview Chromium: [desktop, 1440×1000, 10.4s](motion/hover-sections/desktop.webm) and [mobile touch, 390×844, 8.4s](motion/hover-sections/mobile.webm). Both have zero captured page/console errors; final actions assert exclusivity and retained selection. Their VP9 frames were decoded and visually inspected: [desktop timeline](motion/hover-sections/desktop-timeline.webp), [mobile timeline](motion/hover-sections/mobile-timeline.webp). Settled evidence: [desktop Web badges](motion/hover-sections/desktop-stack-2.png), [mobile Web badges](motion/hover-sections/mobile-stack-2.png), [retained GitHub workbench selection](motion/hover-sections/desktop-tool-2.png). Evidence and local test sources/config/snapshots remain ignored as requested; compact audit, provenance and score summary remain tracked.

Limits: Chromium/macOS and emulated touch were tested; no new physical-device or Safari/Firefox certification. Lab scores vary between runs. Home/projects mobile LCP remains above 2.5s under this simulated throttle; their genuine media remains responsive, with zero measured CLS. Native disclosures still work without JS, but hover enhancement and workbench selection require JS.

Checkpoint: the local commit introducing this record (`feat(portfolio): add exclusive stack hover and persistent tool selection`). No push or deployment.

Before/after source changes are limited to TechStack, ToolsWorkbench, TechMark, section styles, the keyboard indicator rule and logo-integrity checking. The 23 actual case-study screens and all project routes remain intact.
