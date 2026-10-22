// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const fs = require('fs');
const hasAuth = fs.existsSync('auth.json');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: [['html', { open: 'never' }]],

  use: {
    // URL real do app publicado no Base44
    baseURL: 'https://blazing-nutri-fit-plan.base44.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    
     storageState: hasAuth ? 'auth.json' : undefined,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
