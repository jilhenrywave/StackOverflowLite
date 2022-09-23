const { AuthenticationError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');
const { includeToken } = require('../../../db/query-helper/include-query-constants');
const { User } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

/**
 * Returns user details with token
 * @param {string} userId
 * @param {string} token
 * @returns {object}
 * @throws
 */

const getUserWithToken = async (userId, token) => {
  const query = new QueryBuilder()
    .setModel(User)
    .setAttributes(['id', 'name', 'email'])
    .setWhere({ token })
    .setInclude([includeToken])
    .setNest(true)
    .build();

  const user = await query.execFindByPk(userId);

  if (!user) throw new AuthenticationError(400, ERROR_MESSAGE.invalidToken);

  return user;
};

module.exports = getUserWithToken;
