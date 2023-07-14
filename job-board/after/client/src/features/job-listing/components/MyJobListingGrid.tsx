import { JobListing } from "../constants/types"
import { JobListingCard } from "./JobListingCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { differenceInDays, formatDistanceStrict, isAfter } from "date-fns"
import { assertUnreachable } from "@backend/utils/assertUnreachable"
import { getJobListingPriceInCents } from "@backend/utils/getJobListingPriceInCents"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/utils/formatters"
import { JOB_LISTING_DURATIONS } from "@backend/constants/types"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useMemo, useState } from "react"
import {
  createPublishPaymentIntent,
  deleteJobListing,
} from "../services/jobListings"
import { Skeleton } from "@/components/ui/skeleton"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import { JobListingCheckoutForm } from "./JobListingCheckoutForm"
import { useTheme } from "@/hooks/useTheme"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Link } from "react-router-dom"

type JobListingGridProps = {
  jobListings: JobListing[]
}

export function MyJobListingGrid({ jobListings }: JobListingGridProps) {
  const { isDark } = useTheme()
  const [selectedId, setSelectedId] = useState<string>()
  const [deletedJobListingIds, setDeletedJobListingIds] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] =
    useState<(typeof JOB_LISTING_DURATIONS)[number]>()
  const [clientSecret, setClientSecret] = useState<string>()
  const selectedJobListing = useMemo(
    () => jobListings.find(jobListing => jobListing.id === selectedId),
    [selectedId, jobListings]
  )

  const visibleJobListings = useMemo(() => {
    return jobListings
      .filter(jobListing => !deletedJobListingIds.includes(jobListing.id))
      .sort(sortJobListings)
  }, [jobListings, deletedJobListingIds])

  function deleteListing(id: string) {
    setDeletedJobListingIds(prev => [...prev, id])
    deleteJobListing(id).catch(() => {
      toast({
        title: "Failed to delete job listing",
        action: (
          <ToastAction
            onClick={() => deleteListing(id)}
            altText="Click the delete button in the job card to retry"
          >
            Retry
          </ToastAction>
        ),
      })
      setDeletedJobListingIds(prev =>
        prev.filter(listingId => listingId !== id)
      )
    })
  }

  return (
    <Dialog>
      <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
        {visibleJobListings.map(jobListing => (
          <MyJobListingCard
            key={jobListing.id}
            jobListing={jobListing}
            setClientSecret={setClientSecret}
            setSelectedDuration={setSelectedDuration}
            setSelectedId={setSelectedId}
            deleteListing={deleteListing}
          />
        ))}
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedJobListing != null && selectedDuration != null ? (
              `${getPurchaseButtonText(
                getJobListingStatus(selectedJobListing.expiresAt)
              )} ${selectedJobListing.title} for ${selectedDuration} days`
            ) : (
              <Skeleton className="h-4 w-[250px]" />
            )}
          </DialogTitle>
          <DialogDescription>
            This is a non-refundable purchase.
          </DialogDescription>
          <div className="pt-4">
            {clientSecret != null && selectedDuration != null ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: { theme: isDark ? "night" : "stripe" },
                }}
              >
                <JobListingCheckoutForm
                  amount={getJobListingPriceInCents(selectedDuration) / 100}
                />
              </Elements>
            ) : (
              <>
                <Skeleton className="h-48" />
                <Skeleton className="h-8 mt-4" />
              </>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

type MyJobListingCardProps = {
  jobListing: JobListing
  setSelectedId: (id: string) => void
  setSelectedDuration: (
    duration: (typeof JOB_LISTING_DURATIONS)[number]
  ) => void
  deleteListing: (id: string) => void
  setClientSecret: (clientSecret: string | undefined) => void
}

function MyJobListingCard({
  jobListing,
  setSelectedId,
  setSelectedDuration,
  setClientSecret,
  deleteListing,
}: MyJobListingCardProps) {
  const status = getJobListingStatus(jobListing.expiresAt)
  const badgeVariant =
    status === "Active"
      ? "default"
      : status === "Expired"
      ? "destructive"
      : "secondary"

  return (
    <JobListingCard
      key={jobListing.id}
      headerDetails={
        <div>
          <Badge className="rounded" variant={badgeVariant}>
            {status}{" "}
            {status === "Active" &&
              jobListing.expiresAt != null &&
              `- ${getDaysRemainingText(jobListing.expiresAt)}`}
          </Badge>
        </div>
      }
      footerBtns={
        <>
          <DeleteJobListingDialog
            deleteListing={() => deleteListing(jobListing.id)}
          />
          <Button variant="outline" asChild>
            <Link to={`/jobs/${jobListing.id}/edit`}>Edit</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="data-[state=open]:bg-slate-700 dark:data-[state=open]:bg-slate-300">
                {getPurchaseButtonText(status)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {JOB_LISTING_DURATIONS.map(duration => (
                <DialogTrigger asChild key={duration}>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedId(jobListing.id)
                      setSelectedDuration(duration)
                      setClientSecret(undefined)
                      createPublishPaymentIntent(jobListing.id, duration).then(
                        data => {
                          setClientSecret(data.clientSecret)
                        }
                      )
                    }}
                  >
                    {duration} Days -{" "}
                    {formatCurrency(getJobListingPriceInCents(duration) / 100)}
                  </DropdownMenuItem>
                </DialogTrigger>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      }
      {...jobListing}
    />
  )
}

function DeleteJobListingDialog({
  deleteListing,
}: {
  deleteListing: () => void
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this job listing?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job
            listing and any remaining time will not be refunded.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteListing}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function sortJobListings(a: JobListing, b: JobListing) {
  if (a.expiresAt === b.expiresAt) {
    return 0
  } else if (a.expiresAt == null) {
    return -1
  } else if (b.expiresAt == null) {
    return 1
  } else {
    return differenceInDays(a.expiresAt, b.expiresAt)
  }
}

function getJobListingStatus(expiresAt: Date | null) {
  if (expiresAt == null) {
    return "Draft"
  } else if (isAfter(expiresAt, new Date())) {
    return "Active"
  } else {
    return "Expired"
  }
}

function getDaysRemainingText(expiresAt: Date) {
  return `${formatDistanceStrict(expiresAt, new Date(), { unit: "day" })} left`
}

function getPurchaseButtonText(status: ReturnType<typeof getJobListingStatus>) {
  switch (status) {
    case "Draft":
      return "Publish"
    case "Active":
      return "Extend"
    case "Expired":
      return "Republish"
    default:
      assertUnreachable(status)
  }
}
