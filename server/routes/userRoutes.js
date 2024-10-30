import express from "express";
const UserRouter = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/UserController.js";

UserRouter.post("/", registerUser);

UserRouter.post("/login", loginUser);
UserRouter.get("/me", getMe);

export default UserRouter;
