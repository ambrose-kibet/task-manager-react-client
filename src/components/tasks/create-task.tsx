import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/lib/axios-config";
import moment from "moment";
import { AxiosError } from "axios";
import { toast } from "sonner";
const CreateTaskForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof createTaskSchema>) =>
      customAxios.post("/tasks", data).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "byDay", moment().format("YYYY-MM-DD")],
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
      form.reset();
    },
    onError(error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof createTaskSchema>) => {
    mutate(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex h-full w-screen max-w-[450px] flex-col items-center justify-center gap-y-2 rounded-xl border p-6 px-2 shadow"
      >
        <h3 className="text-center text-xl font-semibold">Create Task</h3>
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
          <Button type="submit" className="mx-auto mt-2 w-fit rounded-full">
            Create Task
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default CreateTaskForm;
