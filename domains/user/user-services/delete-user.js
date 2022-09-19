const { ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError } = require('../../../util/error-handlers');
const servicesErrorHandler = require('../../../util/service-handlers/services-error-handler');
const User = require('../models/User');

/**
 * Removes user record from database
 * @param {object} user
 * @returns {object} deleted user
 */
const deleteUser = async ({ id }) => {
  try {
    const numberOfAffectedRow = await User.destroy({ where: { id } });

    if (numberOfAffectedRow[0] < 1) throw new RequestError(422, ERROR_MESSAGE.deleteError);

    return {};
  } catch (e) {
    return servicesErrorHandler(e);
  }
};

module.exports = deleteUser;
