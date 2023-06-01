import { useRef, useState } from "react"
import { Tooltip } from "./Tooltip"

export default function App() {
  const buttonRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <button
        ref={buttonRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        Hi
      </button>
      <Tooltip referenceElement={buttonRef} isVisible={true}>
        Tooltip
      </Tooltip>
    </>
  )
}
