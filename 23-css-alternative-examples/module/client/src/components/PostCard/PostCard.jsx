import { Link } from "react-router-dom"
import styles from "./PostCard.module.css"
import { Card } from "../Card/Card"
import { Button } from "../Button/Button"

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
      <div className={styles.previewText}>{body}</div>
    </Card>
  )
}
