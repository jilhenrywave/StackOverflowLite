const validator = require('validator');
const { SORT_TYPES } = require('./constants');

exports.isTextValid = (value) => !(validator.isEmpty(value.trim()));

exports.isNumber = (value) => validator.isNumeric(value);

exports.isValidID = (value) => validator.isUUID(value, 4);

// eslint-disable-next-line arrow-body-style
exports.isPasswordValid = (value) => {
  return !(validator.contains(value, 'password', { ignoreCase: true }) || validator.isLength(value, { min: 0, max: 5 }));
};

exports.isEmailValid = (value) => (validator.isEmail(value));

exports.isValidSort = (value) => (validator.isIn(value, SORT_TYPES));
