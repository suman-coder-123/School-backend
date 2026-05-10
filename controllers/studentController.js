import Student from "../models/Student.js";

// ================= CREATE =================

// ADMIN CREATES BASIC STUDENT

export const addStudent = async (req, res) => {
  try {

    const student = await Student.create(req.body);

    res.status(201).json(student);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= READ ================= 

export const getStudents = async (req, res) => {

  const students = await Student.find()
    .sort({ createdAt: -1 });

  res.json(students);
};

// ================= UPDATE =================

// ADMIN UPDATE

export const updateStudent = async (req, res) => {

  const updated =
    await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updated);
};

// ================= DELETE =================

export const deleteStudent = async (req, res) => {

  await Student.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted",
  });
};

// ================= STUDENT PROFILE =================

// STUDENT UPDATES OWN PROFILE

export const updateMyProfile = async (
  req,
  res
) => {
  try {

    const student =
      await Student.findOne({
        userId: req.user.id,
      });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // UPDATE OWN DATA
    Object.assign(student, req.body);

    await student.save();

    res.json({
      message: "Profile updated successfully",
      student,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET OWN PROFILE =================

export const getMyProfile = async (
  req,
  res
) => {
  try {

    const student =
      await Student.findOne({
        userId: req.user.id,
      });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};