/* eslint-disable object-curly-newline */
const { ERROR_MESSAGE } = require('../../../util/constants');
const { ValidationError } = require('../../../util/error-handlers');
const { isValidID, isNumber, isTextValid } = require('../../../util/field-validators');

const getQuestionsValidator = ({ ownerId = '', start = 0, limit = 0, sort = '', search = '' }) => {
  const validatorError = new ValidationError();
  const qSort = sort.toUpperCase();
  if (ownerId && !isValidID(ownerId)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidID);

  if (start && !isNumber(start)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryStart);

  if (limit && !isNumber(limit)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQueryLimit);

  if (sort && (qSort !== 'DESC' && qSort !== 'ASC')) {
    validatorError.addErrorMessage(ERROR_MESSAGE.invalidQuerySort);
  }

  if (search && !isTextValid(search)) validatorError.addErrorMessage('Query field, search, is not valid');

  return validatorError;
};

module.exports = getQuestionsValidator;
