import { AnimateVisibility } from "@/components/animation/AnimateVisibility"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogHeader } from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/utils/shadcnUtils"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Banknote,
  CalendarDays,
  ExternalLink,
  EyeOff,
  GraduationCap,
  Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

type JobPostingCardProps = {
  isHidden?: boolean
  isFavorite?: boolean
  toggleFavorite: () => void
  setHidden: (isHidden: boolean) => void
}

export function JobPostingCard({
  isHidden = false,
  isFavorite = false,
  toggleFavorite,
  setHidden,
}: JobPostingCardProps) {
  const { toast } = useToast()

  function onHide() {
    setHidden(true)

    toast({
      title: "Job Hidden",
      description: "Job Title will no longer be shown",
      action: (
        <ToastAction onClick={() => setHidden(false)} altText="Try again">
          Undo
        </ToastAction>
      ),
    })
  }

  return (
    <AnimateVisibility isVisible={!isHidden}>
      <Card>
        <CardHeader>
          <div className="flex gap-4 justify-between">
            <div>
              <CardTitle>Job Title</CardTitle>
              <CardDescription className="flex flex-col">
                <span>Company Name</span>
                <span>Job Location</span>
              </CardDescription>
            </div>
            <div className="-mr-3 -mt-3">
              <Button
                size="icon"
                className="rounded-full"
                variant="ghost"
                onClick={onHide}
              >
                <EyeOff className="w-4 h-4" />
              </Button>
              <Button
                onClick={toggleFavorite}
                size="icon"
                className="rounded-full"
                variant="ghost"
              >
                <Heart
                  className={cn(
                    "w-4 h-4",
                    isFavorite && "fill-red-500 stroke-red-500"
                  )}
                />
              </Button>
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {/* Salary */}
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <Banknote className="w-4 h-4" /> $75,000
            </Badge>

            {/* Job Type (full time, part time, internship) (Maybe can be multiple) */}
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <CalendarDays className="w-4 h-4" /> Full Time
            </Badge>

            {/* Experience level (junior, mid level, senior) */}
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <GraduationCap className="w-4 h-4" /> Junior
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          Basic Job Info (things like location flexibility, hour flexibility,
          responsibilities)
        </CardContent>
        <CardFooter className="flex gap-2 items-stretch justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button>View More</Button>
            </DialogTrigger>
            <JobPostingDialogContent />
          </Dialog>
        </CardFooter>
      </Card>
    </AnimateVisibility>
  )
}

function JobPostingDialogContent() {
  return (
    <DialogContent className="max-h-[calc(100vh-2rem)] flex flex-col max-w-3xl w-[calc(100vw-2rem)] rounded">
      <DialogHeader>
        <DialogTitle>Job Title</DialogTitle>
        <DialogDescription className="flex flex-col">
          <span>Company Name</span>
          <span>Job Location</span>
        </DialogDescription>

        <div className="flex gap-1 flex-wrap">
          {/* Salary */}
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <Banknote className="w-4 h-4" /> $75,000
          </Badge>

          {/* Job Type (full time, part time, internship) (Maybe can be multiple) */}
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <CalendarDays className="w-4 h-4" /> Full Time
          </Badge>

          {/* Experience level (junior, mid level, senior) */}
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <GraduationCap className="w-4 h-4" /> Junior
          </Badge>
        </div>
      </DialogHeader>
      <div>
        <Button asChild>
          <a href="/">
            Apply On Company Site
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
      <div className="overflow-y-auto">Full Job Details</div>
    </DialogContent>
  )
}
