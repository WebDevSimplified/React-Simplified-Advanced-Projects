import Stripe from "stripe"
import { env } from "./config"

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
})
