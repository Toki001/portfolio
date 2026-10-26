import { test, expect } from "@playwright/test";
import { projects } from "../src/content/projects";
for (const project of projects)
  test(`${project.slug} presents distinct named screens with stable gallery geometry`, async ({
    page,
  }) => {
    await page.goto("/projects/" + project.slug);
    const gallery = page.getByRole("region", {
      name: project.title + " screenshots",
      exact: true,
    });
    await gallery.scrollIntoViewIfNeeded();
    expect(project.media.length).toBeGreaterThanOrEqual(3);
    const frame = gallery.locator(".gallery-image");
    const height = (await frame.boundingBox())!.height;
    const sources = new Set<string>();
    for (let i = 0; i < 3; i++) {
      const item = project.media[i];
      await gallery
        .getByRole("button", {
          name: `Screenshot ${String(i + 1).padStart(2, "0")}: ${item.label}`,
          exact: true,
        })
        .click();
      await expect(frame.locator("img")).toHaveAttribute("src", item.src);
      await frame
        .locator("img")
        .evaluate(async (img: HTMLImageElement) => img.decode());
      sources.add((await frame.locator("img").getAttribute("src")) ?? "");
      await expect(gallery.locator("figcaption")).toContainText(item.caption);
      expect(
        Math.abs((await frame.boundingBox())!.height - height),
      ).toBeLessThan(1);
    }
    expect(sources.size).toBe(3);
    await expect(page).toHaveURL(/media=3/);
    await page.reload();
    await expect(gallery.locator("figcaption")).toContainText(
      "3 of " + project.media.length,
    );
    const zoom = gallery.getByRole("button", {
      name: "View larger",
      exact: true,
    });
    await zoom.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(zoom).toBeFocused();
  });

test("real touch swipes change a screen while vertical gestures retain native page scroll", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  try {
    await page.goto("/projects/pixeltools");
    const gallery = page.getByRole("region", {
      name: "PixelTools screenshots",
    });
    const frame = gallery.locator(".gallery-image");
    await frame.scrollIntoViewIfNeeded();
    const cdp = await context.newCDPSession(page);
    async function swipe(x: number, y: number, dx: number, dy: number) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x, y, id: 1 }],
      });
      for (let i = 1; i <= 6; i++) {
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [{ x: x + (dx * i) / 6, y: y + (dy * i) / 6, id: 1 }],
        });
        await page.waitForTimeout(30);
      }
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
    }
    const b = (await frame.boundingBox())!,
      before = await page.evaluate(() => scrollY);
    await swipe(b.x + b.width * 0.8, b.y + b.height * 0.5, -b.width * 0.6, 0);
    await expect(gallery.locator("figcaption")).toContainText("2 of 4");
    expect(
      Math.abs((await page.evaluate(() => scrollY)) - before),
    ).toBeLessThan(5);
    const n = (await frame.boundingBox())!;
    await swipe(n.x + n.width * 0.5, n.y + n.height * 0.7, 0, -100);
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeGreaterThan(before + 10);
    await expect(gallery.locator("figcaption")).toContainText("2 of 4");
  } finally {
    await context.close();
  }
});
