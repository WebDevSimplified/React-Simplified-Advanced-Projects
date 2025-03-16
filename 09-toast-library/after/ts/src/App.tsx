import { useRef, useState } from "react"
import { useToast } from "./useToast"

export default function App() {
  const { addToast, removeToast } = useToast()
  const [id, setId] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)

  function createToast() {
    if (inputRef.current == null || inputRef.current.value === "") return

    setId(addToast(inputRef.current.value, { position: "top-left" }))
  }

  return (
    <div className="form">
      <input type="text" ref={inputRef} />
      <button onClick={createToast}>Add Toast</button>
      <button onClick={() => id != null && removeToast(id)}>
        Remove Last Toast
      </button>
    </div>
  )
}
