import TasksByDay from "@/components/tasks/tasks-by-day";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import customAxios from "@/lib/axios-config";
import { QueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
  LoaderFunctionArgs,
  LoaderFunction,
  useParams,
  Link,
} from "react-router-dom";

export const getTasksPerDayQuery = (
  props: {
    sort: "asc" | "desc";
    title?: string;
    page: number;
  },
  date: string,
) => {
  return {
    queryKey: ["tasks", "byDay", date, props],
    queryFn: async () =>
      customAxios
        .get(
          `/tasks/per-day?page=${props.page}&sort=${props.sort}&date=${date}${props.title ? `&title=${props.title}` : ""}`,
        )
        .then((res) => res.data),
  };
};

export const loader = (queryClient: QueryClient) =>
  (({ params }: LoaderFunctionArgs) => {
    const date = params.date;
    const today = moment(date).format("YYYY-MM-DD");
    const query = queryClient.ensureQueryData(
      getTasksPerDayQuery({ sort: "asc", page: 1 }, today),
    );
    return { query };
  }) as LoaderFunction;
const TasksPerDayPage: React.FC = () => {
  const params = useParams();
  const date = moment(params.date).format("YYYY-MM-DD");
  return (
    <div className="min-w-screen relative flex min-h-screen flex-col items-center justify-start px-2">
      <Breadcrumb className="mr-auto py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/my-tasks">Back To My Tasks</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TasksByDay date={date} />
    </div>
  );
};

export default TasksPerDayPage;
