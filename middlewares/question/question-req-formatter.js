/* eslint-disable max-len */
const postQuestionFormatter = require('../../formatters/question/post-question.formatter');
const idParamAuthUserFormatter = require('../idParamAuthUser.formatter');
const getMulitpleFormatter = require('../get-multiple.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');
const {
  postAnswerFormatter,
  getQuestionAnswersFormatter,
} = require('../answer/answer-req-formatter');
const urlParser = require('../../util/url-parser');

exports.postQuestionFormatter = (req, res, next) => {
  const body = { id: req.params.id, title: req.body.title, body: req.body.body };
  const formattedBody = postQuestionFormatter(body, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getQuestionsFormatter = (req, res, next) => {
  const link = urlParser(req);
  const formattedQuery = getMulitpleFormatter({ ...req.query, link });

  return formattedRequestHandler(req, res, next, formattedQuery);
};

exports.getUserQuestionsFormatter = (req, res, next) => {
  const link = urlParser(req);
  const formattedQuery = getMulitpleFormatter({ ...req.query, ownerId: req.user.id, link });

  return formattedRequestHandler(req, res, next, formattedQuery);
};

exports.idParamAuthUserFormatter = idParamAuthUserFormatter;

exports.postAnswerFormatter = postAnswerFormatter;

exports.getQuestionAnswersFormatter = getQuestionAnswersFormatter;
