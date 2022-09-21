/* eslint-disable max-len */
const postQuestionFormatter = require('../../domains/question/formatters/post-question.formatter');
const idParamAuthUserFormatter = require('../idParamAuthUser.formatter');
const getMulitpleFormatter = require('../get-multiple.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');

exports.postQuestionFormatter = (req, res, next) => {
  const body = { id: req.params.id, title: req.body.title, body: req.body.body };
  const formattedBody = postQuestionFormatter(body, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getQuestionsFormatter = (req, res, next) => {
  const formattedQuery = getMulitpleFormatter(req.query);

  return formattedRequestHandler(req, res, next, formattedQuery);
};

exports.getUserQuestionsFormatter = (req, res, next) => {
  const formattedQuery = getMulitpleFormatter({ ownerId: req.user.id, ...req.query });

  return formattedRequestHandler(req, res, next, formattedQuery);
};

exports.idParamAuthUserFormatter = idParamAuthUserFormatter;
