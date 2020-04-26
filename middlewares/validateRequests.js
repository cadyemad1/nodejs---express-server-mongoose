const { validationResult } = require("express-validator");
const CustomError = require("../helper/customError");

module.exports = validators => async (req, res, next) => {
  const promises = validators.map(validator => validator.run(req));
  await Promise.all(promises);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new CustomError("validation error", 422, errors.mapped());
    return next(error);
  }
  next();
};
