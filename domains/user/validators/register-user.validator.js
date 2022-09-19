const { isTextValid, isEmailValid, isPasswordValid } = require('../../../util/field-validators');
const { ValidationError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');

module.exports = ({ name = '', email = '', password = '' }) => {
  const validationError = new ValidationError();

  if (!isTextValid(name)) validationError.addErrorMessage(ERROR_MESSAGE.invalidName);

  if (!isEmailValid(email)) validationError.addErrorMessage(ERROR_MESSAGE.invalidEmail);

  if (!isPasswordValid(password)) {
    validationError.addErrorMessage(ERROR_MESSAGE.invalidPassword);
  }

  return validationError;
};
