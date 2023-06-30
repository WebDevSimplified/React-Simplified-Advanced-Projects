import { describe, it, expect, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useLocalStorage } from "../src/useLocalStorage"

afterEach(() => {
  localStorage.clear()
})

function setupHook(key, initialValue) {
  return renderHook(
    ({ key, initialValue }) => useLocalStorage(key, initialValue),
    {
      initialProps: { key, initialValue },
    }
  )
}

describe("useLocalStorage", () => {
  it("should store the initial value into localStorage", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = setupHook(key, initialValue)

    expect(result.current[0]).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  })

  it("should store the initial value into localStorage with a function initialValue", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = setupHook(key, () => initialValue)

    expect(result.current[0]).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  })

  it("should update localStorage when setValue is called", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = setupHook(key, initialValue)

    const newValue = "new"
    act(() => result.current[1](newValue))

    expect(result.current[0]).toBe(newValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
  })

  it("should clear localStorage when setValue is called with undefined", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = setupHook(key, initialValue)

    act(() => result.current[1](undefined))

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.getItem(key)).toBeNull()
  })

  it("should use the value from localStorage if it exists", () => {
    const key = "key"
    const initialValue = "initial"
    const existingValue = "existing"
    localStorage.setItem(key, JSON.stringify(existingValue))
    const { result } = setupHook(key, initialValue)

    expect(result.current[0]).toBe(existingValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(existingValue))
  })
})
