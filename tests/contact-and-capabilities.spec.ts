import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.use({reducedMotion:'reduce'});
test('capabilities disclose by keyboard and contact has real destinations',async({page})=>{
  await page.goto('/');
  const summary=page.locator('#tech-stack summary').nth(1);
  await summary.focus();await page.keyboard.press('Enter');
  await expect(page.locator('#tech-stack details').nth(1)).toHaveAttribute('open','');
  await expect(page.locator('#contact a.contact-email')).toHaveAttribute('href','mailto:jameskierdoliguez@gmail.com');
  await expect(page.locator('#contact')).not.toContainText('Message sent');
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
});
test('copy confirms success and handles clipboard failure honestly',async({context,page})=>{
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.goto('/');await page.getByRole('button',{name:'Copy email',exact:true}).click();
  await expect(page.locator('.copy-status')).toHaveText('Email address copied.');
  expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('jameskierdoliguez@gmail.com');
  await page.evaluate(()=>{Object.defineProperty(navigator.clipboard,'writeText',{value:()=>Promise.reject(new Error('denied'))});});
  await page.getByRole('button',{name:'Copy email',exact:true}).click();
  await expect(page.locator('.copy-status')).toContainText('Couldn’t copy');
});
test('all home sections and real contact remain available without JS',async({browser})=>{
  const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const p=await c.newPage();
  await p.goto('/');
  for(const id of ['home','projects','tech-stack','tools','about','contact']) await expect(p.locator(`#${id}`)).toBeVisible();
  await expect(p.getByRole('link',{name:'jameskierdoliguez@gmail.com',exact:true})).toHaveAttribute('href',/^mailto:/);
  await c.close();
});
