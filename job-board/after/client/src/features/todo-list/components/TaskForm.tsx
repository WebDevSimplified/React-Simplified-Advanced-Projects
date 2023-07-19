import { z } from "zod"
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../data/constants"
import { Control, FieldValues, Path, PathValue, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"

type TaskFormValues = z.infer<typeof formSchema>

type TaskFormProps = {
  initialTask?: TaskFormValues
  onSubmit: (task: TaskFormValues) => void
}

const formSchema = z.object({
  title: z.string().nonempty(),
  priority: z.enum(TASK_PRIORITIES),
  status: z.enum(TASK_STATUSES),
  category: z.enum(TASK_CATEGORIES),
})

const DEFAULT_VALUES: TaskFormValues = {
  title: "",
  category: "Work",
  priority: "Medium",
  status: "Todo",
}

export function TaskForm({
  initialTask = DEFAULT_VALUES,
  onSubmit,
}: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialTask,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 grid-cols-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TaskSelectFormField
            control={form.control}
            name="status"
            label="Status"
            options={TASK_STATUSES}
          />
          <TaskSelectFormField
            control={form.control}
            name="category"
            label="Category"
            options={TASK_CATEGORIES}
          />
          <TaskSelectFormField
            control={form.control}
            name="priority"
            label="Priority"
            options={TASK_PRIORITIES}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}

type TaskSelectFormFieldProps<T extends FieldValues> = {
  label: string
  control: Control<T>
  name: Path<T>
  options: readonly PathValue<T, Path<T>>[]
}

function TaskSelectFormField<T extends FieldValues>({
  label,
  control,
  name,
  options,
}: TaskSelectFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={val => field.onChange(val as PathValue<T, Path<T>>)}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
