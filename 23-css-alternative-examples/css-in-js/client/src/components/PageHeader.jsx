import styled from "styled-components"

const StyledTitle = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-bottom: ${props => (props.hasSubtitle ? "1rem" : "2rem")};
  gap: 2rem;
`

const StyledSubtitle = styled.div`
  margin-bottom: 2rem;
  font-size: 1.75rem;
  display: block;
`

const StyledBtns = styled.div`
  font-size: 1.5rem;
  font-weight: normal;
`

export function PageHeader({ children, btnSection, subtitle }) {
  return (
    <>
      <StyledTitle hasSubtitle={subtitle != null}>
        {children}
        {btnSection && <StyledBtns>{btnSection}</StyledBtns>}
      </StyledTitle>
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </>
  )
}
