import { readFile, writeFile, rm } from 'node:fs/promises';
import { render, siteConfig } from '../dist-server/entry-server.js';
const { seo, identity, socials, projects, contact } = siteConfig;
const url = seo.siteUrl;
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person', '@id': `${url}#person`, name: identity.name,
      url, jobTitle: identity.title, description: identity.heroStatement,
      image: new URL(identity.profileImage, url).href,
      sameAs: Object.values(socials).filter(s => s.url && s.label !== 'Discord').map(s => s.url),
      knowsAbout: ['Flutter', 'React', 'TypeScript', 'Mobile development', 'Machine learning'],
    },
    { '@type': 'WebSite', '@id': `${url}#website`, url, name: identity.name, publisher: { '@id': `${url}#person` } },
    {
      '@type': 'ProfilePage', '@id': `${url}#webpage`, url, name: seo.title,
      description: seo.description, inLanguage: 'en', mainEntity: { '@id': `${url}#person` },
      isPartOf: { '@id': `${url}#website` },
    },
    {
      '@type': 'ItemList', '@id': `${url}#project-list`, name: 'Featured projects',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'CreativeWork', name: p.title, description: p.description,
          url: `${url}#${p.id}`, creator: { '@id': `${url}#person` } },
      })),
    },
  ],
};
const html = (await readFile('dist/index.html', 'utf8'))
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script></head>`);
await writeFile('dist/index.html', html);
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url}</loc></url></urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${url}sitemap.xml\n`);
await writeFile('dist/llms.txt', `# ${identity.name}\n\n> ${seo.description}\n\n${identity.heroStatement}\n\n## Portfolio\n\n${siteConfig.navigation.map(n => `- [${n.label}](${url}${n.href})`).join('\n')}\n\n## Projects\n\n${projects.map(p => `- [${p.title}](${url}#${p.id}): ${p.description}`).join('\n')}\n\n## Contact\n\n- [Email](mailto:${contact.email})\n- [GitHub](${socials.github.url})\n`);
await rm('dist-server', { recursive: true });
console.log('Prerendered portfolio, structured data, sitemap.xml, robots.txt and llms.txt.');
