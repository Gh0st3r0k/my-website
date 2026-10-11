import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
    },
  },
  webServer: {
    command: "npm run start",
    url: `http://127.0.0.1:3000${process.env.NEXT_PUBLIC_BASE_PATH || ""}/en/`,
    reuseExistingServer: !process.env.CI,
  },
  reporter: "list",
});
