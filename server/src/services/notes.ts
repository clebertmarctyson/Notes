import { Note } from '../schemas/notes';
import { prisma } from "../models";

export const createNote = async (note: Note) => {
    return await prisma.note.create({ data: note });
};

export const getNotes = async () => {
    return await prisma.note.findMany();
};

export const getNote = async (id: number) => {
    return await prisma.note.findFirst({ where: { id } });
};

export const noteExists = async (note: Note) => {
    return await prisma.note.findFirst({ where: { OR: [{ title: note.title }, { content: note.content }] } });
};

export const updateNote = async (note: Note) => {
    return await prisma.note.update({ data: note, where: { id: note.id as number }, });
};

export const deleteNote = async (id: number) => {
    return await prisma.note.delete({ where: { id } });
};
