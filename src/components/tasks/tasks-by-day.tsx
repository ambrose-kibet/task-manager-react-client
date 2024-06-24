import moment from "moment";
import { useState } from "react";
import TitleSearch from "./search-task-by-title";
import SortTasksComponent from "./sort-tasks";
import Pagination from "../pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTasksPerDayQuery } from "@/routes/tasks-per-day-page";
import SingleTask from "./single-task";
const TasksByDay: React.FC<{ date: string }> = ({ date }) => {
  const modifiedDate = moment(date).calendar({
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "DD/MM/YYYY",
  });
  const [filters, setFilters] = useState<{
    sort: "asc" | "desc";
    title?: string;
    page: number;
  }>({
    sort: "asc",
    title: undefined,
    page: 1,
  });
  const { data } = useQuery({
    ...getTasksPerDayQuery(filters, date),
    placeholderData: keepPreviousData,
  });
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };
  const handleTitleChange = (val: string) => {
    if (val === "") {
      setFilters((prev) => ({ ...prev, title: undefined }));
      return;
    }
    setFilters((prev) => ({ ...prev, title: val }));
  };
  const handleSortChange = (sort: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 px-2">
      <h3 className="text-center text-xl font-semibold">
        {modifiedDate}'s <span className="text-primary">Tasks</span>
      </h3>

      <div className="grid w-full grid-cols-1 items-center gap-x-4 sm:grid-cols-2 md:flex md:justify-between md:gap-x-8">
        <TitleSearch
          handleTitleChange={handleTitleChange}
          value={filters.title}
        />
        <SortTasksComponent
          handleChange={handleSortChange}
          value={filters.sort}
        />
      </div>
      <div className="grid w-full grid-cols-1 pb-1">
        <div className="mb-4 grid w-full max-w-7xl grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {((data?.tasks ?? []).length &&
            (data?.tasks || []).map(
              (task: {
                id: number;
                title: string;
                description: string;
                isCompleted: boolean;
              }) => (
                <SingleTask
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  isCompleted={task.isCompleted}
                  date={date}
                />
              ),
            )) || <p className="text-center text-lg">No tasks found</p>}
        </div>
        {(Math.ceil((data?.count || 1) / 10) > 1 && (
          <Pagination
            currentPage={filters.page}
            handlePageChange={handlePageChange}
            pageCount={Math.ceil((data?.count || 1) / 10)}
          />
        )) ||
          null}
      </div>
    </div>
  );
};
export default TasksByDay;
