import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import {
  MyJobListingGrid,
  JobListing,
  getAllMyListings,
} from "@/features/job-listing"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function MyJobListingsPage() {
  const [jobListings, setJobListings] = useState<JobListing[]>([])

  // TODO: Make loader
  useEffect(() => {
    getAllMyListings().then(setJobListings)
  }, [])

  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild>
            <Link to="/jobs/new" className="flex gap-1">
              Create Listing
            </Link>
          </Button>
        }
      >
        My Job Listings
      </PageHeader>
      <MyJobListingGrid jobListings={jobListings} />
    </>
  )
}
