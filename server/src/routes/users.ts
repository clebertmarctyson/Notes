import { Router } from "express";
import { postNewUser } from '../controllers/users';

const noteRouter = Router();

noteRouter.route("/").post(postNewUser);

export default noteRouter;