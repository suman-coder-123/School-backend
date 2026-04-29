import Fee from "../models/Fee.js";




import Student from "../models/Student.js";

export const addFee = async (req, res) => {
  try {
    const { rollNumber, amount } = req.body;

    // 🔍 Find student
    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json("Student not found ❌");
    }

    const fee = await Fee.create({
      studentId: student._id,
      rollNumber: student.rollNumber,
      class: student.class,
      amount,
    });

    res.json(fee);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const addMonthlyFee = async (req, res) => {
  try {
    const { rollNumber, amount, month } = req.body;

    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json("Student not found");
    }

    // ❌ prevent duplicate month entry
    const exists = await Fee.findOne({
      rollNumber,
      month,
    });

    if (exists) {
      return res.status(400).json("Fee already added for this month");
    }

    const fee = await Fee.create({
      studentId: student._id,
      rollNumber,
      class: student.class,
      month,
      amount,
    });

    res.json(fee);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const payMonthlyFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      {
        status: "Paid",
        paymentDate: new Date(),
      },
      { new: true }
    );

    res.json(fee);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


export const getStudentFees = async (req, res) => {
  try {
    const fees = await Fee.find({
      rollNumber: req.params.roll,
    }).sort({ month: -1 });

    res.json(fees);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 🔍 GET FEE BY ROLL
export const getFeeByRoll = async (req, res) => {
  try {
    const fee = await Fee.findOne({
      rollNumber: req.params.roll,
    });

    if (!fee) {
      return res.status(404).json("Fee not found");
    }

    res.json(fee);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


// 💳 MARK AS PAID
export const payFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      {
        status: "Paid",
        paymentDate: new Date(),
      },
      { new: true }
    );

    res.json(fee);

  } catch (err) {
    res.status(500).json(err.message);
  }
};



// 📋 GET ALL FEES (ADMIN)
export const getAllFees = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const fees = await Fee.find(filter).sort({ createdAt: -1 });

    res.json(fees);

  } catch (err) {
    res.status(500).json(err.message);
  }
};