import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userSchema } from "../schemas/users";
import { createUser, userExists } from "../services/users";

export const postNewUser = asyncHandler(async (req: Request, res: Response) => {

    console.log(req.body);

    const userData = userSchema.parse(req.body);

    if (await userExists(userData)) {
        res.status(409);
        throw new Error("User already exists");
    }

    const createdUser = await createUser(userData);

    res.status(201).json(createdUser);
});