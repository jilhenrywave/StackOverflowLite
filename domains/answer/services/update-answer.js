const { ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError, ServerError } = require('../../../util/error-handlers');
const { Answer } = require('../../../db/model-handler');
const { includeUser, includeQuestion } = require('../../../db/query-helper/include-query-constants');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
/**
 * Retrieves an answer record from the database
 * @param {string} id
 * @returns {object}
 * @throws
 */
const getAnswer = async (id) => {
  const query = new QueryBuilder()
    .setModel(Answer)
    .setAttributes(['id', 'body', 'votes', 'questionId'])
    .setInclude([includeUser, includeQuestion])
    .setRaw(true)
    .setNest(true)
    .setSubQuery(false)
    .build();

  const answer = await query.execFindByPk(id);

  if (!answer) throw new ServerError();

  return answer;
};

/**
 * Updates Answer record on database
 * @param {object} updateEntry
 * @returns {object} updatedAnswer
 */

const updateAnswer = async ({ paramId = '', answerBody = '', user }) => {
  try {
    if (!paramId || !answerBody) throw new ServerError();

    const query = new QueryBuilder()
      .setModel(Answer)
      .setWhere({ id: paramId, ownerId: user.id })
      .build();

    const affectedRecords = await query.execUpdate({ body: answerBody });

    if (affectedRecords[0] < 1) throw new RequestError(422, ERROR_MESSAGE.updateError);

    return await getAnswer(paramId);
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = updateAnswer;
