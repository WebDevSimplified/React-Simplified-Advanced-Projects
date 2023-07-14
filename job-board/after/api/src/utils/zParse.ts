import type { Response } from "express"
import { AnyZodObject, ZodError, z } from "zod"
import { fromZodError } from "zod-validation-error"

export async function zParse<T extends AnyZodObject>(
  object: unknown,
  schema: T,
  res: Response
): Promise<z.infer<T> | undefined> {
  try {
    return await schema.parseAsync(object)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: fromZodError(error).message })
    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}
