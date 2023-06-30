import z from "zod";

export const userSchema = z.object({
    id: z.number().positive().optional(),
    username: z.string().min(1).max(15).regex(/^[a-z]+$/),
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    createdAt: z.date().optional()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type User = z.infer<typeof userSchema>;