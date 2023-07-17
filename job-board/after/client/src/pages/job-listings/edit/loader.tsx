import { getJobListing } from "@/features/job-listing"
import { deferredLoader } from "@/lib/reactRouter"

export const loader = deferredLoader(({ params: { id } }) => {
  if (typeof id !== "string") throw new Response("Not Found", { status: 404 })

  return { jobListing: getJobListing(id), id }
})
