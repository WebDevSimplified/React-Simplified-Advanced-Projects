import { PageHeader } from "@/components/ui/PageHeader"
import { JobListingForm, createJobListing } from "@/features/job-listing"
import { useNavigate } from "react-router-dom"

export function NewJobListingPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHeader>New Listing</PageHeader>
      <JobListingForm
        onSubmit={async data => {
          await createJobListing(data)
          navigate("/jobs/my-listings")
        }}
      />
    </>
  )
}
