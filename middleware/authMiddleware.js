import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {

    // ✅ GET HEADER
    const authHeader =
      req.headers.authorization;

    // ❌ NO TOKEN
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // ✅ REMOVE BEARER
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ✅ VERIFY
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ✅ SAVE USER
    req.user = verified;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;