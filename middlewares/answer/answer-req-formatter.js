/* eslint-disable max-len */
const { formattedRequestHandler } = require('../../util/request-handler');
const { postCommentFormatter, getCommentsFormatter } = require('../comment/comment-req-formatter');
const getMulitpleFormatter = require('../get-multiple.formatter');
const postAnswerFormatter = require('../../formatters/answer/post-answer.formatter');
const idParamAuthUserFormatter = require('../idParamAuthUser.formatter');
const voteAnswerFormatter = require('../../formatters/answer/vote-answer.formatter');
const urlParser = require('../../util/url-parser');

exports.postAnswerFormatter = (req, res, next) => {
  const request = { answer: req.body.answer, paramId: req.params.id };
  const formattedBody = postAnswerFormatter(request, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getQuestionAnswersFormatter = (req, res, next) => {
  const link = urlParser(req);
  const request = { ...req.query, questionId: req.params.id, link };
  const formattedBody = getMulitpleFormatter(request);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getUserAnswersFormatter = (req, res, next) => {
  const link = urlParser(req);
  const formattedBody = getMulitpleFormatter({ ...req.query, ownerId: req.user.id, link });

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.idParamAuthUserFormatter = idParamAuthUserFormatter;

exports.voteAnswerFormatter = (req, res, next) => {
  const formattedBody = voteAnswerFormatter({
    id: req.params.id,
    user: req.user,
    voteType: req.query.type,
  });

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.postCommentFormatter = postCommentFormatter;

exports.getCommentsFormatter = getCommentsFormatter;
