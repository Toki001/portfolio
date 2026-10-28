# Google search branding — 2026-10-28

The owner’s screenshot shows a **Vercel** site label and a generic globe above the correctly named page title. The site label and favicon are separate from the page title.

## Verified live baseline

Read-only HTTPS checks of the deployed production origin returned HTTP 200 for the homepage, robots, sitemap, Toki SVG, ICO, 32px PNG, 192px PNG and conventional `/favicon.ico`. The homepage already includes the correct canonical, `og:site_name` and a single `WebSite` named **Jameskier Doliguez**. All nine sitemap locations use the current origin. Robots allows crawling; inspected responses have no `X-Robots-Tag` restriction. The live 192px PNG is available but was not directly linked as a favicon in the head.

These observations do not establish why Google selected Vercel. An older indexed version or an automated fallback is consistent with the screenshot. This is not a confirmed missing-file or Vercel deployment failure. Requests with crawler user-agent strings test public HTTP behavior; they do not prove an actual Google crawl.

## Change

- Centralize preferred and alternate site names in `src/config/seo.json`: **Jameskier Doliguez**, **Toki**.
- Add `alternateName` to the existing `WebSite` entity; do not create a second entity. Keep the canonical root URL and Person publisher reference.
- Use the same preferred name for Open Graph and application metadata, emitted in static HTML before JavaScript runs.
- Directly link the already generated, stable 192×192 PNG Toki favicon. Keep the SVG, small PNG, ICO, Apple icon and conventional fallback paths. No icon URL churn or invented organization data.
- Extend the existing SEO checks for one correct site-name entity, alternate name, matching metadata and a direct large PNG link with verified image geometry. Update the existing local browser favicon assertion.

## Verification

- Formatting, lint, TypeScript, production build, four content unit tests, static SEO for nine routes and existing media integrity checks: PASS.
- Three isolated negative controls reject an incorrect **Vercel** site name, omitted alternate name and missing large favicon; the unmodified build passes.
- Actual Chrome 156.0.8078.73 verifies all nine routes at 390px and 1440px with JavaScript disabled: one correct WebSite, alternate name, matching Open Graph metadata, HTTP 200 image/png at 192×192, no page errors. Local evidence: `docs/verification/screenshots/search-branding/{home-390,home-1440}.png` and `review.json`. Visually inspected the desktop hero and original Toki PNG.
- Existing browser suite using installed Chrome: **94 functional tests pass**. All nine strict visual comparisons differ by 3–2,568 thresholded pixels against the older bundled-browser snapshots. The native Chromium extension-based zoom check was excluded from this fallback run. No snapshots or tolerances were updated.
- The initial standard `npm run verify` reached browser testing but could not launch because the bundled Chromium cache was absent. A slow temporary download was stopped; this is not a claim that the full standard suite passed.
- Built prior commit `7bf3c22` in an isolated source export and captured before/after with the same installed Chrome. Eight of nine screenshots match byte-for-byte. The 390px project index has a difference within one project-media region; it is retained in local evidence rather than marked as an exact pass. Prerendered body HTML for home, index and PesoFlow is byte-for-byte unchanged, as is the CSS asset. This change only adds metadata/configuration and a favicon link. Logs: `/private/tmp/portfolio-search-brand-{verify,chrome}.log`; detailed images/comparison JSON remain ignored local QA evidence.

## Search Console follow-up

After the production build contains these changes, use the matching URL-prefix property and inspect the homepage. Run **Test live URL**, inspect the tested HTML, then **Request indexing**. The corrected sitemap remains unchanged and valid. Site-name structured data is not a supported Rich Results Test feature; that tool’s lack of a rich result is not a failure of this markup.

Google controls selection and refresh timing, which can take days to weeks. No Search Console account action, Google recrawl, indexed-result change, DNS change or direct production deployment is claimed.

Primary guidance reviewed: [Google site names](https://developers.google.com/search/docs/appearance/site-names), [Google favicon requirements](https://developers.google.com/search/docs/appearance/favicon-in-search). The guidance supports subdomains, recommends an alternate site name and a stable square favicon larger than 48px; this change uses the existing 192px PNG.


## Continued search-result investigation — 2026-10-28

The owner confirmed Search Console’s last homepage crawl was **2026-10-27 01:58:37** (displayed local time), before the October 28 branding update. This supports a stale-index explanation; it is not proof of when Google will next select a name or icon.

New public HTTP checks with ordinary and crawler user-agent strings return the same homepage bytes, correct canonical and existing Jameskier Doliguez/Toki WebSite entity. Homepage, robots, 192px PNG and conventional ICO return 200 in 0.31–0.63 seconds in this sample. Full results are in search-crawler-evidence.json. User-agent emulation does not prove verified Googlebot visited.

The follow-up removes competing `rel=icon` links and declares **one stable 192px PNG**, a format explicitly supported by Google. Existing icon files/URLs, Apple icon, mask and manifest remain available. It also provides ordered alternate names **Toki**, **toki.**, and the lowercase production hostname, following Google’s fallback-name guidance. The SEO guard now requires one unambiguous favicon and checks the full alternate-name array. No Organization, fake identity, cache-busting URL churn or manual claim of a changed Google result was introduced.

Final local static SEO validates all nine routes; the focused portrait/favicon/slow-delivery browser checks pass. See performance-delivery.md for the broader browser run. After this combined update is deployed, inspect the root URL in the existing Search Console property, select **Test live URL**, confirm the tested HTML has Jameskier Doliguez, the alternate names and one `/toki-icon-192.png` link, then **Request indexing**. Inspect PesoFlow afterward if its old snippet persists. Google controls recrawl and display; its documentation allows days to weeks and does not guarantee the favicon/name selection.

Primary guidance refreshed: [site names and fallback alternatives](https://developers.google.com/search/docs/appearance/site-names#what-to-do-if-your-preferred-site-name-isnt-selected), [favicon requirements and recrawling](https://developers.google.com/search/docs/appearance/favicon-in-search).
