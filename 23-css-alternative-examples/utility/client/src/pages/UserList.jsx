import { Link, useLoaderData } from "react-router-dom"
import { getUsers } from "../api/users"
import { Card, CardGrid } from "../components/Card"
import { PageHeader } from "../components/PageHeader"
import { StyledLink } from "../components/StyledLink"
import { Button } from "../components/Button"

function UserList() {
  const users = useLoaderData()

  return (
    <>
      <PageHeader>Users</PageHeader>
      <CardGrid>
        {users.map(user => (
          <Card
            key={user.id}
            header={user.name}
            footer={
              <Button AsComponent={Link} to={user.id.toString()}>
                View
              </Button>
            }
          >
            <div>{user.company.name}</div>
            <div>{user.website}</div>
            <div>{user.email}</div>
          </Card>
        ))}
      </CardGrid>
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
