import express from "express";
const UserRouter = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/UserController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

UserRouter.post("/", registerUser);

UserRouter.post("/login", loginUser);
UserRouter.get("/me", protectRoute, getMe);

export default UserRouter;
