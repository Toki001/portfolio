# Baseline — 2026-10-26

Selected workspace initially contained only AGENTS.md and CODEX.md, without .git or application files. User confirmed `/Users/jameskierdoliguez/projects/portfolio`. Copied its clean tracked checkout and complete Git history here, using a temporary local clone; original source is untouched. Origin: https://github.com/Toki001/portfolio.git. Baseline commit: `9046594`. Another sibling, portfoliov2, has unrelated uncommitted work and was not modified.

## Verified architecture and dependency map

- React 19.2, TypeScript 6, Vite 8, Tailwind 3, npm/package-lock.json, oxlint; no router, motion library, component kit, backend or test runner.
- `main.tsx → App.tsx → Header/Hero/Projects/TechStack/ToolsWorkbench/About/Contact/Footer`.
- All sections reuse `src/config/site.ts`; seo.json → vite config head transform + SSR entry → scripts/prerender.mjs → index.html / sitemap / robots / llms.
- `/` is the sole real page. Hashes: home, projects, peso-flow, pokechamp, pixeltools, guest-reco, tech-stack, tools, about, contact. Preserve these hashes.
- Vercel config includes HTTPS redirect and index.html alias; source declares portfolio-flax-one-59.vercel.app while active brief specifies portfolio-toki20.vercel.app. Resolve to user-specified origin and document deployment verification requirement. Do not alter domain ownership.
- Owned portrait/profile.webp; PokeChamp and PixelTools web screenshots; PesoFlow SVG is only a title card, not a screenshot. Self-hosted Geist / Plus Jakarta Sans with license texts.

## Inventory and content issues

Retain PesoFlow, PokeChamp, PixelTools and GuestReco. Verify detailed claims against user-owned local source, not candidate names in the brief. PesoFlow current README documents Drift/encrypted local storage, Riverpod and on-device receipt review; no cloud sync or biometric vault promise. PixelTools current README documents Next.js/static export. PokeChamp README documents React/Vite/Supabase and snapshot analytics. GuestReco has existing owner description/source link but no owned local app evidence; show limited project note and no deployed badge. Do not add candidate projects without evidence.

Existing unsupported details to remove: fake 99.98% SLA fallback; unverified v2.4/v1 production badges; fake contact success after mailto; location coordinates do not agree with region; unconditional system-status/response-time promises.

## Executed baseline validation

`npm run lint`, `npm run build`, `npm run check:seo`: PASS after copying dependencies locally. Initial symlinked node_modules prevented tsc cache writes; replaced symlink with a local copy, original untouched.

Headless Chromium via installed Playwright 1.64.1 fallback: 390×1000, 768×1000, 1440×1000. Zero page exceptions; no document overflow. Screenshots: `screenshots/baseline-{390,768,1440}.png`.

Baseline bundle: JS 287.49 kB / 85.46 kB gzip; CSS 25.37 kB / 6.02 kB gzip. These are build sizes, not real-user performance metrics. Live URL inaccessible via web tool; no access controls bypassed.
