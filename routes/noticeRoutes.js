import express from "express";
import {
  createNotice,
  getNotices,
} from "../controllers/noticeController.js";

const router = express.Router();

router.post("/", createNotice);
router.get("/", getNotices);

export default router;