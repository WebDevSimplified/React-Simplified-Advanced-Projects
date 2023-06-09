import { Link, useLoaderData } from "react-router-dom"
import { getComments } from "../api/comments"
import { getPost } from "../api/posts"
import { getUser } from "../api/users"
import { Card, CardStack } from "../components/Card/Card"
import { PageHeader } from "../components/PageHeader/PageHeader"
import { Button } from "../components/Button/Button"

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
          <Button AsComponent={Link} outline to="edit">
            Edit
          </Button>
        }
      >
        {post.title}
      </PageHeader>
      <div>{post.body}</div>

      <h3 className="mt-4 mb-2">Comments</h3>
      <CardStack>
        {comments.map(comment => (
          <Card key={comment.id}>
            <div className="text-sm mb-1">{comment.email}</div>
            {comment.body}
          </Card>
        ))}
      </CardStack>
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
