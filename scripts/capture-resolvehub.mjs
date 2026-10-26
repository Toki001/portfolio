// Render the unchanged compiled app against an isolated EMPTY fixture API.
// These captures verify actual UI screens, not authentication, ingestion or live AI.
import { cp, mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, basename } from "node:path";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { chromium } from "@playwright/test";
const source =
  process.argv[2] ?? "/Users/jameskierdoliguez/projects/resolvehub";
const output = "/private/tmp/portfolio-phase3-captures/resolvehub";
const temp = await mkdtemp(join(tmpdir(), "portfolio-resolvehub-"));
const filter = (path) => !basename(path).startsWith(".env");
await cp(join(source, "apps/web/.next/standalone"), temp, {
  recursive: true,
  filter,
});
await cp(
  join(source, "apps/web/.next/static"),
  join(temp, "apps/web/.next/static"),
  { recursive: true },
);
const empty = { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
const api = createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  let data;
  if (req.url === "/v1/me")
    data = {
      organizationId: "00000000-0000-4000-8000-000000000001",
      membershipId: "00000000-0000-4000-8000-000000000002",
      subject: "synthetic-portfolio-capture",
      role: "admin",
    };
  else if (req.url === "/graphql") {
    const { query = "" } = JSON.parse(Buffer.concat(chunks).toString());
    const field = /KnowledgeDocuments/.test(query)
      ? "knowledgeDocuments"
      : /ReviewQueue/.test(query)
        ? "reviewQueue"
        : /Tickets/.test(query)
          ? "tickets"
          : null;
    if (!field) throw new Error("Unreviewed capture operation");
    data = { data: { [field]: empty } };
  } else {
    res.writeHead(404);
    res.end("{}");
    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});
api.listen(44101, "127.0.0.1");
await once(api, "listening");
const app = spawn(process.execPath, [join(temp, "apps/web/server.js")], {
  cwd: join(temp, "apps/web"),
  env: {
    PATH: process.env.PATH,
    NODE_ENV: "production",
    HOSTNAME: "127.0.0.1",
    PORT: "44100",
    API_URL: "http://127.0.0.1:44101",
    WORKER_URL: "http://127.0.0.1:44101",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let browser;
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch("http://127.0.0.1:44100/sign-in");
      if (r.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error("Isolated compiled app did not start");
  await mkdir(output, { recursive: true });
  browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await context.addCookies([
    {
      name: "rh_session",
      value: "synthetic-local-capture-only",
      url: "http://127.0.0.1:44100",
    },
  ]);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const screens = [];
  for (const [name, path, title] of [
    ["tickets", "/tickets", "Tickets"],
    ["knowledge", "/knowledge", "Knowledge Base"],
    ["review", "/review", "Review Queue"],
  ]) {
    await page.goto("http://127.0.0.1:44100" + path);
    await page.getByRole("heading", { name: title, exact: true }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    if (
      await page
        .getByText("Sign in to your workspace first.", { exact: true })
        .count()
    )
      throw new Error("Fixture identity not connected");
    const file = join(output, name + ".png");
    await page.screenshot({ path: file, fullPage: false });
    screens.push({
      name,
      path,
      file,
      state:
        "Unchanged actual app with isolated empty collection fixtures; no real services or customer data",
    });
  }
  await writeFile(
    join(output, "capture.json"),
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        source,
        screens,
        errors,
        note: "Only /v1/me and read-only GraphQL fixtures; no real credentials, backend, AI, uploads, editing or delivery tested",
      },
      null,
      2,
    ),
  );
  console.log({ screens: screens.map((s) => s.path), errors });
} finally {
  await browser?.close();
  app.kill();
  api.close();
}
