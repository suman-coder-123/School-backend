import Enquiry from "../models/Enquiry.js";

// CREATE (from public site)
export const addEnquiry = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 👈 MUST print

    const enquiry = await Enquiry.create(req.body);

    console.log("SAVED:", enquiry); // 👈 MUST print

    res.json({ message: "Submitted successfully" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json(err.message);
  }
};
// ADMIN VIEW
export const getEnquiries = async (req, res) => {
  const data = await Enquiry.find().sort({ createdAt: -1 });
  res.json(data);
};