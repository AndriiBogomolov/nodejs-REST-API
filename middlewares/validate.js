const { HttpError } = require("../helpers");

const validate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing fields"));
    }
    next();
  };
  return func;
};

module.exports = validate;
