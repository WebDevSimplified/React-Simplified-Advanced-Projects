import { Link } from "react-router-dom"
import { Card } from "./Card"
import { Button } from "./Button"

export function PostCard({ id, title, body }) {
  return (
    <Card
      header={title}
      footer={
        <Button AsComponent={Link} to={`/posts/${id}`}>
          View
        </Button>
      }
    >
      <div className="line-clamp-5">{body}</div>
    </Card>
  )
}
