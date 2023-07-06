import { useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue) {
      return JSON.parse(storedValue)
    }
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue
  })

  function setItem(value: React.SetStateAction<T>) {
    setValue(prevValue => {
      const newValue =
        typeof value === "function"
          ? (value as (currentValue: T) => T)(prevValue)
          : value
      localStorage.setItem(key, JSON.stringify(newValue))
      return newValue
    })
  }

  return [value, setItem] as const
}
