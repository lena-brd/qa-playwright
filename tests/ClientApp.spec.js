import { test, expect } from '@playwright/test';

test('Get the first title of the product', async ({ page }) => {
  // const cardTitles = page.locator('.card-body b');
  const productName = 'ZARA COAT 3';
  const email = process.env.APP_EMAIL;
  const products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(process.env.APP_PASSWORD);
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();
  const cardTitles = await page.locator('.card-body b').allTextContents();
  console.log(cardTitles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      // add to cart
      await products.nth(i).locator('text= Add To Cart').click();
      break;
    }
  }
  await page.locator('[routerlink*="cart"]').click();
  await page.locator('div li').first().waitFor();
  const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
  await expect(bool).toBeTruthy();
  await page.locator('text=Checkout').click();
  await page.locator('[value="4542 9931 9292 2293"]').fill('4542 9931 9292 2293');
  await page.locator('.input.ddl').first().selectOption('02');
  await page.locator('.input.ddl').last().selectOption('17');
  await page.locator('.field.small > .input.txt').first().fill('111');
  await page.locator('.field .input.input.txt').nth(2).fill('John Doe');
  await page.locator('[placeholder="Select Country"]').pressSequentially('slo', { delay: 150 });
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator('button').count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator('button').nth(i).textContent();
    if (text === ' Slovakia (Slovak Republic)') {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }
  await page.locator('.action__submit').click();
  await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
  const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetailsPage = await page.locator('.col-text').textContent();
  expect(orderId.includes(orderIdDetailsPage)).toBeTruthy();
});
