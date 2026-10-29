const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber'); // import the packages
const { POManager } = require('../../page-objects/POManager.js');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
setDefaultTimeout(30 * 1000);

Given('a login to Ecommerce application', async function () {
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goToLandingPage();
  await loginPage.validLogin(process.env.APP_EMAIL, process.env.APP_PASSWORD);
});

When('adding {string} to cart', async function (productName) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddingToCart(productName);
  await dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.addedProduct(productName);
});

When('enter valid details and place an order', async function (dataTable) {
  const d = dataTable.hashes()[0]; // first (and only) row as an object;
  const checkoutPage = this.poManager.getCheckoutPage();
  await checkoutPage.personalInformation(d.cardNumber, d.expiryMonth, d.expiryYear, d.cvv, d.name);
  await checkoutPage.shippingInformation(d.country, d.countryName);
  await checkoutPage.submitOrder();
});

Then('verify that order is present in order history', async function () {
  const ordersPage = this.poManager.getOrdersPage();
  await ordersPage.orderIsCompleted();
});

// Second test with error validation
Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await this.page.title());
  await this.page.locator('#username').type(username);
  await this.page.locator('#password').type(password);
  await this.page.locator('#signInBtn').click();
});

Then('verify error message is displayed', async function () {
  console.log(await this.page.locator('[style*="block"]').textContent());
  await expect(this.page.locator('[style*="block"]')).toContainText('Incorrect');
});
