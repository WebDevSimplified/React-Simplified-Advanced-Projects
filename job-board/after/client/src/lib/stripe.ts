import { env } from "@/constants/config"
import { loadStripe } from "@stripe/stripe-js"

export const stripePromise = loadStripe(env.VITE_STRIPE_PUBLISHABLE_KEY)
