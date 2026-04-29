import express from "express";
import { getResultByRoll } from "../controllers/resultController.js";
import { addResult } from "../controllers/resultController.js";


const router = express.Router();

router.get("/:roll", getResultByRoll);
router.post("/", addResult); // 👈 ADD THIS

export default router;