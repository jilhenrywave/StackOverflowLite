/* eslint-disable no-unused-vars */
const formatter = (id, user) => ({ id, ownerId: user.id });

const idParamAuthUserFormatter = (req, res, next) => {
  const formattedQuery = formatter(req.params.id, req.user);

  req.formattedBody = formattedQuery;

  next();
};

module.exports = idParamAuthUserFormatter;
