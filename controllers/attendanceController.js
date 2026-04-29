import Attendance from "../models/Attendance.js";
import Teacher from "../models/Teacher.js";


// ✅ MARK ATTENDANCE (SECURE + NO DUPLICATE)
export const markAttendance = async (req, res) => {
  try {
    const { teacherId, status } = req.body;

    if (!teacherId || !status) {
      return res.status(400).json("Missing fields");
    }

    const today = new Date().toISOString().split("T")[0];

    // Check if already marked
    let record = await Attendance.findOne({
      teacherId,
      date: today,
    });

    if (record) {
      record.status = status;
      await record.save();
    } else {
      record = await Attendance.create({
        teacherId,
        date: today,
        status,
      });
    }

    res.json(record);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json(err.message);
  }
};



// ✅ GET ALL ATTENDANCE (ADMIN + POPULATE USER NAME)
export const getAllAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    let filter = {};
    if (date) filter.date = date;

    const data = await Attendance.find(filter)
      .populate({
        path: "teacherId",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};



// ✅ GET SINGLE TEACHER ATTENDANCE
export const getAttendanceByTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Attendance.find({ teacherId: id })
      .sort({ date: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};



export const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);

    const data = await Attendance.find({ teacherId: id });

    const presentDays = data.filter(
      (d) => d.status === "Present"
    ).length;

    const salary = presentDays * teacher.salaryPerDay;

    res.json({
      presentDays,
      salary,
      salaryPerDay: teacher.salaryPerDay,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};


// ✅ MONTHLY SALARY (FILTERED)
export const getMonthlySalary = async (req, res) => {
  try {
    const { teacherId, month } = req.query;

    if (!teacherId || !month) {
      return res.status(400).json("Missing teacherId or month");
    }

    const data = await Attendance.find({
      teacherId,
      date: { $regex: month }, // e.g. 2026-04
    });

    const presentDays = data.filter(
      (d) => d.status === "Present"
    ).length;

    const salaryPerDay = 500;

    const salary = presentDays * salaryPerDay;

    res.json({
      presentDays,
      salary,
      salaryPerDay,
      month,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};



export const getMonthlyReport = async (req, res) => {
  try {
    const { teacherId, month } = req.query;

    const teacher = await Teacher.findById(teacherId).populate(
      "userId",
      "name"
    );

    const data = await Attendance.find({
      teacherId,
      date: { $regex: month },
    });

    const presentDays = data.filter(
      (d) => d.status === "Present"
    ).length;

    const absentDays = data.filter(
      (d) => d.status === "Absent"
    ).length;

    const salary = presentDays * teacher.salaryPerDay;

    res.json({
      name: teacher.userId.name,
      presentDays,
      absentDays,
      salary,
      month,
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};