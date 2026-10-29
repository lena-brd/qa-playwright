import { test, expect } from '@playwright/test';

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill(process.env.APP_EMAIL);
  await page.locator('#userPassword').fill(process.env.APP_PASSWORD);
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');

  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('@API Test Case 1', async () => {
  // const cardTitles = page.locator('.card-body b');
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client/');
  const productName = 'ZARA COAT 3';
  const products = page.locator('.card-body');
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
  await page.locator('[value="4542 9931 9292 2293"]').fill(process.env.APP_CARD_NUMBER);
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

test('@API Test Case 2', async () => {
  // const cardTitles = page.locator('.card-body b');
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client/');
  const productName = 'ZARA COAT 3';
  const products = page.locator('.card-body');
  await page.locator('.card-body b').first().waitFor();
  const cardTitles = await page.locator('.card-body b').allTextContents();
  console.log(cardTitles);
});
