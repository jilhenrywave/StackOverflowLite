/* eslint-disable max-len */
const getMulitpleFormatter = require('../get-multiple.formatter');
const postAnswerFormatter = require('../../domains/answer/formatters/post-answer.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');
const idParamAuthUserFormatter = require('../idParamAuthUser.formatter');
const voteAnswerFormatter = require('../../domains/answer/formatters/vote-answer.formatter');

exports.postAnswerFormatter = (req, res, next) => {
  const request = { answer: req.body.answer, questionId: req.params.id };
  const formattedBody = postAnswerFormatter(request, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getQuestionAnswersFormatter = (req, res, next) => {
  const request = { ...req.query, questionId: req.params.id };
  const formattedBody = getMulitpleFormatter(request);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getUserAnswersFormatter = (req, res, next) => {
  const formattedBody = getMulitpleFormatter({ ...req.query, ownerId: req.user.id });

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.idParamAuthUserFormatter = idParamAuthUserFormatter;

exports.voteAnswerFormatter = (req, res, next) => {
  const formattedBody = voteAnswerFormatter({ id: req.params.id, user: req.user, voteType: req.query.type });

  return formattedRequestHandler(req, res, next, formattedBody);
};
