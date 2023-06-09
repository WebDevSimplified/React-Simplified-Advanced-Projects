export function Button({
  className,
  outline = false,
  AsComponent = "button",
  ...props
}) {
  const colorClasses = outline
    ? "border-2 border-sky-800 text-sky-800 hover:bg-sky-100 focus:bg-sky-100 disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-500"
    : "bg-sky-800 text-slate-100 hover:bg-sky-700 focus:bg-sky-700 disabled:bg-slate-500"

  return (
    <AsComponent
      className={`no-underline px-4 py-3 rounded-lg cursor-pointer disabled:cursor-not-allowed ${colorClasses} ${className}`}
      {...props}
    />
  )
}
