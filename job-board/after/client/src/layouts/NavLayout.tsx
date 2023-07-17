import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export function NavLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container my-4 flex-grow grid">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
