import express from "express";

const TicketRouter = express.Router();

import {
  createTicket,
  getTickets,
  getTicket,
} from "../controllers/TicketController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

TicketRouter.get("/", protectRoute, getTickets);
TicketRouter.route("/:id").get(protectRoute, getTicket);
TicketRouter.post("/create", protectRoute, createTicket);

export default TicketRouter;
