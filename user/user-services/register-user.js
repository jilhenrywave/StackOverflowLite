const User = require('../User');
const registerToken = require('../token-services/register-token');
const { AppError, RequestBodyError, ServerError } = require('../../util/error-handlers');

const getToken = async (userId) => registerToken(userId);

/**
 * Saves user to the database
 * @param {object} userEntry : The data to be saved
 * @returns {object} Saved user
 */
const saveUser = async (userEntry) => {
  const user = User.build(userEntry);
  if (!user) throw new ServerError(500, 'Error: Could not create user');
  await user.save();
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

    const token = await getToken(user.id);

    return ({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (e) {
    if (e instanceof AppError) {
      return e;
    }
    if (e.name === 'SequelizeUniqueConstraintError') {
      return new RequestBodyError(409, 'Email already exists');
    }
    return new ServerError(500, e.message);
  }
};

module.exports = registerUser;
