
import z from "zod";

export const noteSchema = z.object({
    id: z.number().positive().optional(),
    title: z.string().min(1).max(15),
    content: z.string().min(1),
    createdAt: z.date().optional(),
    userId: z.number().positive()
});

export type Note = z.infer<typeof noteSchema>;