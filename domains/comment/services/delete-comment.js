const { Comment } = require('../../../db/model-handler');
const { ERROR_MESSAGE } = require('../../../util/constants');
const { ServerError, RequestError } = require('../../../util/error-handlers');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

const deleteComment = async ({ id = '', ownerId = '' }) => {
  try {
    if (!id || !ownerId) throw new ServerError();

    const query = new QueryBuilder()
      .setModel(Comment)
      .setWhere({ id, ownerId })
      .build();

    const affectedRows = await query.execDestroy();

    if (affectedRows < 1) throw new RequestError(422, ERROR_MESSAGE.deleteError);

    return {};
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = deleteComment;
