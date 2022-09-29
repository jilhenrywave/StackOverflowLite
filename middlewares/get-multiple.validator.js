/* eslint-disable object-curly-newline */
const { ERROR_MESSAGE, SORT_TYPES } = require('../util/constants');
const { ValidationError } = require('../util/error-handlers');
const { isValidID, isNumber, isValidValue } = require('../util/field-validators');

const getMultipleValidator = ({ id = '', page = 0, limit = 0, sort = '' }) => {
  const validatorError = new ValidationError();

  if (id && !isValidID(id)) validatorError.addErrorMessage(ERROR_MESSAGE.incorrectID);

  if (page && !isNumber(page)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryPageNumber);

  if (limit && !isNumber(limit)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryLimit);

  if (sort && !isValidValue(sort, SORT_TYPES)) {
    validatorError.addErrorMessage(ERROR_MESSAGE.invalidQuerySort);
  }

  return validatorError;
};

module.exports = getMultipleValidator;
