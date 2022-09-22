const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');
const postAnswerService = require('../services/post-answer');
const getAnswersService = require('../services/get-answers');
const acceptAnswerService = require('../services/accept-answer');
const voteAnswerService = require('../services/vote-answer');
const updateAnswerService = require('../services/update-answer');

const postAnswer = async (payload) => serviceResponseHandler(payload, postAnswerService, 201);

const getAnswers = async (payload) => serviceResponseHandler(payload, getAnswersService, 200);

const acceptAnswer = async (payload) => serviceResponseHandler(payload, acceptAnswerService, 204);

const voteAnswer = async (payload) => serviceResponseHandler(payload, voteAnswerService, 204);

const updateAnswer = async (payload) => serviceResponseHandler(payload, updateAnswerService, 200);

module.exports = {
  postAnswer,
  getAnswers,
  acceptAnswer,
  voteAnswer,
  updateAnswer,
};
