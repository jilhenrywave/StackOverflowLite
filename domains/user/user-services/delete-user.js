const { User } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError } = require('../../../util/error-handlers');
const servicesErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Removes user record from database
 * @param {object} user
 * @returns {object} deleted user
 */
const deleteUser = async ({ id }) => {
  try {
    const query = new QueryBuilder().setModel(User).setWhere({ id }).build();

    const numberOfAffectedRow = await query.execDestroy();

    if (numberOfAffectedRow < 1) throw new RequestError(422, ERROR_MESSAGE.deleteError);

    return {};
  } catch (e) {
    return servicesErrorHandler(e);
  }
};

module.exports = deleteUser;
