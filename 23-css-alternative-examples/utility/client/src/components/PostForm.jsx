import { Form, FormGroup, FormRow } from "./Form"
import { Button } from "./Button"
import { Link } from "react-router-dom"

export function PostForm({
  users,
  isSubmitting,
  errors = {},
  defaultValues = {},
}) {
  return (
    <Form method="post">
      <FormRow>
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={defaultValues.title}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultValues.userId}>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            defaultValue={defaultValues.body}
          ></textarea>
        </FormGroup>
      </FormRow>
      <FormRow btnRow>
        <Button AsComponent={Link} outline to=".." className="self-end">
          Cancel
        </Button>
        <Button disabled={isSubmitting} className="self-end">
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </FormRow>
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
