import styled from "styled-components"

const StyledButton = styled.button`
  text-decoration: none;
  color: hsl(200, 20%, 95%);
  background: hsl(200, 100%, 25%);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;

  :hover,
  :focus {
    background: hsl(200, 100%, 35%);
  }

  :disabled {
    background: hsl(200, 10%, 50%);
    color: hsl(200, 10%, 95%);
    cursor: not-allowed;
  }
`

const StyledOutlineButton = styled(StyledButton)`
  background: none;
  color: hsl(200, 100%, 25%);
  border: 2px solid hsl(200, 100%, 25%);

  :hover,
  :focus {
    background: hsl(200, 50%, 90%);
  }

  :disabled {
    border-color: hsl(200, 10%, 50%);
    color: hsl(200, 10%, 50%);
    background: hsl(200, 10%, 90%);
    cursor: not-allowed;
  }
`

export function Button({ outline = false, AsComponent = "button", ...props }) {
  const Component = outline ? StyledOutlineButton : StyledButton
  return <Component as={AsComponent} {...props} />
}
