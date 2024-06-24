import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "../ui/switch";
import { FaPenToSquare } from "react-icons/fa6";
import customAxios from "@/lib/axios-config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";
const EditTaskForm: React.FC<{
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  date: string;
}> = ({ description, id, isCompleted, title, date }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof updateTaskSchema>) =>
      customAxios.patch(`/tasks/${id}`, data).then((res) => res.data),
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
      toast.success("Task updated successfully");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("An error occurred");
    },
  });

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title,
      description,
      id,
      isCompleted,
    },
  });
  const onSubmit = (data: z.infer<typeof updateTaskSchema>) => {
    mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-fit text-primary">
          <FaPenToSquare size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-screen-sm overflow-y-auto">
        <DialogTitle className="text-center text-xl font-semibold">
          Edit Task
        </DialogTitle>
        <DialogDescription className="text-center text-sm text-gray-500">
          Update the task details
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex h-full w-screen max-w-[450px] flex-col items-center justify-center gap-y-2 rounded-xl p-2 shadow"
          >
            <div className="flex w-full flex-col gap-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add  a title to the task"
                        {...field}
                        className="tracking-wides font-mono"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a detailed description to the task"
                        className="resize-y font-mono tracking-widest"
                        cols={60}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isCompleted"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center justify-between rounded-sm">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mx-auto mt-2 w-fit rounded-full">
                Update Task
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditTaskForm;
