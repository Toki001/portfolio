# Milestone 14 — Cinematic motion verification and handoff

Completed 2026-10-26 in `/Users/jameskierdoliguez/projects/jameskierdoliguez-portfolio`. This closes the six-milestone upgrade in `CODEX-PORTFOLIO-CINEMATIC-MOTION-PROMPT.md`, following the original eight milestones. React / TypeScript / Vite / Tailwind 3 / npm, all six routes, the five-color palette and approved content remain intact. No push, publication or deployment was performed.

## Final changes and review

- Added `tests/motion-release.spec.ts`: all six routes at ten widths with default motion, actual wheel progression and End escape from the project scene, pointer reset/offscreen fallback, and no-JavaScript routes/gallery links.
- Stopped hero transform writes after it leaves the viewport and prevented hidden-tab frame scheduling. Removed an unused Fragment, obsolete portrait keyframe and unused timing constants; reused the shared line-stagger token. No additional animation abstraction or dependency.
- Extended `scripts/profile-motion.mjs` to measure actual desktop fine-pointer and mobile coarse-pointer interaction paths. Extended the video scenario with explicit project chapters 02/03. Used the existing Playwright FFmpeg binary in `scripts/review-motion-video.mjs` for real recorded-frame review.
- Updated README and motion specification. Added the final [motion review](../design/motion-review.md), [measured comparison](motion-comparison.md), [interactive local video viewer](motion-comparison.html), raw Lighthouse reports, profile JSON and final recordings/screenshots.

The source/browser review resolves the baseline native-transition abort errors, completed-intro replay risk, hidden/offscreen work, accessible scene labels, rapid gallery input and an animation-test waiting issue. No global error suppression or accessibility-rule exclusions. The deliberate removal of the unstable global cross-document fade is documented in milestone 10; ordinary navigation and controlled case-page entries remain. The final review decision is **Approve**, scoped to the code and Chromium paths actually checked.

Reference attribution and the complete scene inventory are in [motion direction](../design/motion-direction.md) and [motion specification](../design/motion-spec.md). Dymas/Mikan informs editorial hierarchy and project staging; Purrweb informs bounded portrait light; Matthew informs name/portrait masks; Vadim informs the short spatial project stack; the studio reference informs the single local pixel edge. All public portraits and product captures remain owner-approved assets. The private reference MP4s remain ignored and excluded from deployment.

## Executed release checks

| Command / check                                                                       | Actual outcome                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fresh `npm ci` using the retained lockfile                                            | PASS; no new package or library                                                                                                                                                                                                          |
| `npm audit --json`                                                                    | Zero vulnerabilities; `motion-dependency-audit.json` retained                                                                                                                                                                            |
| `npm run verify`                                                                      | PASS: formatting, Oxlint, TypeScript, four content unit tests, production build, SEO and 70/70 browser tests                                                                                                                             |
| Nine exact visual comparisons                                                         | PASS at 390 / 768 / 1440; intentional home and desktop study snapshots reviewed in earlier milestones                                                                                                                                    |
| Default and reduced motion                                                            | All six routes at 320 / 360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920; no horizontal overflow or console/page errors in route checks                                                                                           |
| Interaction / accessibility checks                                                    | Tested axe paths pass; native 200% browser zoom, landscape touch, enlarged text, keyboard focus, dialog Escape/restitution, live reduction, rapid filter/gallery input, real clipboard success/failure, links and URL/history state pass |
| No JavaScript                                                                         | All six static pages and genuine full-size gallery links pass                                                                                                                                                                            |
| Native wheel / keyboard escape                                                        | Scroll advances 01→02→03; End reaches footer; no scroll lock                                                                                                                                                                             |
| `node scripts/measure.mjs motion-after`                                               | Four final Lighthouse reports, HTML/JSON and summary saved                                                                                                                                                                               |
| `node scripts/profile-motion.mjs` and `--desktop`                                     | Both throttled normal-motion profiles pass; no sampled long tasks or idle animations                                                                                                                                                     |
| `node scripts/record-motion.mjs after`                                                | Real desktop/mobile recordings; both manifests have empty page-error arrays                                                                                                                                                              |
| `node scripts/review-motion-video.mjs after desktop`, `after mobile`, `before mobile` | Actual VP9 frames decoded; timelines saved and reviewed                                                                                                                                                                                  |
| Local comparison-viewer Chromium check                                                | All four videos decode with correct dimensions; desktop/mobile selection, Play both, advancing clocks and Pause both pass; no page/media errors                                                                                          |
| Content/asset preservation and original checkout                                      | No diff against M08 for site/project records, SEO config, approved public project/OG media or Google verification file; original `/projects/portfolio` Git status remains clean                                                          |
| Final format/lint/SEO and `git diff --check`                                          | PASS after evidence packaging                                                                                                                                                                                                            |

The initial new default-motion test waited on retained CSS animation objects that can be replaced by completion state changes. Live inspection showed no running animations, so the harness now observes the current animation set instead of waiting on stale promises. The focused 13-test release file then passed, followed by the complete 70-test suite. Animations were not disabled or fast-forwarded to make this pass. The first ad hoc comparison-viewer check timed out on lowercase `desktop` against an exact `Desktop` label; the corrected locator passed with no product changes.

