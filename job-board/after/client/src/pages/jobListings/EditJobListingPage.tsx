import { PageHeader } from "@/components/ui/PageHeader"
import {
  JobListing,
  JobListingForm,
  editJobListing,
  getJobListing,
} from "@/features/job-listing"
import { useNavigate, useParams } from "react-router-dom"
import { NotFoundPage } from "../NotFoundPage"
import { useEffect, useState } from "react"

export function EditJobListingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [jobListing, setJobListing] = useState<JobListing>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof id !== "string") return
    setIsLoading(true)
    getJobListing(id)
      .then(setJobListing)
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  if (typeof id !== "string") {
    return <NotFoundPage />
  }

  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      {!isLoading && jobListing && (
        <JobListingForm
          initialJobListing={jobListing}
          onSubmit={async data => {
            console.log(data)
            await editJobListing(id, data)
            navigate("/jobs/my-listings")
          }}
        />
      )}
    </>
  )
}
