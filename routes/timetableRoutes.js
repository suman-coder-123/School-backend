import express from "express";
import {
  addTimetable,
  getTimetable,
  getTimetableByClass,
} from "../controllers/timetableController.js";

const router = express.Router();

router.post("/", addTimetable);
router.get("/", getTimetable);
router.get("/:className", getTimetableByClass);

export default router;