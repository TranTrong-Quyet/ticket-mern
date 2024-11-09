import express from "express";

const NoteRouter = express.Router({ mergeParams: true });

import { addNote, getNotes } from "../controllers/NoteController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

NoteRouter.route("/").get(protectRoute, getNotes).post(protectRoute, addNote);

export default NoteRouter;
