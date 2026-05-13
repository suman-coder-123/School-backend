import express from "express";

import {
  register,
  login,
  changePassword,
  forgotPassword,
} from "../controllers/authController.js";

// import {
//   protect,
// } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ REGISTER
router.post("/register", register);

// ✅ LOGIN
router.post("/login", login);

// ✅ CHANGE PASSWORD (protected)
router.put(
  "/change-password",
  // protect,
  changePassword
);

// ✅ FORGOT PASSWORD
router.put(
  "/forgot-password",
  forgotPassword
);

export default router;