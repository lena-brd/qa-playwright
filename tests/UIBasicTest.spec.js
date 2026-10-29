import { test, expect } from '@playwright/test';

test('@Web Browser Context Playwright Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator('#username');
  const signInButton = page.locator('#signInBtn');
  const cardTitles = page.locator('.card-body a');

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await username.fill(process.env.RS_WRONG_EMAIL);
  await page.locator('[type="password"]').fill(process.env.RS_PASSWORD);
  await signInButton.click();
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(page.locator('[style*="block"]')).toContainText('Incorrect username/password.');

  await username.fill(process.env.RS_EMAIL);
  await signInButton.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test('Page Playwright Test', async ({ page }) => {
  await page.goto('https://google.com');
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
});

test('@Web UI Controls', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const username = page.locator('#username');
  const signInButton = page.locator('#signInBtn');
  const dropdown = page.locator('select.form-control');
  const documentLink = page.locator('[href*="documents-request" ]');

  await username.fill(process.env.RS_EMAIL);
  await page.locator('[type="password"]').fill(process.env.RS_PASSWORD);
  await dropdown.selectOption('consult');
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  console.log(await page.locator('.radiotextsty').last().isChecked());
  await expect(page.locator('.radiotextsty').last()).toBeChecked();
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  await expect(page.locator('#terms')).not.toBeChecked();
  expect(await page.locator('#terms').isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
});

test('Child windows habdling', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator('#username');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const documentLink = page.locator('[href*="documents-request" ]');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // listen for any new page
    documentLink.click(), // new page is opened
  ]);
  const text = await newPage.locator('.red').textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log(domain);
  await username.fill(domain);

  console.log(await username.inputValue());
});
