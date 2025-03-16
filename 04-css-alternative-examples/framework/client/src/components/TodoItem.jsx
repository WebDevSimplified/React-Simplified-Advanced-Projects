export function TodoItem({ completed, title }) {
  return (
    <li className={completed ? "text-decoration-line-through" : undefined}>
      {title}
    </li>
  )
}
