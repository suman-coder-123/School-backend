import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getAttendanceByTeacher,
  getSalary,
  getMonthlySalary,
  getMonthlyReport,
} from "../controllers/attendanceController.js";

const router = express.Router();

// MARK
router.post("/mark", markAttendance);

// ADMIN VIEW
router.get("/", getAllAttendance);

// TEACHER VIEW
router.get("/teacher/:id", getAttendanceByTeacher);

// SALARY
router.get("/salary/:id", getSalary);

// MONTHLY SALARY
router.get("/monthly-salary", getMonthlySalary);

router.get("/monthly-report", getMonthlyReport);
export default router;