import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"
import styled, { css } from "styled-components"

const StyledNav = styled.nav`
  color: hsl(200, 20%, 95%);
  background: hsl(200, 100%, 10%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  z-index: 10000;
`

const StyledNavList = styled.ul`
  margin: 0;
  display: flex;
  gap: 1rem;
  list-style: none;
  align-items: stretch;

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }
`

const StyledTextLarge = styled.div`
  font-size: 2rem;
`

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-bottom: 2rem;
  ${props =>
    props.isLoading &&
    css`
      filter: blur(5px);
      pointer-events: none;
    `}
`

const StyledLoadingSpinner = styled.div`
  ::after {
    content: "";
    z-index: 999;
    width: 200px;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    border: 20px solid transparent;
    border-bottom-color: hsl(200, 100%, 50%);
    animation: spin infinite 1.25s ease-in;
    mix-blend-mode: multiply;
  }

  ::before {
    content: "";
    z-index: 999;
    width: 200px;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    border: 20px solid transparent;
    border-top-color: hsl(200, 100%, 50%);
    animation: spin infinite 2s ease-in-out;
    mix-blend-mode: multiply;
  }

  @keyframes spin {
    to {
      rotate: 360deg;
    }
  }
`

export function RootLayout() {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  return (
    <>
      <StyledNav>
        <StyledTextLarge>My App</StyledTextLarge>
        <StyledNavList>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </StyledNavList>
      </StyledNav>
      <ScrollRestoration />
      {isLoading && <StyledLoadingSpinner />}
      <StyledContainer isLoading={isLoading}>
        <Outlet />
      </StyledContainer>
    </>
  )
}
