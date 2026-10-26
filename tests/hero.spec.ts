import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('hero actions and readable identity', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Jameskier');
  await page.locator('.hero').evaluate(async el => { await Promise.all(el.getAnimations({subtree:true}).map(a => a.finished)); });
  await expect(page.getByRole('link', { name: 'Explore my work' })).toBeInViewport();
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/#projects/);
  expect((await new AxeBuilder({ page }).include('.hero').analyze()).violations).toEqual([]);
});
test('identity remains usable with reduced motion and without JS', async ({ browser }) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled, reducedMotion: 'reduce', viewport: { width: 320, height: 760 } });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore my work' })).toBeVisible();
    await expect(page.locator('.hero-title')).toHaveCSS('animation-name', 'none');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  }
});
