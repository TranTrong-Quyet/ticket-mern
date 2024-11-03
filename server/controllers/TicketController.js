import TicketModel from "../models/Ticket.model.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Ticket from "../models/Ticket.model.js";

// GET USER TICKETs
// @route  api/tickets
// access  private
const getTickets = asyncHandler(async (req, res) => {
  // get user using user id in  JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found, So we can't find your ticket");
  }

  const ticket = await Ticket.find({ user: req.user.id });

  res.status(200).json(ticket);
});

// GET USER TICKET
// @route  api/tickets/:id
// access  private
const getTicket = asyncHandler(async (req, res) => {
  // get user using user id in  JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found, So we can't find your ticket");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  res.status(200).json(ticket);
});

// CREATE NEW TICKET
// @route  api/tickets/create
// access  private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add product and description", Error);
  }

  // get user using user id in  JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found, So we can't create your ticket");
  }

  const ticket = await Ticket.create({
    description,
    product,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

export { createTicket, getTickets, getTicket };
