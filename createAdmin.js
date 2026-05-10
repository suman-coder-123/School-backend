import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

mongoose.connect("mongodb+srv://Suman:SumanProject@cluster0.ojmad2k.mongodb.net/schoolDB");

const createAdmin = async () => {
  try {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin Created");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createAdmin();