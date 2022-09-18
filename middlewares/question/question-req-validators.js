const postQuestionValidator = require('../../question/validators/post-question.validator');
const getQuestionValidator = require('../../question/validators/get-question.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req.body, res, next, postQuestionValidator);
};

exports.getQuestionValidator = (req, res, next) => {
  validationHandler(req.query, res, next, getQuestionValidator);
};
