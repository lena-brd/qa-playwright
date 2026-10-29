const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { POManager } = require('../../page-objects/POManager.js');

Before(async function () {
  // will execute before every scenario
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {});

AfterStep(async function ({ result }) {
  // when the 'When' step will fail, the answer will go to this block
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'screenshot-cucumber.png' });
  }
});

After(async function () {
  console.log('I am the last to execute');
});
