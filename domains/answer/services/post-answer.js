const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Answer = require('../models/Answer');

const postAnswer = async ({ answerBody = '', questId = '', user }) => {
  try {
    if (!answerBody || !questId) throw new Error();

    const answer = await Answer.create({ body: answerBody, questionId: questId, ownerId: user.id });

    if (!answer) throw new Error();

    const { id, body, votes, questionId } = answer;

    return ({ id, body, votes, questionId, user: { id: user.id, name: user.name } });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = postAnswer;
