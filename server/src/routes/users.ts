import { protectRoutes } from "./../middlewares/authMiddleware";
import { Router } from "express";
import {
  deleteUser,
  getUser,
  logOutUser,
  loginUser,
  signUpUser,
  updateUser,
} from "../controllers/users";

const noteRouter = Router();

noteRouter.post("/signup", signUpUser);
noteRouter.post("/login", loginUser);
noteRouter.post("/logout", logOutUser);
noteRouter.get("/profile", protectRoutes, getUser);
noteRouter.put("/update", protectRoutes, updateUser);
noteRouter.delete("/delete", protectRoutes, deleteUser);

export default noteRouter;
