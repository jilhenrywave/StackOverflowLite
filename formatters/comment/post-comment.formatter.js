const postCommentFormatter = ({ comment = '', paramId = '' }, user) => {
  const formattedBody = {};
  if (comment) formattedBody.commentBody = comment;
  if (paramId) formattedBody.paramId = paramId;
  formattedBody.user = user;

  return formattedBody;
};

module.exports = postCommentFormatter;
