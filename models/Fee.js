import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    rollNumber: String,
    class: String,

    month: String, // 👉 "2026-04"
    
    amount: Number,

    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },

    paymentDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);