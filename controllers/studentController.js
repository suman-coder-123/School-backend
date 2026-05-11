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

    let student =
      await Student.findOne({
        userId: req.user.id,
      });

    // CREATE IF NOT EXISTS
    if (!student) {

      student = await Student.create({
        userId: req.user.id,
        ...req.body,
      });

      return res.status(201).json({
        message: "Profile created successfully",
        student,
      });
    }

    // UPDATE EXISTING
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

    // RETURN EMPTY OBJECT
    if (!student) {
      return res.json({});
    }

    res.json(student);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};