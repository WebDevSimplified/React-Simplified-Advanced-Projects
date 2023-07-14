import { useLocalStorage } from "@/hooks/useLocalStorage"
import { createContext } from "react"

const THEME_OPTIONS = ["light", "dark", "system"] as const

type Theme = (typeof THEME_OPTIONS)[number]
type ThemeContext = {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

export const Context = createContext<ThemeContext | null>(null)

type ThemeProvider = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProvider) {
  const [theme, setTheme] = useLocalStorage<Theme>("THEME", "system")

  function changeTheme(theme: Theme) {
    const isDark =
      theme === "dark" ||
      (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList.toggle("dark", isDark)
    setTheme(theme)
  }

  return (
    <Context.Provider
      value={{
        theme,
        setTheme: changeTheme,
        isDark: document.documentElement.classList.contains("dark"),
      }}
    >
      {children}
    </Context.Provider>
  )
}
