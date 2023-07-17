import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type LogoutDialogProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function LogoutDialog({ isOpen, onOpenChange }: LogoutDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] flex flex-col max-w-3xl w-[calc(100vw-2rem)] rounded">
        <DialogHeader>
          <DialogTitle>Logging Out</DialogTitle>
        </DialogHeader>
        <LoadingSpinner className="w-12 h-12" />
      </DialogContent>
    </Dialog>
  )
}
