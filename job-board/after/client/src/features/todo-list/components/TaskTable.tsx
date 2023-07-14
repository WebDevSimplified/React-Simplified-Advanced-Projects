import { Button } from "@/components/ui/button"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { createColumnHelper } from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Briefcase,
  CheckSquare,
  MoreHorizontal,
  Square,
  Timer,
  User,
} from "lucide-react"
import { useMemo } from "react"
import { Task } from "../data/types"
import {
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_CATEGORIES,
} from "../data/constants"
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TaskForm } from ".."
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const columnHelper = createColumnHelper<Task>()

const STATIC_COLUMNS = [
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Title" column={column} />
    ),
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Status" column={column} />
    ),
    cell: ({ getValue }) => {
      const status = getValue()
      const Icon = getStatusIcon(status)

      return (
        <span className="flex gap-2 items-center">
          <Icon className="w-4 h-4" /> {status}
        </span>
      )
    },
  }),
  columnHelper.accessor("priority", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Priority" column={column} />
    ),
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("priority")
      const b = rowB.getValue("priority")
      if (a === b) return 0
      if (a === "High") return -1
      if (b === "High") return 1
      if (a === "Medium") return -1
      if (b === "Medium") return 1
      return 0
    },
    cell: ({ getValue }) => {
      const priority = getValue()
      const Icon = getPriorityIcon(priority)
      return (
        <span className="flex gap-2 items-center">
          <Icon className="w-4 h-4" /> {priority}
        </span>
      )
    },
  }),
  columnHelper.accessor("category", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Category" column={column} />
    ),
    cell: ({ getValue }) => {
      const category = getValue()
      const Icon = getCategoryIcon(category)
      return (
        <span className="flex gap-2 items-center">
          <Icon className="w-4 h-4" /> {category}
        </span>
      )
    },
  }),
]

type getColumnsParams = {
  removeTask: (id: string) => void
  updateTask: (id: string, task: Partial<Omit<Task, "id">>) => void
}

function getColumns({ removeTask, updateTask }: getColumnsParams) {
  return STATIC_COLUMNS.concat([
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        const task = row.original

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropDownEditOptions
                  label="Status"
                  selectedOption={task.status}
                  options={TASK_STATUSES}
                  onSelect={status => updateTask(task.id, { status })}
                />
                <DropDownEditOptions
                  label="Priority"
                  selectedOption={task.priority}
                  options={TASK_PRIORITIES}
                  onSelect={priority => updateTask(task.id, { priority })}
                />
                <DropDownEditOptions
                  label="Category"
                  selectedOption={task.category}
                  options={TASK_CATEGORIES}
                  onSelect={category => updateTask(task.id, { category })}
                />
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onClick={() => removeTask(task.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TaskEditDialog
              task={task}
              updateTask={taskFields => updateTask(task.id, taskFields)}
            />
          </Dialog>
        )
      },
    }),
  ])
}

type TaskEditProps = {
  task: Task
  updateTask: (task: Partial<Omit<Task, "id">>) => void
}

function TaskEditDialog({ task, updateTask }: TaskEditProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
      </DialogHeader>
      <TaskForm onSubmit={updateTask} initialTask={task} />
    </DialogContent>
  )
}

export function TaskTable() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])

  const { toast } = useToast()

  const columns = useMemo(() => {
    return getColumns({
      removeTask: (id: string) => {
        setTasks(tasks => {
          return tasks.filter((task, index) => {
            if (task.id === id) {
              toast({
                title: "Task Deleted",
                description: `${task.title} was deleted`,
                action: (
                  <ToastAction
                    onClick={() =>
                      setTasks(currentTasks => {
                        const newArray = [...currentTasks]
                        newArray.splice(index, 0, task)
                        return newArray
                      })
                    }
                    altText="Recreate the task"
                  >
                    Undo
                  </ToastAction>
                ),
              })
              return false
            }

            return true
          })
        })
      },
      updateTask: (id: string, updatedTask: Partial<Task>) => {
        setTasks(tasks => {
          return tasks.map(task => {
            if (task.id === id) {
              return { ...task, ...updatedTask }
            }
            return task
          })
        })
      },
    })
  }, [setTasks, toast])

  return (
    <DataTable<Task>
      columns={columns}
      data={tasks}
      getRowKey={row => row.original.id}
    />
  )
}

function getStatusIcon(status: Task["status"]) {
  switch (status) {
    case "Done":
      return CheckSquare
    case "Todo":
      return Square
    case "In Progress":
      return Timer
  }
}

function getPriorityIcon(priority: Task["priority"]) {
  switch (priority) {
    case "High":
      return ArrowUp
    case "Medium":
      return ArrowLeft
    case "Low":
      return ArrowDown
  }
}

function getCategoryIcon(priority: Task["category"]) {
  switch (priority) {
    case "Personal":
      return User
    case "Work":
      return Briefcase
  }
}

type DropDownEditOptionsProps<T> = {
  label: string
  selectedOption: T
  onSelect: (selectedOption: T) => void
  options: readonly T[]
}

function DropDownEditOptions<T extends string>({
  label,
  selectedOption,
  onSelect,
  options,
}: DropDownEditOptionsProps<T>) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{label}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={selectedOption}>
          {options.map(option => (
            <DropdownMenuRadioItem
              onSelect={() => onSelect(option)}
              key={option}
              value={option}
            >
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
