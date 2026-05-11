import Student from "../models/Student.js";

// ✅ GET ALL
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ ADD STUDENT
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.json(student);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ DELETE
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};