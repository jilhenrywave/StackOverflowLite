const servicesErrorHandler = require('../../util/services-error-handler');
const { RequestError, ServerError } = require('../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../util/constants');
const User = require('../models/User');
const getUser = require('./get-user');

/**
 * Updates user record
 * @param {object} update
 * @returns {object} updated user or error
 */
module.exports = async (update) => {
  try {
    const response = await User.update(update.update, { where: { id: update.id } });

    if (response.length < 1) throw new ServerError(500, 'Cannot update user at this time. Please try again later');

    const user = await getUser(update.id);

    if (!user) throw new Error();

    return { id: user.id, name: user.name, email: user.email };
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return new RequestError(409, ERROR_MESSAGE.duplicateEmail);
    }
    return servicesErrorHandler(e);
  }
};
