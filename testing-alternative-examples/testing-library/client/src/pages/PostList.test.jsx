import { describe, expect, it } from "vitest"
import { createRoutesStub } from "react-router"
import { render } from "@testing-library/react"
import { postListRoute } from "./PostList"

describe("PostList page", () => {
  it("properly renders posts", async () => {
    const Stub = createRoutesStub([
      {
        path: "/posts",
        Component: postListRoute.element.type,
        loader: () => {
          return {
            posts: [
              {
                id: 1,
                title: "first post",
                body: "first post body",
                userId: 1,
              },
              {
                id: 2,
                title: "second post",
                body: "second post body",
                userId: 2,
              },
            ],
            users: [
              {
                id: 1,
                name: "first user",
              },
              {
                id: 2,
                name: "second user",
              },
            ],
            searchParams: {},
          }
        },
      },
    ])

    const { findByText, findByLabelText } = render(
      <Stub initialEntries={["/posts"]} />
    )
    const authorInput = await findByLabelText("Author")
    expect(
      [...authorInput.querySelectorAll("option")].map(o => o.value)
    ).toEqual(["", "1", "2"])
    expect(await findByText("first post", { exact: true })).toBeInTheDocument()
    expect(await findByText("second post", { exact: true })).toBeInTheDocument()
  })

  it("syncs the form and search params on initial and future renders", async () => {
    const Stub = createRoutesStub([
      {
        path: "/posts",
        Component: postListRoute.element.type,
        loader: () => ({
          posts: [],
          users: [
            {
              id: 1,
              name: "first user",
            },
            {
              id: 2,
              name: "second user",
            },
          ],
          searchParams: { query: "first", userId: "1" },
        }),
      },
    ])

    const { findByLabelText } = render(
      <Stub initialEntries={["/posts?userId=1&query=first"]} />
    )

    const userSelect = await findByLabelText("Author")
    const searchInput = await findByLabelText("Query")
    expect(userSelect).toHaveValue("1")
    expect(searchInput).toHaveValue("first")
  })
})
