import { Form as RouterForm } from "react-router-dom"
import styles from "./Form.module.css"

export function Form({ className, ...props }) {
  return <RouterForm className={`${styles.form} ${className}`} {...props} />
}

export function FormGroup({ children, errorMessage }) {
  return (
    <div
      className={`${styles.group} ${errorMessage != null ? styles.error : ""}`}
    >
      {children}
      {errorMessage != null && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  )
}

export function FormRow({ children, btnRow = false }) {
  return (
    <div className={`${styles.row} ${btnRow ? styles.btnRow : ""}`}>
      {children}
    </div>
  )
}
