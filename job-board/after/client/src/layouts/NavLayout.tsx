import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export function NavLayout() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Outlet />
      </div>
    </>
  )
}
