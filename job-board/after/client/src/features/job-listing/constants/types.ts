import { z } from "zod"
import { jobListingSchema } from "./schemas"

export type JobListing = z.infer<typeof jobListingSchema>
