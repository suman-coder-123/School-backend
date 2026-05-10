import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {

    // ✅ GET TOKEN
    const token = req.headers.authorization;

    // ❌ NO TOKEN
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // ✅ VERIFY TOKEN
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SAVE USER DATA
    req.user = verified;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;