import { PrivatePage } from "@/components/routing/PrivatePage"
import { EditJobListingPage } from "./Page"
import { loader } from "./loader"

export const editJobListingRoute = {
  loader,
  element: (
    <PrivatePage>
      <EditJobListingPage />
    </PrivatePage>
  ),
}
