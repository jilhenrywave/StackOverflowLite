const { Question } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Stores question in database
 * @param {object} questionEntry : With properties title, body and user
 * @returns {object} stored question object with owner data
 */
const postQuestion = async ({ title = '', body = '', user }) => {
  try {
    if (!title || !body || !user.id) throw new Error();

    const entry = { title, body, ownerId: user.id };

    const query = new QueryBuilder().build();

    const question = await query.execCreate(Question, entry);

    if (!question) throw new Error();

    return ({
      id: question.id,
      title: question.title,
      body: question.body,
      owner: {
        id: question.ownerId,
        name: user.name,
      },
    });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = postQuestion;
