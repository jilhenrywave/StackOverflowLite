const postCommentService = require('../services/post-comment');
const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');

const postComment = async (payload) => serviceResponseHandler(payload, postCommentService, 201);

module.exports = { postComment };
