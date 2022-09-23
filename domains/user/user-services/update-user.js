const { User } = require('../../../db/model-handler');
const { RequestError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');
const getUser = require('./get-user');
const servicesErrorHandler = require('../../../util/service-handlers/services-error-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

/**
 * Updates user record
 * @param {object} update
 * @returns {object} updated user or error
 */
const updateUser = async (update) => {
  try {
    const query = new QueryBuilder()
      .setModel(User)
      .setWhere({ id: update.id })
      .build();

    const response = await query.execUpdate(update.update);

    if (response[0] < 1) throw new RequestError(422, ERROR_MESSAGE.updateError);

    return await getUser(update.id);
  } catch (e) {
    return servicesErrorHandler(e);
  }
};

module.exports = updateUser;
