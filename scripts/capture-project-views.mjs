// Actual existing builds, read-only. UI sources are never reconstructed for screenshots.
import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { once } from "node:events";
import sharp from "sharp";
import { chromium } from "@playwright/test";
const raw = "/private/tmp/portfolio-phase3-captures";
await mkdir(raw, { recursive: true });
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};
async function serve(root, port, spa = false) {
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      const target = resolve(root, "." + path);
      if (!target.startsWith(root + "/") && target !== root) {
        res.writeHead(403).end();
        return;
      }
      let file;
      for (const candidate of [
        target,
        resolve(target, "index.html"),
        target + ".html",
      ])
        try {
          if ((await stat(candidate)).isFile()) {
            file = candidate;
            break;
          }
        } catch {}
      if (!file && spa && !extname(path)) file = resolve(root, "index.html");
      if (!file) {
        res.writeHead(404).end();
        return;
      }
      res.setHeader(
        "Content-Type",
        mime[extname(file)] ?? "application/octet-stream",
      );
      res.end(await readFile(file));
    } catch {
      res.writeHead(500).end();
    }
  });
  server.listen(port, "127.0.0.1");
  await once(server, "listening");
  return server;
}
const servers = [
  await serve("/Users/jameskierdoliguez/projects/pokechamp/dist", 44300, true),
  await serve("/Users/jameskierdoliguez/projects/PixelTools/out", 44301),
];
const browser = await chromium.launch();
const manifest = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  // Empty public community fixture; no real account/session or writes to Supabase.
  await context.route(/https:\/\/[^/]+\.supabase\.[^/]+\//, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "content-range": "0-0/0" },
      body: "[]",
    }),
  );
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [name, path] of [
    ["showcase", "/team-showcase"],
    ["analytics", "/analytics"],
  ]) {
    await page.goto("http://127.0.0.1:44300" + path);
    await page.waitForTimeout(1100);
    await page.evaluate(() => document.fonts.ready);
    await mkdir(raw + "/pokechamp", { recursive: true });
    const file = `${raw}/pokechamp/${name}.png`;
    await page.screenshot({ path: file });
    manifest.push({
      project: "pokechamp",
      name,
      path,
      file,
      state:
        name === "showcase"
          ? "Actual existing app, empty isolated community API fixture, no submissions"
          : "Actual existing app, bundled championship usage snapshot, not a live feed",
    });
  }
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="720"><rect width="1000" height="720" fill="#011936"/><rect x="48" y="48" width="420" height="624" fill="#890620"/><circle cx="730" cy="265" r="155" fill="#767B91"/><text x="530" y="525" fill="white" font-family="Arial" font-size="42">Original image</text><text x="530" y="585" fill="white" font-family="Arial" font-size="28">PixelTools test input</text></svg>';
  const fixture = raw + "/pixeltools-original-input.png";
  await sharp(Buffer.from(svg)).png().toFile(fixture);
  for (const [name, path] of [
    ["crop", "/tools/image-cropper"],
    ["resize", "/tools/image-resizer"],
    ["rotate", "/tools/image-rotator"],
  ]) {
    await page.goto("http://127.0.0.1:44301" + path);
    await page.locator("input[type=file]").first().setInputFiles(fixture);
    await page.waitForTimeout(800);
    await page.evaluate(() => document.fonts.ready);
    if (!(await page.locator('img[src^="blob:"], img[src^="data:"]').count()))
      throw new Error("Real selected image preview missing");
    await mkdir(raw + "/pixeltools", { recursive: true });
    const file = `${raw}/pixeltools/${name}.png`;
    await page.screenshot({ path: file });
    manifest.push({
      project: "pixeltools",
      name,
      path,
      file,
      state:
        "Actual existing tool page with original owned test-input image selected; all processing stays in browser",
    });
  }
  await context.close();
  // GuestReco client runs separately with the documented capture-only Vite config.
  const guest = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await guest.addInitScript(() =>
    localStorage.setItem("securesight_token", "synthetic-client-preview-only"),
  );
  await guest.route("**/*", (route) => {
    const u = new URL(route.request().url());
    if (u.origin !== "http://127.0.0.1:44200") {
      route.abort();
      return;
    }
    if (!u.pathname.startsWith("/api/")) {
      route.continue();
      return;
    }
    if (route.request().method() !== "GET") {
      route.abort();
      return;
    }
    const data =
      u.pathname === "/api/stats"
        ? {
            total_scans: 0,
            employee_matches: 0,
            guest_alerts: 0,
            cameras_online: 0,
          }
        : u.pathname === "/api/stats/today"
          ? {
              scans_today: 0,
              unique_people_today: 0,
              currently_on_site: 0,
              employees_in_today: 0,
              guests_today: 0,
            }
          : [];
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  });
  await guest.routeWebSocket("**/ws/**", (ws) => ws.close());
  const g = await guest.newPage();
  g.on("pageerror", (e) => errors.push(e.message));
  for (const [name, path, title] of [
    ["dashboard", "/dashboard", "Dashboard"],
    ["cameras", "/cameras", "Camera Grid"],
    ["employees", "/employees", "Employees"],
  ]) {
    await g.goto("http://127.0.0.1:44200" + path);
    await g
      .getByRole("heading", { level: 1, name: title, exact: true })
      .waitFor();
    await g.waitForTimeout(800);
    await g.evaluate(() => document.fonts.ready);
    await mkdir(raw + "/guest-reco", { recursive: true });
    const file = `${raw}/guest-reco/${name}.png`;
    await g.screenshot({ path: file });
    manifest.push({
      project: "guest-reco",
      name,
      path,
      file,
      state:
        "Unchanged actual client, isolated empty data and synthetic local preview token; no backend, face, camera, person record or recognition result",
    });
  }
  await guest.close();
  await writeFile(
    raw + "/capture-views.json",
    JSON.stringify(
      { capturedAt: new Date().toISOString(), screens: manifest, errors },
      null,
      2,
    ) + "\n",
  );
  console.log({
    screens: manifest.map((m) => m.project + "/" + m.name),
    errors,
  });
} finally {
  await browser.close();
  for (const server of servers) server.close();
}
