const postQuestionValidator = require('../../domains/question/validators/post-question.validator');
const getQuestionValidator = require('../../domains/question/validators/get-question.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req.body, res, next, postQuestionValidator);
};

exports.getQuestionValidator = (req, res, next) => {
  validationHandler(req.query, res, next, getQuestionValidator);
};
