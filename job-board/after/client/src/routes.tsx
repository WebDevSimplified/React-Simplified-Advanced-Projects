import { Navigate, RouteObject } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { NavLayout } from "@/layouts/NavLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { JobListingsListPage } from "@/pages/jobListings/JobListingsListPage"
import { NewJobListingPage } from "@/pages/jobListings/NewJobListingPage"
import { PrivatePage } from "@/components/routing/PrivatePage"
import { AuthLayout, LoginForm, SignupForm } from "./features/authentication"
import { MyJobListingsPage } from "./pages/jobListings/MyJobListingsPage"
import { JobListingOrderCompletePage } from "./pages/jobListings/JobListingOrderCompletePage"
import { Edit } from "lucide-react"
import { EditJobListingPage } from "./pages/jobListings/EditJobListingPage"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <NavLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/tasks" />,
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
              { index: true, element: <JobListingsListPage /> },
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
                element: (
                  <PrivatePage>
                    <MyJobListingsPage />
                  </PrivatePage>
                ),
              },
              {
                path: "order-complete",
                element: <JobListingOrderCompletePage />,
              },
              {
                path: ":id/edit",
                element: <EditJobListingPage />,
              },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginForm /> },
          { path: "signup", element: <SignupForm /> },
        ],
      },
    ],
  },
]
