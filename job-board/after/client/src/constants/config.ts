import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url(),
    VITE_STRIPE_PUBLISHABLE_KEY: z.string(),
    VITE_TEST_SLOW_API: z.coerce.boolean().optional(),
  },
  isServer: false,
  runtimeEnv: import.meta.env,
})
