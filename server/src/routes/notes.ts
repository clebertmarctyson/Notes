import { Router } from "express";
import {
  postNewNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/notes";

const noteRouter = Router();

noteRouter.route("/").post(postNewNote).get(getNotes);
noteRouter.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

export default noteRouter;
