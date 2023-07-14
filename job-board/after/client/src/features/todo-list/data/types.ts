import { TASK_PRIORITIES, TASK_STATUSES, TASK_CATEGORIES } from "./constants"

export type Task = {
  id: string
  title: string
  priority: (typeof TASK_PRIORITIES)[number]
  status: (typeof TASK_STATUSES)[number]
  category: (typeof TASK_CATEGORIES)[number]
}
