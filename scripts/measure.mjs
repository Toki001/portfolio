// Run against an isolated local production server; never an unverified live deployment.
import { spawn } from "node:child_process";
import { once } from "node:events";
import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
process.env.CHROME_PATH ||= chromium.executablePath();
const port = 4175;
const summary = [];
const server = spawn(process.execPath, ["scripts/preview.mjs"], {
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "inherit"],
});
try {
  await once(server.stdout, "data");
  for (const [name, path, desktop] of [
    ["mobile", "/", false],
    ["desktop", "/", true],
    ["peso-mobile", "/projects/peso-flow", false],
    ["index-mobile", "/projects", false],
  ]) {
    const args = [
      "node_modules/lighthouse/cli/index.js",
      `http://127.0.0.1:${port}${path}`,
      "--chrome-flags=--headless --no-sandbox",
      "--output=json",
      "--output=html",
      `--output-path=docs/verification/lighthouse-final-${name}`,
      "--only-categories=performance,accessibility,best-practices,seo",
      "--quiet",
      ...(desktop ? ["--preset=desktop"] : []),
    ];
    const child = spawn(process.execPath, args, { stdio: "inherit" });
    const [code] = await once(child, "exit");
    if (code !== 0) throw new Error(`Lighthouse ${name} failed: ${code}`);
    const report = JSON.parse(
      await readFile(
        `docs/verification/lighthouse-final-${name}.report.json`,
        "utf8",
      ),
    );
    summary.push({
      name,
      version: report.lighthouseVersion,
      url: report.requestedUrl,
      fetchTime: report.fetchTime,
      scores: Object.fromEntries(
        Object.entries(report.categories).map(([key, value]) => [
          key,
          value.score * 100,
        ]),
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "total-blocking-time",
          "cumulative-layout-shift",
          "speed-index",
        ].map((key) => [
          key,
          {
            value: report.audits[key].numericValue,
            display: report.audits[key].displayValue,
          },
        ]),
      ),
      formFactor: report.configSettings.formFactor,
      screen: report.configSettings.screenEmulation,
      throttling: report.configSettings.throttling,
      throttlingMethod: report.configSettings.throttlingMethod,
    });
    console.log(`Measured ${name}`);
  }
  await writeFile(
    "docs/verification/lighthouse-final-summary.json",
    JSON.stringify(summary, null, 2) + "\n",
  );
} finally {
  server.kill();
}
