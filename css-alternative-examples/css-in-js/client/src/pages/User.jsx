import { useLoaderData } from "react-router-dom"
import { getPosts } from "../api/posts"
import { getTodos } from "../api/todos"
import { getUser } from "../api/users"
import { PostCard } from "../components/PostCard"
import { TodoItem } from "../components/TodoItem"
import { CardGrid } from "../components/Card"
import { PageHeader } from "../components/PageHeader"

function User() {
  const { user, posts, todos } = useLoaderData()

  return (
    <>
      <PageHeader subtitle={user.email}>{user.name}</PageHeader>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street} {user.address.suite}{" "}
        {user.address.city} {user.address.zipcode}
      </div>

      <h3 className="mt-4 mb-2">Posts</h3>
      <CardGrid>
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </CardGrid>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}

async function loader({ request: { signal }, params: { userId } }) {
  const posts = getPosts({ signal, params: { userId } })
  const todos = getTodos({ signal, params: { userId } })
  const user = getUser(userId, { signal })

  return { posts: await posts, todos: await todos, user: await user }
}

export const userRoute = {
  loader,
  element: <User />,
}
