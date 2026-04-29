import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    message: String,
    status: {
      type: String,
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);