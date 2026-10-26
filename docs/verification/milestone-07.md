# Milestone 07 — SEO, accessibility and performance

Production origin is consistently https://portfolio-toki20.vercel.app/ (requested origin verified HTTP 200; independent legacy deployment not modified). Added approved-palette favicons/manifest and five actual 1200×630 JPEG cards: home plus four project cards, with owned interface media where available. Unique static titles/descriptions/canonicals, OG/Twitter, Person/WebSite/WebPage/CreativeWork/BreadcrumbList JSON-LD, valid-route sitemap, robots, preserved verification file and actual 404 verified. Vercel previews receive noindex + robots Disallow; production artifacts were rebuilt afterward. No fictional lastmod dates or unsupported SoftwareApplication claims.

Optimized responsive project variants, prioritized first index media, retained one 34,928-byte variable font, added gzip negotiation to local production preview, and made galleries progressively enhanced with genuine no-JS media links. Safe-area padding added. Build parser dependency override 7.1.7 patches the reviewed PostCSS advisory while preserving Tailwind 3; npm audit zero vulnerabilities. No runtime dependencies added.

Executed: lint/typecheck/build/check:seo PASS; preview-mode build + `node scripts/check-seo.mjs --preview` PASS followed by production rebuild; unit 4/4 PASS; browser 39/39 PASS. All six routes across 320/360/375/390/430/768/1024/1280/1440/1920 have one H1, loaded images, matching canonical, no page overflow or console errors. Landscape coarse-pointer menu, 200% text, genuine native Chromium 200% page zoom (tabs.setZoom in temporary permission-free owned extension, DPR doubles and CSS viewport halves), reduced-motion idle, redirects/invalid query bounds pass. Axe checks zero violations.

Lighthouse 13.5.0 / Chromium 156 / isolated local gzip production server, default mobile simulated 4× CPU/150ms RTT/1.6384Mbps, 412×823; desktop preset 1350×940. Scores below are actual single-run lab measurements, not field Core Web Vitals or guaranteed deployment scores:

| Page / device | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home mobile | 99 | 100 | 100 | 100 | 2.2s | 0ms | 0 |
| Home desktop | 100 | 100 | 100 | 100 | 0.5s | 0ms | 0 |
| PesoFlow mobile | 99 | 100 | 100 | 100 | 1.9s | 0ms | 0 |
| Index mobile | 98 | 100 | 100 | 100 | 2.3s | 0ms | .032 |

Raw HTML/JSON reports and lighthouse-summary.json retained. First measurement found the preview process had ended (no valid score); corrected isolated server lifetime. Initial valid uncompressed mobile score 88 led to actual compression/image fixes; the table is the optimized result. CPU-throttled interaction/motion observations are in motion-profile.json; they are scripted Event Timing, not field INP or a measured 60fps claim.

Visual checks: five social cards generated from central source; home and PesoFlow cards reviewed. screenshots/m7-native-zoom-200.png reviewed after capturing the actual zoomed Chromium surface (Playwright clip coordinates initially produced blank output); m7-throttled-contact.png. Existing mobile/desktop studies and home captures reviewed. Final snapshot comparisons follow M8. Refreshed guideline and Hallmark manual reviews: design-audit.md. External GET results: external-links.md (LinkedIn 999; source destination retained).

Limits: no physical mobile/screen-reader device or field INP data; no Vercel deployment/domain changes. Account-side Search Console remains owner action. GuestReco is a limited project note; verified resume/current availability are absent and hidden. Files: SEO/build/asset/preview scripts, project media/content, Vercel config, gallery/artwork/foundation, hardening and native zoom tests, reports/audits.

Commit: introducing commit of this record.
