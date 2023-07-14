import { useContext } from "react"
import { Context } from "../contexts/AuthProvider"

export function useAuth() {
  const auth = useContext(Context)

  if (auth == null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return auth
}
