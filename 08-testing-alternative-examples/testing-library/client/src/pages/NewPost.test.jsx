import { describe, expect, vi, it } from "vitest"
import { createRoutesStub } from "react-router"
import { newPostRoute } from "./NewPost.jsx"
import { postRoute } from "./Post.jsx"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("NewPost page", () => {
  it("should create a new post valid input", async () => {
    const user = userEvent.setup()
    const newPostAction = vi.fn()

    const Stub = createRoutesStub([
      {
        path: "/posts/new",
        loader: () => [
          {
            id: 1,
            name: "first user",
          },
          {
            id: 2,
            name: "second user",
          },
        ],
        action: newPostAction,
        Component: newPostRoute.element.type,
      },
      {
        path: "/posts/:postId",
        loader: () => ({
          post: {
            id: 1,
            title: "new post",
            body: "new post body",
            userId: 1,
          },
          user: {
            id: 1,
            name: "first user",
          },
          comments: [],
        }),
        Component: postRoute.element.type,
      },
    ])
    const { findByLabelText, findByText } = render(
      <Stub initialEntries={["/posts/new"]} />
    )

    const titleInput = await findByLabelText("Title")
    const userInput = await findByLabelText("Author")
    const bodyInput = await findByLabelText("Body")

    const title = "new post"
    const userName = "first user"
    const body = "new post body"

    await user.type(titleInput, title)
    await user.selectOptions(userInput, userName)
    await user.type(bodyInput, body)
    await user.click(await findByText("Save"))

    expect(newPostAction).toHaveBeenCalledOnce()
  })

  it("should render an error with bad input", async () => {
    const user = userEvent.setup()
    const newPostAction = vi.fn(newPostRoute.action)

    const Stub = createRoutesStub([
      {
        path: "/posts/new",
        loader: () => [
          {
            id: 1,
            name: "first user",
          },
          {
            id: 2,
            name: "second user",
          },
        ],
        action: newPostAction,
        Component: newPostRoute.element.type,
      },
    ])
    const { findByLabelText, findByText } = render(
      <Stub initialEntries={["/posts/new"]} />
    )

    await user.selectOptions(await findByLabelText("Author"), "first user")
    await user.type(await findByLabelText("Body"), "new post body")
    await user.click(await findByText("Save"))

    expect(newPostAction).toHaveResolvedWith({ title: "Required" })

    expect(await findByText("Required", { exact: true })).toBeInTheDocument()
  })
})
