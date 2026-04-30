import mongoose from "mongoose";

const periodSchema = new mongoose.Schema({
  subject: String,
  time: String,
});

const daySchema = new mongoose.Schema({
  day: String,
  periods: [periodSchema],
});

const timetableSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },
    schedule: [daySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Timetable", timetableSchema);