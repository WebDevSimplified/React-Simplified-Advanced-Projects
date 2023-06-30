import { setupServer } from "msw/node"
import { rest } from "msw"

export const mockServer = setupServer()

export function addMockApiRouteHandler(func, path, cb) {
  mockServer.use(
    rest[func](new URL(path, import.meta.env.VITE_API_URL).href, cb)
  )
}
