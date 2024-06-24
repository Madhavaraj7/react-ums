import User from "../models/usermodel.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashePassword = bcrypt.hashSync(password,10)
  const newUser = new User({ username, email, hashePassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error)
  }
};
