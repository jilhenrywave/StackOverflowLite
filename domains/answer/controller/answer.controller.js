const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');
const postAnswerService = require('../services/post-answer');
const getAnswersService = require('../services/get-answers');

const postAnswer = async (payload) => serviceResponseHandler(payload, postAnswerService, 201);

const getAnswers = async (payload) => serviceResponseHandler(payload, getAnswersService, 200);

module.exports = {
  postAnswer,
  getAnswers,
};
