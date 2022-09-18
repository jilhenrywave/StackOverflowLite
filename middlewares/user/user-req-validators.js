const registerValidator = require('../../user/validators/register-user.validator');
const loginValidator = require('../../user/validators/login-user.validator');
const updateUserValidator = require('../../user/validators/update-user.validator');
const { validationHandler } = require('../../util/request-handler');

exports.registerUserValidator = (req, res, next) => {
  validationHandler(req, res, next, registerValidator);
};

exports.loginValidator = (req, res, next) => {
  validationHandler(req, res, next, loginValidator);
};

exports.updateUserValidator = (req, res, next) => {
  validationHandler(req, res, next, updateUserValidator);
};
