const { Answer } = require('../../../db/model-handler');
const { RequestError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

const deleteAnswer = async ({ id = '', ownerId = '' }) => {
  try {
    const query = new QueryBuilder()
      .setModel(Answer)
      .setWhere({ id, ownerId })
      .build();

    const affectedRows = await query.execDestroy();

    if (affectedRows < 1) throw new RequestError(422, ERROR_MESSAGE.deleteError);

    return {};
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = deleteAnswer;
