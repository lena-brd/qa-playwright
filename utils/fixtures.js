const base = require('@playwright/test');
import { request } from '@playwright/test';
import { APIUtils } from './APIUtils.js';
const loginPayload = { userEmail: 'test_qa123@yahoo.com', userPassword: 'Bambam123' };
const orderPayload = { orders: [{ country: 'Czech Republic', productOrderedId: '6960eac0c941646b7a8b3e68' }] };

exports.customTest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('test_qa123@yahoo.com');
    await page.locator('#userPassword').fill('Bambam123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await use(page);
    await context.close();
  },

  createOrder: async ({}, use) => {
    let response = {};
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    await use(response);
    await apiContext.dispose();
  },

  testDataForOrder: {
    productName: 'ZARA COAT 3',
  },
});
