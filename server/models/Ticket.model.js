import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["Iphone", "Macbook", "Mac Mini", "iMac", "Ipad"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "close", "opened"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ticket", TicketSchema);
