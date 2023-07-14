import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center">
      <PageHeader subtitle="The page you tried to access could not be found">
        404 - Not Found
      </PageHeader>
      <Button asChild>
        <Link to="/">Take Me Home</Link>
      </Button>
    </div>
  )
}
