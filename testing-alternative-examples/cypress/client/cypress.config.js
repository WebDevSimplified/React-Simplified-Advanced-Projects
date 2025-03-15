import { defineConfig } from "cypress"
import fs from "node:fs/promises"

export default defineConfig({
  e2e: {
    specPattern: "./src/**/*.e2e.test.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async "db:seed"() {
          await fs.copyFile("../api/db.test.base.json", "../api/db.test.json")
          return null
        },
      })
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
})
