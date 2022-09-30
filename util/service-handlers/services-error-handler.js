const { ERROR_MESSAGE } = require('../constants');
const { AppError, ServerError, RequestError } = require('../error-handlers');

const serviceErrorHandler = (error) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return new RequestError(409, ERROR_MESSAGE.duplicateEntry);
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') return new RequestError(400, ERROR_MESSAGE.incorrectID);

  if (error.parent && error.parent.code === 'ER_BAD_FIELD_ERROR') return new RequestError(400, error);

  if (error instanceof AppError) return error;

  return new ServerError();
};

module.exports = serviceErrorHandler;
