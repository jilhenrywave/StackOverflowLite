/* eslint-disable object-curly-newline */
const { ERROR_MESSAGE } = require('../util/constants');
const { ValidationError } = require('../util/error-handlers');
const { isValidID, isNumber, isValidSort } = require('../util/field-validators');

const getMultipleValidator = ({ id = '', start = 0, limit = 0, sort = '' }) => {
  const validatorError = new ValidationError();

  if (id && !isValidID(id)) validatorError.addErrorMessage(ERROR_MESSAGE.incorrectID);

  if (start && !isNumber(start)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryStart);

  if (limit && !isNumber(limit)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryLimit);

  if (sort && !isValidSort(sort)) {
    validatorError.addErrorMessage(ERROR_MESSAGE.invalidQuerySort);
  }

  return validatorError;
};

module.exports = getMultipleValidator;
