import { Link, useLoaderData } from "react-router-dom"
import { getUsers } from "../api/users"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function UserList() {
  const users = useLoaderData()

  return (
    <>
      <h1 className="page-title">Users</h1>

      <Row xs="1" md="2" xl="3" className="g-3 align-items-stretch">
        {users.map(user => (
          <Col key={user.id}>
            <Card className="d-flex" style={{ height: "100%" }}>
              <Card.Header className="text-truncate fs-4 text-capitalize">
                {user.name}
              </Card.Header>
              <Card.Body className="flex-grow-1">
                <div>{user.company.name}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <Button variant="primary" as={Link} to={user.id.toString()}>
                  View
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

function loader({ request: { signal } }) {
  return getUsers({ signal })
}

export const userListRoute = {
  loader,
  element: <UserList />,
}
