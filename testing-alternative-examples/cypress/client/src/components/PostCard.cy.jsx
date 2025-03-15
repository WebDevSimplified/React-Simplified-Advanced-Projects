import { MemoryRouter } from "react-router"
import { PostCard } from "./PostCard"
import "../styles.css"

describe("<PostCard />", () => {
  it("renders", () => {
    cy.mount(
      <MemoryRouter>
        <PostCard id="1" body="post body" title="post title" />
      </MemoryRouter>
    )

    cy.findByText("post title", { exact: true }).should("exist")
  })
})
