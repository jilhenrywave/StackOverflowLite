const { AuthenticationError, AppError, ServerError } = require('../util/error-handlers');
const { parseToken } = require('../util/user-tokenizer');
const { ERROR_MESSAGE } = require('../util/constants');
const { getUserWithToken } = require('../user/user.controller');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) throw new AuthenticationError(400, ERROR_MESSAGE.missingToken);

    const token = authHeader.replace('Bearer ', '');
    const tokenPayload = parseToken(token);

    if (!tokenPayload) throw new AuthenticationError(400, ERROR_MESSAGE.invalidToken);

    const userWithToken = await getUserWithToken(tokenPayload.id, token);

    req.body = userWithToken;

    next();
  } catch (e) {
    if (e instanceof AppError) res.status(e.code).send({ ...e });
    else res.status(500).send({ ...new ServerError(500, ERROR_MESSAGE.serverError) });
  }
};
