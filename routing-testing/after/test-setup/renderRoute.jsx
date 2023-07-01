import { render } from "@testing-library/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routes } from "../src/routes"

export function renderRoute(route = "/") {
  window.history.pushState({}, "Test Page", route)

  return render(<RouterProvider router={createBrowserRouter(routes)} />)
}
