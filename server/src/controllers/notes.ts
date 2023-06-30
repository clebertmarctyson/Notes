import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { createNote, noteExists } from '../services/notes';
import { noteSchema } from '../schemas/notes';
import { ZodError } from 'zod';

export const postNewNote = asyncHandler(async (req: Request, res: Response) => {
    try {
        const noteData = noteSchema.parse(req.body);

        if (await noteExists(noteData)) {
            res.status(409);
            throw new Error("Note already exists");
        }

        const createdNote = await createNote(noteData);

        res.status(201).json(createdNote);

    } catch (error: any) {
        res.json({ message: error instanceof ZodError ? error.issues.at(0)?.message : error.message });
    }
});