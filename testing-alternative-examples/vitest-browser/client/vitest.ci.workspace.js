import { defineWorkspace } from "vitest/config"

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.js',
  {
    extends: "vite.config.js",
    test: {
      browser: {
        enabled: true,
        provider: "playwright",
        headless: true,
        // https://vitest.dev/guide/browser/playwright
        configs: [
          { browser: "chromium" },
          { browser: "firefox" },
          { browser: "webkit" },
        ],
        instances: [
          { browser: "chromium" },
          { browser: "firefox" },
          { browser: "webkit" },
        ],
      },
    },
  },
])
