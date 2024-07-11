import CardWrapper from "@/components/auth/card-wrapper";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useSearchParams } from "react-router-dom";
import { verifyEmailSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import customAxios from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: token || "",
      code: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof verifyEmailSchema>) => {
      return customAxios.post("/auth/verify", values);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return setError(error?.response?.data.message);
      }
      setError(error.message);
    },
    onSuccess: () => {
      setSuccess("Email verified, please login to continue");
      form.reset();
    },
  });
  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    setError("");
    setSuccess("");
    mutate(data);
  }
  return (
    <CardWrapper
      headerLabel="Enter verification code"
      backButtonLabel="Back to login"
      backButtonLink="/auth"
    >
      <div className="flex w-full items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center space-y-5"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Verify Email
            </Button>
            {form.formState.errors.token && (
              <FormError message={form.formState.errors.token.message} />
            )}
            <FormError message={error} />
            <FormSuccess message={success} />
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};
export default VerificationForm;
