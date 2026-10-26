import { projects } from "../src/content/projects";
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
  await expect(page.locator(".explorer-card")).toHaveCount(projects.length);
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

test("wide project spreads keep caption blocks from overlapping", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const card of await page.locator(".spotlight-copy").all()) {
      const overlaps = await card.evaluate((el) => {
        const boxes = [...el.children].map((child) =>
          child.getBoundingClientRect(),
        );
        for (let i = 0; i < boxes.length; i++)
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i],
              b = boxes[j];
            if (
              Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
              Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1
            )
              return true;
          }
        return false;
      });
      expect(overlaps).toBe(false);
    }
  }
});
