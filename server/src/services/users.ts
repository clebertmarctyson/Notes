import { Prisma } from '@prisma/client';
import { prisma } from "../models";
import { User } from '../schemas/users';

export const createUser = async (user: User) => {
    return await prisma.user.create({ data: user });
};

export const getUsers = async () => {
    return await prisma.user.findMany();
};

export const getUser = async (id: number) => {
    return await prisma.user.findFirst({ where: { id } });
};

export const userExists = async (user: User) => {
    return await prisma.user.findFirst({ where: { OR: [{ username: user.username }, { email: user.email }] } });
};

export const updateUser = async (user: User) => {
    return await prisma.user.update({ data: user, where: { id: user.id as number }, });
};

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({ where: { id } });
};
