import { useAuth } from "@/features/authentication"
import { Navigate, useLocation } from "react-router-dom"

export function PrivatePage({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (user == null) return <Navigate to="/login" replace state={{ location }} />

  return children
}
