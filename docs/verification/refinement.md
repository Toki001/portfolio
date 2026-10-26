# Owner refinement — toki. identity, portrait, section craft and cleanup

Continues the completed M20 checkpoint `8132d7b`. React/Vite/Tailwind/npm, all nine routes, 23 real project views, approved colors and native accessibility fallbacks are retained. No push/deployment; original project checkout untouched.

## Identity and portrait

Navbar now reads **toki.**, with its full stop in brand red #890620. An original code-native **t.** favicon mirrors the ink wordmark/red period on a light, thin-outlined rounded tile. All SVG/ICO/PNG/Apple/manifest/share-card outputs are regenerated; no external logo/image service or new library.

The old profile was 384×384px and had been enlarged on high-density displays. The owner supplied `/Users/jameskierdoliguez/Downloads/profile.JPG`: 24MP, 6000×4000 with EXIF orientation 8, upright 4000×6000. `scripts/prepare-portrait.mjs` normalizes orientation and emits 480/800/1200/1600px AVIF/WebP top-aligned 5:6 grayscale crops. Quality 70 AVIF / 94 WebP; no generated detail or upscaling, original unchanged, EXIF metadata removed. `portrait-evidence.json` records source/output hashes, dimensions and byte sizes; check:media verifies all eight files without needing the external original.

The responsive picture chooses one format/size. A real Chromium 2× DPR check confirmed sufficient physical pixels for the rendered portrait and exactly one responsive photo download. At 2× desktop the 800px AVIF is 21.9kB; maximum 1600px is available for denser displays. Rounded inner/outer corners and a soft 0.625rem inset replace the straight crop. CSS grayscale filtering was removed because monochrome is encoded in the real-photo derivatives.

## Visible and functional refinements

- Full-catalog destination is a bordered editorial panel with a large heading, real seven-project count and prominent burgundy **Explore all projects** button. The quieter GuestReco note link remains separate.
- Capabilities add three staged engineering layers—Interface/Application/Persistence—with a connector draw and staggered transforms. Expanded native disclosures show actual related-project links; no fake counters, terminal output or work claims.
- Workbench retains every tool/description in normal reading order and adds six original SVG symbols. On desktop, a small native IntersectionObserver selects a sticky reading-band illustration and current row; finite 220ms motion is cancellable. Mobile has compact per-row symbols and no sticky stage. Reduced-motion keeps static equivalents; no per-frame React state, wheel interception, loop or new dependency.

Source/browser review applied existing Apple Design and mobile-native guidance. Actual desktop/mobile renders reviewed for hero, capabilities, workbench, CTA, native controls and fallback. A dedicated check covers native scroll changing the illustration, live reduction settling motion, and mobile retaining all six tool headings.

## Cleanup and Git policy

At the owner's explicit request, 446 already tracked QA files (~183MiB) were untracked and ignored: tests, Playwright configuration, snapshots, raw Lighthouse/profile output, screenshots/video and generated manifests. **They remain on disk and the local suite still runs.** Git history was not rewritten; this reduces the current tracked tree, not historical object storage. New QA output follows the same ignore rules. Compact audit Markdown, measurement summaries and media/portrait provenance remain tracked.

A new checkout intentionally omits local tests/config/evidence. Standard `npm ci`/build/preview do not depend on them; full `npm run verify` requires the local QA suite/config. README explicitly documents that distinction and recovery of the prior suite from `8132d7b`. No silent test skip or missing-QA pass was introduced.

The obsolete unused root Stitch HTML, 2.8MB screenshot and conflicting CODEX-2 brief were moved to ignored `.local/archive/legacy-stitch/`; owner handoff copy archived too. Six duplicated reference files were SHA-256 matched to the canonical kit before deletion, removing about 80MB of duplicate disk data. One complete canonical kit now lives at `references/portfolio-phase-3/source-kit/`, ignored/excluded from deployment. No unique reference or original photo was deleted.

Removed the obsolete 384px portrait, unused panel keyframes, redundant disclosure/hover/hidden-filter CSS; consolidated new styles into their original rules. Entry/import inspection found no orphan TS/TSX modules, so needed functionality was kept. TypeScript now rejects unused locals/parameters. Build configuration, package lock, image prep/import/check tooling and all actually used dependencies remain.

## Verification

Initial focused Retina/workbench/portrait-failure/rapid-toggle tests: 6/6 PASS. The complete local suite contains 97 browser checks and four content unit tests, including nine exact visual comparisons and the existing 11-width/all-route, axe, keyboard, no-JS, touch and native 200% zoom coverage. Visual baselines are updated only after actual browser review; local tests/snapshots remain ignored as requested.

The first Lighthouse mobile audit caught the decorative catalog count's low contrast despite aria-hidden. Its actual color is now brand slate with full opacity, meeting the large-text target; the audit was not suppressed. The corrected audit scores 100; final measurements follow. Raw recordings/reports remain local in `docs/verification/motion/refinement/` and `refinement-*.report.*`.

## Final results

`npm run verify`: **97 browser tests and four unit tests PASS**, including all nine exact comparisons; no tolerances or accessibility rules relaxed. Focused Retina/fallback/row tests 6/6 PASS. Formatting, lint, strict unused-code typecheck, production build, SEO and media-integrity checks pass.

| Page                 | Performance | Accessibility / Best Practices / SEO | LCP    | CLS |
| -------------------- | ----------- | ------------------------------------ | ------ | --- |
| Home mobile          | 96          | 100 / 100 / 100                      | 2.656s | 0   |
| Home desktop         | 100         | 100 / 100 / 100                      | 0.526s | 0   |
| PesoFlow mobile      | 98          | 100 / 100 / 100                      | 2.200s | 0   |
| Project index mobile | 95          | 100 / 100 / 100                      | 2.854s | 0   |

Same existing Lighthouse 13.5.0 / Chromium 156 local gzip configuration as M20, one matched sample each. The sharper home image adds about 0.10s simulated mobile LCP relative to M20; it remains within the performance target. Small cross-page differences include lab variance. These are lab results, not field INP, physical-device or 60fps certification. No Safari/Firefox/real-phone or screen-reader speech claim.

Final client **299.33kB / 90.63kB gzip**, CSS **52.69kB / 11.23kB gzip**. JS adds 1.48kB gzip over M20, no runtime dependency. Only the selected portrait format/size downloads; original 24MP photo and other variants are not all requested. AVIF is served with its correct image/avif type, and favicon/Apple links have a version key to refresh old cached marks.

Clean source proof: `git checkout-index` exported the exact staged application without tests, Playwright config, node_modules, .local archives or external owner folders; fresh `npm ci --offline` from the retained lockfile and `npm run build` produced all nine indexable routes. See refinement-clean-build.json. Local-only QA requirements are explicit in README.

Actual final Chromium films: [desktop](motion/refinement/desktop.webm), [mobile](motion/refinement/mobile.webm), 30.08/25.32s. Includes original-photo entrance, native scroll/featured spreads, real filters/gallery, layered capabilities, changing workbench symbols and contact feedback. Decoded twelve-frame timelines and PNGs are in the same ignored folder; both recording manifests have no page errors. All artifacts remain local by the owner-requested Git policy.

Original active repo was checked read-only and remains clean. No push/deployment. Commit: introducing commit of this record.

Final preview checks confirm the versioned icon links return 200 and the Retina-selected 800px AVIF is served as `image/avif`; see `refinement-assets.json`. The exact final staged source-only build was repeated successfully after the asset-serving updates. Regenerable root `playwright-report/` and `test-results/` were removed after review; test sources, baselines and motion evidence remain local.
