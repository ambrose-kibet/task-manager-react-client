import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { profileSchema } from "@/schemas";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useMutation } from "@tanstack/react-query";
import { useProtectedUserContext } from "@/routes/protected-routes-layout";
import customAxios from "@/lib/axios-config";
import { AxiosError } from "axios";

const UpdateUserForm: React.FC = () => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user, setUser } = useProtectedUserContext();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof profileSchema>) =>
      customAxios.patch(`/users/${user?.id!}`, data),
    onSuccess: (data) => {
      setUser(data.data);
      setSuccess("Profile updated successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return setError(error.response?.data.message || "An error occurred");
      }
      setError(error.message || "An error occurred");
    },
  });

  const handleSubmit = (data: z.infer<typeof profileSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="john doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=" please provide a valid email"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
        <FormSuccess message={success} />
        <FormError message={error} />
      </form>
    </Form>
  );
};
export default UpdateUserForm;
