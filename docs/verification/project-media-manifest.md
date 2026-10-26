# Project media manifest — Phase 3

Initial inventory at M15. No new screenshots have yet been published. Existing assets retain their recorded provenance in `media-provenance.md`. Final M19 entries must identify exact source paths or capture commands, real screen labels, source revision/date, output dimensions/hash and safe capture state. Each image is visually reviewed before it enters `public/projects/`.

| Project                   | Verified current distinct views                                                 | Required work                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| PesoFlow                  | Home / Budgets / Analytics; `/projects/peso-flow-{home,budgets,analytics}.webp` | Preserve existing genuine test captures; already meets 3-screen criterion                              |
| PokeChamp                 | Team builder; `/projects/pokechamp.webp`                                        | Actual showcase + analytics captures; no submitted/public team or invented remote data                 |
| PixelTools                | Tool directory; `/projects/pixeltools.webp`                                     | Actual crop / rotate / resize workflows with owned fixture image                                       |
| GuestReco                 | No approved interface media                                                     | Inspect source and obtain privacy-safe real UI; do not publish real faces, attendance or employee data |
| ResolveHub                | Existing local synthetic dashboard/conversation evidence                        | Verify screenshot provenance and capture/select 3 different implemented screens                        |
| ReconcileIQ               | None in portfolio                                                               | Capture 3+ real sections with known synthetic finance data; never production invoices                  |
| Reimagined                | Existing local original fixture screenshots                                     | Select 3 different app workflow screens; no private reference uploads                                  |
| LinkPreview Studio        | None                                                                            | Controlled local capture of implemented studio/inspector/template pages; don't fake fetched metadata   |
| Terraria Config Generator | None                                                                            | One real interface plus optional genuine downloaded text; one page is not three screens                |

No inspiration screenshot/video, fabricated UI, external stock art or generated application image may satisfy the count. Alternate widths/crops of one view count once. Keep valid no-JS full-size links, meaningful captions, explicit geometry and optimized responsive sources. M19 updates this file with the final evidence ledger.

## M18 published covers

`scripts/import-project-media.mjs` creates modern WebP and alternate-width variants from exact reviewed sources. `project-media-evidence.json` records input/output SHA-256, dimensions, source revision/capture state, modification date and byte sizes. Alternate widths are the same view, not new screens.

| Public asset                 | Actual source                                                                                                         | State / dimensions                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| resolvehub-conversation.webp | resolvehub/docs/verification/internal-support-desktop.png; source 5e37e45 and documented internal-support-workflow.md | Historical real UI, synthetic-customer@example.test, internal-only reply; 1280×1206                                                         |
| reconcileiq-overview.webp    | /private/tmp/portfolio-phase3-captures/reconcileiq/overview.png; actual http://127.0.0.1:3100/ on 2026-10-26          | Streamed page settled, confirmed synthetic read-only banner, no mutations; 1440×1000; running build not asserted equal to dirty source HEAD |
| reimagined-studio.webp       | reimagined/docs/verification/screenshots/m08-analytics-studio-1440.png; 2f9ebec / documented M08 fixture capture      | Real studio, original fictional analytics fixture, no customer input; 1440×900                                                              |

Fresh ReconcileIQ `/invoices`, `/reconciliation`, `/exceptions` and ResolveHub `/tickets`, `/knowledge`, `/review` PNGs are private staging inputs for M19, not yet counted as published gallery screens at M18. ResolveHub staging uses `node scripts/capture-resolvehub.mjs`, copies only the existing standalone build/static assets into a temporary directory, excludes .env files, sends only read-only fixture queries, and closes both preview/API processes. Actual reviewed internal-conversation evidence remains distinct from isolated empty-collection UI captures.
