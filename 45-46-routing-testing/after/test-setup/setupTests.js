// FIXME: This changed
import "@testing-library/jest-dom/vitest"
import { afterEach, beforeAll, afterAll } from "vitest"
import { cleanup } from "@testing-library/react"
import { mockServer } from "./mockServer"

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: "error" })
})

afterEach(() => {
  cleanup()
  mockServer.resetHandlers()
})

afterAll(() => {
  mockServer.close()
})

Object.defineProperty(window, "scrollTo", { value: () => {} })
