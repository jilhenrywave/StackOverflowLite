const registerFormatter = require('../formatters/register-user.formatter');

exports.registerUserFormatter = async (req, res, next) => {
  const formattedBody = await registerFormatter(req.body);

  if (formattedBody.code) return res.status(formattedBody.code).send({ ...formattedBody });

  req.body = formattedBody;

  return next();
};
