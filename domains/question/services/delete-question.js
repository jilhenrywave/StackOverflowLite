const { ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError } = require('../../../util/error-handlers');
const { Question } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

const deleteQuestion = async ({ id = '', ownerId = '', all = false }) => {
  try {
    const where = {};

    if (all) where.ownerId = ownerId;
    else {
      where.id = id;
      where.ownerId = ownerId;
    }

    const query = new QueryBuilder()
      .setModel(Question)
      .setWhere(where)
      .build();

    const response = await query.execDestroy();

    if (response < 1) throw new RequestError(422, ERROR_MESSAGE.deleteError);

    return {};
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = deleteQuestion;
