const bcrypt = require('bcrypt');
const { ERROR_MESSAGE } = require('../../../util/constants');
const { AuthenticationError } = require('../../../util/error-handlers');
const { User } = require('../../../db/model-handler');
const registerToken = require('../token-services/register-token');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

const generateToken = async (userId) => registerToken(userId);

const findUser = async (email) => {
  const query = new QueryBuilder()
    .setModel(User)
    .setAttributes(['id', 'name', 'email', 'password'])
    .setWhere({ email })
    .setRaw(true)
    .build();

  const user = await query.execFindOne();

  if (!user) throw new AuthenticationError(404, ERROR_MESSAGE.incorrectEmail);

  return user;
};

// eslint-disable-next-line max-len
const isPasswordValid = async (password, storedPassword) => bcrypt.compare(password, storedPassword);

/**
 * Verifies user login details and return authenticated user
 * @param {object} userId
 * @returns {object} logged-in user or error
 */

const loginUser = async ({ email = '', password = '' }) => {
  try {
    const user = await findUser(email);

    const isPasswordInvalid = !(await isPasswordValid(password, user.password));

    if (isPasswordInvalid) throw new AuthenticationError(401, ERROR_MESSAGE.incorrectPassword);

    const token = await generateToken(user.id);

    delete user.password;

    return ({ user, token });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = loginUser;
