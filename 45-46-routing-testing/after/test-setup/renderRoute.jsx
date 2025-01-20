import { render } from "@testing-library/react"
import { RouterProvider } from "react-router/dom"
import { createMemoryRouter } from "react-router"
import { routes } from "../src/routes"

export function renderRoute(route = "/") {
  return render(
    <RouterProvider
      router={createMemoryRouter(routes, {
        initialEntries: [route],
      })}
    />
  )
}
