const { ValidationError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');
const { isTextValid } = require('../../../util/field-validators');

const postQuestionValidator = ({ title = '', body = '' }) => {
  const validationError = new ValidationError();

  if (!isTextValid(title)) validationError.addErrorMessage(ERROR_MESSAGE.invalidQuestionTitle);

  if (!isTextValid(body)) validationError.addErrorMessage(ERROR_MESSAGE.invalidQuestionBody);

  return validationError;
};

module.exports = postQuestionValidator;
