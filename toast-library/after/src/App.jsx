import { useRef, useState } from "react"
import { useToast } from "./useToast"

export default function App() {
  const { addToast, removeToast } = useToast()
  const [lastToastId, setLastToastId] = useState(null)
  const inputRef = useRef(null)

  function createToast() {
    if (inputRef.current == null) return

    setLastToastId(
      addToast(inputRef.current.value, {
        autoDismiss: false,
      })
    )
  }

  return (
    <div className="form">
      <input type="text" ref={inputRef} />
      <button onClick={createToast}>Add Toast</button>
      <button onClick={() => removeToast(lastToastId)}>
        Remove Latest Toast
      </button>
    </div>
  )
}
