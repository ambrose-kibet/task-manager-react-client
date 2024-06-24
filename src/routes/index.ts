import AdminPage, { loader as adminLoader } from "./admin-page";
import AdminRoutesLayout from "./admin-routes-layout";
import AuthPage from "./auth-page";
import AuthRoutesLayout from "./auth-routes-layout";
import CreateTasksPage from "./create-tasks-page";
import ErrorPage from "./error-page";
import ForgotPasswordPage from "./forgot-password-page";
import LandingPage from "./landing-page";
import MyTasksPage, { loader as myTasksLoader } from "./my-tasks-page";
import ProfilePage from "./profile-page";
import ProtectedRoutesLayout from "./protected-routes-layout";
import ResetPasswordPage from "./reset-password-page";
import Root from "./root";
import StatsPage, { loader as statsLoader } from "./stats-page";
import TasksPerDayPage, {
  loader as tasksPerDayLoader,
} from "./tasks-per-day-page";
import VerifyEmailPage from "./verify-email-page";

export {
  TasksPerDayPage,
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
  tasksPerDayLoader,
  myTasksLoader,
  statsLoader,
};
