const postQuestionValidator = require('../../domains/question/validators/post-question.validator');
const getQuestionsValidator = require('../../domains/question/validators/get-questions.validator');
const getQuestionValidator = require('../../domains/question/validators/get-question.validator');
const updateQuestionValidator = require('../../domains/question/validators/update-question.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req.body, res, next, postQuestionValidator);
};

exports.getQuestionsValidator = (req, res, next) => {
  validationHandler(req.query, res, next, getQuestionsValidator);
};

exports.getQuestionValidator = (req, res, next) => {
  validationHandler(req.params.id, res, next, getQuestionValidator);
};

exports.updateQuestionValidator = (req, res, next) => {
  const body = { id: req.params.id, title: req.body.title, body: req.body.body };
  validationHandler(body, res, next, updateQuestionValidator);
};
