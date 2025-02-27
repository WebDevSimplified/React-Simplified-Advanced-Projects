// @ts-check
import { expect } from "@playwright/test"
import { test } from "../../test-setup/extendedTest"

test("should create a new post valid input", async ({ page }) => {
  await page.goto("./posts/new")

  const titleInput = page.getByLabel("Title")
  const userInput = page.getByLabel("Author")
  const bodyInput = page.getByLabel("Body")

  const title = "new post"
  const userName = "first user"
  const body = "new post body"

  await titleInput.fill(title)
  await userInput.selectOption(userName)
  await bodyInput.fill(body)
  await page.getByText("Save").click()

  await expect(page.getByText("new post")).toBeVisible()
  await expect(page.getByText("first user")).toBeVisible()
  await expect(page.getByText("new post body")).toBeVisible()
})

test("should render an error with bad input", async ({ page }) => {
  await page.goto("./posts/new")

  await page.getByLabel("Author").selectOption("first user")
  await page.getByLabel("Body").fill("new post body")
  await page.getByText("Save").click()

  await expect(page.getByText("Required", { exact: true })).toBeVisible()
})
