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
import { changePasswordSchema } from "@/schemas";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/lib/axios-config";
import { AxiosError } from "axios";
import { Checkbox } from "../ui/checkbox";

const UpdateUserPasswordForm: React.FC = () => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
      isShowPassword: false,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof changePasswordSchema>) =>
      customAxios.patch(`/users/update-password`, data),
    onSuccess: () => {
      setSuccess("Password updated successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return setError(error.response?.data.message || "An error occurred");
      }
      setError(error.message || "An error occurred");
    },
  });

  const handleSubmit = (data: z.infer<typeof changePasswordSchema>) => {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type={
                    form.watch("isShowPassword") === true ? "text" : "password"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type={
                    form.watch("isShowPassword") === true ? "text" : "password"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type={
                    form.watch("isShowPassword") === true ? "text" : "password"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isShowPassword"
          render={({ field }) => (
            <FormItem className="col-span-full flex flex-row items-center space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Password?</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Update password
        </Button>
        <FormSuccess message={success} />
        <FormError message={error} />
      </form>
    </Form>
  );
};
export default UpdateUserPasswordForm;
