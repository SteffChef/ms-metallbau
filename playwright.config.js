const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:8000',
    browserName: 'chromium',
  },
  webServer: {
    command: 'node tests/static-server.js',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
