# M7 guideline and originality audit

Source-reviewed web-design-guidelines 1.0.0, refreshed official Vercel web-interface rules through the web tool on 2026-10-26. Reviewed App, Header, Hero, ProjectArtwork, ProjectExplorer, ProjectPage, MediaGallery, TechStack, About, Contact, Footer, hooks and all CSS. Hallmark source-read direction/anti-template review performed in-thread; these are manual fallback reviews, not executions of unavailable plugin CLIs.

Resolved findings:

- `src/components/portfolio/MediaGallery.tsx`: no-JS controls could appear actionable without handlers → progressive enhancement hides carousel buttons and supplies real full-size media links.
- `src/foundation.css`, `index.html`: notch/safe-area layout → viewport-fit cover and safe-area-aware container/header/footer padding.
- `src/config/seo.json`, `vercel.json`: legacy origin and unconfirmed availability in metadata → explicit user production origin and truthful evergreen description.
- `scripts/generate-brand-assets.mjs`: legacy colors and generic social preview → approved colors, owned portrait and unique project JPEGs.
- `scripts/preview.mjs`: uncompressed local assets distorted performance → gzip negotiation with Vary/Content-Length, reflecting static production delivery.
- `ProjectArtwork.tsx`: oversized small previews and lazy first index image → responsive derivatives and eager priority for first visible project.

Pass review: semantic controls, visible focus, 44px primary targets, proper image dimensions/alt, no tracking or autoplay, native details/dialog, escaped metadata, six crawlable pages, real missing-page status, URL filter/gallery state, reduced-motion override, no scrolling layout mutation or endless loops. Axe/Lighthouse are supporting automated checks, not a certification of full WCAG compliance.

Originality: project-specific mobile composition and offset browser spreads, white/navy acts, large Archivo identity, genuine graduation portrait and oversized email finish interpret the supplied references. No third-party person, laptop mockup, yellow/orange/purple reference brand, award/rating/experience count or designer/photographer identity is reproduced. All cases explain engineering with verified constraints. Chosen restraint: no lens/backdrop capture/pinning/mandatory animation library; the budget is spent on typography, shared reveal, native transitions, disclosure and direct feedback.

Known review limits: physical iOS/Android and assistive-technology hardware were unavailable. Native Chromium zoom and emulated coarse-pointer/landscape/reduced-motion are verified; screen-reader and physical-device acceptance remain manual release follow-ups. LinkedIn restricts automation. Source statements for GuestReco remain deliberately limited.
