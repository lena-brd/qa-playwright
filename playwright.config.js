// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 2,
  workers: 1,
  timeout: 30 * 1000, //components timeout
  expect: {
    timeout: 5000, // for expect
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    // action timeout
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'off',
    // trace: 'on-first-retry',
  },
});
