const { AppError, ServerError } = require('./error-handlers');
const { ERROR_MESSAGE } = require('./constants');

module.exports = (error) => {
  if (error instanceof AppError) return error;
  return new ServerError(500, ERROR_MESSAGE.serverError);
};
