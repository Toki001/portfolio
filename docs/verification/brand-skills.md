# Portrait framing, toki symbol and GitHub skills

Owner-requested continuation of `e2609af`, 2026-10-27 (Asia/Manila). Existing React/Vite app, routes, high-resolution owned portrait, palette, motion and local-only QA policy retained. No push or deployment.

The portrait image previously used 100% height inside a padded, aspect-ratio frame. Its bottom extended into the frame's lower padding. The image is now absolutely bounded by the same inset on all four edges; the old width/height override is removed. Shared inset/radius variables coordinate the outer frame, inner image mask and entrance curtain. Browser geometry at 390/768/1440 and 2× density confirms equal top/bottom and left/right spacing and matching curved corners. The real responsive AVIF/WebP sources remain unchanged.

The original **tk** monogram is drawn in `src/brand/toki-symbol.svg`: white lettering on navy with a burgundy full stop and a white keyline for visibility at small sizes. It complements the existing `toki.` navbar text. Brand generation produces fresh `/toki-icon.svg`, `/toki-icon-32.png`, `/toki-icon.ico`, `/toki-apple-touch-icon.png`, `/toki-icon-192.png` and `/toki-icon-512.png` URLs. Conventional favicon/Apple discovery paths contain the same new mark. A monochrome `/toki-mask.svg` supports Safari pinned tabs; the manifest and Apple title use `toki.`. Superseded generic manifest PNGs were removed. No remote fonts or raster generation service is needed for the logo.

The supplied browser screenshot shows the earlier JD mark. A previous local checkpoint already changed its source, but that alone does not verify which deployed/cached document the screenshot used. New filenames replace its icon references in every prerendered page. Chromium confirms the new linked assets and PNG/ICO/Apple dimensions; Safari's native tab/bookmark cache was not directly inspected. Production remains unchanged under the owner's no-deploy instruction.

Connected GitHub confirmed `Toki001`. The ordinary repository-list call returned empty; owner-scoped search returned 19 public repositories. Their root contents were inspected, then actual manifests, source, notebooks and test/workflow files were read. Exact upstream URLs and Git blob SHAs are in [github-skills-evidence.json](github-skills-evidence.json). Dependency/source presence substantiates project experience, not a proficiency score, exclusive authorship or a claim that every project is production deployed. Public project code was inspected without execution or mutation.

| Capability                | Published focus                                         | Principal evidence                                                                                                 |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Cross-platform mobile     | Flutter, Dart, Riverpod, Drift, SQLite                  | PesoFlow pubspec, main entry and Drift database implementation                                                     |
| Modern web                | React, Next.js, TypeScript, Tailwind, Vite              | PixelTools package; GuestReco frontend; Terraria configuration generator package                                   |
| APIs and services         | Python, FastAPI, Node.js, NestJS, GraphQL               | ReconcileIQ API pyproject; ResolveHub API package; GuestReco backend requirements                                  |
| Computer vision and ML    | PyTorch, TensorFlow, OpenCV, ONNX Runtime, scikit-learn | Thesis notebooks' imports/training/evaluation code; GuestReco face engine and requirements                         |
| Databases and persistence | PostgreSQL, MySQL, Drizzle, SQLAlchemy, Redis           | ResolveHub DB/worker package and worker source; ReconcileIQ database pyproject; GuestReco requirements             |
| Testing and delivery      | Git, GitHub Actions, Docker, Playwright, Vitest, pytest | ResolveHub CI workflow; Reimagined test source; ReconcileIQ parametrized Python tests and checked-in Compose files |

Workbench entries now reflect Flutter/Dart, Git/GitHub, Playwright/Vitest, PostgreSQL/Drizzle, Jupyter/PyTorch and FastAPI/NestJS. The testing entry has an original browser/check glyph. Existing exclusive stack hover, persistent workbench selection, touch, keyboard and reduced-motion behavior remain. Sensor integration, serverless, low-latency storage, profiling and generic continuous deployment claims were removed from the skill prose. Unverified editor/design/assistant-tool habits were replaced. Supabase exists in Pokechamp but was omitted from this focused list rather than declared absent.

