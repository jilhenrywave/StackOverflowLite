const { ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError } = require('../../../util/error-handlers');
const { Question } = require('../../../db/model-handler');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const getQuestion = require('./get-question');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

/**
 * Updates a question if it belongs to user
 * @param {object} updateEntry
 * @returns {object}
 */
const updateQuestion = async ({ id, title, body, user }) => {
  try {
    const query = new QueryBuilder()
      .setModel(Question)
      .setWhere({ id, ownerId: user.id })
      .build();

    const response = await query.execUpdate({ title, body });

    if (response[0] < 1) throw new RequestError(422, ERROR_MESSAGE.updateError);

    return await getQuestion(id);
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = updateQuestion;
