import express from "express";
import {
  addTeacher,
  getTeachers,
  getTeacherByUserId,
    updateTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", addTeacher);
router.get("/", getTeachers);
router.get("/user/:userId", getTeacherByUserId);
router.put("/:id", updateTeacher);

export default router;