import { Link } from "react-router-dom"
import { Card } from "./Card"
import styled from "styled-components"
import { Button } from "./Button"

const StyledPreviewText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

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
      <StyledPreviewText>{body}</StyledPreviewText>
    </Card>
  )
}
