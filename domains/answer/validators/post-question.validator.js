const { ERROR_MESSAGE } = require('../../../util/constants');
const { ValidationError } = require('../../../util/error-handlers');
const { isTextValid, isValidID } = require('../../../util/field-validators');

const postQuestionValidator = ({ answer = '', questionId = '' }) => {
  const validatorError = new ValidationError();

  if (!isTextValid(answer)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidAnswerBody);

  if (!isValidID(questionId)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQuestionID);

  return validatorError;
};

module.exports = postQuestionValidator;
