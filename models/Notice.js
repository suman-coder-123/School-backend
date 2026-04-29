import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    target: {
      type: String,
      enum: ["student", "teacher", "all"],
      default: "all",
    },
    createdBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);