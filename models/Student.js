import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    
    name: String,
    class: String,
    status: {
      type: String,
      default: "Active",
    },
    teacher: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Teacher",
}
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);