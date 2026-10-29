import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils.js';

const loginPayload = {
  userEmail: process.env.APP_EMAIL,
  userPassword: process.env.APP_PASSWORD,
};
const orderPayload = { orders: [{ country: 'Czech Republic', productOrderedId: '6960eac0c941646b7a8b3e68' }] };

// let token;
// let orderId;
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test('@API Place an order using API request', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('button[routerlink*="myorders"]').click();

  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetailsPage = await page.locator('.col-text').textContent();
  expect(response.orderId.includes(orderIdDetailsPage)).toBeTruthy();
});
