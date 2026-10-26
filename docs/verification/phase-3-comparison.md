# Phase 3 — measured comparison

The baseline is the reproduced M15 build (completed M14, `ca6f3e0`), not a historic production score. Final measurements use the M20 application. Both use the same existing `scripts/measure.mjs`: local gzip static production preview on port 4175, Lighthouse 13.5.0 and installed Playwright Chromium. No live deployment was measured.

| Page                 | Performance before → after | LCP before → after | CLS before → after | Final TBT |
| -------------------- | -------------------------- | ------------------ | ------------------ | --------- |
| Home mobile          | 98 → 97                    | 2.201 → 2.561 s    | 0.00000 → 0.00000  | 0 ms      |
| Home desktop         | 100 → 100                  | 0.495 → 0.526 s    | 0.00000 → 0.00000  | 0 ms      |
| PesoFlow mobile      | 99 → 99                    | 2.029 → 2.123 s    | 0.00000 → 0.00000  | 0 ms      |
| Project index mobile | 98 → 95                    | 2.404 → 2.854 s    | 0.03207 → 0.00000  | 0 ms      |

Accessibility, Best Practices and SEO are **100** for every matched before/final sample. Mobile performance reaches the >=95 target. Home LCP adds about 0.36s and index about 0.45s; index remains above the near-2.5s aspiration. These are disclosed costs of the expanded presentation. CLS improves to zero on the index; no universal speedup or full Core Web Vitals certification is claimed. Single samples include lab variance.

Mobile: 412×823, DPR 1.75; simulated 4× CPU, 150ms RTT / 1638.4Kbps; Lighthouse request-latency multiplier 562.5ms and download 1474.56Kbps. Desktop uses the existing desktop preset. Exact settings, timings and fetch times are in the JSON reports/summary. Do not compare the separate CDP-observer LCP with Lighthouse simulated LCP.

First M20 index sample was 94 with CLS 0.06201. Wrapping filters had inserted their region after hydration. Preserving responsive geometry fixes that shift without guessed fixed heights; initial and hydrated content-frame positions are tested at 390/414/1280px. Making the decorative secondary phone lazy/low priority improves the remaining image-loading result to 95. Reviewed artwork-only top crops remove pixels already hidden by the phone frame; the full genuine case-study screenshots remain. Intermediate `phase3-after-{initial,layoutfix,priority}-*` reports retain the diagnostic trail.

Production payload: JS **270.02 → 293.75kB raw**, **83.28 → 89.15kB gzip**, +5.87kB gzip (within the 10kB budget). CSS **40.94 → 48.29kB raw**, **8.96 → 10.37kB gzip**. No new runtime/library dependency. Media are explicit-size responsive WebP; secondary views lazy load. The 23 distinct gallery screens and four phone-art derivatives are verified separately.

Actual before/after browser video and decoded twelve-sample timelines are in `motion/phase3-before/`, `motion/phase3-after/`, and `motion/phase3-after-catalog/`. Desktop 1440×900 / mobile 390×844; default motion. Final home films include hero, native-scroll introduction, work/spreads, filters, PesoFlow gallery/zoom, capabilities/tools and real clipboard feedback. Catalog films show all three new cases and three actual different screens per walkthrough. Recordings have different durations/cadence; they are not synthetic animation storyboards.

[Side-by-side player](phase-3-comparison.html) · [before raw summary](phase3-before-summary.json) · [final raw summary](phase3-after-summary.json) · [media provenance](project-media-manifest.md) · [final review](../design/phase-3-final-review.md).

Separate home-page CDP profiles apply 4× CPU, 150ms RTT and 1.6384Mbps download to default-motion interaction/scroll samples. These sample Event Timing, long tasks, idle animation count and heap; they do not establish field INP, 60fps, leak freedom or actual phone behavior. Raw final profiles: `phase3-after-{mobile,desktop}-profile.json`. Final observed values are documented in milestone-20.md.

No push, deployment or original-source checkout mutation.
