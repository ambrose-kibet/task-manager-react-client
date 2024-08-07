import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorPage,
  AuthPage,
  AuthRoutesLayout,
  LandingPage,
  MyTasksPage,
  ProtectedRoutesLayout,
  Root,
  CreateTasksPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  AdminPage,
  AdminRoutesLayout,
  StatsPage,
  VerifyEmailPage,
  adminLoader,
  TasksPerDayPage,
  tasksPerDayLoader,
  myTasksLoader,
  statsLoader,
} from "@/routes";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  AdminErrorBoundary,
  AuthErrorBoundary,
  TaskPerDayErrorBoundary,
} from "./routes/error-boundaries";
import { loader as authLoader } from "@/routes/auth-page";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          element: <AuthRoutesLayout />,
          children: [
            {
              path: "auth",
              element: <AuthPage />,
              errorElement: <AuthErrorBoundary />,
              loader: authLoader,
            },
            {
              path: "forgot-password",
              element: <ForgotPasswordPage />,
            },
            {
              path: "reset-password",
              element: <ResetPasswordPage />,
            },
            {
              path: "verify-email",
              element: <VerifyEmailPage />,
            },
          ],
        },
        {
          element: <ProtectedRoutesLayout />,
          children: [
            {
              path: "my-tasks",
              children: [
                {
                  index: true,
                  element: <MyTasksPage />,
                  loader: myTasksLoader(queryClient),
                },
                {
                  path: ":date",
                  element: <TasksPerDayPage />,
                  loader: tasksPerDayLoader(queryClient),
                  errorElement: <TaskPerDayErrorBoundary />,
                },
              ],
            },

            {
              path: "create-tasks",
              element: <CreateTasksPage />,
            },
            {
              path: "profile",
              element: <ProfilePage />,
            },
            {
              path: "stats",
              element: <StatsPage />,
              loader: statsLoader(queryClient),
            },
            {
              element: <AdminRoutesLayout />,
              children: [
                {
                  path: "admin",
                  element: <AdminPage />,
                  loader: adminLoader(queryClient),
                  errorElement: <AdminErrorBoundary />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors={true} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
