import { useContext } from "react"
import { ToastContext } from "./ToastProvider"

export function useToast() {
  const context = useContext(ToastContext)
  if (context == null) {
    throw new Error("useToast has to be used within <ToastProvider>")
  }

  return context
}
