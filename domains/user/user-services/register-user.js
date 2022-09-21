const User = require('../models/User');
const registerToken = require('../token-services/register-token');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const { ServerError } = require('../../../util/error-handlers');

const generateToken = async (userId) => registerToken(userId);

/**
 * Saves user to the database
 * @param {object} userEntry : The data to be saved
 * @returns {object} Saved user
 */
const saveUser = async (userEntry) => {
  const user = await User.create(userEntry);
  if (!user) throw new ServerError();
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
    return serviceErrorHandler(e);
  }
};

module.exports = registerUser;
