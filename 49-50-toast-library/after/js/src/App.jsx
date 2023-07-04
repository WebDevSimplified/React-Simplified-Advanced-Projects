import { useRef, useState } from "react"
import "./styles.css"
import { useToast } from "./useToast"

export default function App() {
  const { addToast, removeToast } = useToast()
  const inputRef = useRef(null)
  const [id, setId] = useState()

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
