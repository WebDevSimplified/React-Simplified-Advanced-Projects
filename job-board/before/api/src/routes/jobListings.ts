import { Router } from "express"
import { zParse } from "../utils/zParse"
import { db } from "../db"
import {
  createPublishPaymentIntentSchema,
  jobListingFormSchema,
} from "../constants/schemas/jobListings"
import { getJobListingPriceInCents } from "../utils/getJobListingPriceInCents"
import { stripe } from "../stripe"

export const jobListingsRouter = Router()

jobListingsRouter.get("/published", async (req, res) => {
  res.json(
    await db.jobListing.findMany({ where: { expiresAt: { gt: new Date() } } })
  )
})

jobListingsRouter.get("/my-listings", async (req, res) => {
  if (req.session.user?.id == null) {
    res.status(401).json({ message: "You must be logged in to do that" })
    return
  }

  res.json(
    await db.jobListing.findMany({ where: { postedById: req.session.user.id } })
  )
})

jobListingsRouter.post("/", async (req, res) => {
  if (req.session.user?.id == null) {
    res.status(401).json({ message: "You must be logged in to do that" })
    return
  }

  const body = await zParse(req.body, jobListingFormSchema, res)
  if (body == null) return

  const jobListing = await db.jobListing.create({
    data: {
      ...body,
      postStatus: "draft",
      postedBy: { connect: { id: req.session.user.id } },
    },
  })

  res.json(jobListing)
})

jobListingsRouter.post(
  "/:id/create-publish-payment-intent",
  async (req, res) => {
    if (req.session.user?.id == null) {
      res.status(401).json({ message: "You must be logged in to do that" })
      return
    }

    const body = await zParse(req.body, createPublishPaymentIntentSchema, res)
    if (body == null) return

    const id = req.params.id
    const jobListing = await db.jobListing.findFirst({
      where: { id, postedById: req.session.user.id },
    })

    if (jobListing == null) {
      res.status(404).json({ message: "Job listing not found" })
      return
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: getJobListingPriceInCents(body.duration),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        jobListingId: req.params.id,
        duration: body.duration,
      },
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  }
)

jobListingsRouter.get("/:id", async (req, res) => {
  const id = req.params.id

  const jobListing = await db.jobListing.findUnique({ where: { id } })

  if (jobListing == null) {
    res.status(404).json({ message: "Job listing not found" })
    return
  }

  res.json(jobListing)
})

jobListingsRouter.put("/:id", async (req, res) => {
  if (req.session.user?.id == null) {
    res.status(401).json({ message: "You must be logged in to do that" })
    return
  }

  const body = await zParse(req.body, jobListingFormSchema, res)
  if (body == null) return

  const id = req.params.id
  const jobListing = await db.jobListing.findFirst({
    where: { id, postedById: req.session.user.id },
  })

  if (jobListing == null) {
    res.status(404).json({ message: "Job listing not found" })
    return
  }

  const updatedJobListing = await db.jobListing.update({
    where: { id },
    data: body,
  })

  res.json(updatedJobListing)
})

jobListingsRouter.delete("/:id", async (req, res) => {
  if (req.session.user?.id == null) {
    res.status(401).json({ message: "You must be logged in to do that" })
    return
  }

  const id = req.params.id
  const jobListing = await db.jobListing.findFirst({
    where: { id, postedById: req.session.user.id },
  })

  if (jobListing == null) {
    res.status(404).json({ message: "Job listing not found" })
    return
  }

  await db.jobListing.delete({ where: { id } })

  res.sendStatus(204)
})
