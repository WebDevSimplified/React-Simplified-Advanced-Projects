import { Await, defer, useLoaderData } from "react-router-dom"
import { getPosts } from "../api/posts"
import { getTodos } from "../api/todos"
import { getUser } from "../api/users"
import { PostCard, SkeletonPostCard } from "../components/PostCard"
import { TodoItem } from "../components/TodoItem"
import {
  SimpleSkeletonText,
  Skeleton,
  SkeletonList,
} from "../components/Skeleton"
import { Suspense } from "react"

function User() {
  const { userPromise, postsPromise, todosPromise } = useLoaderData()

  return (
    <>
      <h1 className="page-title">
        <SimpleSkeletonText resolve={userPromise}>
          {user => user.name}
        </SimpleSkeletonText>
      </h1>
      <div className="page-subtitle">
        <SimpleSkeletonText resolve={userPromise}>
          {user => user.email}
        </SimpleSkeletonText>
      </div>
      <div>
        <b>Company:</b>{" "}
        <SimpleSkeletonText resolve={userPromise}>
          {user => user.company.name}
        </SimpleSkeletonText>
      </div>
      <div>
        <b>Website:</b>{" "}
        <SimpleSkeletonText resolve={userPromise}>
          {user => user.website}
        </SimpleSkeletonText>
      </div>
      <div>
        <b>Address:</b>{" "}
        <SimpleSkeletonText resolve={userPromise}>
          {user => `${user.address.street} ${user.address.suite}
        ${user.address.city} ${user.address.zipcode}`}
        </SimpleSkeletonText>
      </div>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={3}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <Await resolve={postsPromise}>
            {posts => posts.map(post => <PostCard key={post.id} {...post} />)}
          </Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        >
          <Await resolve={todosPromise}>
            {todos => todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
          </Await>
        </Suspense>
      </ul>
    </>
  )
}

async function loader({ request: { signal }, params: { userId } }) {
  const posts = getPosts({ signal, params: { userId } })
  const todos = getTodos({ signal, params: { userId } })
  const user = getUser(userId, { signal })

  return defer({ postsPromise: posts, todosPromise: todos, userPromise: user })
}

export const userRoute = {
  loader,
  element: <User />,
}
