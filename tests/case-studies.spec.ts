import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.use({reducedMotion:'reduce'});
for(const slug of ['peso-flow','pokechamp','pixeltools','guest-reco']) {
  test(`${slug} has crawlable honest detail content`,async({page,request})=>{
    const response=await request.get(`/projects/${slug}`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('The approach');
    await page.goto(`/projects/${slug}`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading',{name:'What’s there today'})).toBeVisible();
    const results=await new AxeBuilder({page}).analyze();
    expect(results.violations).toEqual([]);
    await page.getByRole('navigation',{name:'Next project'}).locator('a').first().click();
    await expect(page).not.toHaveURL(new RegExp(`/${slug}$`));
  });
}
test('gallery supports keyboard, deep links, zoom and Escape focus return',async({page})=>{
  await page.goto('/projects/peso-flow');
  const gallery=page.getByRole('region',{name:'PesoFlow screenshots'});
  await gallery.focus();await page.keyboard.press('ArrowRight');
  await expect(gallery.locator('figcaption')).toContainText('2 of 3. Budgets');
  await expect(page).toHaveURL(/media=2/);await page.reload();
  await expect(gallery.locator('figcaption')).toContainText('2 of 3');
  await gallery.getByRole('button',{name:'Next screenshot'}).click();
  await expect(gallery.locator('figcaption')).toContainText('3 of 3');
  const zoom=page.getByRole('button',{name:'View larger'});await zoom.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(zoom).toBeFocused();
});
test('unknown routes have an actual HTTP 404 and recovery',async({page})=>{
  const response=await page.goto('/projects/does-not-exist');expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading',{level:1})).toContainText('path');
  await page.getByRole('link',{name:'Back to the portfolio',exact:true}).click();await expect(page).toHaveURL('/');
});
