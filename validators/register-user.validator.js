const validator = require('validator');
const { ValidationError } = require('../util/error-handlers');

module.exports = (requestBody) => {
  const { name = '', email = '', password = '' } = requestBody;
  const validationError = new ValidationError();

  if (validator.isEmpty(name.trim())) {
    validationError.addErrorMessage('Name is missing');
  }
  if (!validator.isEmail(email)) {
    if (email.length === 0) {
      validationError.addErrorMessage('Email is missing');
    } else {
      validationError.addErrorMessage('Email is invalid');
    }
  }
  if (validator.contains(password, 'password', { ignoreCase: true })
    || validator.isLength(password, { min: 0, max: 5 })) {
    validationError.addErrorMessage(
      'Password Error. Password should be 6 or more characters and should not contain the word password',
    );
  }

  if (validationError.errorMessages.length > 0) {
    validationError.errorMessage = 'Invalid Request Body Fields';
    return { ...validationError };
  }

  return {};
};
