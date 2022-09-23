const { Token } = require('../../../db/model-handler');
const { ServerError } = require('../../../util/error-handlers');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

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

    const where = {};

    if (userId) where.userId = userId;
    else where.token = token;

    const query = new QueryBuilder()
      .setModel(Token)
      .setWhere(where)
      .build();

    const numOfRemovedRecords = await query.execDestroy();

    return numOfRemovedRecords;
  } catch (e) {
    console.log(e);
    throw new ServerError();
  }
};

module.exports = removeToken;
