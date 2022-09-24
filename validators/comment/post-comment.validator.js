const { ERROR_MESSAGE } = require('../../util/constants');
const { ValidationError } = require('../../util/error-handlers');
const { isTextValid, isValidID } = require('../../util/field-validators');

const postAnswerValidator = ({ comment = '', paramId = '' }) => {
  const validatorError = new ValidationError();

  if (!isTextValid(comment)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidCommentBody);

  if (!isValidID(paramId)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidIDParam);

  return validatorError;
};

module.exports = postAnswerValidator;
