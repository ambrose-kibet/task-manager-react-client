import { profile } from "console";
import z from "zod";

export const RegistrationSchema = z.object({
  email: z.string().email({ message: "please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z
    .string()
    .min(3, { message: " Name must be at least 6 characters" })
    .max(50, { message: "Name is too long" }),
  isShowPassword: z.optional(z.boolean()),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  isShowPassword: z.optional(z.boolean()),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
  code: z
    .string()
    .min(6, {
      message: "Code must be at least 6 characters",
    })
    .max(6, {
      message: "Code is too long",
    }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "please provide a valid email" }),
});

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Token is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    isShowPassword: z.optional(z.boolean()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  name: z
    .string()
    .min(6, { message: "Name must be at least 6 characters" })
    .max(50, { message: "Name is too long" }),
  email: z.string().email({ message: "please provide a valid email" }),
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, { message: "password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    isShowPassword: z.optional(z.boolean()),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
