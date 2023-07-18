import cors from "cors"
import { Express } from "express"
import { env } from "../config"

export function setupCors(app: Express) {
  app.use(cors({ origin: env.CLIENT_URL, credentials: true }))
}
