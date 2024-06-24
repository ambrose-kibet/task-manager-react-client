import CreateTaskForm from "@/components/tasks/create-task";
import TasksByDay from "@/components/tasks/tasks-by-day";
import moment from "moment";

const CreateTasksPage: React.FC = () => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-y-4 p-2">
      <CreateTaskForm />
      <TasksByDay date={moment(new Date()).format("YYYY-MM-DD")} />
    </div>
  );
};
export default CreateTasksPage;
