import { useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const FALLBACK_POSITIONS = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
  "left",
  "right",
]

export function Tooltip({
  children,
  isVisible,
  referenceElement,
  spacing = "10px",
  position = "top",
}) {
  const tooltipRef = useRef(null)
  const [positionStyle, setPositionStyle] = useState({})

  useLayoutEffect(() => {
    if (referenceElement.current == null || tooltipRef.current == null) return

    const rect = referenceElement.current.getBoundingClientRect()
    const positionsToCheck = [position, ...FALLBACK_POSITIONS]
    const tooltipClone = tooltipRef.current.cloneNode(true)
    for (const position of positionsToCheck) {
      const style = getTooltipPositionStyle(position, rect, spacing)
      tooltipClone.style = { ...tooltipRef.current.style, ...style }
      const tooltipPosition = tooltipClone.getBoundingClientRect()

      if (isInBounds(tooltipPosition)) {
        console.log("in bounds", tooltipPosition)
        setPositionStyle(style)
        break
      }
    }
    document.body.removeChild(tooltipClone)
  }, [referenceElement, position, spacing])

  if (!isVisible) return null

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        fontSize: ".75rem",
        position: "absolute",
        background: "#333",
        color: "white",
        padding: ".5em",
        borderRadius: ".1em",
        pointerEvents: "none",
        ...positionStyle,
      }}
    >
      {children}
    </div>,
    document.getElementById("tooltip-container")
  )
}

function getTooltipPositionStyle(position, rect, spacing) {
  switch (position) {
    case "top":
      return {
        translate: "-50% -100%",
        left: rect.left + rect.width / 2,
        top: `calc(${rect.top}px - ${spacing})`,
      }
    case "bottom":
      return {
        translate: "-50%",
        left: rect.left + rect.width / 2,
        top: `calc(${rect.bottom}px + ${spacing})`,
      }
    case "left":
      return {
        translate: "-100% -50%",
        top: rect.top + rect.height / 2,
        left: `calc(${rect.left}px - ${spacing})`,
      }
    case "right":
      return {
        translate: "0 -50%",
        top: rect.top + rect.height / 2,
        left: `calc(${rect.right}px + ${spacing})`,
      }
  }
}

function isInBounds(rect) {
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  )
}
