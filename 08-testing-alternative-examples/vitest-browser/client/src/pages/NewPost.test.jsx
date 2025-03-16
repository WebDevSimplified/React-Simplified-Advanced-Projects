import { describe, expect, vi } from "vitest"
import { addMockApiRouteHandler } from "../../test-setup/mockServer"
import { HttpResponse } from "msw"
import { renderRoute } from "../../test-setup/renderRoute"
import { it } from "../../test-setup/extendedIt"

describe("NewPost page", () => {
  it("should create a new post valid input", async ({ worker }) => {
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

    const newPostApiHandler = vi.fn(async ({ request }) => {
      const bodyJSON = await request.json()
      const title = bodyJSON.title
      const body = bodyJSON.body
      const userId = bodyJSON.userId
      const id = 1

      addMockApiRouteHandler(worker, "get", `/posts/${id}`, () => {
        return HttpResponse.json({ id, title, body, userId })
      })

      addMockApiRouteHandler(worker, "get", `/users/${userId}`, () => {
        return HttpResponse.json({ id: userId, name: "first user" })
      })

      addMockApiRouteHandler(worker, "get", `/posts/${id}/comments`, () => {
        return HttpResponse.json([])
      })

      return HttpResponse.json({ id, title, body, userId })
    })

    addMockApiRouteHandler(worker, "post", "/posts", newPostApiHandler)

    const { getByLabelText, getByText } = renderRoute("/posts/new")
    // const Stub = createRoutesStub([
    //   {
    //     path: "/posts/new",
    //     loader: newPostRoute.loader,
    //     action: newPostRoute.action,
    //     Component: newPostRoute.element.type,
    //   },
    //   {
    //     path: "/posts/:postId",
    //     loader: postRoute.loader,
    //     Component: postRoute.element.type,
    //   },
    // ])
    // render(<Stub initialEntries={["/posts/new"]} />)

    const titleInput = getByLabelText("Title")
    const userInput = getByLabelText("Author")
    const bodyInput = getByLabelText("Body")

    const title = "new post"
    const userName = "first user"
    const body = "new post body"

    await titleInput.fill(title)
    await userInput.selectOptions(userName)
    await bodyInput.fill(body)
    await getByText("Save").click()

    await expect.element(getByText("new post")).toBeInTheDocument()
    await expect.element(getByText("first user")).toBeInTheDocument()
    await expect.element(getByText("new post body")).toBeInTheDocument()
    expect(newPostApiHandler).toHaveBeenCalledOnce()
  })

  it("should render an error with bad input", async ({ worker }) => {
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

    const { getByLabelText, getByText } = renderRoute("/posts/new")

    await getByLabelText("Author").selectOptions("first user")
    await getByLabelText("Body").fill("new post body")
    await getByText("Save").click()

    await expect
      .element(getByText("Required", { exact: true }))
      .toBeInTheDocument()
  })
})
