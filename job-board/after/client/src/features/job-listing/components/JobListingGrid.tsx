import { useLocalStorage } from "@/hooks/useLocalStorage"
import { JobListing } from "../constants/types"
import { JobListingCard } from "./JobListingCard"
import { Button } from "@/components/ui/button"
import { EyeOff, Heart } from "lucide-react"
import { cn } from "@/utils/shadcnUtils"
import { toast } from "@/components/ui/use-toast"
import { AnimateVisibility } from "@/components/animation/AnimateVisibility"
import { ToastAction } from "@/components/ui/toast"
import { JobListingFullDialog } from "./JobListingFullDialog"

type JobListingGridProps = {
  jobListings: JobListing[]
}

// TODO: Add filter section
// TODO: Add loaders with async code for each page
export function JobListingGrid({ jobListings }: JobListingGridProps) {
  const [hiddenJobListingIds, setHiddenJobListingIds] = useLocalStorage<
    string[]
  >("hiddenJobIds", [])
  const [favoriteJobListingIds, setFavoriteJobListingIds] = useLocalStorage<
    string[]
  >("favoriteJobIds", [])

  function hideJob(id: string, isHidden: boolean) {
    if (isHidden) {
      setHiddenJobListingIds(ids => [...ids, id])
    } else {
      setHiddenJobListingIds(ids => ids.filter(jobId => jobId !== id))
    }
  }

  function onHide(id: string) {
    hideJob(id, true)

    toast({
      title: "Job Hidden",
      description: "Job Title will no longer be shown",
      action: (
        <ToastAction
          onClick={() => hideJob(id, false)}
          altText="TODO: Mention how to do this with the filters"
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
    <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {jobListings.map(jobListing => (
        <AnimateVisibility
          key={jobListing.id}
          isVisible={!hiddenJobListingIds.includes(jobListing.id)}
        >
          <JobListingCard
            headerDetails={
              <div className="-mr-3 -mt-3">
                <Button
                  size="icon"
                  className="rounded-full"
                  variant="ghost"
                  onClick={() => onHide(jobListing.id)}
                >
                  <EyeOff className="w-4 h-4" />
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
        </AnimateVisibility>
      ))}
    </div>
  )
}
