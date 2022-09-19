/* eslint-disable object-curly-newline */
const { ERROR_MESSAGE } = require('../../../util/constants');
const { ValidationError } = require('../../../util/error-handlers');
const { isValidID, isNumber } = require('../../../util/field-validators');

const getQuestionValidator = ({ ownerId = '', start = 0, limit = 0, sort = '' }) => {
  const validatorError = new ValidationError();
  const qSort = sort.toUpperCase();
  if (ownerId && !isValidID(ownerId)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidID);
  if (start && !isNumber(start)) validatorError.addErrorMessage('Query field, start, is not a number');
  if (limit && !isNumber(limit)) validatorError.addErrorMessage('Query field, limit, is not a number');
  if (sort && (qSort !== 'DESC' && qSort !== 'ASC')) {
    validatorError.addErrorMessage('Invalid value for query field - sort. Accepted values are ASC or DESC');
  }

  return validatorError;
};

module.exports = getQuestionValidator;
