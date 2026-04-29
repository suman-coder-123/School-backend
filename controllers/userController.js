import User from "../models/User.js";

// ✅ UPDATE USER (EMAIL)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};