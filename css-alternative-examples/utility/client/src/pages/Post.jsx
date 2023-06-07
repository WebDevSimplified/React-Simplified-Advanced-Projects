import { Link, useLoaderData } from "react-router-dom"
import { getComments } from "../api/comments"
import { getPost } from "../api/posts"
import { getUser } from "../api/users"
import { Card, CardStack } from "../components/Card"
import { PageHeader } from "../components/PageHeader"
import { StyledLink } from "../components/StyledLink"
import { Button } from "../components/Button"

function Post() {
  const { comments, post, user } = useLoaderData()

  return (
    <>
      <PageHeader
        subtitle={
          <>
            By: <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
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

      <h3 className="mt-8 mb-4 font-bold text-3xl">Comments</h3>
      <CardStack>
        {comments.map(comment => (
          <Card key={comment.id}>
            <div className="text-base mb-4">{comment.email}</div>
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
