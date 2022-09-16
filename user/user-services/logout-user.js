const removeToken = require('../token-services/remove-token');
const { AppError, ServerError } = require('../../util/error-handlers');

/**
 * Removes token from database. If all is specified, all tokens are removed
 * @param {object} credentials : {id: String, token: String , all: Boolean}
 * @returns {object} responseBody
 */

const logoutUser = async ({ id, token, all = false }) => {
  try {
    if (all) await removeToken(token, id);
    else await removeToken(token);

    return { message: 'User successfully logged out' };
  } catch (e) {
    if (e instanceof AppError) {
      return e;
    }
    return new ServerError(500, e.message);
  }
};

module.exports = logoutUser;
