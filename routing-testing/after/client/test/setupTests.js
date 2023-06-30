import { expect, afterEach, beforeAll, afterAll } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"
import { mockServer } from "./mockServer"

expect.extend(matchers)

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
