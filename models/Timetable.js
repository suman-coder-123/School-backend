import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    class: String, // e.g. "Class 10"

    schedule: [
      {
        day: String, // Monday
        periods: [
          {
            subject: String,
            time: String, // "9:00 - 10:00"
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Timetable", timetableSchema);