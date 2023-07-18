import { JOB_LISTING_DURATIONS } from "../constants/types"
import { assertUnreachable } from "./assertUnreachable"

export function getJobListingPriceInCents(
  duration: (typeof JOB_LISTING_DURATIONS)[number]
) {
  switch (duration) {
    case 30:
      return 10000
    case 60:
      return 17500
    case 90:
      return 22500
    default:
      assertUnreachable(duration)
  }
}
