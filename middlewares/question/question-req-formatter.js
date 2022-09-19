/* eslint-disable max-len */
const postQuestionFormatter = require('../../domains/question/formatters/post-question.formatter');
const getQuestionsFormatter = require('../../domains/question/formatters/get-questions.formatter');
const getUserQuestionsFormatter = require('../../domains/question/formatters/get-user-questions.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');

exports.postQuestionFormatter = (req, res, next) => {
  const formattedBody = postQuestionFormatter(req.body, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getQuestionsFormatter = (req, res, next) => {
  const formattedQuery = getQuestionsFormatter(req.query);

  return formattedRequestHandler(req, res, next, formattedQuery);
};

exports.getUserQuestionsFormatter = (req, res, next) => {
  const formattedQuery = getUserQuestionsFormatter(req.user, req.query);

  return formattedRequestHandler(req, res, next, formattedQuery);
};
