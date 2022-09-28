const removeToken = require('../token-services/remove-token');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const { RequestError } = require('../../../util/error-handlers');

/**
 * Removes token from database. If all is specified, all tokens are removed
 * @param {object} credentials : {id: String, token: String , all: Boolean}
 * @returns {object} responseBody
 */

const logoutUser = async ({ id = '', token = '', all = false }) => {
  try {
    const affectedRecords = all ? await removeToken(token, id) : await removeToken(token);

    if (affectedRecords < 1) {
      throw new RequestError(422, 'Could not complete request at this time.');
    }

    return { message: 'User successfully logged out' };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = logoutUser;
