const validator = require('validator');
const { ValidationError } = require('../util/error-handlers');

const validationErrorHandler = (message, res) => {
  const error = new ValidationError(message);
  return res.status(400).send({ ...error });
};

exports.registerUserValidator = (req, res, next) => {
  const { name, email, password } = req.body;

  if (validator.isEmpty(name)) {
    return validationErrorHandler('Name is invalid', res);
  }
  if (!validator.isEmail(email)) {
    return validationErrorHandler('Email is invalid', res);
  }
  if (validator.contains(password, 'password', { ignoreCase: true })
    || validator.isLength(password, { min: 0, max: 5 })) {
    return validationErrorHandler(
      'Password is not accepted. Password should be 6 or more characters and should not contain "password"',
      res,
    );
  }
  return next();
};
