import { createContext, useState } from "react"
import { createPortal } from "react-dom"

export const ToastContext = createContext()

const DEFAULT_OPTIONS = {
  autoDismiss: true,
  autoDismissTimeout: 5000,
  position: "top-right",
}
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function addToast(text, { id = crypto.randomUUID(), ...userOptions } = {}) {
    const options = { ...DEFAULT_OPTIONS, ...userOptions }
    setToasts(prevToasts => {
      return [...prevToasts, { text, id, options }]
    })

    if (options.autoDismiss) {
      setTimeout(() => removeToast(id), options.autoDismissTimeout)
    }
    return id
  }

  function removeToast(id) {
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
  }, {})

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
        document.getElementById("toast-container")
      )}
    </ToastContext.Provider>
  )
}

function Toast({ text, remove }) {
  return (
    <div onClick={remove} className="toast">
      {text}
    </div>
  )
}
