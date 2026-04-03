const { chromium, devices } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const baseUrl = 'http://127.0.0.1:4173';
const shotsDir = path.resolve(process.cwd(), 'apps/site/effect-shots');

async function shot(page, name) {
  const target = path.join(shotsDir, name);
  await page.screenshot({ path: target, fullPage: true });
  return target;
}

(async () => {
  fs.mkdirSync(shotsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(devices['iPhone 13']);
  const page = await context.newPage();

  const outputs = [];

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="home-page"]');
  outputs.push(await shot(page, '01-home-external.png'));

  await page.getByTestId('home-draw-color').click();
  await page.getByTestId('home-go-interaction').click();
  await page.waitForSelector('[data-testid="interaction-page"]');
  outputs.push(await shot(page, '02-interaction-external.png'));

  await page.getByTestId('tab-growth').click();
  await page.waitForSelector('[data-testid="growth-page"]');
  outputs.push(await shot(page, '03-growth-external.png'));

  await page.getByTestId('growth-go-memory').click();
  await page.getByText('记忆沉淀').first().waitFor();
  outputs.push(await shot(page, '04-memory-external.png'));

  await page.getByTestId('memory-go-validation').click();
  await page.waitForSelector('[data-testid="validation-page"]');
  outputs.push(await shot(page, '05-validation-external.png'));

  await page.getByTestId('validation-back-home').click();
  await page.waitForSelector('[data-testid="home-page"]');
  outputs.push(await shot(page, '06-home-return-external.png'));

  await page.goto(`${baseUrl}/?mode=demo`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="home-page"]');
  await page.waitForSelector('[data-testid="demo-mode-panel"]');
  outputs.push(await shot(page, '07-home-demo-mode.png'));

  await browser.close();

  process.stdout.write(JSON.stringify({ ok: true, outputs }, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
