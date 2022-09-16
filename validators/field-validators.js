const validator = require('validator');

exports.isTextValid = (value) => !(validator.isEmpty(value.trim()));

// eslint-disable-next-line arrow-body-style
exports.isPasswordValid = (value) => {
  return !(validator.contains(value, 'password', { ignoreCase: true }) || validator.isLength(value, { min: 0, max: 5 }));
};

exports.isEmailValid = (value) => (validator.isEmail(value));