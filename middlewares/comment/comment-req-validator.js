const { validationHandler } = require('../../util/request-handler');
const postCommentValidator = require('../../validators/comment/post-comment.validator');

exports.postCommentValidator = (req, res, next) => {
  const request = { comment: req.body.comment, paramId: req.params.id };

  validationHandler(request, res, next, postCommentValidator);
};
