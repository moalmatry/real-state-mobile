import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    resetCode: z
      .string({ required_error: "Code is required" })
      .min(6, "Password must be 6 characters")
      .max(6, "Password must be 6 characters"),
    password: z.string({ required_error: "Password is required" }),
    confirmPassword: z.string({ required_error: "Password is required" }),
    // passwordConfirmation: z.string().optional(),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password === confirmPassword ? true : false,
    {
      path: ["password"],
      message: "Passwords do not match",
    }
  );

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
