import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_ORDER_COMPLETE_WEBHOOK_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "production", "testing"]),
    CLIENT_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    SESSION_SECRET: z.string().min(32),
    PORT: z
      .string()
      .default("3000")
      .transform(s => parseInt(s))
      .pipe(z.number()),
  },
  isServer: true,
  runtimeEnv: process.env,
})
