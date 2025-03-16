import { RouterProvider } from "react-router/dom"
import { createMemoryRouter } from "react-router"
import { routes } from "../src/routes.jsx"
import { render } from "vitest-browser-react"

export function renderRoute(route = "/") {
  return render(
    <RouterProvider
      router={createMemoryRouter(routes, {
        initialEntries: [route],
      })}
    />
  )
}
