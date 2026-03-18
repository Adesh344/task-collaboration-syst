const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const userRepo = require("../repositories/userRepository");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new ApiError(401, "Not authenticated. No token provided.");

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepo.findById(decoded.id);
    if (!user) throw new ApiError(401, "User no longer exists.");

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") return next(new ApiError(401, "Invalid token"));
    if (err.name === "TokenExpiredError") return next(new ApiError(401, "Token expired"));
    next(err);
  }
};

const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return next(new ApiError(403, "You do not have permission to perform this action"));
  next();
};

module.exports = { protect, restrictTo };