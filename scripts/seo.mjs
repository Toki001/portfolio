import { readFileSync } from 'node:fs';
export const seo = JSON.parse(readFileSync(new URL('../src/config/seo.json', import.meta.url), 'utf8'));
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function seoHead(verification = '') {
  const image = new URL(seo.ogImage, seo.siteUrl).href;
  return `
    <title>${escape(seo.title)}</title>
    <meta name="description" content="${escape(seo.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${seo.siteUrl}" />
    <meta property="og:site_name" content="Jameskier Doliguez" />
    <meta property="og:title" content="${escape(seo.title)}" />
    <meta property="og:description" content="${escape(seo.description)}" />
    <meta property="og:url" content="${seo.siteUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_PH" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Jameskier Doliguez — Mobile, Web & AI Developer" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(seo.title)}" />
    <meta name="twitter:description" content="${escape(seo.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="Jameskier Doliguez — Mobile, Web & AI Developer" />
    ${verification ? `<meta name="google-site-verification" content="${escape(verification)}" />` : ''}`;
}
