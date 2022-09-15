const registerValidator = require('../validators/register-user.validator');

exports.registerUserValidator = (req, res, next) => {
  const validatorResponse = registerValidator(req.body);

  if (validatorResponse.code) {
    return res.status(validatorResponse.code).send({ ...validatorResponse });
  }

  return next();
};
