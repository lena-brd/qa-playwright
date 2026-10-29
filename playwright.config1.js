// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 30 * 1000, //components timeout
  expect: {
    timeout: 5000, // for expect
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
      },
    },
  ],
});
