import { updateOneUser } from "./../services/users";
import { unHashPassword } from "./../utils/index";
import { generateToken } from "../utils/index";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userSchema, User, loginUserSchema } from "../schemas/users";
import {
  createUser,
  getOneUser,
  getUserByEmailOrUsername,
  userExists,
  deleteOneUser,
} from "../services/users";

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = userSchema.parse(req.body);

  if (await userExists(userData)) {
    res.status(409);
    throw new Error("User already exists");
  }

  const createdUser = await createUser(userData);

  const token = generateToken(createdUser.id);

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json(createdUser);
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const loginUserData = loginUserSchema.parse(req.body);

  const user = await getUserByEmailOrUsername(
    loginUserData.username!,
    loginUserData.email!
  );

  if (!user || (await unHashPassword(loginUserData.password!, user.password))) {
    res.status(400);
    throw new Error("Incorrect user credentials.");
  }

  const token = generateToken(user.id);

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json(user);
});

export const logOutUser = asyncHandler(async (req: Request, res: Response) => {
  res
    .cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json();
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.id;

  const user = await getOneUser(id);

  if (!user) {
    res.status(404);
    throw new Error(`User id: ${id} not found`);
  }

  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userData: Partial<User> = req.body;

  const updatedUser = await updateOneUser({
    ...userData,
    //@ts-ignore
    id: req.id,
  });

  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const deletedUser = await deleteOneUser(
    // @ts-ignore
    req.id
  );
  res.status(200).json(deletedUser);
});
