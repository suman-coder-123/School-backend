import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);