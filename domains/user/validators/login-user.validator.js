const { isEmailValid, isPasswordValid } = require('../../../util/field-validators');
const { ValidationError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');

module.exports = ({ email = '', password = '' }) => {
  const validationError = new ValidationError();

  if (!isEmailValid(email)) validationError.addErrorMessage(ERROR_MESSAGE.invalidEmail);

  if (!isPasswordValid(password)) {
    validationError.addErrorMessage(ERROR_MESSAGE.invalidPassword);
  }

  return validationError;
};
