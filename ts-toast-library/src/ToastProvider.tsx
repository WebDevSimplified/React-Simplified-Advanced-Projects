import { createContext, useState } from "react"
import type { ReactNode } from "react"
import { createPortal } from "react-dom"

type ToastContextType = {
  toasts: Toast[]
  addToast: (
    text: string,
    options?: Partial<ToastOptions & { id: string }>
  ) => string
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

type ToastProviderProps = {
  children: ReactNode
}

type ToastOptions = {
  autoDismiss: boolean
  autoDismissTimeout: number
  position: string
}

type Toast = {
  id: string
  text: string
  options: ToastOptions
}

const DEFAULT_OPTIONS: ToastOptions = {
  autoDismiss: true,
  autoDismissTimeout: 5000,
  position: "top-right",
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  function addToast(
    text: string,
    {
      id = crypto.randomUUID(),
      ...userOptions
    }: Partial<ToastOptions & { id: string }> = {}
  ) {
    const options = { ...DEFAULT_OPTIONS, ...userOptions }
    setToasts(prevToasts => {
      return [...prevToasts, { text, id, options }]
    })

    if (options.autoDismiss) {
      setTimeout(() => removeToast(id), options.autoDismissTimeout)
    }
    return id
  }

  function removeToast(id: string) {
    setToasts(prevToasts => {
      return prevToasts.filter(toast => toast.id !== id)
    })
  }

  const toastsByPosition = toasts.reduce((grouped, toast) => {
    const { position } = toast.options
    if (grouped[position] == null) {
      grouped[position] = []
    }
    grouped[position].push(toast)
    return grouped
  }, {} as Record<string, Toast[]>)

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {createPortal(
        Object.entries(toastsByPosition).map(([position, toasts]) => (
          <div key={position} className={`toast-container ${position}`}>
            {toasts.map(toast => (
              <Toast
                key={toast.id}
                text={toast.text}
                remove={() => removeToast(toast.id)}
              />
            ))}
          </div>
        )),
        document.getElementById("toast-container") as HTMLDivElement
      )}
    </ToastContext.Provider>
  )
}

type ToastProps = {
  text: string
  remove: () => void
}

function Toast({ text, remove }: ToastProps) {
  return (
    <div onClick={remove} className="toast">
      {text}
    </div>
  )
}
