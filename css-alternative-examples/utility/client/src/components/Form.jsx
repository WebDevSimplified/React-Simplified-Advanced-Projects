import { Form as RouterForm } from "react-router-dom"

export function Form({ className, ...props }) {
  return (
    <RouterForm className={`flex flex-col gap-4 ${className}`} {...props} />
  )
}

export function FormGroup({ children, errorMessage }) {
  return (
    <div
      className={`form-group flex flex-col gap-1 flex-grow ${
        errorMessage != null ? "error" : ""
      }`}
    >
      {children}
      {errorMessage != null && (
        <div className="text-red-500 text-base">{errorMessage}</div>
      )}
    </div>
  )
}

export function FormRow({ children, btnRow = false }) {
  return (
    <div className={`flex gap-4 ${btnRow ? "justify-end" : ""}`}>
      {children}
    </div>
  )
}
