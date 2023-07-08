import { hashPassword } from "./../utils/index";
import { Prisma } from "@prisma/client";
import { prisma } from "../models";
import { User } from "../schemas/users";

export const createUser = async (user: User) => {
  const { confirmPassword, password, ...userWithoutPassword } = user;
  return await prisma.user.create({
    data: { ...userWithoutPassword, password: await hashPassword(password) },
  });
};

export const getOneUser = async (id: number) => {
  return await prisma.user.findFirst({ where: { id } });
};

export const getUserByEmailOrUsername = async (
  username: string,
  email: string
) => {
  return await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
};

export const userExists = async (user: User) => {
  return await prisma.user.findFirst({
    where: { OR: [{ username: user.username }, { email: user.email }] },
  });
};

export const updateOneUser = async (user: Partial<User>) => {
  const { confirmPassword, password, ...userWithoutPassword } = user;
  const searchedUser = await getOneUser(user.id!);

  return await prisma.user.update({
    data: {
      ...userWithoutPassword,
      username: userWithoutPassword.username
        ? userWithoutPassword.username
        : searchedUser?.username,
      name: userWithoutPassword.name
        ? userWithoutPassword.name
        : searchedUser?.name,
      email: userWithoutPassword.email
        ? userWithoutPassword.email
        : searchedUser?.email,
      password: password
        ? await hashPassword(password!)
        : searchedUser?.password,
    },
    where: { id: userWithoutPassword.id },
  });
};

export const deleteOneUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
