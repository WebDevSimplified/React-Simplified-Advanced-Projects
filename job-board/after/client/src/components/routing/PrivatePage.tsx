import { useAuth } from "@/features/authentication"
import { Navigate, useLocation } from "react-router-dom"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export function PrivatePage({ children }: { children: React.ReactNode }) {
  const { user, isLoadingUser } = useAuth()
  const location = useLocation()

  if (isLoadingUser) return <LoadingSpinner className="h-24 w-24" />

  if (user == null) return <Navigate to="/login" replace state={{ location }} />

  return children
}
