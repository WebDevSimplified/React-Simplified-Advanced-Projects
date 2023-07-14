import { useContext } from "react"
import { Context } from "../contexts/ThemeProvider"

export function useTheme() {
  const theme = useContext(Context)

  if (theme == null) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return theme
}
