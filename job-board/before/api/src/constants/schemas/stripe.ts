import z from "zod"
import { createUnionSchema } from "../../lib/zodCreateUnionSchema"
import { JOB_LISTING_DURATIONS } from "../types"

export const jobListingOrderCompleteSchema = z.object({
  duration: z.coerce.number(createUnionSchema(JOB_LISTING_DURATIONS)),
  jobListingId: z.string(),
})
