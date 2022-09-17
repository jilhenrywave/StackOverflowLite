const registerValidator = require('../util/validators/register-user.validator');
const loginValidator = require('../util/validators/login-user.validator');
const updateUserValidator = require('../util/validators/update-user.validator');

const validationHandler = (req, res, next, validator) => {
  const validatorResponse = validator(req.body);

  if (validatorResponse.errorMessages.length > 0) {
    validatorResponse.errorMessage = 'Invalid Request Body Fields';
    return res.status(validatorResponse.code).send({ ...validatorResponse });
  }

  return next();
};

exports.registerUserValidator = (req, res, next) => {
  validationHandler(req, res, next, registerValidator);
};

exports.loginValidator = (req, res, next) => {
  validationHandler(req, res, next, loginValidator);
};

exports.updateUserValidator = (req, res, next) => {
  validationHandler(req, res, next, updateUserValidator);
};
