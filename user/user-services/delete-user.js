const { ServerError } = require('../../util/error-handlers');
const servicesErrorHandler = require('../../util/services-error-handler');
const User = require('../models/User');

/**
 * Removes user record from database
 * @param {object} user
 * @returns {object} deleted user
 */
module.exports = async ({ id, name, email }) => {
  try {
    const numberOfAffectedRow = await User.destroy({ where: { id } });

    if (numberOfAffectedRow.length < 1) throw new ServerError(500, 'Cannot delete user at this time. Please try again later');

    return { id, name, email };
  } catch (e) {
    return servicesErrorHandler(e);
  }
};
