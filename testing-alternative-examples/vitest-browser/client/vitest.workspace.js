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
        instances: [{ browser: "chromium" }],
      },
    },
  },
])
