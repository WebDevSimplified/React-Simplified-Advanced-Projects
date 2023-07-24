import { Navigate, RouteObject } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { jobListingRoute } from "@/pages/job-listings/index"
import { NewJobListingPage } from "@/pages/job-listings/NewJobListingPage"
import { PrivatePage } from "@/components/routing/PrivatePage"
import { AuthLayout, LoginForm, SignupForm } from "./features/authentication"
import { myJobListingsRoute } from "./pages/job-listings/my-listings"
import { jobListingOrderCompleteRoute } from "./pages/job-listings/order-complete"
import { editJobListingRoute } from "./pages/job-listings/edit"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/jobs" />,
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            path: "jobs",
            children: [
              { index: true, ...jobListingRoute },
              {
                path: "new",
                element: (
                  <PrivatePage>
                    <NewJobListingPage />
                  </PrivatePage>
                ),
              },
              {
                path: "my-listings",
                ...myJobListingsRoute,
              },
              {
                path: "order-complete",
                ...jobListingOrderCompleteRoute,
              },
              {
                path: ":id/edit",
                ...editJobListingRoute,
              },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
          {
            element: <AuthLayout />,
            children: [
              { path: "login", element: <LoginForm /> },
              { path: "signup", element: <SignupForm /> },
            ],
          },
        ],
      },
    ],
  },
]
