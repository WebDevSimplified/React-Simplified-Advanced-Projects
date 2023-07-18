import z from "zod"

export const signupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter"),
})

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
})
