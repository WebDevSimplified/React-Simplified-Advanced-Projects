import { Suspense, useEffect, useRef } from "react"
import {
  Await,
  Form,
  Link,
  defer,
  useLoaderData,
  useNavigation,
} from "react-router-dom"
import { getPosts } from "../api/posts"
import { getUsers } from "../api/users"
import { FormGroup } from "../components/FormGroup"
import { PostCard, SkeletonPostCard } from "../components/PostCard"
import { SkeletonList } from "../components/Skeleton"

function PostList() {
  const {
    postsPromise,
    usersPromise,
    searchParams: { query, userId },
  } = useLoaderData()
  const queryRef = useRef()
  const { state } = useNavigation()
  const isLoading = state === "loading"

  useEffect(() => {
    queryRef.current.value = query || ""
  }, [query])

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>

      <Form className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <Suspense
              fallback={
                <select type="search" name="userId" id="userId" disabled>
                  <option value="">Loading...</option>
                </select>
              }
            >
              <Await resolve={usersPromise}>
                {users => (
                  <select
                    type="search"
                    name="userId"
                    id="userId"
                    defaultValue={userId || ""}
                  >
                    <option value="">Any</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              </Await>
            </Suspense>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      {isLoading && <div className="mb-2">Loading...</div>}
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <Await resolve={postsPromise}>
            {posts => posts.map(post => <PostCard key={post.id} {...post} />)}
          </Await>
        </Suspense>
      </div>
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

  return defer({
    postsPromise: posts,
    usersPromise: users,
    searchParams: { query, userId },
  })
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
