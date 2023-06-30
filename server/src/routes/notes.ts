import { Router } from "express";
import { postNewNote } from "../controllers/notes";

const noteRouter = Router();

noteRouter.route("/").post(postNewNote);

export default noteRouter;