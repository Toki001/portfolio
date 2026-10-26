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
