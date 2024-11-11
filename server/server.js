import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import UserRouter from "./routes/userRoutes.js";
import TicketRouter from "./routes/ticketRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 9000;

// connect to db
connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://ticket-mern-kgid1e7xx-phils-projects-68dc0131.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Include Authorization
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
app.get("/", (req, res) => {
  res.status(201).json({ msg: "welcome" });
});

// auth routes
app.use("/api/users", UserRouter);
app.use("/api/tickets", TicketRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
