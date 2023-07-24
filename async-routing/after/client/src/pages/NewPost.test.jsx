import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import { renderRoute } from "../../test-setup/renderRoute"
import { addMockApiRouteHandler } from "../../test-setup/mockServer"
import { HttpResponse } from "msw"
import userEvent from "@testing-library/user-event"

describe("NewPost page", () => {
  it("should create a new post with valid input", async () => {
    const user = userEvent.setup()
    addMockApiRouteHandler("get", "/users", () => {
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

    const newPostApiHandler = vi.fn(async ({ request }) => {
      const bodyJSON = await request.json()
      const title = bodyJSON.title
      const body = bodyJSON.body
      const userId = bodyJSON.userId
      const id = 1

      addMockApiRouteHandler("get", `/posts/${id}`, () => {
        return HttpResponse.json({ id, title, body, userId })
      })

      addMockApiRouteHandler("get", `/users/${userId}`, () => {
        return HttpResponse.json({ id: userId, name: "first user" })
      })

      addMockApiRouteHandler("get", `/posts/${id}/comments`, () => {
        return HttpResponse.json([])
      })

      return HttpResponse.json({ id, title, body, userId })
    })

    addMockApiRouteHandler("post", "/posts", newPostApiHandler)

    renderRoute("/posts/new")

    const titleInput = await screen.findByLabelText("Title")
    const userInput = screen.getByLabelText("Author")
    const bodyInput = screen.getByLabelText("Body")

    const title = "new post"
    const userName = "first user"
    const body = "new post body"

    await user.type(titleInput, title)
    await user.selectOptions(userInput, userName)
    await user.type(bodyInput, body)
    await user.click(screen.getByText("Save"))

    expect(newPostApiHandler).toHaveBeenCalledOnce()
    expect(await screen.findByText("new post")).toBeInTheDocument()
    expect(await screen.findByText("first user")).toBeInTheDocument()
    expect(screen.getByText("new post body")).toBeInTheDocument()
  })
})
