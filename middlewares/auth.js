/* eslint-disable object-curly-newline */
const { AuthenticationError, AppError, ServerError, ValidationError } = require('../util/error-handlers');
const { parseToken } = require('../util/user-tokenizer');
const { ERROR_MESSAGE } = require('../util/constants');
const { getUserWithToken } = require('../user/controllers/user.controller');
const { isValidID } = require('../util/validators/field-validators');

const getTokenPayload = (authHeader) => {
  const token = authHeader.replace('Bearer ', '');
  const payload = parseToken(token);
  if (!payload) throw new AuthenticationError(400, ERROR_MESSAGE.invalidToken);
  return ({ token, payload });
};

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) throw new AuthenticationError(400, ERROR_MESSAGE.missingToken);

    const { token, payload } = getTokenPayload(authHeader);

    if (!isValidID(payload.id)) throw new ValidationError(ERROR_MESSAGE.invalidID);

    const userWithToken = await getUserWithToken(payload.id, token);

    req.user = userWithToken;

    next();
  } catch (e) {
    if (e instanceof AppError) res.status(e.code).send({ ...e });
    else res.status(500).send({ ...new ServerError(500, ERROR_MESSAGE.serverError) });
  }
};
