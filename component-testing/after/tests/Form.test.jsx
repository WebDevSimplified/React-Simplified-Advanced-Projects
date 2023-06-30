import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { StateForm as Form } from "../src/StateForm"
import userEvent from "@testing-library/user-event"

describe("Form Component", () => {
  it("calls onSubmit when form is submitted with no errors", async () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)
    const email = "test@webdevsimplified.com"
    const password = "Password123"

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")

    const user = userEvent.setup()
    await user.type(emailInput, email)
    await user.type(passwordInput, password)
    await user.click(screen.getByText("Submit"))

    const emailErrorMsg = screen.queryByTestId("email-error-msg")
    const passwordErrorMsg = screen.queryByTestId("password-error-msg")

    expect(onSubmit).toHaveBeenCalledWith({ email, password })
    expect(emailErrorMsg).not.toBeInTheDocument()
    expect(passwordErrorMsg).not.toBeInTheDocument()
  })

  it("shows email error message when email is invalid", async () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)
    const email = "test@wrong.com"
    const password = "Password123"

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")

    const user = userEvent.setup()
    await user.type(emailInput, email)
    await user.type(passwordInput, password)
    await user.click(screen.getByText("Submit"))

    const emailErrorMsg = screen.getByTestId("email-error-msg")

    expect(onSubmit).not.toHaveBeenCalled()
    expect(emailErrorMsg).toBeInTheDocument()
  })

  it("shows password error message when password is invalid", async () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)
    const email = "test@webdevsimplified.com"
    const password = "wrong"

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")

    const user = userEvent.setup()
    await user.type(emailInput, email)
    await user.type(passwordInput, password)
    await user.click(screen.getByText("Submit"))

    const passwordErrorMsg = screen.getByTestId("password-error-msg")

    expect(onSubmit).not.toHaveBeenCalled()
    expect(passwordErrorMsg).toBeInTheDocument()
  })

  it("updates the error message while typing after the first submit", async () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)
    const email = "test@webdevsimplified.com"
    const password = "wrong"

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")

    const user = userEvent.setup()
    await user.type(emailInput, email)
    await user.type(passwordInput, password)
    await user.click(screen.getByText("Submit"))

    const passwordErrorMsg = screen.getByTestId("password-error-msg")

    expect(onSubmit).not.toHaveBeenCalled()
    expect(passwordErrorMsg).toBeInTheDocument()

    await user.type(passwordInput, "Password123")
    expect(passwordErrorMsg).not.toBeInTheDocument()
  })
})
