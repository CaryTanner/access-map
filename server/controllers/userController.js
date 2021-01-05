import User from "../models/userModel";
import bcrypt from 'bcryptjs'
import { filterObj } from "../utils/utils";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();


const jwtSecret = process.env.JWT_SECRET

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (!users) throw Error("Could not retrieve users");

    res.status(200).json({
      status: "success",
      users: users,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
        .populate("reports");
    if (!user) throw Error("Could not retrieve user");

    res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        reports: user.reports,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//register new user

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //simple validation
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please enter all fields" });

    // look for duplicate emails
    let foundUser = await User.findOne({ email });
    if (foundUser)
      return res.status(400).json({ msg: "Email already registered" });

    //gen salt and hash
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("problem with bcrypt salt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("problem with bcrypt hash");

    //save new user
    const newUser = new User({
      name,
      email,
      password: hash,
      
    });

    const registeredUser = await newUser.save();
    if (!registeredUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: registeredUser._id }, jwtSecret, {
      expiresIn: 14400,
    });
    if (!token) throw Error("Something with getting JWT");

    res.json({
      actionCompleted: "User Registered",
      token,
      user: {
        id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUserPassword = async (req, res) => {
  
    try {
    // Get user from collection
    const user = await User.findById(req.user.id);
    if(!user) throw Error('User not found')
    // Check if posted password is correct

    const match = await bcrypt.compare(req.body.passwordCurrent, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    //  update password
    user.password = req.body.newPassword;
    await user.save();

    // Log user in, send JWT

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: 7200 });
    if (!token) throw Error("Error with getting JWT");

    res.json({
      actionCompeleted: "User password updated",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const filteredBody = filterObj(req.body, "name", "email");

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateUser) throw Error("User could not be updated");

    res.json({
      actionCompleted: "User Updated",

      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const adminUpdateUser = async (req, res) => {
  try {
    const user = await User.findOne(req.body.email);
    if (!user) throw Error("User could not be found");

    user.role = req.body.role;
    await user.save();

    res.json({
      actionCompeleted: "User role updated",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
   await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null
    });


  } catch (err) {


  }
};
