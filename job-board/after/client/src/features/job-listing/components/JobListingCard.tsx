import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Banknote, CalendarDays, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { JobListing } from ".."
import { formatCurrency } from "@/utils/formatters"
import { cn } from "@/utils/shadcnUtils"

type JobListingCardProps = {
  className?: string
  headerDetails?: React.ReactNode
  footerBtns?: React.ReactNode
} & Pick<
  JobListing,
  | "title"
  | "companyName"
  | "experienceLevel"
  | "location"
  | "salary"
  | "shortDescription"
  | "type"
>

export function JobListingCard({
  className,
  headerDetails,
  footerBtns,
  title,
  companyName,
  experienceLevel,
  location,
  salary,
  shortDescription,
  type: jobType,
}: JobListingCardProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader>
        <div className="flex gap-4 justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="flex flex-col">
              <span>{companyName}</span>
              <span>{location}</span>
            </CardDescription>
          </div>
          {headerDetails}
        </div>
        <div className="flex gap-1 flex-wrap">
          {/* Salary */}
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <Banknote className="w-4 h-4" /> {formatCurrency(salary)}
          </Badge>

          {/* Job Type (full time, part time, internship) (Maybe can be multiple) */}
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <CalendarDays className="w-4 h-4" /> {jobType}
          </Badge>

          {/* Experience level (junior, mid level, senior) */}
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <GraduationCap className="w-4 h-4" /> {experienceLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">{shortDescription}</CardContent>
      <CardFooter className="flex gap-2 items-stretch justify-end">
        {footerBtns}
      </CardFooter>
    </Card>
  )
}
