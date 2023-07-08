import z from "zod";

export const userSchema = z
  .object({
    id: z.number().positive().optional(),
    username: z
      .string()
      .min(1)
      .max(15)
      .regex(/^[a-z]+$/),
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    createdAt: z.date().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(15)
      .regex(/^[a-z]+$/)
      .optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(20),
  })
  .refine((data) => data.username || data.email, {
    message: "Please provide username or email",
    path: ["username", "email"],
  });

export type User = z.infer<typeof userSchema>;
