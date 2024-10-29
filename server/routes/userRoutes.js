import express from "express";
const UserRouter = express.Router();
import { registerUser, loginUser } from "../controllers/UserController.js";

UserRouter.post("/", registerUser);

UserRouter.post("/login", loginUser);

export default UserRouter;
