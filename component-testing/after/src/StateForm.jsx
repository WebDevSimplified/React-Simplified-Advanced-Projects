import { useState, useMemo } from "react"
import { checkEmail, checkPassword } from "./validators"

export function StateForm({ onSubmit }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false)

  const emailErrors = useMemo(() => {
    return isAfterFirstSubmit ? checkEmail(email) : []
  }, [isAfterFirstSubmit, email])

  const passwordErrors = useMemo(() => {
    return isAfterFirstSubmit ? checkPassword(password) : []
  }, [isAfterFirstSubmit, password])

  function handleSubmit(e) {
    e.preventDefault()
    setIsAfterFirstSubmit(true)

    const emailResults = checkEmail(email)
    const passwordResults = checkPassword(password)

    if (emailResults.length === 0 && passwordResults.length === 0) {
      onSubmit({ email, password })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {emailErrors.length > 0 && (
          <div data-testid="email-error-msg" className="msg">
            {emailErrors.join(", ")}
          </div>
        )}
      </div>
      <div className={`form-group ${passwordErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {passwordErrors.length > 0 && (
          <div data-testid="password-error-msg" className="msg">
            {passwordErrors.join(", ")}
          </div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  )
}
