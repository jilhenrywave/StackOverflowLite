const removeToken = require('../token-services/remove-token');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Removes token from database. If all is specified, all tokens are removed
 * @param {object} credentials : {id: String, token: String , all: Boolean}
 * @returns {object} responseBody
 */

const logoutUser = async ({ id = '', token = '', all = false }) => {
  try {
    if (all) await removeToken(token, id);
    else await removeToken(token);

    return { message: 'User successfully logged out' };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = logoutUser;
