import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { render, siteConfig } from "../dist-server/entry-server.js";
import { seoHead, escape } from "./seo.mjs";
const { seo, identity, socials, projects, contact } = siteConfig;
const origin = seo.siteUrl;
// Vercel previews must never advertise themselves as indexable production pages.
const preview = Boolean(
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production",
);
const routes = [
  { path: "/", title: seo.title, description: seo.description },
  {
    path: "/projects",
    title: `Projects — ${identity.name}`,
    description: `Explore mobile apps, browser tools and machine learning projects by ${identity.name}.`,
  },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    title: `${project.title} — ${identity.name}`,
    description: project.description,
    image: `/og/${project.slug}.jpg`,
    project,
  })),
];
// Ship the first paint in the document: no stylesheet/font round trip on a cold CDN.
// Reuse Vite's actual output so there is one source of styles in development and production.
let template = await readFile("dist/index.html", "utf8");
const font = (await readFile("public/fonts/archivo-latin.woff2")).toString(
  "base64",
);
for (const [tag, href] of template.matchAll(
  /<link\b(?=[^>]*rel="stylesheet")[^>]*href="([^"?]+)"[^>]*>/g,
)) {
  const css = (await readFile(`dist${href}`, "utf8"))
    .replaceAll("/fonts/archivo-latin.woff2", `data:font/woff2;base64,${font}`)
    // The face is already available: allow a brief decode before painting fallback text.
    .replace("font-display:swap", "font-display:block");
  template = template.replace(
    tag,
    `<style data-first-paint>${css.replaceAll("</style", "<\\/style")}</style>`,
  );
}
// Avoid preloading an external duplicate of the embedded face.
template = template.replace(
  /<link\b(?=[^>]*rel="preload")(?=[^>]*href="\/fonts\/archivo-latin\.woff2")[^>]*>/g,
  "",
);
for (const route of [
  ...routes,
  {
    path: "/404",
    title: `Page not found — ${identity.name}`,
    description: `This page could not be found. Explore ${identity.name}’s software projects.`,
    noindex: true,
  },
]) {
  const url = new URL(route.path, origin).href;
  const graph = [
    {
      "@type": "Person",
      "@id": `${origin}#person`,
      name: identity.name,
      url: origin,
      jobTitle: identity.title,
      image: new URL(identity.profileImage, origin).href,
      sameAs: Object.values(socials)
        .filter((s) => s.url)
        .map((s) => s.url),
    },
    {
      "@type": "WebSite",
      "@id": `${origin}#website`,
      url: origin,
      name: seo.siteName,
      alternateName: seo.alternateName,
      publisher: { "@id": `${origin}#person` },
    },
    {
      "@type": route.path === "/" ? "ProfilePage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: "en",
      isPartOf: { "@id": `${origin}#website` },
      ...(route.path === "/"
        ? { mainEntity: { "@id": `${origin}#person` } }
        : {}),
    },
  ];
  if (route.project) {
    graph.push({
      "@type": "CreativeWork",
      name: route.project.title,
      description: route.description,
      url,
      image: new URL(route.image, origin).href,
      creator: { "@id": `${origin}#person` },
    });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: origin },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: new URL("/projects", origin).href,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: route.project.title,
          item: url,
        },
      ],
    });
  }
  const html = template
    .replace(
      /<!-- seo-start -->[\s\S]*?<!-- seo-end -->/,
      seoHead(process.env.GOOGLE_SITE_VERIFICATION, {
        ...route,
        noindex: preview || route.noindex,
      }),
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${render(route.path)}</div>`,
    )
    .replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script></head>`,
    );
  const file =
    route.path === "/"
      ? "dist/index.html"
      : route.path === "/404"
        ? "dist/404.html"
        : `dist${route.path}/index.html`;
  await mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
  await writeFile(file, html);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${escape(new URL(route.path, origin).href)}</loc></url>`).join("")}</urlset>\n`,
);
await writeFile(
  "dist/robots.txt",
  preview
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", origin).href}\n`,
);
await writeFile(
  "dist/llms.txt",
  `# ${identity.name}\n\n> ${seo.description}\n\n## Pages\n${routes.map((route) => `- [${route.title}](${new URL(route.path, origin).href}): ${route.description}`).join("\n")}\n\n## Contact\n- [Email](mailto:${contact.email})\n- [GitHub](${socials.github.url})\n`,
);
await rm("dist-server", { recursive: true });
console.log(
  `Prerendered ${routes.length} indexable routes, custom 404, schema and crawl files.`,
);
