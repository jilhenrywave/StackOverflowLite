/* eslint-disable max-len */
const getAnswersFormatter = require('../../domains/answer/formatters/get-answers.formatter');
const postAnswerFormatter = require('../../domains/answer/formatters/post-answer.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');

exports.postAnswerFormatter = (req, res, next) => {
  const request = { answer: req.body.answer, questionId: req.params.id };
  const formattedBody = postAnswerFormatter(request, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getQuestionAnswersFormatter = (req, res, next) => {
  const request = { ...req.query, questionId: req.params.id };
  const formattedBody = getAnswersFormatter(req.user, request);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getUserAnswersFormatter = (req, res, next) => {
  const formattedBody = getAnswersFormatter(req.user, req.query);

  return formattedRequestHandler(req, res, next, formattedBody);
};
