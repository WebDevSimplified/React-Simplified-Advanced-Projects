import { screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { renderRoute } from "../../test/renderRoute"
import { addMockApiRouteHandler } from "../../test/mockServer"
import userEvent from "@testing-library/user-event"

describe("NewPost Page", () => {
  it("should create a new post with valid information", async () => {
    addMockApiRouteHandler("get", "/users", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1, name: "first user" },
          { id: 2, name: "second user" },
        ])
      )
    })

    const newPostApiHandler = vi.fn((req, res, ctx) => {
      const title = req.body.title
      const body = req.body.body
      const userId = req.body.userId

      addMockApiRouteHandler("get", "/posts/3", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: 3,
            title,
            body,
            userId,
          })
        )
      })

      addMockApiRouteHandler(
        "get",
        `/users/${req.body.userId}`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              id: userId,
              name: "first user",
            })
          )
        }
      )

      addMockApiRouteHandler("get", "/posts/3/comments", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
      })

      return res(
        ctx.status(200),
        ctx.json({
          id: 3,
          title,
          body,
          userId,
        })
      )
    })

    addMockApiRouteHandler("post", "/posts", newPostApiHandler)
    const user = userEvent.setup()

    renderRoute("/posts/new")

    const titleInput = await screen.findByLabelText("Title")
    const userInput = screen.getByLabelText("Author")
    const bodyInput = screen.getByLabelText("Body")

    await user.type(titleInput, "new post")
    await user.selectOptions(userInput, "first user")
    await user.type(bodyInput, "new post body")
    await user.click(screen.getByText("Save"))

    expect(newPostApiHandler).toHaveBeenCalledOnce()
    expect(screen.getByText("new post")).toBeInTheDocument()
    expect(screen.getByText("new post body")).toBeInTheDocument()
    expect(screen.getByText("first user")).toBeInTheDocument()
  })
})
