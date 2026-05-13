import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/api/test", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ ALL ROUTES BEFORE app.listen()
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/students" , studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/notices", noticeRoutes);
app.use(
  "/api/events",
  eventRoutes
);

const PORT = process.env.PORT || 5000;

// ✅ listen() always LAST
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});