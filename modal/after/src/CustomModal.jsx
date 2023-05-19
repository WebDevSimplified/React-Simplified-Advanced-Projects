import { useEffect } from "react"
import { createPortal } from "react-dom"

export function CustomModal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  })

  return createPortal(
    <div className={`modal-overlay ${isOpen && "show"}`}>
      <div className="modal">{children}</div>
    </div>,
    document.querySelector("#modal-container")
  )
}
