import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/contexts/ThemeProvider"
import { AuthProvider } from "@/features/authentication"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "./Navbar"

export function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="container my-4 flex-grow grid grid-cols-1">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
