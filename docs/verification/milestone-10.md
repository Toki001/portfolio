# Milestone 10 — accessible motion foundations

Added shared timings/easing/cancellable WAAPI scope, early root preference bootstrap, live reduced-motion/visibility/input lifecycle, passive one-frame progress scheduling and native-menu entry from its header origin. Static DOM styles remain the final state. No-JS/reduced/keyboard paths suppress spatial transitions; Escape/focus/links never wait. Button text selection suppressed only on controls, landscape font inflation disabled; page zoom/content selection retained. No animation dependency or framework change.

New baseline finding: default-motion before videos recorded two Chromium native transition abort errors per viewport, despite reduced-motion regression scans passing. Scoped native transition promise handlers did not resolve Chromium’s opt-in aborts; removed the optional global cross-document fade opt-in instead. Ordinary native navigation remains immediate; M13 uses controlled page-entry/cover staging rather than relying on this unstable visual path. No global error suppression. Added explicit default-motion link/back/forward error test plus live preference and keyboard-menu tests.

Executed format/lint/type/build/SEO PASS. Full browser suite 51 tests (48 retained +3 motion lifecycle), 51/51 PASS after the native opt-in fix. Initial 50/51 exposed the same two transition aborts, corrected and rerun. Prior static baselines deliberately unchanged in M10; no new art direction. JS260.04kB/80.52gzip, CSS35.18/7.86. Shared motion scope cancels owned animations; entering keyboard/reduced/hidden mode settles finite page motion and notifies future pointer/scroll effects. Listeners/observers/frames cleaned on unmount.

Files: src/motion/animate.ts, hooks/useEditorialMotion.ts, motion.css, main.tsx, Header.tsx, index.html, tests/motion-foundation.spec.ts. Before captures/previous screenshots supply visual context; actual menu/pref/navigation exercised in browser. Native transition docs consulted: MDN pageswap/ready and Chrome cross-document guidance. No plugin CLI or physical-device claim. No push/deployment.

Commit: introducing commit of this record.
