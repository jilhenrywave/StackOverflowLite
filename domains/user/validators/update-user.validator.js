const { ERROR_MESSAGE } = require('../../../util/constants');
const { ValidationError } = require('../../../util/error-handlers');
const { isTextValid, isEmailValid, isPasswordValid } = require('../../../util/field-validators');

module.exports = ({ name = '', email = '', password = '' }) => {
  const validationError = new ValidationError();

  if (!name && !email && !password) {
    validationError.addErrorMessage(ERROR_MESSAGE.emptyRequestBody);
    return validationError;
  }

  if (name && !isTextValid(name)) validationError.addErrorMessage(ERROR_MESSAGE.invalidName);

  if (email && !isEmailValid(email)) validationError.addErrorMessage(ERROR_MESSAGE.invalidEmail);

  if (password && !isPasswordValid(password)) {
    validationError.addErrorMessage(ERROR_MESSAGE.invalidPassword);
  }
  return validationError;
};
