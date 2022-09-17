const User = require('../models/User');
const registerToken = require('../token-services/register-token');
const { ERROR_MESSAGE } = require('../../util/constants');
const { AppError, RequestError, ServerError } = require('../../util/error-handlers');

const generateToken = async (userId) => registerToken(userId);

/**
 * Saves user to the database
 * @param {object} userEntry : The data to be saved
 * @returns {object} Saved user
 */
const saveUser = async (userEntry) => {
  const user = await User.create(userEntry);
  if (!user) throw new ServerError(500, ERROR_MESSAGE.serverError);
  return user;
};

/**
 * Registers a new user on the system
 * @param {object} userEntry : The data to be saved
 * @returns {object} response or error object
 */
const registerUser = async (userEntry) => {
  try {
    const user = await saveUser(userEntry);

    const token = await generateToken(user.id);

    return ({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (e) {
    if (e instanceof AppError) {
      return e;
    }
    if (e.name === 'SequelizeUniqueConstraintError') {
      return new RequestError(409, ERROR_MESSAGE.duplicateEmail);
    }
    return new ServerError(500, e.message);
  }
};

module.exports = registerUser;
