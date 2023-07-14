import { createContext, useEffect, useState } from "react"
import { User } from "../constants/types"
import {
  getLoggedInUser,
  login as loginService,
  logout as logoutService,
  signup as signupService,
} from "../services/authentication"
import { useLocation, useNavigate } from "react-router-dom"

type AuthContext = {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoggedIn: boolean
  readonly user?: User
}

export const Context = createContext<AuthContext | null>(null)

type AuthProvider = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getLoggedInUser().then(setUser)
  }, [])

  function login(email: string, password: string) {
    return loginService(email, password).then(user => {
      setUser(user)
      navigate(location.state?.location ?? "/")
    })
  }

  function signup(email: string, password: string) {
    return signupService(email, password).then(user => {
      setUser(user)
      navigate(location.state?.location ?? "/")
    })
  }

  function logout() {
    return logoutService().then(() => setUser(undefined))
  }

  return (
    <Context.Provider
      value={{ user, login, signup, logout, isLoggedIn: user != null }}
    >
      {children}
    </Context.Provider>
  )
}
