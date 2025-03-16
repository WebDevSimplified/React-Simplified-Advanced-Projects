import { describe, expect } from "vitest"
import { HttpResponse } from "msw"
import { it } from "../../test-setup/extendedIt"
import { renderRoute } from "../../test-setup/renderRoute"
import { addMockApiRouteHandler } from "../../test-setup/mockServer"

describe("PostList page", () => {
  it("properly renders posts", async ({ worker }) => {
    addMockApiRouteHandler(worker, "get", "/posts", () => {
      return HttpResponse.json([
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
      ])
    })
    addMockApiRouteHandler(worker, "get", "/users", () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "first user",
        },
        {
          id: 2,
          name: "second user",
        },
      ])
    })

    const { getByText, getByLabelText } = renderRoute("/posts")

    await expect
      .poll(() =>
        getByLabelText("Author")
          .getByRole("option")
          .elements()
          .map(o => o.value)
      )
      .toEqual(["", "1", "2"])
    await expect
      .element(getByText("first post", { exact: true }))
      .toBeInTheDocument()
    await expect
      .element(getByText("second post", { exact: true }))
      .toBeInTheDocument()
  })

  it("syncs the form and search params on initial and future renders", async ({
    worker,
  }) => {
    addMockApiRouteHandler(worker, "get", "/posts", () => {
      return HttpResponse.json([])
    })
    addMockApiRouteHandler(worker, "get", "/users", () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "first user",
        },
        {
          id: 2,
          name: "second user",
        },
      ])
    })

    const { getByText, getByLabelText } = renderRoute(
      "/posts?userId=1&query=first"
    )

    const userSelect = getByLabelText("Author")
    const searchInput = getByLabelText("Query")
    await expect.element(userSelect).toHaveValue("1")
    await expect.element(searchInput).toHaveValue("first")

    await userSelect.selectOptions("second user")
    await searchInput.fill("second")
    await getByText("Filter").click()

    await expect.element(userSelect).toHaveValue("2")
    await expect.element(searchInput).toHaveValue("second")
  })
})
