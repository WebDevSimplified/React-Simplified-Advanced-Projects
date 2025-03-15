import { test as base } from "@playwright/test"
import fs from "node:fs/promises"

export const test = base.extend({
  forEachTest: [
    async ({}, use) => {
      await fs.copyFile("../api/db.test.base.json", "../api/db.test.json")
      await use()
    },
    { auto: true },
  ],
})
