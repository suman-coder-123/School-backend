import express from "express";
import {
  addFee,
  getFeeByRoll,
  payFee,
  getAllFees,
  addMonthlyFee,
  getStudentFees,
  payMonthlyFee,
} from "../controllers/feeController.js";

const router = express.Router();

router.post("/", addFee);
router.get("/:roll", getFeeByRoll);
router.put("/pay/:id", payFee);


router.get("/", getAllFees); // ✅ ADD THIS
router.post("/monthly", addMonthlyFee);
router.get("/student/:roll", getStudentFees);
router.put("/pay/:id", payMonthlyFee);

export default router;