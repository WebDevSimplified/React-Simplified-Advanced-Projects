import { routes } from "../src/routes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { render } from "@testing-library/react"

export function renderRoute(route = "/") {
  window.history.pushState({}, "Test page", route)

  return render(<RouterProvider router={createBrowserRouter(routes)} />)
}
