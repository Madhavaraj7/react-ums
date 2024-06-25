import User from "../models/usermodel.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Corrected variable name
  const newUser = new User({ username, email, password: hashedPassword }); // Assign to password field
  try {
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};
