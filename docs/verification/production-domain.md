# Production domain and sitemap correction

2026-10-27, owner-confirmed origin: `https://jameskier-doliguez-portfolio.vercel.app/`.

Read-only live HTTP checks returned 200 for the new origin's sitemap, robots and home document. The sitemap listed nine URLs at the earlier `portfolio-toki20.vercel.app` origin; robots advertised that origin's sitemap and the home canonical also used it. This matches the supplied Search Console error. The web tool could not open the site, so direct read-only HTTPS requests supplied the actual live evidence.

Updated `src/config/seo.json`, the existing single source for the generated sitemap, canonical/OG/Twitter URLs, JSON-LD, robots and llms links. Normal build regenerates all nine pages and `dist/sitemap.xml`; no duplicate hand-maintained public sitemap was added. The generated home share card now displays the new hostname. All existing page paths and Google verification file remain unchanged.

The Vercel HTTP-to-HTTPS redirect targets the same origin and retains `:path*`. An unconditional homepage-to-itself redirect was removed. The SEO checker now detects unconditional self-redirects, a divergent HTTPS target origin and inconsistent source/destination wildcards. Three isolated temporary negative controls confirmed all three invalid configurations fail without changing the working configuration. README release/Search Console instructions use the new origin; historical milestone records and the original prompt are retained as history.

Executed checks:

- `npm run build`, `npm run check:seo`, `npm run check:media`: PASS.
- `xmllint --noout dist/sitemap.xml`: PASS. Independent XML parsing confirmed nine unique same-origin absolute URLs.
- Checked all built HTML, robots, sitemap and llms output: zero occurrences of the previous hostname.
- `npm run lint`, `npm run typecheck` and formatting of modified source/config/docs: PASS.
- Existing Playwright route checks at 320px and 1440px: **2/2 PASS**, covering all nine pages, correct canonicals, media, horizontal fit and page/console errors. Local tests remain ignored as requested.
- Local production preview serves corrected `/sitemap.xml` as HTTP 200 `application/xml` and `/robots.txt` as HTTP 200 plain text.

This is a source/build correction. No push, deployment, domain ownership/DNS change or Search Console submission was performed. After deploying a fresh production-context build, verify the public sitemap and robots files, then resubmit `https://jameskier-doliguez-portfolio.vercel.app/sitemap.xml` under the matching Search Console property. Google recrawl/indexing was not claimed.

Primary references checked: [Google sitemap construction and submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Vercel configuration redirects](https://vercel.com/docs/routing/redirects/configuration-redirects), [Vercel canonical-host/redirect-loop guidance](https://vercel.com/docs/routing/redirects#redirect-the-production-vercelapp-hostname). No new dependency, UI, route or screenshot baseline change.

Checkpoint: the local commit introducing this record.
