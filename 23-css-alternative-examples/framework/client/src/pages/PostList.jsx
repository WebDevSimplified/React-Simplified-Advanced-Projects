import { useEffect, useRef } from "react"
import { Form as RouterForm, Link, useLoaderData } from "react-router-dom"
import { getPosts } from "../api/posts"
import { getUsers } from "../api/users"
import { PostCard } from "../components/PostCard"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import { PageHeader } from "../components/PageHeader"

function PostList() {
  const {
    posts,
    users,
    searchParams: { query, userId },
  } = useLoaderData()
  const queryRef = useRef()
  const userIdRef = useRef()

  useEffect(() => {
    queryRef.current.value = query || ""
  }, [query])

  useEffect(() => {
    userIdRef.current.value = userId || ""
  }, [userId])

  return (
    <>
      <PageHeader
        btnSection={
          <Button as={Link} variant="outline-primary" className="fs-5" to="new">
            New
          </Button>
        }
      >
        Posts
      </PageHeader>

      <Form as={RouterForm} className="mb-4">
        <Stack direction="horizontal" className="align-items-end" gap={2}>
          <Form.Group className="flex-grow-1" controlId="query">
            <Form.Label>Query</Form.Label>
            <Form.Control type="search" name="query" ref={queryRef} />
          </Form.Group>
          <Form.Group className="flex-grow-1" controlId="userId">
            <Form.Label>Author</Form.Label>
            <Form.Select name="userId" ref={userIdRef}>
              <option value="">Any</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary">
            Filter
          </Button>
        </Stack>
      </Form>

      <Row xs="1" md="2" xl="3" className="g-3 align-items-stretch">
        {posts.map(post => (
          <Col key={post.id}>
            <PostCard {...post} />
          </Col>
        ))}
      </Row>
    </>
  )
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get("query")
  const userId = searchParams.get("userId")
  const filterParams = { q: query }
  if (userId !== "") filterParams.userId = userId

  const posts = getPosts({ signal, params: filterParams })
  const users = getUsers({ signal })

  return {
    posts: await posts,
    users: await users,
    searchParams: { query, userId },
  }
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
