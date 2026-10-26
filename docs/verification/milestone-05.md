# Milestone 05 — engineering case studies

Expanded all existing detail routes with context, problem/approach, source-verified features, architecture flow, implementation constraints, honest current state, typed media, breadcrumbs and next-project links. PesoFlow/PokeChamp/PixelTools have substantive studies; GuestReco is explicitly a limited project note and has no invented screenshot/architecture/deployment/accuracy. Verification is of portfolio content and local source evidence, not a new test run of each featured application.

Implemented accessible media gallery: arrow keys, numbered controls, actual caption/status, URL media state/reload, native dialog zoom with Escape/focus restitution and scrollable full-size captures. Single images avoid unnecessary carousel controls. Native cross-document transitions have no-motion fallback. Added asset checklist. New local static preview matches clean route output and returns real HTTP 404 with recovery UI.

Paths: ProjectPage.tsx, MediaGallery.tsx, case-study.css, main.tsx, scripts/preview.mjs, package/config, tests/case-studies.spec.ts, docs/design/media-checklist.md.

Executed: lint PASS; content unit 4/4 PASS; type/build and six-route SEO PASS. Case-study browser suite final 6/6 PASS, including all four full-page axe checks with zero violations, keyboard/URL/gallery/dialog axe/Escape focus and actual 404. Initial axe found links directly within dl and 01/1 label mismatch; corrected semantic dt/dd grouping and visible-number labels, reran all six. No rules disabled. Reduced-motion used for stable automated content scans; hero/default motion was tested in M3.

Screenshots: m5-study-{390,768,1440}.png (full page), m5-zoom-{390,768,1440}.png. Desktop study and mobile zoom visually reviewed. Owner gaps: optional higher-res portrait, more tool-in-use captures, verified resume/current availability, GuestReco evidence. No links rendered for absent releases, no public Preview pending filler. Per-project OG generation and final origin/HTTP hosting checks continue in M7. No deployment/push.

Commit: introducing commit of this record.
