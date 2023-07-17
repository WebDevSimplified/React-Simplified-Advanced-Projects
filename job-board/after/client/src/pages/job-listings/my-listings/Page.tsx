import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import {
  MyJobListingGrid,
  JobListingSkeletonGrid,
} from "@/features/job-listing"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"

export function MyJobListingsPage() {
  const data = useDeferredLoaderData<typeof loader>()
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
      <Suspense fallback={<JobListingSkeletonGrid />}>
        <Await resolve={data.jobListings}>
          {jobListings => <MyJobListingGrid jobListings={jobListings} />}
        </Await>
      </Suspense>
    </>
  )
}
