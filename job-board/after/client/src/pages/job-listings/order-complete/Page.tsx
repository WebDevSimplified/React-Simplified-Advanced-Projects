import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"

export function JobListingOrderCompletePage() {
  const data = useDeferredLoaderData<typeof loader>()

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        subtitle={
          <Suspense fallback="Your payment is processing">
            <Await resolve={data.message}>{message => message}</Await>
          </Suspense>
        }
      >
        Order Complete
      </PageHeader>
      <Button asChild>
        <Link to="/jobs/my-listings">View Your Job Listings</Link>
      </Button>
    </div>
  )
}

// TODO: Include docs on how to use webhook with cli
