const { ERROR_MESSAGE } = require('../../util/constants');
const { ValidationError } = require('../../util/error-handlers');
const { isTextValid, isValidID } = require('../../util/field-validators');

const postAnswerValidator = ({ answer = '', paramId = '' }) => {
  const validatorError = new ValidationError();

  if (!isTextValid(answer)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidAnswerBody);

  if (!isValidID(paramId)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidIDParam);

  return validatorError;
};

module.exports = postAnswerValidator;
