
import User from "../models/usermodel.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    console.log('Valid User:', validUser); 

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials'));
    }

    // Check if the user is verified
    if (validUser.is_verified !== 1) {
      return next(errorHandler(403, 'User is not verified'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now

    res.cookie('access_token', token, {
      httpOnly: true,
      expires: expiryDate
    }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
}



const getAllUsersController = async (req, res) => {
  console.log("hello");
  try {
    const users = await User.find({ is_verified: { $ne: 1 } }).select("username email profilePicture").exec();

    console.log(users);

    res.status(200).json({
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllUsersController };


