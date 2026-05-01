import Timetable from "../models/Timetable.js";

export const addTimetable = async (req, res) => {
  try {
    const { class: className, schedule } = req.body;

    // optional: replace existing timetable for same class
    await Timetable.findOneAndDelete({ class: className });

    const data = await Timetable.create({
      class: className,
      schedule,
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

// ✅ GET ALL
export const getTimetable = async (req, res) => {
  try {
    const data = await Timetable.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ GET BY CLASS
export const getTimetableByClass = async (req, res) => {
  try {
    const { className } = req.params;

    const data = await Timetable.findOne({
      class: className,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};