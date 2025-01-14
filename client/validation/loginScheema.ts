import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "You must be at least 18 years old" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
