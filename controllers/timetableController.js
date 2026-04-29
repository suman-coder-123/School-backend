import Timetable from "../models/Timetable.js";


// ➕ ADD / UPDATE TIMETABLE
export const saveTimetable = async (req, res) => {
  try {
    const { class: className, schedule } = req.body;

    const timetable = await Timetable.findOneAndUpdate(
      { class: className },
      { schedule },
      { upsert: true, new: true }
    );

    res.json(timetable);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


// 🔍 GET TIMETABLE BY CLASS
export const getTimetable = async (req, res) => {
  try {
    const data = await Timetable.findOne({
      class: req.params.class,
    });

    if (!data) {
      return res.status(404).json("No timetable found");
    }

    res.json(data);

  } catch (err) {
    res.status(500).json(err.message);
  }
};  