import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "You must be at least 18 years old" }),
    passwordConfirmation: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "You must be at least 18 years old" }),
  })
  .refine(
    ({ password, passwordConfirmation }) =>
      password === passwordConfirmation ? true : false,
    {
      path: ["passwordConfirmation"],
      message: "Passwords do not match",
    }
  );

export type RegisterInput = z.infer<typeof registerSchema>;
