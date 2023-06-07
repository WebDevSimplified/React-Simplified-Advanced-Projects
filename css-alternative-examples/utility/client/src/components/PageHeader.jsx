export function PageHeader({ children, btnSection, subtitle }) {
  return (
    <>
      <h1
        className={`text-5xl flex justify-between items-center mb-8 gap-8 font-bold ${
          subtitle ? "mb-4" : ""
        }`}
      >
        {children}
        {btnSection && <div className="text-2xl font-normal">{btnSection}</div>}
      </h1>
      {subtitle && <div className="mb-8 text-3xl">{subtitle}</div>}
    </>
  )
}
