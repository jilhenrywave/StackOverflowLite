const { AuthenticationError, AppError, ServerError } = require('../util/error-handlers');
const { parseToken } = require('../util/user-tokenizer');
const { ERROR_MESSAGE } = require('../util/constants');
const User = require('../user/User');
const Token = require('../user/Token');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) throw new AuthenticationError(400, ERROR_MESSAGE.missingToken);

    const token = authHeader.replace('Bearer ', '');
    const tokenPayload = parseToken(token);

    if (!tokenPayload) throw new AuthenticationError(400, ERROR_MESSAGE.invalidToken);

    const user = await User.findByPk(
      tokenPayload.id,
      {
        include: {
          model: Token,
          where: { token },
          required: true,
        },
      },
    );

    if (!user) throw new AuthenticationError(400, ERROR_MESSAGE.invalidToken);

    req.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };

    next();
  } catch (e) {
    if (e instanceof AppError) res.status(e.code).send({ ...e });
    else res.status(500).send({ ...new ServerError(500, ERROR_MESSAGE.serverError) });
  }
};