## Measured performance

Lighthouse 13.5.0 / Chromium 156, local gzip production server, sequential runs on the same machine. Mobile 412×823 uses simulated 4× CPU, 150 ms RTT and 1.6384 Mbps; desktop 1350×940 uses the desktop preset. These are one-run lab comparisons, not field results.

| Page                  | Performance before → after | Final LCP | Final TBT | Final CLS |
| --------------------- | -------------------------- | --------- | --------- | --------- |
| Home mobile           | 99 → 98                    | 2.3 s     | 10 ms     | 0         |
| Home desktop          | 100 → 100                  | 0.5 s     | 0 ms      | 0         |
| PesoFlow mobile       | 98 → 99                    | 2.0 s     | 0 ms      | 0         |
| Projects index mobile | 98 → 98                    | 2.4 s     | 0 ms      | 0.032     |

Accessibility, Best Practices and SEO remain 100 for each sample. Home mobile adds about 0.27 seconds LCP and drops one performance point; it remains within the agreed budget. Small cross-page differences include ordinary lab variance and do not establish a causal speedup.

JavaScript: 258.59→270.02 kB raw, 80.08→83.28 kB gzip, **+3.20 kB gzip** (about 4%, below the 10 kB budget). CSS: 34.90→40.94 kB raw, 7.77→8.96 kB gzip. No new media payload or runtime library.

Separate 4× CPU / constrained-network profiles at 390×844 and 1440×900 recorded Event Timing samples of 32–64 ms mobile and 16–24 ms desktop, no sampled long tasks, and zero idle animations. Recorded heaps were 4,830,448 / 4,911,184 bytes. These short samples do not certify field INP, frame rate or absence of memory leaks. Profile-observer LCP and Lighthouse simulated LCP use different methods; the latter is used for the comparison above.

## Evidence and reproducibility

- [Side-by-side viewer](motion-comparison.html), [performance analysis](motion-comparison.md), [raw summary](motion-after-summary.json).
- Before: [desktop, 12.84 s](motion/before/desktop.webm), [mobile, 12.36 s](motion/before/mobile.webm).
- Final: [desktop, 20.40 s](motion/after/desktop.webm), [mobile, 15.76 s](motion/after/mobile.webm).
- Decoded final frames: [desktop timeline](motion/after/desktop-timeline.webp), [mobile timeline](motion/after/mobile-timeline.webp). Frames are decoded from actual browser video, not generated storyboards.
- Final PNGs: `motion/after/{desktop,mobile}-{hero,work,gallery,pixel-act,contact}.png`, `desktop-work-02.png`, `desktop-work-03.png`, and both throttled contact captures. Viewports: 1440×900 / 390×844. Native browser zoom capture: `screenshots/m7-native-zoom-200.png`.
- Raw reports: `motion-before-*` / `motion-after-*`; final profile files: `motion-after-{mobile,desktop}-profile.json`. Intermediate M11/M12/M13 films and manifests remain available.

The final films repeat the baseline hero/work/filter/detail/mobile journey and add explicit project selection, the local geometric handoff, About and actual clipboard feedback. Durations differ with the additional real interactions. The preserved baseline manifests contain two native transition aborts per viewport; both final manifests contain none.

Run `npm ci`, `npm run verify`, then the recording, review and measurement commands above to reproduce. README documents local development and user-controlled Vercel deployment/rollback; no production action is part of this delivery.

## Tradeoffs and limitations

The three-project HTML/CSS stack replaces the suggested heavy WebGL field. Native scrolling, static mobile/reduced/no-JS compositions, real links and focus order stay usable. Pointer motion is bounded, finite, fine-pointer only and isolated from text. Body content remains readable while selective headings/media enter. Gallery and filters use immediate state/URL updates with short, cancellable settling. GuestReco remains a limited truthful note without fabricated media or outcomes.

Physical iOS/Android devices, screen-reader hardware, Safari/Firefox engines and field traffic were unavailable. Automated Chromium/axe checks and lab profiles do not establish full WCAG conformance, real-device frame rate or field Core Web Vitals. No claim is made that unavailable headless/Graphify/Ponytail plugins ran; exact discovery results and fallback tooling are in [tool discovery](tool-discovery.md). No outstanding failure remains in the executed release checks.

## Local history

| Milestone | Commit                            | Result                                                         |
| --------- | --------------------------------- | -------------------------------------------------------------- |
| 09        | `9677447`                         | Actual reference analysis, motion baseline and storyboard      |
| 10        | `95682b8`                         | Accessible finite motion foundation and navigation reliability |
| 11        | `f7da3fb`                         | Cinematic identity/portrait, bounded light and hero handoff    |
| 12        | `f8bd5bf`                         | Spatial featured work, controls and filter reflow              |
| 13        | `f805149`                         | Case galleries, headings, geometric seam and contact feedback  |
| 14        | Introducing commit of this record | Full verification, small cleanup and final evidence            |

The introducing-commit convention avoids a self-referential commit hash. Final delivery reports its resolved SHA after committing. Six distinct local commits follow the eight-milestone baseline `ba3480e`; the original checkout remains untouched.
