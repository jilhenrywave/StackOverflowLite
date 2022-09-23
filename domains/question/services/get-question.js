const { RequestError } = require('../../../util/error-handlers');
const { Question } = require('../../../db/model-handler');
const { includeUser, includeAnswer } = require('../../../db/query-helper/include-query-constants');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

/**
 * Retrives a question from the database using id
 * @param {UUID} id : Question id
 * @returns {object}
 */
const getQuestion = async (id) => {
  try {
    const query = new QueryBuilder()
      .setModel(Question)
      .setAttributes(['id', 'title', 'body'])
      .setInclude([includeUser, includeAnswer])
      .setRaw(true)
      .setNest(true)
      .build();

    const question = await query.execFindByPk(id);

    if (question && !question.id) throw new RequestError(404, 'No question found');

    return question;
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getQuestion;
