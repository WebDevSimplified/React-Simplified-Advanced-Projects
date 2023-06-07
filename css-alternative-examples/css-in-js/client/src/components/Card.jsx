import styled from "styled-components"

const PADDING = "1rem"

const StyledCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
`

const StyledHeader = styled.div`
  font-size: 2rem;
  padding: ${PADDING};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  border-bottom: 1px solid black;
  flex-shrink: 0;
`

const StyledBody = styled.div`
  padding: ${PADDING};
  flex-grow: 1;
`

const StyledFooter = styled.div`
  border-top: 1px solid black;
  display: flex;
  padding: ${PADDING};
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
`

export function Card({ header, children, footer }) {
  return (
    <StyledCard>
      {header && <StyledHeader>{header}</StyledHeader>}
      {children && <StyledBody>{children}</StyledBody>}
      {footer && <StyledFooter>{footer}</StyledFooter>}
    </StyledCard>
  )
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
`

export function CardGrid({ children }) {
  return <StyledGrid>{children}</StyledGrid>
}

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export function CardStack({ children }) {
  return <StyledStack>{children}</StyledStack>
}
