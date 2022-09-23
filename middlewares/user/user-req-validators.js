const registerValidator = require('../../validators/user/register-user.validator');
const loginValidator = require('../../validators/user/login-user.validator');
const updateUserValidator = require('../../validators/user/update-user.validator');
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
