/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

beforeEach(() => {
  cy.task("db:seed")
})

describe("PostList page", () => {
  it("syncs the form and search params on initial and future renders", () => {
    cy.visit("/posts?userId=1&query=first")

    cy.findByLabelText("Author").should("have.value", "1")
    cy.findByLabelText("Query").should("have.value", "first")
    cy.findByText("first post", { exact: true }).should("exist")
    cy.findByText("third post", { exact: true }).should("not.exist")

    cy.findByLabelText("Author").select("2")
    cy.findByLabelText("Query").clear()
    cy.findByLabelText("Query").type("third")
    cy.findByText("Filter").click()

    cy.findByLabelText("Author").should("have.value", "2")
    cy.findByLabelText("Query").should("have.value", "third")

    cy.findByText("first post", { exact: true }).should("not.exist")
    cy.findByText("third post", { exact: true }).should("exist")
  })
})
