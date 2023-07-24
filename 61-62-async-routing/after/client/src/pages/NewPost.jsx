import {
  defer,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom"
import { createPost } from "../api/posts"
import { getUsers } from "../api/users"
import { PostForm, postFormValidator } from "../components/PostForm"

function NewPost() {
  const { usersPromise } = useLoaderData()
  const { state } = useNavigation()
  const errors = useActionData()
  const isSubmitting = state === "submitting"

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm
        usersPromise={usersPromise}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </>
  )
}

async function action({ request }) {
  const formData = await request.formData()
  const title = formData.get("title")
  const body = formData.get("body")
  const userId = formData.get("userId")

  const errors = postFormValidator({ title, userId, body })

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const post = await createPost(
    { title, body, userId },
    { signal: request.signal }
  )

  return redirect(`/posts/${post.id}`)
}

function loader({ request: { signal } }) {
  return defer({ usersPromise: getUsers({ signal }) })
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
}
