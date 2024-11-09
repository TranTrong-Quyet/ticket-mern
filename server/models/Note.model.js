import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema);
