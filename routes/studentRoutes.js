import express from "express";

import {
  getStudents,
  addStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import {
  protect,
  // adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStudents);

router.post(
  "/",
   protect,
  // adminOnly,
  addStudent
);

router.delete(
  "/:id",
  protect,
  // adminOnly,
  deleteStudent
);

export default router;