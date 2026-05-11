import express from "express";

import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  updateMyProfile,
  getMyProfile,
} from "../controllers/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ================= STUDENT =================

// GET OWN PROFILE
router.get(
  "/my-profile",
  authMiddleware,
  getMyProfile
);

// UPDATE OWN PROFILE
router.put(
  "/my-profile",
  authMiddleware,
  updateMyProfile
);

// ================= ADMIN =================

// ADD STUDENT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addStudent
);

// GET ALL STUDENTS
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getStudents
);

// UPDATE STUDENT
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateStudent
);

// DELETE STUDENT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteStudent
);



export default router;