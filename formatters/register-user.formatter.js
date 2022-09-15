const bcrypt = require('bcrypt');
const { ServerError } = require('../util/error-handlers');

/**
 * Formats request body for registering user.
 * @param {object} requestBody
 * @returns {object} formatted request body or error object
 */
module.exports = async (requestBody) => {
  try {
    const { name, email, password } = requestBody;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!hashedPassword) throw new Error();

    return { name, email, password: hashedPassword };
  } catch (e) {
    const error = new ServerError(500, 'Unable to complete requests at this time, please try again later.');
    return { ...error };
  }
};
