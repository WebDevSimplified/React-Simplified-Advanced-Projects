import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

export function PostCard({ id, title, body }) {
  return (
    <Card style={{ height: "100%" }}>
      <Card.Header className="text-truncate fs-4 text-capitalize">
        {title}
      </Card.Header>
      <Card.Body>
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {body}
        </div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button variant="primary" as={Link} to={`/posts/${id}`}>
          View
        </Button>
      </Card.Footer>
    </Card>
  )
}
