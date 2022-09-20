const serviceResponseHandler = require('../../../util/service-handlers/service-response-handler');
const postAnswerService = require('../services/post-answer');

const postAnswer = async (payload) => serviceResponseHandler(payload, postAnswerService, 201);

module.exports = { postAnswer };
