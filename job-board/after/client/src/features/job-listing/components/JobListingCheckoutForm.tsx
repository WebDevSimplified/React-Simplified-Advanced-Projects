import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/utils/formatters"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

type JobListingCheckoutFormProps = {
  amount: number
}

export function JobListingCheckoutForm({
  amount,
}: JobListingCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (stripe == null || elements == null) return

    setIsLoading(true)

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/jobs/order-complete`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message)
        } else {
          setErrorMessage("An unexpected error occurred")
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={onSubmit}>
      {errorMessage && (
        <p className="text-red-500 dark:text-red-900 text-sm mb-4">
          {errorMessage}
        </p>
      )}
      <PaymentElement />
      <Button
        disabled={isLoading || stripe == null || elements == null}
        type="submit"
        className="w-full mt-4"
      >
        Pay {formatCurrency(amount)}
      </Button>
    </form>
  )
}
