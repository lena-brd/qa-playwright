import { test, expect } from '@playwright/test';
import { POManager } from '../page-objects/POManager.js';
const dataSet = JSON.parse(JSON.stringify(require('../utils/place-order.json')));

for (const data of dataSet) {
  test(`@Web Client App login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLandingPage();
    await loginPage.validLogin(process.env.APP_EMAIL, process.env.APP_PASSWORD);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddingToCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.addedProduct(data.productName);

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.personalInformation(data.creaditCardNumber, data.expiryMonth, data.expiryYear, data.cvv, data.name);
    await checkoutPage.shippingInformation(data.country, data.countryName);
    await checkoutPage.submitOrder();

    const ordersPage = poManager.getOrdersPage();
    await ordersPage.orderIsCompleted();
  });
}
