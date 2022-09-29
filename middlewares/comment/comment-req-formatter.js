const { formattedRequestHandler } = require('../../util/request-handler');
const postCommentFormatter = require('../../formatters/comment/post-comment.formatter');
const getMultipleFormatter = require('../get-multiple.formatter');
const idParamAuthUserFormatter = require('../idParamAuthUser.formatter');
const urlParser = require('../../util/url-parser');

exports.postCommentFormatter = (req, res, next) => {
  const request = { comment: req.body.comment, paramId: req.params.id };
  const formattedBody = postCommentFormatter(request, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.getCommentsFormatter = (req, res, next) => {
  const link = urlParser(req);
  const request = { ...req.query, answerId: req.params.id, link };

  const formattedBody = getMultipleFormatter(request);

  return formattedRequestHandler(req, res, next, formattedBody);
};

exports.idParamAuthUserFormatter = idParamAuthUserFormatter;
