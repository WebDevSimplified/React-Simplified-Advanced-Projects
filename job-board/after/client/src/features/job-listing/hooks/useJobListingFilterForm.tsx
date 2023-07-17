import {
  JOB_LISTING_EXPERIENCE_LEVELS,
  JOB_LISTING_TYPES,
} from "@backend/constants/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { JobListing } from "../constants/types"

export type JobListingFormValues = z.infer<typeof jobListingFilterSchema>

const jobListingFilterSchema = z.object({
  title: z.string(),
  location: z.string(),
  minimumSalary: z.number().or(z.nan()),
  type: z.enum(JOB_LISTING_TYPES).or(z.literal("")),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS).or(z.literal("")),
  showHidden: z.boolean(),
  onlyShowFavorites: z.boolean(),
})

export function useJobListingFilterForm() {
  const form = useForm<JobListingFormValues>({
    resolver: zodResolver(jobListingFilterSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      location: "",
      minimumSalary: 0,
      type: "",
      experienceLevel: "",
      showHidden: false,
      onlyShowFavorites: false,
    },
  })

  function getFilteredJobs(
    jobListings: JobListing[],
    hiddenJobListingIds: string[],
    favoriteJobListingIds: string[]
  ) {
    const values = form.getValues()
    return jobListings.filter(jobListing => {
      if (!jobListing.title.toLowerCase().match(values.title.toLowerCase())) {
        return false
      }
      if (
        !jobListing.location
          .toLowerCase()
          .includes(values.location.toLowerCase())
      ) {
        return false
      }
      if (
        !isNaN(values.minimumSalary) &&
        jobListing.salary < values.minimumSalary
      ) {
        return false
      }
      if (values.type !== "" && jobListing.type !== values.type) {
        return false
      }
      if (
        values.experienceLevel !== "" &&
        jobListing.experienceLevel !== values.experienceLevel
      ) {
        return false
      }
      if (!values.showHidden && hiddenJobListingIds.includes(jobListing.id)) {
        return false
      }
      if (
        values.onlyShowFavorites &&
        !favoriteJobListingIds.includes(jobListing.id)
      ) {
        return false
      }

      return true
    })
  }

  return { form, getFilteredJobs }
}
