const serviceResponseHandler = require('../../util/service-handlers/service-response-handler');
const postQuestionService = require('../services/post-question');
const getQuestionService = require('../services/get-questions');

const postQuestion = async (payload) => serviceResponseHandler(payload, postQuestionService, 201);

const getQuestion = async (payload) => serviceResponseHandler(payload, getQuestionService, 200);

module.exports = {
  postQuestion,
  getQuestion,
};
