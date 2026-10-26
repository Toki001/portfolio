import {test,expect,chromium} from '@playwright/test';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

test('native Chromium 200% browser zoom reflows and preserves navigation',async()=>{
  const root=await mkdtemp(join(tmpdir(),'portfolio-zoom-'));
  const extension=join(root,'zoom');await mkdir(extension);
  // Owned, permission-free test extension. It can change tab zoom, and reads no page data.
  await writeFile(join(extension,'manifest.json'),JSON.stringify({manifest_version:3,name:'Local zoom test',version:'1.0',background:{service_worker:'worker.js'}}));
  await writeFile(join(extension,'worker.js'),'chrome.runtime.onInstalled.addListener(() => {});');
  const context=await chromium.launchPersistentContext(join(root,'profile'),{channel:'chromium',viewport:null,reducedMotion:'reduce',args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1280,900']});
  try {
    const worker=context.serviceWorkers()[0] ?? await context.waitForEvent('serviceworker');
    const page=context.pages()[0];await page.goto('http://127.0.0.1:4173/');await page.bringToFront();
    const before=await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio}));
    await worker.evaluate('chrome.tabs.query({active:true,lastFocusedWindow:true}).then(([tab]) => chrome.tabs.setZoom(tab.id,2))');
    await expect.poll(()=>page.evaluate(()=>devicePixelRatio)).toBe(before.dpr*2);
    expect(await page.evaluate(()=>innerWidth)).toBe(before.width/2);
    expect(await page.evaluate(()=>visualViewport?.scale)).toBe(1); // Page zoom, not pinch zoom.
    for(const path of ['/','/projects','/projects/peso-flow','/projects/pokechamp','/projects/pixeltools','/projects/guest-reco']) {
      await page.goto(`http://127.0.0.1:4173${path}`);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path).toBe(true);
      await expect(page.locator('h1')).toBeVisible();
    }
    await page.goto('http://127.0.0.1:4173/');await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Contact'}).click();await expect(page).toHaveURL(/#contact$/);
    await page.locator('#contact h2').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact h2')).toBeInViewport();
    const session=await context.newCDPSession(page);
    // Chromium page zoom changes screenshot clipping coordinates; capture the actual surface.
    const capture=await session.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    await writeFile('docs/verification/screenshots/m7-native-zoom-200.png',Buffer.from(capture.data,'base64'));
  } finally {await context.close();await rm(root,{recursive:true,force:true});}
});
