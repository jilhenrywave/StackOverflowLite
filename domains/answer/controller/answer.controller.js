const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');
const postAnswerService = require('../services/post-answer');
const getAnswersService = require('../services/get-answers');
const acceptAnswerService = require('../services/accept-answer');

const postAnswer = async (payload) => serviceResponseHandler(payload, postAnswerService, 201);

const getAnswers = async (payload) => serviceResponseHandler(payload, getAnswersService, 200);

const acceptAnswer = async (payload) => serviceResponseHandler(payload, acceptAnswerService, 204);

module.exports = {
  postAnswer,
  getAnswers,
  acceptAnswer,
};
