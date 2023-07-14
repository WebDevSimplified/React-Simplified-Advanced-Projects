import { PageHeader } from "@/components/ui/PageHeader"
import { TaskForm, addTask } from "@/features/todo-list"
import { useNavigate } from "react-router-dom"

export function NewTaskPage() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader>New Task</PageHeader>
      <TaskForm
        onSubmit={newTask => {
          addTask(newTask)
          navigate("/tasks")
        }}
      />
    </>
  )
}
