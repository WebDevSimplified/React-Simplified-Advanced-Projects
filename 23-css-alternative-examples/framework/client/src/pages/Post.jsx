import { Link, useLoaderData } from "react-router-dom"
import { getComments } from "../api/comments"
import { getPost } from "../api/posts"
import { getUser } from "../api/users"
import { PageHeader } from "../components/PageHeader"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"

function Post() {
  const { comments, post, user } = useLoaderData()

  return (
    <>
      <PageHeader
        subtitle={
          <>
            By: <Link to={`/users/${user.id}`}>{user.name}</Link>
          </>
        }
        btnSection={
          <Button
            as={Link}
            variant="outline-primary"
            className="fs-5"
            to="edit"
          >
            Edit
          </Button>
        }
      >
        {post.title}
      </PageHeader>

      <div>{post.body}</div>

      <h3 className="mt-4 mb-3">Comments</h3>
      <Stack gap={2}>
        {comments.map(comment => (
          <Card key={comment.id}>
            <Card.Body>
              <div className="mb-1" style={{ fontSize: ".8em" }}>
                {comment.email}
              </div>
              {comment.body}
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </>
  )
}

async function loader({ request: { signal }, params: { postId } }) {
  const comments = getComments(postId, { signal })
  const post = await getPost(postId, { signal })
  const user = getUser(post.userId, { signal })

  return { comments: await comments, post, user: await user }
}

export const postRoute = {
  loader,
  element: <Post />,
}
