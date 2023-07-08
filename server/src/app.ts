import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import noteRouter from "./routes/notes";
import userRouter from "./routes/users";

import { notFoundHandler, errorHandler } from "./middlewares/errorMiddleware";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
