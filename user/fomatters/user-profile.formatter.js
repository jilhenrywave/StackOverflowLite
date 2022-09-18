const bcrypt = require('bcrypt');
const { ServerError } = require('../../util/error-handlers');

/**
 * Converts a password string to a hash
 * @param {string} password
 * @returns {string} hashed password
 * @throws
 */
const passwordFormatter = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  if (!hashedPassword) throw new Error();

  return hashedPassword;
};

/**
 * Formats request body for registering user.
 * @param {object} requestBody
 * @returns {object} formatted request body or error object
 */
module.exports = async ({ name = '', email = '', password = '' }) => {
  try {
    const formattedBody = {};

    if (name) formattedBody.name = name;
    if (email) formattedBody.email = email;
    if (password) formattedBody.password = await passwordFormatter(password);

    return formattedBody;
  } catch (e) {
    return new ServerError(500, 'Unable to complete requests at this time, please try again later.');
  }
};
