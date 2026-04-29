import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentName: String,
    rollNumber: { type: String, unique: true },
    class: String,
    stream: String,

    subjects: [
      {
        name: String,
        marks: Number,
        grade: String, // ✅ important
      },
    ],

    total: Number,
    percentage: Number,
    resultStatus: String,
    remark: String,
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);