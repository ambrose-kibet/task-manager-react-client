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
} from "@/routes";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  AdminErrorBoundary,
  AuthErrorBoundary,
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
              element: <MyTasksPage />,
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
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
