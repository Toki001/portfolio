# Motion performance and evidence comparison

Reproduced baseline at M09; final local production build at M14. Lighthouse13.5.0 / Chromium156.0.8078.4, isolated gzip server. Mobile412×823, simulated4× CPU/150ms RTT/1.6384Mbps; desktop1350×940 preset. Same machine/settings, no concurrent browser workload. One run per page/device; small differences include normal lab variance and do not prove a causal speedup.

| Page         | Performance before → after | Accessibility / Best Practices / SEO | LCP before → after | Final TBT | Final CLS |
| ------------ | -------------------------- | ------------------------------------ | ------------------ | --------- | --------- |
| mobile       | 99 → 98                    | 100 / 100 / 100                      | 2.1 s → 2.3 s      | 10 ms     | 0         |
| desktop      | 100 → 100                  | 100 / 100 / 100                      | 0.5 s → 0.5 s      | 0 ms      | 0         |
| peso-mobile  | 98 → 99                    | 100 / 100 / 100                      | 2.3 s → 2.0 s      | 0 ms      | 0         |
| index-mobile | 98 → 98                    | 100 / 100 / 100                      | 2.4 s → 2.4 s      | 0 ms      | 0.032     |

Baseline/final raw HTML and JSON: motion-before-* and motion-after-*; summaries retain exact numeric metrics, timestamps and settings. Home mobile drops1point and adds about.27s LCP; remains98,2.3s and CLS0. No significant regression requiring removal of a signature effect. Other score changes remain within1point; do not present the PesoFlow gain as a guaranteed improvement.

Bundle: JS 258.59→270.02 kB raw; 80.08→83.28 kB gzip (+3.20 kB, about 4.0%, below the 10 kB budget). CSS 34.90→40.94 kB raw; 7.77→8.96 kB gzip. No new library/runtime dependency, image payload, portrait or project data. The diff against M08 is empty for the approved identity/project records, SEO configuration, project/social media and Google verification file. Dependency audit: zero vulnerabilities.

CPU profiles: motion-after-mobile-profile.json and motion-after-desktop-profile.json,4× CPU/150ms/1.6384Mbps. Scripted Event Timing samples mobile32–64ms, desktop16–24ms; no sampled long tasks, idle animations0 both, heaps4,830,448 and4,911,184bytes. Mobile CLS0, desktop.000496. Samples are not field INP, a leak test, or measured60fps. Lighthouse LCP is the comparison metric; profile observer LCP uses different network methodology and is not interchangeable.

Actual videos: motion/before/{desktop,mobile}.webm and motion/after/{desktop,mobile}.webm. Matching core journey covers hero/pointer or menu, featured work, filters, detail and gallery. Final video adds explicit project selection, geometric handoff, About and actual clipboard feedback. Durations differ because real controls and additional interactions take time. Decoded timelines are frames from the actual VP9 recordings, using Playwright’s already-installed FFmpeg; no synthetic motion. Open motion-comparison.html for side-by-side playback. Intermediate m11/m12/m13 captures and manifests preserve visual checkpoints.

Baseline films expose two native transition abort errors per viewport; M10 removed the unstable optional cross-document fade. Both final recording manifests have empty error arrays, and the default-motion navigation/back/forward suite checks this directly. No errors were suppressed globally.

Verified recording lengths: desktop 12.84→20.40 seconds; mobile 12.36→15.76 seconds. Final desktop 1440×900 and mobile 390×844 timelines, project chapters 02/03 and contact captures were visually reviewed. A separate Chromium check loaded all four videos with correct dimensions, advanced both playback clocks, paused them, switched desktop/mobile views and reported no media or page errors. The first viewer-check attempt used the wrong case for an exact button label; correcting the test locator required no product change.

Verification: fresh npm ci, formatting/lint/typecheck,4unit, build/SEO,70browser (including9exact static comparisons). Both motion modes at ten widths, native200% zoom, landscape, coarse/fine pointer, no-JS acrosssix routes, live reduction, native-wheel escape, focus, rapid input and clipboard states. Real physical phones/assistive technology and field INP remain unavailable. No push/deploy or original-checkout change.
