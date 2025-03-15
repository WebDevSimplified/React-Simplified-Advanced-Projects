import { http } from "msw"

export function addMockApiRouteHandler(worker, type, path, cb) {
  return worker.use(
    http[type](new URL(path, import.meta.env.VITE_API_URL).href, cb)
  )
}
