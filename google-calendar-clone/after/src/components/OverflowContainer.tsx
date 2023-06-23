import { ReactNode, Key, useState, useRef, useLayoutEffect } from "react"

type OverflowContainerProps<T> = {
  items: T[]
  renderItem: (item: T) => ReactNode
  renderOverflow: (overflowAmount: number) => ReactNode
  getKey: (item: T) => Key
  className?: string
}

export function OverflowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverflowContainerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [overflowAmount, setOverflowAmount] = useState(0)

  useLayoutEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver(entries => {
      const containerElement = entries[0]?.target
      if (containerElement == null) return
      const children =
        containerElement.querySelectorAll<HTMLElement>("[data-item]")
      const overflowElement =
        containerElement.parentElement?.querySelector<HTMLElement>(
          "[data-overflow]"
        )

      if (overflowElement != null) overflowElement.style.display = "none"
      children.forEach(child => child.style.removeProperty("display"))
      let amount = 0
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        if (containerElement.scrollHeight <= containerElement.clientHeight) {
          break
        }
        amount = children.length - i
        child.style.display = "none"
        overflowElement?.style.removeProperty("display")
      }
      setOverflowAmount(amount)
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [items])

  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map(item => (
          <div data-item key={getKey(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div data-overflow>{renderOverflow(overflowAmount)}</div>
    </>
  )
}
