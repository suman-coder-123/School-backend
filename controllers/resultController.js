import Result from "../models/Result.js";


// 🎯 GRADE FUNCTION
const getGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 75) return "A";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C";
  return "F";
};


// ➕ ADD RESULT (ADMIN)
export const addResult = async (req, res) => {
  try {
    const {
      studentName,
      rollNumber,
      class: studentClass,
      stream,
      subjects,
    } = req.body;

    // 🔒 BASIC VALIDATION
    if (!studentName || !rollNumber || !studentClass || !subjects) {
      return res.status(400).json("All fields are required");
    }

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json("Subjects must be a non-empty array");
    }

    // 🎯 ADD GRADE TO SUBJECTS
    const subjectsWithGrade = subjects.map((s) => ({
      name: s.name,
      marks: Number(s.marks),
      grade: getGrade(Number(s.marks)),
    }));

    // 📊 TOTAL
    const total = subjectsWithGrade.reduce(
      (sum, s) => sum + s.marks,
      0
    );

    // 📊 PERCENTAGE
    const percentage =
      (total / (subjectsWithGrade.length * 100)) * 100;

    // ❌ FAIL CHECK
    const isFail = subjectsWithGrade.some(
      (s) => s.marks < 33
    );

    const resultStatus = isFail ? "FAIL" : "PASS";

    // 🧠 REMARK LOGIC
    let remark = "";
    if (percentage >= 85) remark = "Excellent 🎉";
    else if (percentage >= 70) remark = "Very Good 👍";
    else if (percentage >= 50) remark = "Good 🙂";
    else remark = "Needs Improvement ⚠️";

    // 💾 SAVE TO DB
    const result = await Result.create({
      studentName,
      rollNumber,
      class: studentClass,
      stream,
      subjects: subjectsWithGrade,
      total,
      percentage: percentage.toFixed(2),
      resultStatus,
      remark,
    });

    res.status(201).json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};


// 🔍 GET RESULT BY ROLL NUMBER
export const getResultByRoll = async (req, res) => {
  try {
    const { roll } = req.params;

    const result = await Result.findOne({
      rollNumber: roll,
    });

    if (!result) {
      return res.status(404).json("Result not found");
    }

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};