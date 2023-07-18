import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { TaskTable } from "@/features/todo-list"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export function TaskListPage() {
  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild>
            <Link to="new" className="flex gap-1">
              <Plus className="w-4 h-4" /> Task
            </Link>
          </Button>
        }
      >
        Tasks
      </PageHeader>
      <TaskTable />
    </>
  )
}
