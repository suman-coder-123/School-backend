import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { getAttendanceChart } from "../controllers/dashboardController.js";


const router = express.Router();

router.get("/stats", getDashboardStats);

router.get("/attendance-chart", getAttendanceChart);
export default router;