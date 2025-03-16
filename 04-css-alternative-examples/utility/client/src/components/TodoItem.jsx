export function TodoItem({ completed, title }) {
  return (
    <li className={`list-disc ml-10 ${completed ? "line-through" : undefined}`}>
      {title}
    </li>
  )
}
