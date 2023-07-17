import { PrivatePage } from "@/components/routing/PrivatePage"
import { MyJobListingsPage } from "./Page"
import { loader } from "./loader"

export const myJobListingsRoute = {
  loader,
  element: (
    <PrivatePage>
      <MyJobListingsPage />
    </PrivatePage>
  ),
}
