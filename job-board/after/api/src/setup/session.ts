import { User, PrismaClient } from "@prisma/client"
import { Express } from "express"
import session from "express-session"
import { env } from "../config"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"

declare module "express-session" {
  interface SessionData {
    user: Pick<User, "id" | "email">
  }
}

export function setupSession(app: Express) {
  app.use(
    session({
      secret: env.SESSION_SECRET,
      cookie: {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  )
}
