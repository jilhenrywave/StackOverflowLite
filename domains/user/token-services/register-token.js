const { Token } = require('../../../db/model-handler');
const { generateToken } = require('../user-tokenizer');
const { ServerError } = require('../../../util/error-handlers');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

/**
 * Generates a token based on the user id and returns a token entry object
 * @param {string} userId
 * @returns {object} tokenEntry
 * @throws
 */

const createTokenEntry = (userId) => {
  const token = generateToken({ id: userId });

  if (!token) throw new ServerError();

  return { token, userId };
};

/**
 * Saves token entry object to database and returns the stored token.
 * @param {object} tokenEntry
 * @returns {string} storedToken
 * @throws
 */
const storeToken = async (tokenEntry) => {
  const query = new QueryBuilder()
    .setModel(Token)
    .build();

  const storedToken = await query.execCreate(tokenEntry);

  if (!storedToken) throw new ServerError();

  return storedToken.token;
};

/**
 * Registers a new token for a user on the system and returns the token
 * @param {string} userId
 * @returns {string} token
 * @throws
 */

const registerToken = async (userId) => {
  try {
    if (!userId) throw new ServerError();

    const tokenEntry = createTokenEntry(userId);

    const token = await storeToken(tokenEntry);

    if (!token) throw new ServerError();

    return token;
  } catch (e) {
    throw new ServerError();
  }
};

module.exports = registerToken;
