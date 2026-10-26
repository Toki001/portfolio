import { test, expect } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`identity and actions survive portrait failure at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route("**/profile-*.webp", (route) => route.abort());
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Jameskier Doliguez." }),
    ).toBeVisible();
    const img = page.locator(".hero-portrait img");
    await img.evaluate((el: HTMLImageElement) => {
      el.src = "/deliberately-missing-portrait.webp";
    });
    await expect
      .poll(() =>
        img.evaluate((el: HTMLImageElement) => el.complete && !el.naturalWidth),
      )
      .toBe(true);
    await expect(
      page.getByRole("link", { name: "A little about me" }),
    ).toHaveAttribute("href", "#about");
    await page
      .getByRole("link", { name: "Explore my work", exact: true })
      .click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(
      page.getByRole("heading", { name: "Selected work." }),
    ).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  });
}
