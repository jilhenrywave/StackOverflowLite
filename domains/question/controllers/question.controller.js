const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');
const postQuestionService = require('../services/post-question');
const getQuestionsService = require('../services/get-questions');
const getQuestionService = require('../services/get-question');

const postQuestion = async (payload) => serviceResponseHandler(payload, postQuestionService, 201);

const getQuestions = async (payload) => serviceResponseHandler(payload, getQuestionsService, 200);

const getQuestion = async (id) => serviceResponseHandler(id, getQuestionService, 200);

module.exports = {
  postQuestion,
  getQuestions,
  getQuestion,
};
