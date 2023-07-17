import { ReactNode } from "react"

type JobListingGridProps = {
  children: ReactNode
}

export function JobListingGrid({ children }: JobListingGridProps) {
  return (
    <>
      <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))] mt-12">
        {children}
      </div>
    </>
  )
}
