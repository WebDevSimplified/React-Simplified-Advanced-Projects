import { Toaster } from "@/components/ui/toaster"
import { Outlet, ScrollRestoration } from "react-router-dom"

export function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="container my-4 flex-grow grid grid-cols-1">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <ScrollRestoration />
      <Toaster />
    </>
  )
}
