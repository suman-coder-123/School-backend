import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Attendance from "../models/Attendance.js";

// 📊 DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();

    const today = new Date().toISOString().split("T")[0];

    const totalToday = await Attendance.countDocuments({
      date: today,
    });

    const presentToday = await Attendance.countDocuments({
      date: today,
      status: "Present",
    });

    const attendancePercent =
      totalToday === 0
        ? 0
        : Math.round((presentToday / totalToday) * 100);

    res.json({
      students,
      teachers,
      attendancePercent,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};


export const getAttendanceChart = async (req, res) => {
  try {
    const days = 7;
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formatted = date.toISOString().split("T")[0];

      const total = await Attendance.countDocuments({
        date: formatted,
      });

      const present = await Attendance.countDocuments({
        date: formatted,
        status: "Present",
      });

      const percent =
        total === 0 ? 0 : Math.round((present / total) * 100);

      result.push({
        day: formatted.slice(5), // MM-DD
        value: percent,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};