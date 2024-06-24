import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Cross2Icon } from "@radix-ui/react-icons";

const searchSchema = z.object({
  search: z.string().trim().max(50, "max of 50 characters"),
});

const TitleSearch: React.FC<{
  value?: string;
  handleTitleChange: (val: string) => void;
}> = (props) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    props.handleTitleChange(values.search);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full py-2">
        <div className="group flex w-full flex-row rounded-lg">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    type="text"
                    placeholder="Search task by title"
                    {...field}
                    className="h-12 rounded-r-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mx-0 h-12 rounded-l-none outline-primary"
            type="submit"
          >
            <FaSearch size={20} />
          </Button>
          {props.value && (
            <Button
              variant={"outline"}
              className="mx-0 ml-2 h-12 rounded-l-none outline-primary"
              type="button"
              onClick={() => {
                props.handleTitleChange("");
                form.setValue("search", "");
              }}
            >
              clear{" "}
              <span>
                <Cross2Icon fontSize={20} />
              </span>
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
export default TitleSearch;
