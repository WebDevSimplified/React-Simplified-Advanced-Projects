import {
  JOB_LISTING_EXPERIENCE_LEVELS,
  JOB_LISTING_TYPES,
} from "@backend/constants/types"
import { z } from "zod"

export const jobListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  companyName: z.string(),
  location: z.string(),
  salary: z.number(),
  type: z.enum(JOB_LISTING_TYPES),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS),
  shortDescription: z.string(),
  description: z.string(),
  applyUrl: z.string(),
  postedAt: z.coerce.date(),
  expiresAt: z.nullable(z.coerce.date()),
})
