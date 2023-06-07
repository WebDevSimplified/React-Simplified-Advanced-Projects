import { useLoaderData } from "react-router-dom"
import { getTodos } from "../api/todos"
import { TodoItem } from "../components/TodoItem"
import { PageHeader } from "../components/PageHeader"

function TodoList() {
  const todos = useLoaderData()

  return (
    <>
      <PageHeader>Todos</PageHeader>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}

function loader({ request: { signal } }) {
  return getTodos({ signal })
}

export const todoListRoute = {
  loader,
  element: <TodoList />,
}
