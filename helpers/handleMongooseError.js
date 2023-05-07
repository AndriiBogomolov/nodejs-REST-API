const handleMongooseError = (error, data, next) => {
  error.status = 409;
  next();
};

module.exports = handleMongooseError;
