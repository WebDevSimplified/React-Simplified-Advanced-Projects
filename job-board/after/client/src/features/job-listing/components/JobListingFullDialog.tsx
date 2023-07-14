import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatCurrency } from "@/utils/formatters"
import {
  Banknote,
  CalendarDays,
  GraduationCap,
  ExternalLink,
} from "lucide-react"
import { JobListing } from ".."
import { Badge } from "@/components/ui/badge"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"

type JobListingFullDialogProps = Pick<
  JobListing,
  | "title"
  | "companyName"
  | "applyUrl"
  | "description"
  | "experienceLevel"
  | "location"
  | "salary"
  | "type"
>

export function JobListingFullDialog({
  title,
  companyName,
  location,
  salary,
  type: jobType,
  experienceLevel,
  applyUrl,
  description,
}: JobListingFullDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] flex flex-col max-w-3xl w-[calc(100vw-2rem)] rounded">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>{companyName}</span>
            <span>{location}</span>
          </DialogDescription>

          <div className="flex gap-1 flex-wrap">
            {/* Salary */}
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <Banknote className="w-4 h-4" /> {formatCurrency(salary)}
            </Badge>

            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <CalendarDays className="w-4 h-4" /> {jobType}
            </Badge>

            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <GraduationCap className="w-4 h-4" /> {experienceLevel}
            </Badge>
          </div>
        </DialogHeader>
        <div>
          <Button asChild>
            <a target="_blank" href={applyUrl}>
              Apply On Company Site
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <MarkdownRenderer className="overflow-y-auto pr-6">
          {description}
        </MarkdownRenderer>
      </DialogContent>
    </Dialog>
  )
}
