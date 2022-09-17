/* eslint-disable object-curly-newline */
const { ValidationError, RequestError, AppError, ServerError } = require('../../util/error-handlers');
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
    if (e instanceof AppError) return e;
    return new ServerError(500, ERROR_MESSAGE.serverError);
  }
};
