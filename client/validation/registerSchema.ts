import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    name: z.string({ required_error: "Name is required" }),
    phone: z.string({ required_error: "Phone number is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "You must be at least 18 years old" }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "You must be at least 18 years old" }),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password === confirmPassword ? true : false,
    {
      path: ["passwordConfirmation"],
      message: "Passwords do not match",
    }
  );

export type RegisterInput = z.infer<typeof registerSchema>;
