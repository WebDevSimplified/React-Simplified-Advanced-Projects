import { Router } from "express"
import { zParse } from "../utils/zParse"
import { hashPassword, verifyPassword } from "../utils/passwordHasher"
import { db } from "../db"
import { loginSchema, signupSchema } from "../constants/schemas/users"

export const usersRouter = Router()

usersRouter.post("/login", async (req, res) => {
  const body = await zParse(req.body, loginSchema, res)
  if (body == null) return

  const user = await db.user.findUnique({
    where: { email: body.email },
  })

  if (
    user == null ||
    !verifyPassword(body.password, user.salt, user.password)
  ) {
    res.status(401).json({ message: "Invalid email or password" })
    return
  }

  req.session.user = user
  req.session.save(() => {
    res.json({ id: user.id, email: user.email })
  })
})

usersRouter.post("/signup", async (req, res) => {
  const body = await zParse(req.body, signupSchema, res)
  if (body == null) return

  const existingUser = await db.user.findUnique({
    where: { email: body.email },
  })
  if (existingUser != null) {
    return res
      .status(400)
      .json({ message: "An account already exists for that email" })
  }

  const { hash, salt } = hashPassword(body.password)

  const user = await db.user.create({
    data: {
      email: body.email,
      password: hash,
      salt: salt,
    },
  })

  req.session.user = user
  req.session.save(() => {
    res.json({ id: user.id, email: user.email })
  })
})

usersRouter.delete("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true })
  })
})

usersRouter.get("/session", (req, res) => {
  const user = req.session.user
  if (user == null) {
    res.json(null)
    return
  }

  res.json({ id: user.id, email: user.email })
})
