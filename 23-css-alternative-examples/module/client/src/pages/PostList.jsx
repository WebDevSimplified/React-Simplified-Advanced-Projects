import { useEffect, useRef } from "react"
import { Link, useLoaderData } from "react-router-dom"
import { getPosts } from "../api/posts"
import { getUsers } from "../api/users"
import { Form, FormGroup, FormRow } from "../components/Form/Form"
import { PostCard } from "../components/PostCard/PostCard"
import { CardGrid } from "../components/Card/Card"
import { PageHeader } from "../components/PageHeader/PageHeader"
import { Button } from "../components/Button/Button"

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
          <Button AsComponent={Link} outline to="new">
            New
          </Button>
        }
      >
        Posts
      </PageHeader>

      <Form className="mb-4">
        <FormRow>
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userIdRef}>
              <option value="">Any</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button className="self-end">Filter</Button>
        </FormRow>
      </Form>

      <CardGrid>
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </CardGrid>
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