Thirty self-hosted technology SVGs accompany the updated names. Added Devicon marks and Simple Icons' ONNX/Drizzle marks have recorded upstream blobs, hashes and bundled notices. ONNX Runtime uses the ONNX family symbol; Drift keeps a neutral database symbol. Eight unused previous marks, the unused Hive notice, obsolete concept-symbol branches and paired-badge CSS were removed. No dependency was added. [tech-mark-evidence.json](tech-mark-evidence.json) and `public/tech/SOURCES.md` retain provenance.

Applied installed Apple Design/mobile-native guidance for input-specific feedback, native browser affordances and physical spacing. Repeated real plugin discovery exposed GitHub as enabled; no callable find_skills or relevant headless/Graphify/Ponytail tool appeared. Existing Playwright/Chromium, axe, Sharp and Lighthouse are the actual review tools. No unavailable plugin or physical-device test is claimed.

Focused checks: **9/9 PASS**, covering new portrait geometry/favicon variants plus hover exclusivity, stable scrolling, logo decode, workbench persistence, keyboard, touch, axe and no-JS. Three intentional home visual baselines were refreshed after actual-browser review; unchanged index/study baselines retain exact pixel comparison and no tolerance was relaxed.

Local review evidence (ignored as requested): [desktop portrait](motion/brand-skills/desktop-portrait.png), [mobile portrait](motion/brand-skills/mobile-portrait.png), [16/32/48/180px icons](motion/brand-skills/favicon-sizes.png), [vision stack](motion/brand-skills/desktop-stack-4.png), [mobile delivery stack](motion/brand-skills/mobile-stack-6.png), [persistent workbench](motion/brand-skills/desktop-workbench.png). All six domains were captured on desktop and touch. Default-motion [desktop](motion/brand-skills/desktop.webm) and [mobile](motion/brand-skills/mobile.webm) recordings have zero captured page/console errors.

`npm run verify`: **PASS — 102 browser tests and four unit tests**, plus Prettier, Oxlint, TypeScript, production build, static SEO and media integrity. The suite includes nine exact visual comparisons, nine routes at eleven widths in both motion modes, axe, real touch controls, native 200% Chromium zoom, keyboard and no-JS. All 30 logo SVGs pass hash/parser/passive-resource checks; all 23 genuine gallery screens and eight portrait variants remain intact. Default-motion recordings are 6.16s each; decoded VP9 [desktop timeline](motion/brand-skills/desktop-timeline.webp) and [mobile timeline](motion/brand-skills/mobile-timeline.webp) were inspected along with the settled screenshots.

Final JS is 301.42 kB / 91.22 kB gzip; CSS is 53.78 kB / 11.48 kB gzip. No dependency or animation library added. `node scripts/measure.mjs brand-skills` used the same Lighthouse 13.5.0 settings as the prior hover update: simulated mobile 412×823 at 4× CPU / 150ms RTT; desktop 1350×940 at 1× CPU / 40ms RTT. [Full settings/results](brand-skills-summary.json).

A separate fresh staged-source export passed normal build, media integrity and static SEO checks with no tests, Playwright config or `.local/` folder. It reused installed dependencies without installation. The application builds without ignored QA sources, original photo files or other local project checkouts.

| Production page | Performance | Accessibility / Best Practices / SEO |   LCP | TBT | CLS |
| --------------- | ----------: | ------------------------------------ | ----: | --: | --: |
| Home mobile     |          96 | 100 / 100 / 100                      | 2.65s | 0ms |   0 |
| Home desktop    |         100 | 100 / 100 / 100                      | 0.52s | 0ms |   0 |
| PesoFlow mobile |          98 | 100 / 100 / 100                      | 2.20s | 0ms |   0 |
| Projects mobile |          95 | 100 / 100 / 100                      | 2.85s | 0ms |   0 |

Lab results vary; home/projects mobile LCP remains above 2.5s under the simulated throttle. Test/config/snapshots, recordings and raw reports remain local/ignored. Compact audits and asset/source provenance stay tracked. Chromium/macOS and emulated touch are verified; native Safari tab rendering, installed bookmarks and physical mobile hardware remain outside this run.

Checkpoint: the local commit introducing this record. No push or deployment.
