import { log } from 'console';
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    const error = new Error(`Not found: ${req.originalUrl}`);
    next(error);
};

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    log(error);

    res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
        message: error instanceof ZodError ? error.issues.at(0)?.message : error.message,
        stack: process.env.NODE_ENV === "production" ? "💩" : error.stack
    });
    next();
};