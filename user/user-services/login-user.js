const bcrypt = require('bcrypt');
const User = require('../models/User');
const registerToken = require('../token-services/register-token');
const { ERROR_MESSAGE } = require('../../util/constants');
const { AppError, ServerError, AuthenticationError } = require('../../util/error-handlers');

const generateToken = async (userId) => registerToken(userId);

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });
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

const loginUser = async ({ email, password }) => {
  try {
    const user = await findUser(email);

    const isPasswordInvalid = !(await isPasswordValid(password, user.password));

    if (isPasswordInvalid) throw new AuthenticationError(401, ERROR_MESSAGE.incorrectPassword);

    const token = await generateToken(user.id);

    return ({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (e) {
    if (e instanceof AppError) {
      return e;
    }
    return new ServerError(500, e.message);
  }
};

module.exports = loginUser;
