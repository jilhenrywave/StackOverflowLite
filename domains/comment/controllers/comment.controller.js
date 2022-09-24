const postCommentService = require('../services/post-comment');
const getCommentsService = require('../services/get-comments');
const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');

const postComment = async (payload) => serviceResponseHandler(payload, postCommentService, 201);

const getComments = async (payload) => serviceResponseHandler(payload, getCommentsService, 200);

module.exports = { postComment, getComments };
