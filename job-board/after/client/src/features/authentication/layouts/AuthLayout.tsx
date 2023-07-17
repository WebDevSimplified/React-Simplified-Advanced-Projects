import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="flex justify-center items-center h-full">
      <Outlet />
    </div>
  )
}
