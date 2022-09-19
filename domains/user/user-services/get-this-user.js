/* eslint-disable object-curly-newline */
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * @param {object} user
 * @returns {object}
 */
const getThisUser = ({ id = '', name = '', email = '', token = '' }) => {
  try {
    if (!id || !email || !token) throw new Error();
    return ({ user: { id, name, email }, token });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getThisUser;
