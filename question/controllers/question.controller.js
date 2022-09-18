const serviceResponseHandler = require('../../util/service-handlers/service-response-handler');
const postQuestionService = require('../services/post-question');

const postQuestion = async (payload) => serviceResponseHandler(payload, postQuestionService, 201);

module.exports = {
  postQuestion,
};
