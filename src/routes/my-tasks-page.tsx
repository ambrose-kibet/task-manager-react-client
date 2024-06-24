import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import customAxios from "@/lib/axios-config";
import { keepPreviousData, QueryClient, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { Link, LoaderFunction } from "react-router-dom";

const getMyTasksQuery = (page: number) => {
  return {
    queryKey: ["my-tasks", page],
    queryFn: async () =>
      customAxios.get(`/tasks?page=${page}`).then((res) => res.data),
  };
};

export const loader = (queryClient: QueryClient) =>
  (() => {
    const query = queryClient.ensureQueryData(getMyTasksQuery(1));
    return { query };
  }) as LoaderFunction;

const MyTasksPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    ...getMyTasksQuery(page),
    placeholderData: keepPreviousData,
  });
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-y-4 p-2">
      <h1 className="text-3xl font-bold">
        My <span className="text-primary">Tasks</span>{" "}
      </h1>
      <div className="grid w-full grid-cols-1 pb-1">
        <div className="grid w-full max-w-7xl grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {((data?.tasks ?? []).length &&
            (data?.tasks || []).map(
              (task: {
                date: string;
                tasks: { id: number; title: string }[];
              }) => (
                <Card key={task.date} className="w-full">
                  <CardHeader className="relative w-full py-4">
                    <h3 className="text-bold text-center text-xl capitalize">
                      {moment(task.date).calendar({
                        sameDay: "[Today]",
                        nextDay: "[Tomorrow]",
                        nextWeek: "dddd",
                        lastDay: "[Yesterday]",
                        lastWeek: "[Last] dddd",
                        sameElse: "DD/MM/YYYY",
                      })}
                    </h3>
                  </CardHeader>
                  <CardContent className="h-24 gap-y-6 pb-4 font-mono">
                    {task.tasks.map((t) => (
                      <p key={t.id} className="text-normal">
                        {t.title}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={"default"}
                      className="w-full text-white"
                      asChild
                    >
                      <Link to={`/my-tasks/${task.date}`}>View All Tasks</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ),
            )) || <p className="text-center text-lg">No tasks found</p>}
        </div>
        {(Math.ceil((data?.count || 1) / 10) > 1 && (
          <Pagination
            currentPage={page}
            handlePageChange={handlePageChange}
            pageCount={Math.ceil((data?.count || 1) / 10)}
          />
        )) ||
          null}
      </div>
    </div>
  );
};
export default MyTasksPage;
