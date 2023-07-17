import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import {
  JobListingFilterForm,
  JobListingGrid,
  useJobListingFilterForm,
  JobListingCard,
  JobListingFullDialog,
  JobListingSkeletonGrid,
} from "@/features/job-listing"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { cn } from "@/utils/shadcnUtils"
import { Eye, EyeOff, Heart } from "lucide-react"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"

export function JobListingsListPage() {
  const data = useDeferredLoaderData<typeof loader>()
  const { form, getFilteredJobs } = useJobListingFilterForm()
  const [hiddenJobListingIds, setHiddenJobListingIds] = useLocalStorage<
    string[]
  >("hiddenJobIds", [])
  const [favoriteJobListingIds, setFavoriteJobListingIds] = useLocalStorage<
    string[]
  >("favoriteJobIds", [])

  function onHide(id: string, title: string) {
    const hideJob = (id: string, isHidden: boolean) => {
      if (isHidden) {
        setHiddenJobListingIds(ids => [...ids, id])
      } else {
        setHiddenJobListingIds(ids => ids.filter(jobId => jobId !== id))
      }
    }

    const shouldHide = !hiddenJobListingIds.includes(id)
    hideJob(id, shouldHide)

    if (!shouldHide) return
    toast({
      title: "Job Hidden",
      description: `${title} will no longer be shown`,
      action: (
        <ToastAction
          onClick={() => hideJob(id, false)}
          altText="Click show hidden in the filter section to show hidden jobs and then click the show button in the card to show this job again"
        >
          Undo
        </ToastAction>
      ),
    })
  }

  function toggleFavorite(jobListingId: string) {
    setFavoriteJobListingIds(ids => {
      if (ids.includes(jobListingId)) {
        return ids.filter(id => jobListingId !== id)
      }
      return [...ids, jobListingId]
    })
  }

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
      <JobListingFilterForm form={form} />
      <Suspense fallback={<JobListingSkeletonGrid />}>
        <Await resolve={data.jobListings}>
          {jobListings => (
            <JobListingGrid>
              {getFilteredJobs(
                jobListings,
                hiddenJobListingIds,
                favoriteJobListingIds
              ).map(jobListing => {
                const isHidden = hiddenJobListingIds.includes(jobListing.id)
                const HideIcon = isHidden ? Eye : EyeOff

                return (
                  <JobListingCard
                    className={isHidden ? "opacity-50" : undefined}
                    key={jobListing.id}
                    headerDetails={
                      <div className="-mr-3 -mt-3">
                        <Button
                          size="icon"
                          className="rounded-full"
                          variant="ghost"
                          onClick={() =>
                            onHide(jobListing.id, jobListing.title)
                          }
                        >
                          <HideIcon className="w-4 h-4" />
                          <div className="sr-only">
                            {isHidden ? "Show" : "Hide"}
                          </div>
                        </Button>
                        <Button
                          onClick={() => toggleFavorite(jobListing.id)}
                          size="icon"
                          className="rounded-full"
                          variant="ghost"
                        >
                          <Heart
                            className={cn(
                              "w-4 h-4",
                              favoriteJobListingIds.includes(jobListing.id) &&
                                "fill-red-500 stroke-red-500"
                            )}
                          />
                        </Button>
                      </div>
                    }
                    footerBtns={<JobListingFullDialog {...jobListing} />}
                    {...jobListing}
                  />
                )
              })}
            </JobListingGrid>
          )}
        </Await>
      </Suspense>
    </>
  )
}
