const postCommentService = require('../services/post-comment');
const getCommentsService = require('../services/get-comments');
const updateCommentService = require('../services/update-comment');
const deleteCommentService = require('../services/delete-comment');
const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');

const postComment = async (payload) => serviceResponseHandler(payload, postCommentService, 201);

const getComments = async (payload) => serviceResponseHandler(payload, getCommentsService, 200);

const updateComment = async (payload) => serviceResponseHandler(payload, updateCommentService, 200);

const deleteComment = async (payload) => serviceResponseHandler(payload, deleteCommentService, 204);

module.exports = {
  postComment,
  getComments,
  updateComment,
  deleteComment,
};
