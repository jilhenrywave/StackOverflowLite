const postQuestionValidator = require('../../validators/question/post-question.validator');
const updateQuestionValidator = require('../../validators/question/update-question.validator');
const idParamValidator = require('../idParam.validator');
const getMultipleValidator = require('../get-multiple.validator');
const { validationHandler } = require('../../util/request-handler');
const { postAnswerValidator, getQuestionAnswersValidator } = require('../answer/answer-req-validators');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req.body, res, next, postQuestionValidator);
};

exports.getQuestionsValidator = (req, res, next) => {
  validationHandler({ ...req.query, id: req.query.ownerId }, res, next, getMultipleValidator);
};

exports.idParamValidator = idParamValidator;

exports.updateQuestionValidator = (req, res, next) => {
  const body = { id: req.params.id, title: req.body.title, body: req.body.body };
  validationHandler(body, res, next, updateQuestionValidator);
};

exports.postAnswerValidator = postAnswerValidator;

exports.getQuestionAnswersValidator = getQuestionAnswersValidator;
