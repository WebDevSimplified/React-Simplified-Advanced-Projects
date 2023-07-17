import { deferredLoader } from "@/lib/reactRouter"
import { stripePromise } from "@/lib/stripe"

export const loader = deferredLoader(({ request: { url } }) => {
  const searchParams = new URL(url).searchParams
  const clientSecret = searchParams.get("payment_intent_client_secret")

  return {
    message: stripePromise.then(stripe => {
      if (stripe == null || clientSecret == null) {
        return "Something went wrong"
      }

      return stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case "succeeded":
              return "Payment succeeded"
            case "processing":
              return "Your payment is processing"
            case "requires_payment_method":
              return "Your payment was not successful, please try again"
            default:
              return "Something went wrong"
          }
        })
        .catch(() => {
          return "Something went wrong"
        })
    }),
  }
})
