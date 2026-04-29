import User from "../models/User.js";
import jwt from "jsonwebtoken";

import Teacher from "../models/Teacher.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔥 Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json("User already exists");
    }

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // 🔥 AUTO CREATE TEACHER
    if (role === "teacher") {
      await Teacher.create({
        userId: user._id,
        subject: "General",
      });
    }

    res.json({
      message: "Registered successfully",
      user,
    });

  } catch (err) {``
    console.log(err);
    res.status(500).json(err.message);
  }
};
// ✅ LOGIN (DIRECT MATCH)


export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json("User not found");
  }

  if (user.password !== password) {
    return res.status(400).json("Wrong password");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret",
    { expiresIn: "7d" }
  );

  res.json({
    token,
    role: user.role,
    userId: user._id, // 🔥 IMPORTANT
    name: user.name,
  });
};