import { DialogModal } from "./DialogModal"
import { CustomModal } from "./CustomModal"
import { useState } from "react"
import "./styles.css"

export default function App() {
  const [isCustomOpen, setIsCustomOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsCustomOpen(true)}>Open Custom Modal</button>
      <br />
      <button onClick={() => setIsDialogOpen(true)}>Open Dialog Modal</button>

      <CustomModal isOpen={isCustomOpen} onClose={() => setIsCustomOpen(false)}>
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button onClick={() => setIsCustomOpen(false)}>Close</button>
      </CustomModal>

      <DialogModal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <p>
          This is a <strong>DIALOG</strong> modal
        </p>
        <button onClick={() => setIsDialogOpen(false)}>Close</button>
      </DialogModal>
    </>
  )
}
