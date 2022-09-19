const { AuthenticationError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');
const User = require('../models/User');
const Token = require('../models/Token');

/**
 * Returns user details with token
 * @param {string} userId
 * @param {string} token
 * @returns {object}
 * @throws
 */

const getUserWithToken = async (userId, token) => {
  const user = await User.findByPk(
    userId,
    {
      include: {
        model: Token,
        where: { token },
        required: true,
      },
    },
  );

  if (!user) throw new AuthenticationError(400, ERROR_MESSAGE.invalidToken);

  return ({
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
};

module.exports = getUserWithToken;
