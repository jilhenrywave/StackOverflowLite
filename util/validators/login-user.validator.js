const { isEmailValid, isPasswordValid } = require('./field-validators');
const { ValidationError } = require('../error-handlers');
const { ERROR_MESSAGE } = require('../constants');

module.exports = ({ email = '', password = '' }) => {
  const validationError = new ValidationError();

  if (!isEmailValid(email)) validationError.addErrorMessage(ERROR_MESSAGE.invalidEmail);

  if (!isPasswordValid(password)) {
    validationError.addErrorMessage(ERROR_MESSAGE.invalidPassword);
  }

  return validationError;
};
