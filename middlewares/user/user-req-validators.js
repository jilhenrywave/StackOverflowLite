const registerValidator = require('../../domains/user/validators/register-user.validator');
const loginValidator = require('../../domains/user/validators/login-user.validator');
const updateUserValidator = require('../../domains/user/validators/update-user.validator');
const { validationHandler } = require('../../util/request-handler');

exports.registerUserValidator = (req, res, next) => {
  validationHandler(req.body, res, next, registerValidator);
};

exports.loginValidator = (req, res, next) => {
  validationHandler(req.body, res, next, loginValidator);
};

exports.updateUserValidator = (req, res, next) => {
  validationHandler(req.body, res, next, updateUserValidator);
};
