import { useContext } from "react"
import { ToastContext } from "./ToastProvider"

export function useToast() {
  return useContext(ToastContext)
}
