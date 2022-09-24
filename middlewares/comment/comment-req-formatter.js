const { formattedRequestHandler } = require('../../util/request-handler');
const postCommentFormatter = require('../../formatters/comment/post-comment.formatter');

exports.postCommentFormatter = (req, res, next) => {
  const request = { comment: req.body.comment, paramId: req.params.id };
  const formattedBody = postCommentFormatter(request, req.user);

  return formattedRequestHandler(req, res, next, formattedBody);
};
