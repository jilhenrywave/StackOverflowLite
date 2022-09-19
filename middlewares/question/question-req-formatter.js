/* eslint-disable max-len */
const questionFormatter = require('../../domains/question/formatters/question.formatter');
const getQuestionFormatter = require('../../domains/question/formatters/get-question.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');

exports.questionFormatter = (req, res, next) => {
  const formattedBody = questionFormatter(req.body, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getQuestionFormatter = (req, res, next) => {
  const formattedQuery = getQuestionFormatter(req.query);

  return formattedRequestHandler(req, res, next, formattedQuery);
};
