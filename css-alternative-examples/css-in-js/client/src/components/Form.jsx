import { Form as RouterForm } from "react-router-dom"
import styled from "styled-components"

const StyledForm = styled(RouterForm)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export function Form(props) {
  return <StyledForm {...props} />
}

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-grow: 1;

  input,
  select,
  textarea {
    font-size: inherit;
    font-family: inherit;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 2px solid
      ${props => (props.hasError ? "hsl(0, 100%, 50%)" : "hsl(200, 100%, 10%)")};
  }

  textarea {
    resize: vertical;
    min-height: 150px;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: hsl(200, 100%, 50%);
  }
`

const StyledErrorMessage = styled.div`
  color: hsl(0, 100%, 50%);
  font-size: 1rem;
`

export function FormGroup({ children, errorMessage }) {
  return (
    <StyledFormGroup hasError={errorMessage != null}>
      {children}
      {errorMessage != null && (
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      )}
    </StyledFormGroup>
  )
}

const StyledRow = styled.div`
  display: flex;
  gap: 1rem;
  ${props => props.btnRow && "justify-content: flex-end;"}
`

export function FormRow({ children, btnRow = false }) {
  return (
    <StyledRow btnRow={btnRow} className="row">
      {children}
    </StyledRow>
  )
}
