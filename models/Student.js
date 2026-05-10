import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // 🔗 LINKED USER ACCOUNT
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // BASIC INFO (ADMIN)
    name: String,

    className: String,

    rollNo: String,

    status: {
      type: String,
      default: "Active",
    },

    // TEACHER
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },

    // PROFILE INFO (STUDENT)
    fatherName: String,

    motherName: String,

    phone: String,

    address: String,

    photo: String,

    documents: [String],

  },
  { timestamps: true }
);

export default mongoose.model(
  "Student",
  studentSchema
);