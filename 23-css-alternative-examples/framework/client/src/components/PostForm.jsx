import { Form as RouterForm, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"

export function PostForm({
  users,
  isSubmitting,
  errors = {},
  defaultValues = {},
}) {
  return (
    <Form as={RouterForm} method="post">
      <Stack gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                isInvalid={errors.title != null}
                defaultValue={defaultValues.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="userId">
              <Form.Label>Author</Form.Label>
              <Form.Select
                isInvalid={errors.userId != null}
                name="userId"
                defaultValue={defaultValues.userId}
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.userId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                isInvalid={errors.body != null}
                defaultValue={defaultValues.body}
              />
              <Form.Control.Feedback type="invalid">
                {errors.body}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button as={Link} variant="outline-primary" to="..">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? "Saving" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Form>
  )
}

export function postFormValidator({ title, body, userId }) {
  const errors = {}

  if (title === "") {
    errors.title = "Required"
  }

  if (body === "") {
    errors.body = "Required"
  }

  if (userId === "") {
    errors.userId = "Required"
  }

  return errors
}
