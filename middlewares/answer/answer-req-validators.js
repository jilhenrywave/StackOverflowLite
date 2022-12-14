const { validationHandler } = require('../../util/request-handler');
const { postCommentValidator, getCommentsValidator } = require('../comment/comment-req-validator');
const postAnswerValidator = require('../../validators/answer/post-answer.validator');
const getMultipleValidator = require('../get-multiple.validator');
const idParamValidator = require('../idParam.validator');
const voteAnswerValidator = require('../../validators/answer/vote-answer.validator');

exports.postAnswerValidator = (req, res, next) => {
  const request = { answer: req.body.answer, paramId: req.params.id };

  validationHandler(request, res, next, postAnswerValidator);
};

exports.getQuestionAnswersValidator = (req, res, next) => {
  const request = { ...req.query, id: req.params.id };

  validationHandler(request, res, next, getMultipleValidator);
};

exports.idParamValidator = idParamValidator;

exports.getUserAnswersValidator = (req, res, next) => {
  validationHandler(req.query, res, next, getMultipleValidator);
};

exports.voteAnswerValidator = (req, res, next) => {
  const request = { id: req.params.id, voteType: req.query.type };

  validationHandler(request, res, next, voteAnswerValidator);
};

exports.postCommentValidator = postCommentValidator;
exports.getCommentsValidator = getCommentsValidator;
