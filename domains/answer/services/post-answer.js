const { Answer } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Stores a new answer in the database
 * @param {object} postEntry
 * @returns {object}
 */
const postAnswer = async ({ answerBody = '', paramId = '', user }) => {
  try {
    if (!answerBody || !paramId) throw new Error();

    const query = new QueryBuilder().build();

    const answer = await query.execCreate(
      Answer,
      {
        body: answerBody,
        questionId: paramId,
        ownerId: user.id,
      },
    );

    if (!answer) throw new Error();

    const { id, body, votes, questionId } = answer;

    return ({ id, body, votes, questionId, user: { id: user.id, name: user.name } });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = postAnswer;
