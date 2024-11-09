import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Note from "../models/Note.model.js";
import Ticket from "../models/Ticket.model.js";

// GET notes
// @route  api/tickets/:ticketId/notes
// access  private
const getNotes = asyncHandler(async (req, res) => {
  // get user using user id in  JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found, So we can't find your note");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// create notes
// @route  api/tickets/:id/notes/
// access  private
const addNote = asyncHandler(async (req, res) => {
  // get user using user id in  JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found, So we can't find your note");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
  });

  res.status(200).json(note);
});

export { getNotes, addNote };
