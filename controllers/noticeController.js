import Notice from "../models/Notice.js";

// ➕ Create Notice
export const createNotice = async (req, res) => {
  try {
    const { title, message, target } = req.body;

    const notice = await Notice.create({
      title: title.trim(),
      message: message.trim(),
      target,
    });

    res.json(notice);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

// 📢 Get Notices (IMPORTANT FILTER)
export const getNotices = async (req, res) => {
  try {
    const { target } = req.query;

    const notices = await Notice.find({
      target: { $in: [target, "all"] },
    }).sort({ createdAt: -1 });

    res.json(notices);
  } catch (err) {
    res.status(500).json(err.message);
  }
};