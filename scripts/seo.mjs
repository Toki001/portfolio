import { readFileSync } from 'node:fs';
export const seo = JSON.parse(readFileSync(new URL('../src/config/seo.json', import.meta.url), 'utf8'));
export const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function seoHead(verification = '', page = {}) {
  const title = page.title ?? seo.title;
  const description = page.description ?? seo.description;
  const url = new URL(page.path ?? '/', seo.siteUrl).href;
  const image = new URL(page.image ?? seo.ogImage, seo.siteUrl).href;
  return `<title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:site_name" content="Jameskier Doliguez" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_PH" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape(title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escape(title)}" />
    ${verification ? `<meta name="google-site-verification" content="${escape(verification)}" />` : ''}`;
}
