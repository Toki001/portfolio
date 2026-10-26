# Milestone 20 — Editorial portfolio verification and handoff

Completed locally on 2026-10-26. This closes Phase 3, Milestones 15–20, continuing the existing React 19/TypeScript/Vite 8/Tailwind 3/npm application. The five-color palette, real identity/content, original six routes, contact behavior, static SEO and deployment configuration remain. Seven projects now occupy nine indexable routes. No push or deployment occurred; the original `/Users/jameskierdoliguez/projects/portfolio` checkout was checked read-only and remains clean.

## Delivered

- M15 reviewed all five supplied video timelines and the rejected-hero screenshot, documented two different portrait directions, section storyboard, media/repository inventory and baseline measurements. All five reference pages opened. Reference assets remain private study material.
- M16 replaced the entire burgundy arch/window/grid/lens composition with an open asymmetric editorial layout: original straight-edged graduation portrait, offset caption/action and oversized indented typography with coordinated finite entrances.
- M17 added true responsive line masks, label/rule choreography and selected native-scroll handoffs across home, index and case chapters. Actual text/spaces stay in DOM order; fast scroll, keyboard, resize, reduced motion and no-JS keep it readable.
- M18 added verified ResolveHub, ReconcileIQ and Reimagined cases with Systems/Tools filters, real route/SEO data and no invented public links. Local/GitHub selection and deferrals are recorded in project-inventory.md.
- M19 added five distinct artwork compositions alongside PesoFlow, three additional normal-flow featured spreads and seven functional galleries with 23 actual distinct views. All seven UI projects show at least three real screens; derivatives are never counted as new screens.
- M20 includes the owner's additional request: navbar **toki**, original matching t favicon across SVG/ICO/PNG/Apple sizes, manifest/share-card identity, and coordinated capability/tool row motion. Native row rules draw, real titles reveal through masks, metadata/body stagger, and opening a capability gives its paragraph/tags finite cancellable feedback. Keyboard/reduced motion settle immediately.

No portfolio framework, animation library or runtime dependency was added. Case copy describes actual development workflows and explicit release/fixture limits. GuestReco remains a limited note: genuine client screens with empty isolated data, no recognition accuracy, real-person/camera or deployment claim. ReconcileIQ/Reimagined have no useful released public remote, so unsupported actions stay absent.

## Executed final gates

Fresh `npm ci`: installed 227 packages, audited 228, **zero vulnerabilities**, retained package-lock. Final `npm run verify` **PASS: four unit tests and 95 browser tests** (1.5 minutes). It runs formatting, Oxlint, TypeScript, unit tests, production build, static SEO, media integrity and Playwright.

Coverage includes all nine routes at **320/360/375/390/414/430/768/1024/1280/1440/1920px** in default/reduced motion; original/new route crawl and metadata; all six featured case links and filters/URL history; seven galleries and real touch swipe/vertical scroll; keyboard/menu/dialog/clipboard recovery; portrait failure; fast-scroll/return/resize/live reduction; no-JS; landscape/coarse pointer; native Chromium 200% browser zoom; and nine exact pixel comparisons at 390/768/1440. Tested axe audits pass. Route checks fail on broken images and console/page errors.

New regressions cover actual row entrances, rapid disclosures, keyboard/touch/live reduction and filter hydration geometry. The latter compares initial/hydrated project positions relative to the content frame, because no-JS intentionally has an extra native navigation row. It passes at 390/414/1280. Final visual baselines were deliberately reviewed/refreshed for toki and the authentic phone-art derivatives. No tolerance or accessibility rule was relaxed.

Media gate: 18 imported capture outputs match reviewed hashes/dimensions/traceability; four artwork derivatives match source/output hashes and geometry separately; 23 different gallery files have static fallback links. Normal build/verification uses committed images and never needs private application folders. Owner-local capture/import tools are documented; source projects were not modified.

## Performance and review

Matched local Lighthouse 13.5.0 / Chromium 156, same existing gzip-server/config as M15:

| Page                 | Performance before → after | Final LCP | Final TBT | Final CLS |
| -------------------- | -------------------------- | --------- | --------- | --------- |
| Home mobile          | 98 → 97                    | 2.561s    | 0ms       | 0         |
| Home desktop         | 100 → 100                  | 0.526s    | 0ms       | 0         |
| PesoFlow mobile      | 99 → 99                    | 2.123s    | 0ms       | 0         |
| Project index mobile | 98 → 95                    | 2.854s    | 0ms       | 0         |

