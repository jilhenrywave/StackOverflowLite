const { Comment } = require('../../../db/model-handler');
const { includeUser } = require('../../../db/query-helper/include-query-constants');
const { ServerError, RequestError } = require('../../../util/error-handlers');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { ERROR_MESSAGE } = require('../../../util/constants');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Retrieves comment record from database
 * @param {string} id
 * @returns {object}
 * @throws
 */
const getComment = async (id) => {
  const query = new QueryBuilder()
    .setModel(Comment)
    .setAttributes({ exclude: ['ownerId'] })
    .setInclude([includeUser])
    .setNest(true)
    .setSubQuery(false)
    .build();

  const comment = await query.execFindByPk(id);

  if (!comment) throw new ServerError();

  return comment;
};

/**
 * Updates Comment record on database
 * @param {object} updateEntry
 * @returns {object} updatedAnswer
 */

const updateComment = async ({ paramId = '', commentBody = '', user }) => {
  try {
    if (!paramId || !commentBody) throw new ServerError();

    const query = new QueryBuilder()
      .setModel(Comment)
      .setWhere({ id: paramId, ownerId: user.id })
      .build();

    const affectedRecords = await query.execUpdate({ body: commentBody });

    if (affectedRecords[0] < 1) throw new RequestError(422, ERROR_MESSAGE.updateError);

    return await getComment(paramId);
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = updateComment;
