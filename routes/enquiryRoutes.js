import express from "express";
import {
  addEnquiry,
  getEnquiries,
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", addEnquiry);     // public form
router.get("/", getEnquiries);    // admin panel

export default router;