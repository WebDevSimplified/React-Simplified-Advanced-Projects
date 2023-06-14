import { ReactNode, useLayoutEffect, useRef, useState } from "react"
import { useEffect } from "react"
import { createPortal } from "react-dom"

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const prevIsOpen = useRef<boolean>()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [onClose])

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true)
    }
    prevIsOpen.current = isOpen
  }, [isOpen])

  if (!isOpen && !isClosing) return null

  return createPortal(
    <div
      onAnimationEnd={isClosing ? () => setIsClosing(false) : undefined}
      className={`modal ${isClosing ? "closing" : ""}`}
    >
      <div className="overlay" onClick={onClose} />
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  )
}
