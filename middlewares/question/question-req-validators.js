const postQuestionValidator = require('../../domains/question/validators/post-question.validator');
const getQuestionsValidator = require('../../domains/question/validators/get-questions.validator');
const getDelQuestionValidator = require('../../domains/question/validators/get-del-question.validator');
const updateQuestionValidator = require('../../domains/question/validators/update-question.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req.body, res, next, postQuestionValidator);
};

exports.getQuestionsValidator = (req, res, next) => {
  validationHandler(req.query, res, next, getQuestionsValidator);
};

exports.getDelQuestionValidator = (req, res, next) => {
  validationHandler(req.params.id, res, next, getDelQuestionValidator);
};

exports.updateQuestionValidator = (req, res, next) => {
  const body = { id: req.params.id, title: req.body.title, body: req.body.body };
  validationHandler(body, res, next, updateQuestionValidator);
};
