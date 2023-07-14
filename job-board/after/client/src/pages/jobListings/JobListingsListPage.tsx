import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import {
  JobListingGrid,
  JobListing,
  getAllPublished,
} from "@/features/job-listing"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function JobListingsListPage() {
  const [jobListings, setJobListings] = useState<JobListing[]>([])

  // TODO: Make loader
  useEffect(() => {
    getAllPublished().then(setJobListings)
  }, [])

  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild>
            <Link to="new" className="flex gap-1">
              Create Listing
            </Link>
          </Button>
        }
      >
        Job Listings
      </PageHeader>
      <JobListingGrid jobListings={jobListings} />
    </>
  )
}
