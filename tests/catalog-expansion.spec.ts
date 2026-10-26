import { test, expect } from "@playwright/test";
import { projects } from "../src/content/projects";

test("expanded categories, counts, URLs and every real card agree", async ({
  page,
}) => {
  await page.goto("/projects");
  for (const kind of ["Systems", "Tools"]) {
    await page.getByRole("button", { name: kind, exact: true }).click();
    const expected = projects.filter((p) => p.kind === kind);
    await expect(page.locator(".explorer-card")).toHaveCount(expected.length);
    await expect(page.getByRole("status")).toHaveText(
      `${expected.length} ${expected.length === 1 ? "project" : "projects"}`,
    );
    await page.reload();
    await expect(
      page.getByRole("button", { name: kind, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    for (const project of expected)
      await expect(
        page.getByRole("link", {
          name: `Explore ${project.title}`,
          exact: true,
        }),
      ).toHaveAttribute("href", `/projects/${project.slug}`);
  }
});

test("local-only studies have useful media and no invented repository or live action", async ({
  page,
}) => {
  for (const slug of ["reconcileiq", "reimagined"]) {
    await page.goto("/projects/" + slug);
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Repository", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Visit project", exact: true }),
    ).toHaveCount(0);
    const first = page.locator(".case-cover img").first();
    await first.evaluate(async (img: HTMLImageElement) => {
      img.loading = "eager";
      await img.decode();
    });
    expect(
      await first.evaluate((img: HTMLImageElement) => img.naturalWidth),
    ).toBeGreaterThan(0);
  }
});

test("hydrating the wrapping filters preserves the initial project position", async ({
  browser,
  page,
}) => {
  for (const width of [390, 414, 1280]) {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width, height: 900 },
    });
    const initial = await context.newPage();
    await initial.goto("/projects");
    await initial.evaluate(() => document.fonts.ready);
    const before = await initial.locator(".explorer-grid").boundingBox();
    const initialFrame = await initial
      .locator(".project-explorer")
      .boundingBox();
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects");
    await expect(
      page.getByRole("button", { name: "All", exact: true }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const after = await page.locator(".explorer-grid").boundingBox();
    const hydratedFrame = await page.locator(".project-explorer").boundingBox();
    // No-JS has an extra native navigation row; compare within the content frame.
    expect(
      Math.abs(after!.y - hydratedFrame!.y - (before!.y - initialFrame!.y)),
    ).toBeLessThan(1);
    await context.close();
  }
});
