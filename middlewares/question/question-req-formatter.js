/* eslint-disable max-len */
const questionFormatter = require('../../question/formatters/question.formatter');

exports.questionFormatter = (req, res, next) => {
  const formattedBody = questionFormatter(req.body, req.user);

  if (formattedBody.code) return res.status(formattedBody.code).send({ ...formattedBody });

  req.formattedBody = formattedBody;

  return next();
};
