import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { stripePromise } from "@/lib/stripe"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

export function JobListingOrderCompletePage() {
  const [message, setMessage] = useState<string>("Your payment is processing.")
  const [searchParams] = useSearchParams()
  const clientSecret = searchParams.get("payment_intent_client_secret")

  useEffect(() => {
    stripePromise.then(stripe => {
      if (stripe == null || clientSecret == null) return

      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case "succeeded":
              setMessage("Payment succeeded!")
              break
            case "processing":
              setMessage("Your payment is processing.")
              break
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.")
              break
            default:
              setMessage("Something went wrong.")
              break
          }
        })
        .catch(() => setMessage("Something went wrong."))
    })
  }, [clientSecret])

  return (
    <div className="flex flex-col items-center">
      <PageHeader subtitle={message}>Order Complete</PageHeader>
      <Button asChild>
        <Link to="/jobs/my-listings">View Your Job Listings</Link>
      </Button>
    </div>
  )
}

// TODO: Include docs on how to use webhook with cli
