const Token = require('../Token');
const { ServerError } = require('../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../util/constants');

/**
 * Removes a token from the database. If @param userId is provided all tokens of user are removed
 * @param {string} token
 * @param {string} [userId]
 * @returns {number} number of removed records.
 * @throws
 */

module.exports = async (token, userId) => {
  try {
    let numOfRemovedRecords;

    if (userId) numOfRemovedRecords = await Token.destroy({ where: { userId } });
    else numOfRemovedRecords = await Token.destroy({ where: { token } });

    return numOfRemovedRecords;
  } catch (e) {
    throw new ServerError(500, ERROR_MESSAGE.serverError);
  }
};
