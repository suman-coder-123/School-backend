// backend/routes/studentRoutes.js

import express from "express";

import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addStudent
);

// READ
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getStudents
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateStudent
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteStudent
);

export default router;