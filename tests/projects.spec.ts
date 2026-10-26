import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("all featured cards open their matching project pages", async ({
  page,
}) => {
  for (const [name, slug] of [
    ["PesoFlow", "peso-flow"],
    ["PokeChamp", "pokechamp"],
    ["PixelTools", "pixeltools"],
  ]) {
    await page.goto("/");
    await page.getByRole("link", { name: `Read ${name} case study` }).click();
    await expect(page).toHaveURL(new RegExp(`/projects/${slug}$`));
    await expect(page.locator("h1")).toContainText(name);
  }
});
test("filter state, history and reload work", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator(".explorer-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(page.locator(".explorer-card")).toHaveCount(2);
  await expect(page).toHaveURL(/category=Web/);
  await page.reload();
  await expect(page.locator(".explorer-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".explorer-card")).toHaveCount(1);
  await page.goBack();
  await expect(page.locator(".explorer-card")).toHaveCount(2);
  await page.getByRole("button", { name: "AI / ML", exact: true }).click();
  await expect(page.locator(".explorer-card")).toHaveCount(1);
  await expect(page.locator(".explorer-card")).toContainText("GuestReco");
});
test("explorer works on touch with accessible controls", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/projects");
  await page.getByRole("button", { name: "Mobile", exact: true }).tap();
  await expect(page.locator(".explorer-card")).toHaveCount(1);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await context.close();
});
