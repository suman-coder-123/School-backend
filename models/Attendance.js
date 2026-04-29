import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  date: String,
  status: String,
});

export default mongoose.model("Attendance", attendanceSchema);