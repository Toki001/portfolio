# Milestone 11 — cinematic hero and section handoff

Implemented two masked name lines (780ms/60ms offset desktop, 520ms mobile), owned portrait split curtains/settle, subtle code-grid aperture, bounded pointer light with exact critically damped velocity-preserving retargeting, shallow magnetic CTA content, and <=24px/.975-scale desktop hero recession into selected work. Reused TextMask for selected-work heading. No semantic text duplication, new media, library or blocker. Links work during the opening. Pointer and scroll transforms own separate nested layers; touch has no lens, keyboard/reduced/hidden states reset movement, no JS shows final readable content.

Paths: Hero/Projects/TextMask, App, usePointerMotion/useHeroHandoff/useEditorialMotion, hero.css/motion.css, cinematic-hero.spec.ts and review-motion-video.mjs. Existing palette, identity, routes and project records retained. Pointer worker is one delegated finite scheduler, no React frame state, no backdrop sampling/blur/WebGL. Exits settle and stop; listeners/frames clean up.

Executed format/lint/type/build/SEO PASS. Targeted hero/lifecycle/all-route-width checks19/19 PASS. Reviewed static desktop/mobile hero captures; updated only the three intentionally changed home baselines, then full browser53/53 PASS including nine exact comparisons, axe, touch, no-JS, native200% zoom, live reduction and native navigation/back/forward. Default recording error manifests are now empty, resolving M9 native transition abort finding.

Actual recordings: docs/verification/motion/m11/{desktop,mobile}.webm, durations12.88/11.92s. Hero/work/gallery PNGs and decoded timelines/JSON retained; desktop chronological film frames and both hero sizes visually reviewed. Initial browser-based video-frame review captured blank overlays; verified actual VP9 with Playwright's bundled FFmpeg and replaced the reviewer with real decoded PNG frames. Videos themselves were valid, no synthetic replacement. Bundled FFmpeg already exists; no extra dependency installation. Before desktop timeline also decoded for comparison.

Build JS263.80kB/81.64gzip (baseline80.08), CSS37.30/8.31. Final performance measurements continue M14. Current motion passes mask/pointer/touch/content checks; physical device/screen-reader limits unchanged. No push/deployment, original checkout untouched.

Commit: introducing commit of this record.
