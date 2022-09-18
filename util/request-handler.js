const responseHandler = async (arg, res, handler) => {
  const response = await handler(arg);
  res.status(response.statusCode).send(response.body);
};

const validationHandler = (req, res, next, validator) => {
  const validatorResponse = validator(req.body);

  if (validatorResponse.errorMessages.length > 0) {
    validatorResponse.errorMessage = 'Invalid Request Body Fields';
    return res.status(validatorResponse.code).send({ ...validatorResponse });
  }

  return next();
};

module.exports = {
  responseHandler,
  validationHandler,
};
