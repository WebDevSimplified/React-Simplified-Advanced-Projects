import { z } from "zod"
import { useForm } from "react-hook-form"
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

import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AxiosError } from "axios"
import { useAuth } from ".."
import { signupSchema } from "@backend/constants/schemas/users"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

type LoginFormValues = z.infer<typeof formSchema>

const formSchema = signupSchema
  .merge(z.object({ passwordConfirmation: z.string() }))
  .refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })

export function SignupForm() {
  const { signup } = useAuth()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", passwordConfirmation: "" },
  })

  async function onSubmit(values: LoginFormValues) {
    await signup(values.email, values.password).catch(error => {
      if (
        error instanceof AxiosError &&
        error.response?.data?.message != null
      ) {
        form.setError("root", { message: error.response.data.message })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            {form.formState.errors.root?.message && (
              <CardDescription className="text-red-500 dark:text-red-900">
                {form.formState.errors.root.message}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-col w-full gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex gap-2 justify-end">
            <Button type="button" asChild variant="ghost">
              <Link to="/">Cancel</Link>
            </Button>
            <Button type="button" asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Sign Up"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
