const profileFormatter = require('../../domains/user/fomatters/user-profile.formatter');
const { formattedRequestHandler } = require('../../util/request-handler');

exports.userProfileFormatter = async (req, res, next) => {
  const formattedBody = await profileFormatter(req.body);

  return formattedRequestHandler(req, res, next, formattedBody);
};
