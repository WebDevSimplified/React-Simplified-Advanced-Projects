import { createContext, useEffect, useState } from "react"
import { User } from "../constants/types"
import {
  getLoggedInUser,
  login as loginService,
  logout as logoutService,
  signup as signupService,
} from "../services/authentication"
import { useLocation, useNavigate } from "react-router-dom"
import { LogoutDialog } from "../components/LogoutDialog"

type AuthContext = {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoggedIn: boolean
  isLoadingUser: boolean
  user?: User
}

export const Context = createContext<AuthContext | null>(null)

type AuthProvider = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User>()
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getLoggedInUser()
      .then(setUser)
      .finally(() => setIsLoadingUser(false))
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
    setIsLogOutModalOpen(true)
    return logoutService()
      .then(() => setUser(undefined))
      .finally(() => setIsLogOutModalOpen(false))
  }

  return (
    <Context.Provider
      value={{
        user,
        isLoadingUser,
        login,
        signup,
        logout,
        isLoggedIn: user != null,
      }}
    >
      {children}
      <LogoutDialog
        isOpen={isLogOutModalOpen}
        onOpenChange={setIsLogOutModalOpen}
      />
    </Context.Provider>
  )
}
