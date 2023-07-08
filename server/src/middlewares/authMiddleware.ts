import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, no token");
  } else {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY!);
      //@ts-ignore
      req.id = payload.id;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized, invalid token");
    }
  }
};
