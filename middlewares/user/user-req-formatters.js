const profileFormatter = require('../../user/fomatters/user-profile.formatter');

exports.userProfileFormatter = async (req, res, next) => {
  const formattedBody = await profileFormatter(req.body);

  if (formattedBody.code) return res.status(formattedBody.code).send({ ...formattedBody });

  req.formattedBody = formattedBody;

  return next();
};
