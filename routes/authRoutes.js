import express from "express";

import {
  register,
  login,
  changePassword,
  forgotPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/change-password", authMiddleware, changePassword);

router.put("/forgot-password", forgotPassword);

export default router;