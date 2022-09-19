const servicesErrorHandler = require('../../../util/service-handlers/services-error-handler');
const { RequestError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');
const User = require('../models/User');
const getUser = require('./get-user');

/**
 * Updates user record
 * @param {object} update
 * @returns {object} updated user or error
 */
const updateUser = async (update) => {
  try {
    const response = await User.update(update.update, { where: { id: update.id } });

    if (response[0] < 1) throw new RequestError(422, ERROR_MESSAGE.updateError);

    return await getUser(update.id);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return new RequestError(409, ERROR_MESSAGE.duplicateEmail);
    }
    return servicesErrorHandler(e);
  }
};

module.exports = updateUser;
