import Teacher from "../models/Teacher.js";
import User from "../models/User.js";


// ✅ ADD TEACHER (CREATE USER + LINK TEACHER)
export const addTeacher = async (req, res) => {
  try {
    const { name, email, subject } = req.body;

    if (!name || !email) {
      return res.status(400).json("Name and email required");
    }

    // 🔥 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // 1️⃣ Create user (login account)
    const user = await User.create({
      name,
      email,
      password: "123456", // default password
      role: "teacher",
    });

    // 2️⃣ Create teacher (linked to user)
    const teacher = await Teacher.create({
      userId: user._id,
      subject,
    });

    res.json({
      message: "Teacher created successfully",
      teacher,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};



// ✅ GET ALL TEACHERS (FOR DROPDOWN / ADMIN)
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate(
      "userId",
      "name email"
    );

    res.json(teachers);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


export const getTeacherByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Incoming userId:", userId);

    const teacher = await Teacher.findOne({ userId });

    console.log("Teacher found:", teacher);

    if (!teacher) {
      return res.status(404).json("Teacher not found");
    }

    res.json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
// ✅ UPDATE TEACHER (subject + salary)
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, salaryPerDay } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { subject, salaryPerDay },
      { new: true }
    ).populate("userId", "name email");

    res.json(teacher);
  } catch (err) {
    res.status(500).json(err.message);
  }
};