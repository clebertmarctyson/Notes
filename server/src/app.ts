import { errorHandler } from './middlewares/index';
import express, { Express } from "express";
import cors from "cors";

import noteRouter from "./routes/notes";
import userRouter from "./routes/users";
import { notFoundHandler } from "./middlewares";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/notes", noteRouter);
app.use("/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;