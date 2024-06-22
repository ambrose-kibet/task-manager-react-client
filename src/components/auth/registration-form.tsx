import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegistrationSchema } from "@/schemas";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/lib/axios-config";
import { AxiosError } from "axios";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof RegistrationSchema>) => {
      return customAxios.post("/auth/register", values);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return setError(error?.response?.data.message || error.message);
      }
      setError(error.message);
    },
    onSuccess: () => {
      setSuccess(
        "Registration successful please check your email to verify your account",
      );
    },
  });
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      isShowPassword: false,
    },
  });
  function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setError("");
    setSuccess("");
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="jane doe" {...field} type="text" />
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
                <Input placeholder="janedoe@mail.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
        <FormError message={error} />
        <FormSuccess message={success} />{" "}
        <Button type="submit" className="w-full" disabled={isPending}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
export default RegistrationForm;
