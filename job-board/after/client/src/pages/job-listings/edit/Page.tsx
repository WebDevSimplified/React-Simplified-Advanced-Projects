import { PageHeader } from "@/components/ui/PageHeader"
import { JobListingForm, editJobListing } from "@/features/job-listing"
import { useNavigate } from "react-router-dom"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { loader } from "./loader"

export function EditJobListingPage() {
  const navigate = useNavigate()
  const data = useDeferredLoaderData<typeof loader>()
  const { id } = data

  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      <Suspense fallback={<LoadingSpinner className="h-24 w-24" />}>
        <Await resolve={data.jobListing}>
          {jobListing => (
            <JobListingForm
              initialJobListing={jobListing}
              onSubmit={async data => {
                await editJobListing(id, data)
                navigate("/jobs/my-listings")
              }}
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}
