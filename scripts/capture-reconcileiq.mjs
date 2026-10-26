// Read-only capture of an already running, explicitly synthetic local workspace.
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const origin = process.argv[2] ?? "http://127.0.0.1:3100";
if (!["localhost", "127.0.0.1"].includes(new URL(origin).hostname))
  throw new Error("Local synthetic capture only");
const root = "/private/tmp/portfolio-phase3-captures/reconcileiq";
await mkdir(root, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const screens = [];
  for (const [name, path, title] of [
    ["overview", "/", "Your payables, in perspective."],
    ["invoices", "/invoices", "Invoices"],
    ["reconciliation", "/reconciliation", "Reconciliation"],
    ["exceptions", "/exceptions", "Exceptions"],
  ]) {
    const response = await page.goto(origin + path);
    await page
      .getByRole("heading", { level: 1, name: title, exact: true })
      .waitFor();
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    if (
      response.status() !== 200 ||
      !/synthetic/i.test(await page.locator("body").innerText())
    )
      throw new Error("Expected confirmed synthetic workspace");
    const file = root + "/" + name + ".png";
    await page.screenshot({ path: file });
    screens.push({ name, path, file, heading: title });
  }
  await writeFile(
    root + "/capture.json",
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        note: "Read-only local synthetic application, no edits or payment actions",
        screens,
      },
      null,
      2,
    ),
  );
  console.log(screens);
} finally {
  await browser.close();
}
