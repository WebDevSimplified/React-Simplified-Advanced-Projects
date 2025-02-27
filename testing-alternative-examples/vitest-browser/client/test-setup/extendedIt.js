/// <reference types="@vitest/browser/matchers" />
import "../src/styles.css"
import { it as itBase } from "vitest"
import { setupWorker } from "msw/browser"

export const mockServer = setupWorker()

export const it = itBase.extend({
  worker: [
    async ({}, use) => {
      // Start the worker before the test.
      await mockServer.start()

      // Expose the worker object on the test's context.
      await use(mockServer)

      // Stop the worker after the test is done.
      mockServer.stop()
    },
    {
      // FIXME: Only needed if you want to have some base API handlers setup for all tests
      auto: true,
    },
  ],
})
