import { test, expect } from '@playwright/test';

test('Playwright special locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');

  await page.getByLabel('Check me out if you Love IceCreams!').click();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByPlaceholder('Password').fill(process.env.APP_PASSWORD);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

  // 5 seconds default timeout for expect assertions - ovveride with {timeout}: 10_000 step level
  await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({ timeout: 10_000 });

  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('button', { name: 'Checkout' }).click();
});

test('Playwright special locators - test level timeout', async ({ page }) => {
  // test level
  test.setTimeout(60000);
  // test level for assetion timeout
  const slowExpect = expect.configure({ timeout: 9000 });
  page.setDefaultTimeout(9000);

  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel('Check me out if you Love IceCreams!').click();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByPlaceholder('Password').fill(process.env.APP_PASSWORD);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

  // 5 seconds default timeout for expect assertions
  await slowExpect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();

  // global level -> test level -> step level
  await page.getByRole('link', { name: 'Shop' }).click({ timeout: 15000 });
  await slowExpect(page.locator('.my-4').first()).toHaveText('Shop Name');
  // 2 more assertions
  await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add' }).click();
});
