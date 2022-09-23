/* eslint-disable max-len */
const { ValidationError } = require('../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../util/constants');
const { isTextValid, isValidID } = require('../../util/field-validators');

const updateQuestionValidator = ({ id = '', title = '', body = '' }) => {
  const validationError = new ValidationError();

  if (!title && !body) {
    validationError.addErrorMessage('Title or body required');
    return validationError;
  }

  if (!isValidID(id)) validationError.addErrorMessage(ERROR_MESSAGE.invalidQuestionID);

  if (title && !isTextValid(title)) validationError.addErrorMessage(ERROR_MESSAGE.invalidQuestionTitle);

  if (body && !isTextValid(body)) validationError.addErrorMessage(ERROR_MESSAGE.invalidQuestionBody);

  return validationError;
};

module.exports = updateQuestionValidator;
