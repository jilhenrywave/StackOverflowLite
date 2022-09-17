/* eslint-disable object-curly-newline */
const { ValidationError, RequestError } = require('../../util/error-handlers');
const serviceErrorHandler = require('../../util/services-error-handler');
const { isValidID } = require('../../util/validators/field-validators');
const { ERROR_MESSAGE } = require('../../util/constants');
const User = require('../models/User');

module.exports = async (id) => {
  try {
    if (!isValidID(id)) throw new ValidationError(ERROR_MESSAGE.invalidID);

    const user = await User.findOne({ where: { id } });

    if (!user) throw new RequestError(404, 'No user found');

    return { id: user.id, name: user.name, email: user.email };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};
