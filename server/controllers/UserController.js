import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";

const { genSalt } = bcrypt;

//  Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if user exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// LOGIN UESR
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
});

export { registerUser, loginUser };
