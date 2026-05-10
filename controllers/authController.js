import User from "../models/User.js";
import Teacher from "../models/Teacher.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ================= REGISTER =================

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🚫 BLOCK ADMIN REGISTRATION
    if (role === "admin") {
      return res.status(403).json({
        message: "Admin registration is not allowed",
      });
    }

    // ✅ CHECK EXISTING USER
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

   const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
});

    // ✅ AUTO CREATE TEACHER
    if (role === "teacher") {
      await Teacher.create({
        userId: user._id,
        subject: "General",
      });
    }

    res.status(201).json({
      message: "Registered successfully",
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= LOGIN =================

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // ✅ FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // ✅ CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // ✅ GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "secret",
      {
        expiresIn: "7d",
      }
    );

    // ✅ RESPONSE
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
      name: user.name,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


export const changePassword = async (req, res) => {
  try {

    const userId = req.user.id;

    const { oldPassword, newPassword } = req.body;

    // ✅ FIND USER
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ✅ CHECK OLD PASSWORD
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    // ✅ HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password changed successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};



export const forgotPassword = async (req, res) => {
  try {

    const { email, newPassword } = req.body;

    // ✅ FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ✅ HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password reset successful",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};