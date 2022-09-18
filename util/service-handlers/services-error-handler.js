const { AppError, ServerError } = require('../error-handlers');

const serviceErrorHandler = (error) => {
  if (error instanceof AppError) return error;
  return new ServerError();
};

module.exports = serviceErrorHandler;
