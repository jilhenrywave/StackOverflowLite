const registerFormatter = require('../util/formatters/register-user.formatter');

exports.registerUserFormatter = async (req, res, next) => {
  const formattedBody = await registerFormatter(req.body);

  if (formattedBody.code) return res.status(formattedBody.code).send({ ...formattedBody });

  req.formattedBody = formattedBody;

  return next();
};
