const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Answer = require('../models/Answer');

const postAnswer = async ({ answerBody = '', paramId = '', user }) => {
  try {
    if (!answerBody || !paramId) throw new Error();

    const answer = await Answer.create({ body: answerBody, questionId: paramId, ownerId: user.id });

    if (!answer) throw new Error();

    const { id, body, votes, questionId } = answer;

    return ({ id, body, votes, questionId, user: { id: user.id, name: user.name } });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = postAnswer;
