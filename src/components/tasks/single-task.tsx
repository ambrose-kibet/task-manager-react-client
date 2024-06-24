import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import EditTaskForm from "./edit-task";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";

const SingleTask: React.FC<{
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  date: string;
}> = ({ id, title, description, isCompleted, date }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      customAxios.delete(`/tasks/${id}`).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "byDay", date],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["productivity-stats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("An error occurred");
    },
  });
  const deleteTask = () => {
    mutate();
  };
  return (
    <Card className="w-full">
      <CardHeader className="relative w-full">
        <h3 className="text-bold text-center text-lg capitalize">{title}</h3>
      </CardHeader>
      <CardContent className="gap-y-6 font-mono">
        <p className="text-normal">{description}</p>
        <div className="flex w-full items-center justify-start gap-x-4 shadow-sm">
          <p className="text-sm font-medium"> Task Completed</p>
          <Badge variant={isCompleted ? "success" : "destructive"}>
            {isCompleted ? "Yes" : "No"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-evenly">
          <EditTaskForm
            id={id}
            title={title}
            description={description}
            isCompleted={isCompleted}
            date={date}
          />
          <Button
            variant={"ghost"}
            className="text-primary"
            onClick={deleteTask}
          >
            <FaTrash size={20} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default SingleTask;
