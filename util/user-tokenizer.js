const jsonWebToken = require('jsonwebtoken');

const tokenKey = process.env.JWT_KEY;

/**
 * Generates a token using SHA256.
 * @param {object} payload
 * @returns {string} token
 */
exports.generateToken = (payload) => {
  try {
    if (!payload) throw new Error();
    return jsonWebToken.sign(payload, tokenKey, { expiresIn: '20 days' });
  } catch (e) {
    return null;
  }
};

/**
 * Parses a token to retrieve stored userId
 * @param {string} token
 * @returns {object} payload
 */
exports.parseToken = (token) => {
  try {
    if (!token) throw new Error();
    return jsonWebToken.verify(token, tokenKey);
  } catch (e) {
    return null;
  }
};
