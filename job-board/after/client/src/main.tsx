import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { routes } from "./routes.tsx"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>
)
