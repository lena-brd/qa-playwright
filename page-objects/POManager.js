// import { LoginPage } from './LoginPage';
const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrdersPage } = require('./OrdersPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getOrdersPage() {
    return this.ordersPage;
  }
}

module.exports = { POManager };
