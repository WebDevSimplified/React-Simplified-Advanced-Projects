import z from "zod"
import {
  JOB_LISTING_TYPES,
  JOB_LISTING_EXPERIENCE_LEVELS,
  JOB_LISTING_DURATIONS,
} from "../types"
import { createUnionSchema } from "../../lib/zodCreateUnionSchema"

export const jobListingFormSchema = z.object({
  title: z.string().nonempty(),
  companyName: z.string().nonempty(),
  location: z.string().nonempty(),
  applyUrl: z.string().url().nonempty(),
  type: z.enum(JOB_LISTING_TYPES),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS),
  salary: z.number().int().positive(),
  shortDescription: z.string().max(200).nonempty(),
  description: z.string().nonempty(),
})

export const createPublishPaymentIntentSchema = z.object({
  duration: createUnionSchema(JOB_LISTING_DURATIONS),
})
