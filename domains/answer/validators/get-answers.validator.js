/* eslint-disable object-curly-newline */
const { ERROR_MESSAGE } = require('../../../util/constants');
const { ValidationError } = require('../../../util/error-handlers');
const { isValidID, isNumber } = require('../../../util/field-validators');

const getAnswersValidator = ({ id = '', start = 0, limit = 0, sort = '' }) => {
  const validatorError = new ValidationError();

  const qSort = sort.toUpperCase();

  if (id && !isValidID(id)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidID);

  if (start && !isNumber(start)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryStart);

  if (limit && !isNumber(limit)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryLimit);

  if (sort && (qSort !== 'DESC' && qSort !== 'ASC')) {
    validatorError.addErrorMessage(ERROR_MESSAGE.invalidQuerySort);
  }

  return validatorError;
};

module.exports = getAnswersValidator;