Accessibility, Best Practices and SEO: **100 throughout**. Home/index LCP add about 0.36/0.45s versus baseline; index remains above the near-2.5s aspiration. Mobile performance meets the >=95 target. Initial index 94/CLS 0.062 exposed hydration displacement; preserving actual filter geometry removes it. Primary/secondary image priority and reviewed artwork-only crops reduce unnecessary loading without changing full case images. Intermediate diagnostic reports are retained; no blanket claim of unchanged speed is made.

Final production JS **293.75kB raw / 89.15kB gzip**, versus 270.02/83.28 at M15: **+5.87kB gzip**, within 10kB budget. CSS 48.29/10.37 versus 40.94/8.96. All project media are below-fold/lazy except the relevant primary image.

Separate default-motion home profiles at 4× CPU, 150ms RTT and 1.6384Mbps download recorded mobile 9 Event Timing samples of 32–48ms, desktop 12 of 16–24ms; no sampled long tasks and zero idle animations. Maximum sampled input delay 39.6/5.1ms; heaps 5,583,800/5,641,020 bytes. Profile CLS 0 / 0.0000981. Profiles include native menu/featured selection/disclosure and home scrolling through the new spreads/sections; they do not measure every gallery/filter or field INP. Lighthouse and CDP-observer LCP are different methods.

Actual source/browser review is in [final review](../design/phase-3-final-review.md). Physical iOS/Android, Safari/Firefox, screen-reader speech, field traffic, 60fps and long-term leak verification were unavailable and are not certified by these short lab samples.

## Review artifacts and reproduction

- [Before/after player](phase-3-comparison.html), [measurement comparison](phase-3-comparison.md), [final raw summary](phase3-after-summary.json).
- Hero/native-scroll/new row choreography/work/filter/gallery/contact films: `motion/phase3-after/{desktop,mobile}.webm`, recording.json and PNGs including hero, capabilities, tools and their reveal frames.
- All three new cases and three-screen walkthroughs: `motion/phase3-after-catalog/{desktop,mobile}.webm`, catalog-recording.json and case/gallery PNGs.
- Each new case also has native-zoom proof PNGs: `motion/phase3-after-catalog/{desktop,mobile}-{resolvehub,reconcileiq,reimagined}-screen-{1,2,3}.png`. Final home films last 28.28/23.64s and catalog films 19.68/19.32s (desktop/mobile). Both final manifests have empty error arrays.
- The standalone viewer was checked in actual Chromium: all local links exist, all six native videos load metadata/controls, desktop/mobile selection plays both and Pause stops them. See phase-3-viewer-check.json.
- Baseline films: `motion/phase3-before/`; intermediate milestone evidence remains under phase3-m16/m17/m18/m19/m19-home. Decoded twelve-frame timelines derive from actual VP9 recordings, not generated storyboards.
- Native zoom: `screenshots/m7-native-zoom-200.png`. Exact baselines: `tests/visual.spec.ts-snapshots/` (macOS ARM/Chromium 156, settled assets, reduced motion).
- [Project/media source decisions](project-inventory.md), [all 23 view sources](project-media-manifest.md), project-media-evidence.json and project-artwork-evidence.json.
- README documents local development, evidence commands and owner-controlled deployment/rollback. `.vercelignore` excludes references/private kits/docs/tests; only static dist is deployable. Preview-noindex, verification HTML and production origin are retained.

Run `npm ci && npm run verify`, then execute README's labeled measurement/profile/recording commands sequentially. QA recordings use local production pages and actual interactions; clipboard feedback is real, no email was sent. No unavailable plugin, external review agent or physical-device execution is claimed.

## Local milestone history

| Milestone | Commit                            | Checkpoint                                                                 |
| --------- | --------------------------------- | -------------------------------------------------------------------------- |
| 15        | a6dde1f                           | Reference storyboard, two hero directions, baseline and verified inventory |
| 16        | 601e5d8                           | Open editorial portrait/identity                                           |
| 17        | a239893                           | Responsive scroll typography and section handoffs                          |
| 18        | a995084                           | Three verified projects and catalog/SEO expansion                          |
| 19        | 401ccdf                           | Distinct premium artwork and 23 genuine gallery screens                    |
| 20        | Introducing commit of this record | toki identity, capability/tool motion, final verification/evidence/handoff |

The introducing-commit convention avoids a self-referential SHA. Final delivery reports the resolved M20 commit. Six local Phase 3 commits follow ca6f3e0; original checkout remains untouched. No push, remote synchronization, deployment, domain or analytics action.
