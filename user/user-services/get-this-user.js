/* eslint-disable object-curly-newline */
const { ERROR_MESSAGE } = require('../../util/constants');
const { ServerError } = require('../../util/error-handlers');

module.exports = ({ id = '', name = '', email = '', token = '' }) => {
  try {
    if (!id || !email || !token) throw new Error();
    return ({ user: { id, name, email }, token });
  } catch (e) {
    return new ServerError(500, ERROR_MESSAGE.serverError);
  }
};
