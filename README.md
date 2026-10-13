# Jameskier Doliguez — Portfolio

A responsive portfolio built with React 19, TypeScript, Vite and Tailwind CSS. The production build prerenders the complete page; React hydrates the mobile navigation, carousel and contact form.

## Development and validation

```sh
npm ci
npm run dev
npm run build
npm run check:seo
npm run lint
npm run preview
```

`npm run build` creates the client bundle, renders HTML through a temporary server bundle, generates crawl files and removes the temporary bundle. Deploy `dist/` to Vercel. No Node server is required in production.

## Content and SEO

Edit `src/config/site.ts` for portfolio content and `src/config/seo.json` for the title, description, canonical origin and OG image. The canonical origin is `https://portfolio-flax-one-59.vercel.app/`. If the domain changes, update the HTTPS redirect destination in `vercel.json` too.

This is one page. Its sections and projects use descriptive fragment IDs; the sitemap lists only the root URL. The build generates `sitemap.xml`, `robots.txt` and `llms.txt` in `dist/`, along with Person, ProfilePage, WebSite and project-list JSON-LD. It includes indexable metadata, Open Graph and Twitter cards. Unknown URLs are not rewritten to the homepage; `/index.html` redirects to `/` and trailing slashes are normalized by Vercel.

Vercel configuration includes an HTTP-to-HTTPS redirect, HSTS, immutable caching for hashed assets, and week-long caching for fonts. Vercel handles response compression. Production HTTP requests were checked and already redirect to HTTPS.

## Images, fonts and favicons

Project previews and the portrait are local, compressed WebP assets. Images have descriptive alt text, reserved dimensions and deferred decoding; project images load lazily. Text fonts are self-hosted Latin subsets with their licenses in `public/fonts/`. Icons use small inline SVGs.

Run `npm run assets:brand` after changing the portrait or branding to regenerate the 1200×630 OG image, SVG favicon, multi-size ICO, PNG favicon, Apple touch icon and manifest icons. The manifest uses browser display mode; this site does not register a service worker.

## Google Search Console

The provided HTML verification file is preserved at `public/google711de76d62b8d616.html` and copied unchanged into the production build.

1. Deploy these commits to the existing Vercel production project.
2. Check that `https://portfolio-flax-one-59.vercel.app/google711de76d62b8d616.html` returns `google-site-verification: google711de76d62b8d616.html` as a file, rather than the homepage.
3. Open Google Search Console, select/add the URL-prefix property `https://portfolio-flax-one-59.vercel.app/`, choose HTML-file verification and click **Verify** in the account that issued the file.
4. Submit `https://portfolio-flax-one-59.vercel.app/sitemap.xml` under **Sitemaps**, then inspect the root URL and request indexing.

Keep the verification file after ownership is confirmed. This workspace does not have access to your Google account, so verification and sitemap submission remain account-side steps.

As an alternative, the HTML-tag method is supported: set `GOOGLE_SITE_VERIFICATION` to Google's exact content value in the production build environment and rebuild. See `.env.example`. Do not set it to the filename.

## Verification notes

Build, Oxlint and `check:seo` cover prerendered content, metadata, schema, local assets, fragment links, crawl files and favicon references. Chrome checks cover widths of 320, 375, 390, 768, 1024, 1280 and 1440 pixels, mobile navigation, carousel scrolling, hydration errors and readable content without JavaScript. External project/repository links returned HTTP 200; LinkedIn rejects automated checks (HTTP 999), so its existing profile URL is retained.

Mobile Lighthouse against a locally served, gzip-compressed production build measured 89 performance, 100 accessibility, 100 best practices and 100 SEO; LCP was 2.2 seconds, CLS 0 and total blocking time 30 ms. The QA server applied the asset/font cache policy configured for deployment. These are lab measurements; Search Console Core Web Vitals require real visitor data after deployment.
