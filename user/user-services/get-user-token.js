const { AuthenticationError } = require('../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../util/constants');
const User = require('../User');
const Token = require('../Token');

/**
 * Returns user details with token
 * @param {string} userId
 * @param {string} token
 * @returns {object}
 * @throws
 */

module.exports = async (userId, token) => {
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
