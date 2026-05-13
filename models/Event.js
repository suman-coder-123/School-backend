import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    date: String,

    time: String,

    location: String,

    target: {
      type: String,
      default: "all",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Event",
  eventSchema
);