/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

beforeEach(() => {
  cy.task("db:seed")
})

describe("NewPost page", () => {
  it("should throw an error with invalid input", () => {
    cy.visit("/posts/new")

    const userId = "1"
    const body = "new post body"

    cy.findByLabelText("Author").select(userId)
    cy.findByLabelText("Body").type(body)
    cy.findByText("Save").click()

    cy.findByLabelText("Author").should("have.value", userId)
    cy.findByLabelText("Body").should("have.value", body)

    cy.findByText("Required", { exact: true }).should("exist")
  })

  it("should create a new post with valid input", () => {
    cy.visit("/posts/new")

    const userName = "first user"
    const title = "new post"
    const body = "new post body"

    cy.findByLabelText("Title").type(title)
    cy.findByLabelText("Author").select(userName)
    cy.findByLabelText("Body").type(body)
    cy.findByText("Save").click()

    cy.findByText("new post", { exact: true }).should("exist")
    cy.findByText("first user", { exact: true }).should("exist")
    cy.findByText("new post body", { exact: true }).should("exist")

    cy.visit("/posts")

    cy.findByText("new post", { exact: true }).should("exist")
  })
})
