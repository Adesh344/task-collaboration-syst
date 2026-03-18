const ApiError = require("../utils/ApiError");

const validateBody = (fields) => (req, res, next) => {
  for (const field of fields) {
    if (!req.body[field] && req.body[field] !== 0) {
      return next(new ApiError(400, `${field} is required`));
    }
  }
  next();
};

module.exports = { validateBody };