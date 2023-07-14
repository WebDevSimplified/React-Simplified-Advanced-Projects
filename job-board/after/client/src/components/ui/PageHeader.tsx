type PageHeaderProps = {
  children: React.ReactNode
  btnSection?: React.ReactNode
  subtitle?: React.ReactNode
}

export function PageHeader({
  children,
  btnSection,
  subtitle,
}: PageHeaderProps) {
  return (
    <>
      <h1
        className={`text-5xl flex justify-between items-center gap-8 font-bold ${
          subtitle ? "mb-4" : "mb-8"
        }`}
      >
        {children}
        {btnSection && <div className="text-2xl font-normal">{btnSection}</div>}
      </h1>
      {subtitle && <div className="mb-8 text-xl">{subtitle}</div>}
    </>
  )
}
