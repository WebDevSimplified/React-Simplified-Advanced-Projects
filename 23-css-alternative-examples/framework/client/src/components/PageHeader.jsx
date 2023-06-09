import Stack from "react-bootstrap/Stack"

export function PageHeader({ children, btnSection, subtitle }) {
  return (
    <>
      <h1 className={`${subtitle ? "mb-2" : "mb-4"}`}>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-between align-items-center"
        >
          {children}
          {btnSection && <div>{btnSection}</div>}
        </Stack>
      </h1>
      {subtitle && <div className="mb-4 fs-3">{subtitle}</div>}
    </>
  )
}
