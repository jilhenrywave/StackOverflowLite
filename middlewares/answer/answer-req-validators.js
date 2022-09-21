const postAnswerValidator = require('../../domains/answer/validators/post-answer.validator');
const getMultipleValidator = require('../get-multiple.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postAnswerValidator = (req, res, next) => {
  const request = { answer: req.body.answer, questionId: req.params.id };

  validationHandler(request, res, next, postAnswerValidator);
};

exports.getQuestionAnswersValidator = (req, res, next) => {
  const request = { id: req.params.id, ...req.query };
  validationHandler(request, res, next, getMultipleValidator);
};

exports.getUserAnswersValidator = (req, res, next) => {
  validationHandler(req.query, res, next, getMultipleValidator);
};
