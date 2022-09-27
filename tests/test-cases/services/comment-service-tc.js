const { commentId, ownerId, id, answerId, comment } = require('../test-constants');
const { owner, user } = require('../entities/user.entity');

const deleteCommentNoId = { ownerId };
const deleteCommentNoOwner = { id: commentId };
const deleteCommentInvalidOwner = { id: commentId, ownerId: id };
const deleteCommentValidArgs = { id: commentId, ownerId };

const getCommentsNoId = { start: 2, limit: 3 };
const getCommentsInvalidId = { answerId: 'invalid-id' };
const getCommentsEmpty = { answerId: 'empty-id' };
const getCommentsValid = { answerId };
const getCommentsWithQueries = { answerId, start: 2, limit: 3 };

const postCommentNoBody = { paramId: answerId, user: owner };
const postCommentNoParamId = { commentBody: comment, user: owner };
const postCommentInvalidAnswer = { commentBody: comment, paramId: 'some-answer-id', user: owner };
const postCommentInvalidUser = { commentBody: comment, paramId: answerId, user };
const postCommentValid = { commentBody: comment, paramId: answerId, user: owner };

module.exports = {
  deleteCommentNoId,
  deleteCommentNoOwner,
  deleteCommentInvalidOwner,
  deleteCommentValidArgs,
  getCommentsNoId,
  getCommentsInvalidId,
  getCommentsEmpty,
  getCommentsValid,
  getCommentsWithQueries,
  postCommentNoBody,
  postCommentNoParamId,
  postCommentInvalidAnswer,
  postCommentInvalidUser,
  postCommentValid,
};
