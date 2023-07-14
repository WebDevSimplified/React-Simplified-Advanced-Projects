import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/contexts/ThemeProvider"
import { AuthProvider } from "@/features/authentication"
import { Outlet, ScrollRestoration } from "react-router-dom"

export function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Outlet />
        <ScrollRestoration />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
