const Token = require('../models/Token');
const { ServerError } = require('../../../util/error-handlers');

/**
 * Removes a token from the database. If @param userId is provided all tokens of user are removed
 * @param {string} token
 * @param {string} [userId]
 * @returns {number} number of removed records.
 * @throws
 */

const removeToken = async (token, userId) => {
  try {
    if (!token) throw new Error();

    let numOfRemovedRecords;

    if (userId) numOfRemovedRecords = await Token.destroy({ where: { userId } });
    else numOfRemovedRecords = await Token.destroy({ where: { token } });

    return numOfRemovedRecords;
  } catch (e) {
    throw new ServerError();
  }
};

module.exports = removeToken;
