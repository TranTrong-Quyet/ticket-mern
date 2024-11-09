import express from "express";

const TicketRouter = express.Router();

import {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/TicketController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import NoteRouter from "./noteRoutes.js";

TicketRouter.use("/:ticketId/notes", NoteRouter);

TicketRouter.get("/", protectRoute, getTickets);
TicketRouter.route("/:id")
  .get(protectRoute, getTicket)
  .put(protectRoute, updateTicket);
TicketRouter.route("/:id").delete(protectRoute, deleteTicket);

TicketRouter.post("/create", protectRoute, createTicket);

export default TicketRouter;
