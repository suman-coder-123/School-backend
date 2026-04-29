import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running 🚀 abhi ki hi he ");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/timetable", timetableRoutes); 
app.use("/api/notices", noticeRoutes); // ✅ MUST EXIST