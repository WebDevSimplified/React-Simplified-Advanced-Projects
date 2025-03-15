// @ts-check
import { expect } from "@playwright/test"
import { test } from "../../test-setup/extendedTest"

test("syncs the form and search params on initial and future renders", async ({
  page,
}) => {
  await page.goto("./posts?userId=1&query=first")

  const authorInput = page.getByLabel("Author")
  const queryInput = page.getByLabel("Query")

  await expect(authorInput).toHaveValue("1")
  await expect(queryInput).toHaveValue("first")
  await expect(page.getByText("first post", { exact: true })).toBeVisible()
  await expect(page.getByText("third post", { exact: true })).not.toBeVisible()

  await authorInput.selectOption("2")
  await queryInput.fill("third")
  await page.getByText("Filter").click()

  await expect(authorInput).toHaveValue("2")
  await expect(queryInput).toHaveValue("third")
  await expect(page.getByText("first post", { exact: true })).not.toBeVisible()
  await expect(page.getByText("third post", { exact: true })).toBeVisible()
})
