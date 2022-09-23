/* eslint-disable object-curly-newline */
const { ValidationError, RequestError } = require('../../../util/error-handlers');
const { isValidID } = require('../../../util/field-validators');
const { ERROR_MESSAGE } = require('../../../util/constants');
const { User } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Retrieve a user by primary key.
 * @param {string} id
 * @returns {object} stored user object
 */
const getUser = async (id) => {
  try {
    if (!isValidID(id)) throw new ValidationError(ERROR_MESSAGE.invalidID);

    const query = new QueryBuilder()
      .setModel(User)
      .setAttributes(['id', 'name', 'email'])
      .build();

    const user = await query.execFindByPk(id);

    if (!user) throw new RequestError(404, 'No user found');

    return user;
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getUser;
