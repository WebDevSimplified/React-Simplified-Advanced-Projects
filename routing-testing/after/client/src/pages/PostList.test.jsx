import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { renderRoute } from "../../test/renderRoute"
import { addMockApiRouteHandler } from "../../test/mockServer"
import userEvent from "@testing-library/user-event"

describe("PostList Page", () => {
  it("should allow filtering", async () => {
    addMockApiRouteHandler("get", "/posts", (req, res, ctx) => {
      const posts = [
        { title: "first post", body: "first post body", id: 1, userId: 1 },
        { title: "second post", body: "second post body", id: 2, userId: 2 },
      ]
      return res(
        ctx.status(200),
        ctx.json(
          posts.filter(post => {
            const title = req.url.searchParams.get("q") || ""
            const userId = parseInt(req.url.searchParams.get("userId"))
            return (
              post.title.includes(title) &&
              (isNaN(userId) || post.userId === userId)
            )
          })
        )
      )
    })
    addMockApiRouteHandler("get", "/users", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1, name: "first user" },
          { id: 2, name: "second user" },
        ])
      )
    })
    const user = userEvent.setup()

    renderRoute("/posts")

    expect(await screen.findByText("first post")).toBeInTheDocument()
    expect(screen.getByText("second post")).toBeInTheDocument()

    const queryInput = screen.getByLabelText("Query")
    await user.type(queryInput, "first post")
    await user.click(screen.getByText("Filter"))

    expect(screen.getByText("first post")).toBeInTheDocument()
    expect(screen.queryByText("second post")).not.toBeInTheDocument()
    expect(queryInput).toHaveValue("first post")

    const userInput = screen.getByLabelText("Author")
    await user.selectOptions(userInput, "second user")
    await user.clear(queryInput)
    await user.click(screen.getByText("Filter"))

    expect(screen.queryByText("first post")).not.toBeInTheDocument()
    expect(screen.getByText("second post")).toBeInTheDocument()
    expect(userInput).toHaveValue("2")
  })
})
