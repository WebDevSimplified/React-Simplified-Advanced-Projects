import { Router } from "express"
import Stripe from "stripe"
import { stripe } from "../stripe"
import { env } from "../config"
import { jobListingOrderCompleteSchema } from "../constants/schemas/stripe"
import { zParse } from "../utils/zParse"
import { db } from "../db"
import { addDays, isBefore } from "date-fns"

export const stripeRouter = Router()

stripeRouter.post("/job-listing-order-complete", async (req, res) => {
  const signature = req.headers["stripe-signature"]

  if (signature == null || req.body == null) {
    res.status(400).json({ message: "No signature" })
    return
  }
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.STRIPE_ORDER_COMPLETE_WEBHOOK_SECRET
    )
  } catch (e) {
    res.status(400).json({
      message: `Webhook Error: ${
        e instanceof Object && "message" in e && e.message
      }`,
    })
    return
  }

  if (event.type !== "payment_intent.succeeded") {
    res.status(400).json({ message: "Invalid event type" })
    return
  }

  const metadata = await zParse(
    (event.data.object as Stripe.PaymentIntent).metadata,
    jobListingOrderCompleteSchema,
    res
  )

  if (metadata == null) return

  const jobListing = await db.jobListing.findUnique({
    where: { id: metadata.jobListingId },
  })

  if (jobListing == null) {
    res.status(400).json({ message: "Invalid job listing" })
    return
  }

  const startingDate =
    jobListing.expiresAt == null || isBefore(jobListing.expiresAt, new Date())
      ? new Date()
      : jobListing.expiresAt
  await db.jobListing.update({
    where: { id: metadata.jobListingId },
    data: {
      expiresAt: addDays(startingDate, metadata.duration),
    },
  })

  res.sendStatus(200)
})
