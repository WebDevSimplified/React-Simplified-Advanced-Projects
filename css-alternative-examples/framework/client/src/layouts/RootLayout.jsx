import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"

export function RootLayout() {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
        <Container fluid>
          <Navbar.Brand>My App</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/posts">
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/todos">
              Todos
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <Container className={`mb-4 ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </Container>
    </>
  )
}
