const { validationHandler } = require('../../util/request-handler');
const postCommentValidator = require('../../validators/comment/post-comment.validator');
const getMultipleValidator = require('../get-multiple.validator');
const idParamValidator = require('../idParam.validator');

exports.postCommentValidator = (req, res, next) => {
  const request = { comment: req.body.comment, paramId: req.params.id };

  validationHandler(request, res, next, postCommentValidator);
};

exports.getCommentsValidator = (req, res, next) => {
  const request = { ...req.query, id: req.params.id };

  validationHandler(request, res, next, getMultipleValidator);
};

exports.idParamValidator = idParamValidator;
