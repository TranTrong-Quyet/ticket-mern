import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import UserRouter from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 9000;

// connect to db
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
app.get("/", (req, res) => {
  res.status(201).json({ msg: "welcome" });
});

// auth routes
app.use("/api/users", UserRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
