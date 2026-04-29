import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subject: {
      type: String,
      default: "General",
    },
    salaryPerDay: {
      type: Number,
      default: 500,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);