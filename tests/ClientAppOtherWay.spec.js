import { test, expect } from '@playwright/test';

test.skip('Get the first title of the product', async ({ page }) => {
  // const cardTitles = page.locator('.card-body b');
  const productName = 'ZARA COAT 3';
  const email = process.env.APP_EMAIL;
  const products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill(process.env.APP_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();
  await page
    .locator('.card-body')
    .filter({ hasText: `${productName}` })
    .getByRole('button', { name: 'Add To Cart' })
    .click();
  await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
  await page.locator('div li').first().waitFor();
  await expect(page.getByText(`${productName}`)).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.locator('.field', { hasText: 'Credit Card Number' }).getByRole('textbox').fill('4542 9931 9292 2293');
  const expiry = page.locator('.field', { hasText: 'Expiry Date' });
  await expiry.getByRole('combobox').nth(0).selectOption('06'); // month
  await expiry.getByRole('combobox').nth(1).selectOption('12'); // year
  await page.locator('.field', { hasText: 'CVV Code' }).getByRole('textbox').fill('111');
  await page.locator('.field', { hasText: 'Name on Card ' }).getByRole('textbox').fill('John Doe');
  await page.getByPlaceholder('Select Country').pressSequentially('slo', { delay: 150 });
  await page.getByRole('button', { name: 'Slovakia (Slovak Republic)' }).click();
  await page.getByText('PLACE ORDER').click();
  await expect(page.getByText('Thankyou for the order.')).toBeVisible();
  const orderId = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()).replaceAll('|', '');
  await page.getByRole('listitem').getByRole('button', { name: 'ORDERS' }).click();
  await page.locator('tbody').waitFor();
  await page.getByRole('row').filter({ hasText: orderId }).getByRole('button').first().click();
  await expect(page.locator('.col-text')).toContainText(orderId);
});
