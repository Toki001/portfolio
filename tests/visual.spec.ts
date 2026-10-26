import { test, expect } from "@playwright/test";
test.use({ reducedMotion: "reduce" });
for (const width of [390, 768, 1440]) {
  for (const [name, path] of [
    ["home", "/"],
    ["index", "/projects"],
    ["study", "/projects/peso-flow"],
  ]) {
    test(`visual ${name} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(path);
      if (name === "home")
        await expect(
          page.getByRole("button", { name: "Copy email", exact: true }),
        ).toBeVisible();
      if (name === "index")
        await expect(
          page.getByRole("button", { name: "All", exact: true }),
        ).toBeVisible();
      if (name === "study")
        await expect(
          page.getByRole("button", { name: "View larger" }),
        ).toBeVisible();
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const img of document.images) {
          img.loading = "eager";
          await img.decode().catch(() => {});
        }
      });
      await expect(page).toHaveScreenshot(`${name}-${width}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixels: 0,
      });
    });
  }
}
