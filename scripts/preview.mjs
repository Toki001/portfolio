import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, join } from "node:path";
import { gzipSync } from "node:zlib";
const root = resolve("dist");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (
      pathname === "/index.html" ||
      (pathname.length > 1 && pathname.endsWith("/"))
    ) {
      response.writeHead(308, {
        Location:
          (pathname === "/index.html" ? "/" : pathname.slice(0, -1)) +
          url.search,
      });
      response.end();
      return;
    }
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + "/")) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    let status = 200;
    try {
      const stats = await stat(file);
      if (stats.isDirectory()) file = join(file, "index.html");
      await stat(file);
    } catch {
      file = join(root, "404.html");
      status = 404;
    }
    const raw = await readFile(file);
    const compressed =
      /\btext\/|application\/(?:json|manifest\+json|xml)/.test(
        mime[extname(file)] || "",
      ) && /\bgzip\b/.test(request.headers["accept-encoding"] || "");
    const body = compressed ? gzipSync(raw) : raw;
    response.writeHead(status, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
      Vary: "Accept-Encoding",
      ...(compressed ? { "Content-Encoding": "gzip" } : {}),
      "Content-Length": body.length,
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Portfolio preview: http://127.0.0.1:${port}`),
);
