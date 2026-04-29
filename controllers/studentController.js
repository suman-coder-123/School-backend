import Student from "../models/Student.js";

// CREATE
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// READ
export const getStudents = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};

// UPDATE
export const updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE
export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};