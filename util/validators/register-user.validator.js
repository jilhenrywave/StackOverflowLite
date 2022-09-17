const { isTextValid, isEmailValid, isPasswordValid } = require('./field-validators');
const { ValidationError } = require('../error-handlers');
const { ERROR_MESSAGE } = require('../constants');

module.exports = ({ name = '', email = '', password = '' }) => {
  const validationError = new ValidationError();

  if (!isTextValid(name)) validationError.addErrorMessage(ERROR_MESSAGE.invalidName);

  if (!isEmailValid(email)) validationError.addErrorMessage(ERROR_MESSAGE.invalidEmail);

  if (!isPasswordValid(password)) {
    validationError.addErrorMessage(ERROR_MESSAGE.invalidPassword);
  }

  return validationError;
};
