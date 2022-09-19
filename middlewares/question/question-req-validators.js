const postQuestionValidator = require('../../domains/question/validators/post-question.validator');
const getQuestionsValidator = require('../../domains/question/validators/get-questions.validator');
const { validationHandler } = require('../../util/request-handler');
const getQuestionValidator = require('../../domains/question/validators/get-question.validator');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req.body, res, next, postQuestionValidator);
};

exports.getQuestionsValidator = (req, res, next) => {
  validationHandler(req.query, res, next, getQuestionsValidator);
};

exports.getQuestionValidator = (req, res, next) => {
  validationHandler(req.params.id, res, next, getQuestionValidator);
};
