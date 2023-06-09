export function Card({ header, children, footer }) {
  return (
    <div className="flex flex-col shadow-md rounded-xl bg-white">
      {header && (
        <div className="text-3xl p-4 text-ellipsis whitespace-nowrap overflow-hidden capitalize border-b border-black shrink-0">
          {header}
        </div>
      )}
      {children && <div className="flex-grow p-4">{children}</div>}
      {footer && (
        <div className="border-t border-black flex p-4 justify-end gap-2 flex-shrink-0">
          {footer}
        </div>
      )}
    </div>
  )
}

export function CardGrid({ children }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {children}
    </div>
  )
}

export function CardStack({ children }) {
  return <div className="flex flex-col gap-4">{children}</div>
}
