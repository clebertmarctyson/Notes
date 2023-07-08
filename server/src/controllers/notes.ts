import { modifyNote, removeNote } from "../services/notes";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createNote,
  getAllNotes,
  noteExists,
  getOneNote,
} from "../services/notes";
import { noteSchema } from "../schemas/notes";

export const postNewNote = asyncHandler(async (req: Request, res: Response) => {
  const noteData = noteSchema.parse(req.body);

  if (await noteExists(noteData)) {
    res.status(409);
    throw new Error("Note already exists");
  }

  const createdNote = await createNote(noteData);

  res.status(201).json(createdNote);
});

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const notes = await getAllNotes();
  res.status(200).json(notes);
});

export const getNote = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const note = await getOneNote(id);

  if (!note) {
    res.status(404);
    throw new Error(`Note id: ${id} not found`);
  }

  res.status(200).json(note);
});

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  const note = await getOneNote(id);

  if (!note) {
    res.status(404);
    throw new Error(`Note id: ${id} not found`);
  }

  const updatedNote = await modifyNote({
    ...note,
    title: title ? title : note.title,
    content: content ? content : note.content,
  });

  res.status(200).json(updatedNote);
});

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const note = await getOneNote(id);

  if (!note) {
    res.status(404);
    throw new Error(`Note id: ${id} not found`);
  }

  const deletedNote = await removeNote(id);

  res.status(200).json(deletedNote);
});
