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

router.get(
  "/my-profile",
  authMiddleware,
  getMyProfile
);

router.put(
  "/my-profile",
  authMiddleware,
  updateMyProfile
);

// ================= ADMIN =================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addStudent
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getStudents
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteStudent
);

export default router;