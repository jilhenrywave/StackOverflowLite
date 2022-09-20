/* eslint-disable max-len */
const postAnswerFormatter = require('../../domains/answer/formatters/post-answer.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');

exports.postAnswerFormatter = (req, res, next) => {
  const body = { answer: req.body.answer, questionId: req.params.id };
  const formattedBody = postAnswerFormatter(body, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};
